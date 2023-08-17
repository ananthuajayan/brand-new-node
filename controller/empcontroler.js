const asyncHandler = require('express-async-handler');
const Employee = require('../models/empmodels');
const multer = require('multer');
//image upload
const storage = multer.diskStorage ({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
})

const upload=multer({
    storage:storage
}).single('image')


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
const postemployee = asyncHandler(async (req, res) => {
    // Use the 'upload' middleware to process image upload
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // Handle Multer errors here
            res.status(400).json({ error: 'Image upload error' });
        } else if (err) {
            // Handle other errors here
            res.status(500).json({ error: 'Server error' });
        } else {
            const {
                // other employee fields
                adress, city, country, dob, email, firstName, gender, lastName,
                password, phone, pin, qualifications, salutation, state, username,image
            } = req.body;
            console.log(adress, city, country, dob, email, firstName, gender, lastName,
                password, phone, pin, qualifications, salutation, state, username,image)

            // 'req.file' contains information about the uploaded image
            const imageInfo = req.file;
            

            if (!adress || !city || !country || !dob || !email || !firstName || !gender ||
                !lastName || !password || !phone || !pin || !qualifications || !salutation ||
                !state || !username || !imageInfo) {
                res.status(400).json({ error: 'All fields are mandatory' });
            }

            // Create an employee with image information
            const employee = await Employee.create({
                adress, city, country, dob, email, firstName, gender, lastName,
                password, phone, pin, qualifications, salutation, state, username,
                image: imageInfo // Save image information in the employee record
            });

            res.status(201).json(employee);
        }
    });
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

