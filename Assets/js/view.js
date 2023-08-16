function remove(){
    document.getElementById("confirm-delete").style.visibility = "hidden";
  }
 
 function ref(){
let employee = document.getElementById('table-back');
let output = "";
let count = 1;

fetch("http://localhost:5001/api/employees")
.then((res) => res.json())
.then((employ) =>{ console.log(employ);

    employ.forEach(row=>{

// for(i=0;i<employ.length;i++){

    // const post = employ[i];
     var id = row._id;
    //  console.log(id);
     output+=`
     <tr>
    <td scope="row">${count}</th>
        <td class="zero">
            <div class="pic-setter">
                
            </div>
            ${row.salutation + " "+row.firstName + " "+row.lastName}
        </td>
    <td>${row.email}</td>
    <td>${row.phone}</td>
    <td>${row.gender}</td>
    <td>${row.dob}</td>
    <td>${row.country}</td>
    
    <td class="dropdown" class= dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fa-solid fa-ellipsis"></i>
    <ul class="dropdown-menu">
    <li><a class="dropdown-item" onclick = "viewPage('${id}')"><i class="fa fa-sharp fa-light fa-eye" id="buttonDropdown_action"></i>view</a></li>
    <button type="button" class="btn click" data-bs-toggle="modal" data-bs-target="#exampleModa" onclick = " editDetails('${id}')"><i class="fa fa-sharp fa-light fa-pen" id="buttonDropdown_action"></i>edit</button>
      <li><button class="dropdown-item" onclick = "deletion('${id}')"><i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete</button></li>
    </ul>
    
    </td>
   
    </tr>
    
     `
    
     employee.innerHTML = output;
count++;
    })
})
}


function viewPage(id){
    window.location.href = `http://127.0.0.1:5500/show.html?id=${id}`;

}


ref();
async function deletion(id){  
    document.getElementById('confirm-delete').style.visibility = "visible";
    var del=document.getElementById("del")
    del.addEventListener('click', ()=>{
   const response =   fetch(`http://localhost:5001/api/employees/${id}`,{
        method:'DELETE'

      });
   
      ref();
      document.getElementById('confirm-delete').style.visibility = "hidden";
    }
  
    )
    }
    //validation=============================
    
  


    // add new user===============================


const addUser = document.getElementById('modal');
if(addUser !== null){
addUser.addEventListener('submit',(e)=>{
    e.preventDefault();
var salutation = document.getElementById('salutation').value;
var firstName = document.getElementById('firstname').value;
var secondName = document.getElementById('secondname').value;
var email = document.getElementById('inputEmail4').value;
var telephone = document.getElementById('inputtel4').value;
var Gender = document.getElementsByName('gender');
for(i=0; i<Gender.length; i++ ) {

if(Gender[i].checked){
   var Gender = Gender[i].value;
}
}
var inputAdress = document.getElementById('inputAddress').value;
var country = document.getElementById('country').value;
var state = document.getElementById('state').value;
var city = document.getElementById('city').value;
var pin = document.getElementById('pin').value;
// var file = document.getElementById('file').value;
var qualifications = document.getElementById('qualifications').value;
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
var date = document.getElementById('inputdate4').value;
var inputdate4 = formatchange(date);
function formatchange(dob){
    const array=dob.split("-"); 
    let day=array[0];
    let month=array[1];
    let year=array[2];  

    let dateformat=day + "-" + month + "-" + year;
    return dateformat;
}
     
   fetch("http://localhost:5001/api/employees",{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify({
    
        salutation:salutation,
        firstName:firstName,
        lastName:secondName,
        email:email,
        phone:telephone,
        dob:inputdate4,
        gender:Gender,
        adress: inputAdress,
        country:country,
        state:state,
        city:city,
        pin:pin,
        qualifications:qualifications,
        username:username,
        password:password
     }
    )
   })
   .then(res=>res.json())
   .then((employ)=>{console.log(employ)
    ref();
  })
  

   .catch(error => {
    console.error('Error:', error);})
})
}
  
 
  
function viewPage(id){
    window.location.href = `http://127.0.0.1:5500/show.html?id=${id}`;
   
}
//===========edit user ===============================================================

function editDetails(id){
    console.log(id);
 

    fetch(`http://localhost:5001/api/employees/${id}`,{
        method:'get'
    })
    .then((res)=>res.json())
    .then((employ)=>{console.log(employ)
        
    document.getElementById("edit-salu").value = employ.salutation;
    document.getElementById("edit-first").value = employ.firstName;
    document.getElementById("edit-second").value = employ.lastName;
    document.getElementById("edit-email").value = employ.email;
    document.getElementById("edit-phone").value = employ.phone;
    document.getElementById("edit-date").value = employ.dob;
    document.getElementById("edit-quali").value = employ.qualifications;
    document.getElementById("edit-country").value = employ.country;
    document.getElementById("edit-state").value = employ.state;
    document.getElementById("edit-city").value = employ.city;
    document.getElementsByName("flexRadioDefault").value = employ.gender;
    document.getElementById("edit-adress").value = employ.adress;  
    document.getElementById("edit-pin").value = employ.pin;  
    document.getElementById("edit-username").value = employ.pin;  
    document.getElementById("edit-password").value = employ.pin;  
})
const formUpdation = document.getElementById('edit-form');
formUpdation.addEventListener('submit',(e)=>{

    e.preventDefault(); 
    // console.log(formUpdation);
    
    let formupd = {
        salutation:document.getElementById('edit-salu').value,
        firstName:document.getElementById('edit-first').value, 
        lastName:document.getElementById('edit-second').value, 
        email:document.getElementById('edit-email').value, 
        phone:document.getElementById('edit-phone').value, 
        dob:formattedDate,
        gender:document.getElementsByName('flexRadioDefault').value, 
        adress :document.getElementById('edit-adress').value, 
        country:document.getElementById('edit-country').value, 
        city:document.getElementById('edit-city').value, 
        state:document.getElementById('edit-state').value,
        qualifications:document.getElementById('edit-quali').value,
        pin:document.getElementById('edit-pin').value,
        username:document.getElementById('edit-username').value,
        password:document.getElementById('edit-password').value
        
    }
   
    fetch(`http://localhost:5001/api/employees/${id}`,{
        method:"PUT",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(formupd),
    }
)
.then((res)=>res.json())
.then(employ => {console.log(employ);})
ref(); 


})
}

// editDetails(id);
