const mongoose =  require('mongoose');


const usersScheme = mongoose.Schema(
    {
        
        username:{
            type:String,
            required:[true,"please fill the username"]
        },
        email:{
            type:String,
            required:[true, "please add the email adress"],
            unique:[true,"email adress already exists"]
 
        },
        password:{ 
            type:String,
            required:[true,"add user password"]
        }
        
      
    },
    {
        timestamps: true
    }
)
module.exports= mongoose.model('User ', usersScheme);
