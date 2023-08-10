//to get all the contacts
// route:GET /api/employees
const getemployees = (req,res)=>{
    res.status(200).json({message:"get all the contacts"})
}
// to get a specified employyee list
// route : GET / api/employees/:id
const getemployee =(req,res)=>{
    res.status(200).json({message:`get the contacts of ${req.params.id}`})
}

// to add an employee
const postemployee = (req,res)=>{
    console.log("the body is:", req.body)
    const{name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    res.status(200).json({message:"create an employee"})
}

// to update an employee
const updemployee = (req,res)=>{
    res.status(200).json({message:`updated the datas of ${req.params.id}`})
}

// to delete an employee
const delemployee = (req,res)=>{
    res.status(200).json({message:`deleted the existing data of ${req.params.id} `})
}

module.exports = {getemployees,getemployee,postemployee,updemployee,delemployee}