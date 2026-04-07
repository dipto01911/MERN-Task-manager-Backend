
const jwt=require('jsonwebtoken')
const {UserModel}=require('../model/UserModel')
const {JWT_KEY}=require('../../config')

const Registration = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await UserModel.create(reqBody);
        res.status(200).json({
            status: 'success',
            data: data
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            data: err.message
        });
    }
};

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
       const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "User not found"
            });
        }

      if (password !== user.password) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            JWT_KEY,   // use .env in real project
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Server error",
            error: error.message
        });
    }
};


const ProfileUpdate=async(req,res)=>{

    try{
let email=req.headers['email']
//console.log(email)
 let reqBody=req.body;
 let query={email:email}
 let data=await UserModel.updateOne(query,reqBody)
return res.status(200).json({status:'success',data:data})
    }catch(err){
 return res.status(400).json({status:'success',data:err})
    }
}


module.exports = { Registration,UserLogin,ProfileUpdate };
 