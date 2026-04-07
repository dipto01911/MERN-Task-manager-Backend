
const {TaskModel}=require('../model/TaskModel')

 const CreateTask=(req,res)=>{
   try{
let reqBody=req.body;
reqBody.email=req.headers['email']
TaskModel.create(reqBody)
.then((data)=>{
    res.status(201).json({message:'Task Created',data})
}).catch((err)=>{
    res.status(400).json({message:'Error occurred'})
})
   }catch(err){
    res.status(500).json({message:'Server error'})
   }
 }



  const ReadUser=(req,res)=>{
  try{
  let query={}
  let projection="Name Roll City"
  User.find(query,projection)
  .then((data)=>{
    res.status(200).json({message:'User Read',data})
  }).catch((err)=>{
    res.status(400).json({message:'Error occured'})
  })
   }catch(err){
    res.status(500).json({message:'Server error'})
   }
 
  }

const UpdateTask=(req,res)=>{
   try{
      const id=req.params.id;
      let status=req.params.status;
      const query={_id:id}
      let reqBody={status:status}
      TaskModel.updateOne(query,reqBody)
      .then((data)=>{
        res.status(200).json({message:'TaskStatus Updated Successfully'})
      }).catch((err)=>{
        res.status(400).json({message:'Error occured'})
      })
   }catch(err){
    res.status(500).json({message:'Server error'})
   }
 }

const DeleteTask=(req,res)=>{

  try{
 const Id=req.params.id;
 const query={_id:Id}
 TaskModel.deleteOne(query)
 .then((data)=>{
    res.status(200).json({message:'Task deleted Successfully'})
 }).catch((err)=>{
    res.status(200).json({message:'Error occured'})
 })
   }catch(err){
    res.status(500).json({message:'Server error'})
   }
 }


// const listTaskByStatus=(req,res)=>{
//     let status=req.params.status;
//     let email=req.headers['email'];
//      TaskModel.aggregate([
//         {$match:{status:status,email:email}},
//         {$project:{
//             _id:1,title:1,description:1,status:1,
//             createdDate:{
//                 $dateToString:{
//                     date:"$createdDate",
//                     format:"%d-%m-%Y"
//                 }
//             }
//         }}
//      ],(err,data)=>{
//         if(err){
//             res.status(400).json({status:fail,data:err})
//         }    
//         else{
//             res.status(200).json({status:"success",data:data})
//         }
//     })
// }

const listTaskByStatus = async (req, res) => {
    try {
        let status = req.params.status;
        let email = req.headers['email'];

        let data = await TaskModel.aggregate([
            { $match: { status: status, email: email } },
            {$project: {
                    _id: 1, title: 1,description: 1,status: 1,
                    createdDate: {
                        $dateToString: {
                            date: "$createdDate",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            }
        ]);

    res.status(200).json({status: "success",data: data });

    } 
    catch (err) {
        res.status(400).json({status: "fail",data: err.message});
    }
};

const TaskStatusCount=async(req,res)=>{
 try{
 let email=req.headers['email'];
 let data=await TaskModel.aggregate([
    {$match:{email:email}},
    {$group:{_id:"$status",sum:{$count:{}}}}
 ])
   res.status(200).json({status: "success",data: data });
 }catch(err){
     res.status(400).json({status: "fail",data: err.message});
 }
}


 module.exports={TaskStatusCount,CreateTask,DeleteTask,UpdateTask,listTaskByStatus}