const asyncHandler = require('express-async-handler');
const Employee = require('../models/empmodels');


//to get all the contacts
// route:GET /api/employees
const getemployees = asyncHandler(async(req,res)=>{
    const employees =await Employee.find();
    res.status(200).json(employees);
});


// to get a specified employyee list
// route : GET / api/employees/:id
const getemployee = asyncHandler(async(req,res)=>{
    const employee = await Employee.findById(req.params.id);
if(!employee){
    res.status(404);
    throw new Error("contact not found");
}
    res.status(200).json(employee);
});



// to add an employee
const postemployee = asyncHandler(async(req,res)=>{
    console.log("the body is:", req.body);
    const{ adress,city,country,dob,email,firstName,gender,lastName,password,phone,pin,qualifications,salutation,state,username}=req.body;
    console.log( adress,city,country,dob,email,firstName,gender,lastName,password,phone,pin,qualifications,salutation,state,username);
    if(!adress||!city||!country||!dob||!email||!firstName||!gender||!lastName||!password||!phone||!pin||!qualifications||!salutation||!state||!username){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
  const employee = await Employee.create({
        adress,city,country,dob,email,firstName,gender,lastName,password,phone,pin,qualifications,salutation,state,username
    })
    res.status(200).json(employee);
});



// to update an employee
const updemployee = asyncHandler(async(req,res)=>{
    const employee = await Employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("contact not found");
    }
    const updemployee = await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updemployee);
});



// to delete an employee
const delemployee = asyncHandler(async(req,res)=>{
    const employee = await Employee.findById(req.params.id);
    if(!employee){
        res.status(404);
        throw new Error("contact not found");
    }
    const delEmployee = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json(delEmployee);
});



module.exports = {getemployees,getemployee,postemployee,updemployee,delemployee}