function remove(){
    document.getElementById("confirm-delete").style.visibility = "hidden";
  }
 
 function ref(){
let employee = document.getElementById('table-back');
let count = 1;
let output="";

fetch("http://localhost:5500/api/employees")
.then((res) => res.json())
.then((employ) =>{ console.log(employ);

    employ.forEach(row=>{
     var id = row._id;
    output +=`
     <tr class ="pro">
    <td scope="row">${count}</th>
        <td class="zero">
            <div class="pic-setter">
            <img src="${row.image._id}">
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
   
count++;
console.log(row.image.path)


    })
    employee.innerHTML=output;
    
    //============================== pagination starts here ========================
let tag = document.getElementsByClassName('pro');
let pageNum = document.getElementById('pagination-num');
let display = 5// it decide how many row should appear in a page.
let flag = 1;
let buttonCount = Math.ceil(tag.length/display)//to round up the figure.
console.log(buttonCount);

// for creating the button dynamically.
for (let i=1; i<=buttonCount;i++){
    let button = document.createElement('button');
    button.innerHTML=i;
    pageNum.appendChild(button);
}

document.getElementById('prev-button').addEventListener('click',prev);
document.getElementById('next-button').addEventListener('click',next);

document.getElementById('prev-button').setAttribute('disabled',true)

function main(pageNum) {
    let tag = document.getElementsByClassName('pro');
    let display = 5;
    let nextPage = display * pageNum;
    let prevPage = display * (pageNum - 1);
    
    for (let i = 0; i < tag.length; i++) {
      tag[i].style.display = "none";
      if(i< nextPage && i>= prevPage){
       tag[i].style.display = "table-row";
      }
    }
  }
  
  main(1);

  var buttonNumbers = pageNum.getElementsByTagName('button');
  for(let i=0; i<buttonNumbers.length; i++){
    buttonNumbers[i].addEventListener('click',buttonClick)
  }
//   buttonNumbers.classList.add('active');
  function buttonClick(){
    if(this.innerHTML==buttonCount){
       document.getElementById('next-button').setAttribute('disabled',true);
       document.getElementById('prev-button').removeAttribute('disabled');
    }
    else if(this.innerHTML==1){
        document.getElementById('next-button').removeAttribute('disabled');
        document.getElementById('prev-button').setAttribute('disabled',true);
     }
     else{
        document.getElementById('next-button').removeAttribute('disabled');
        document.getElementById('prev-button').removeAttribute('disabled');
     }
     flag = this.innerHTML;
     main(flag);
  }

  function prev(){
    console.log(flag)
  document.getElementById('next-button').removeAttribute('disabled');
  if(flag !==1){
    flag --;
  }
  if(count === 1){
    document.getElementById('prev-button').setAttribute('disabled',true);
  }
  main(flag);
  }


  function next(){
    console.log(flag)
    document.getElementById('prev-button').removeAttribute('disabled');
    if(flag !== buttonCount){
        flag++
        
    }
    if(flag==buttonCount){
        document.getElementById('next-button').setAttribute('disabled',true);
    }
    
    main(flag);
  }
  


//============================== pagination ends here ==========================
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
   const response =   fetch(`http://localhost:5500/api/employees/${id}`,{
        method:'DELETE'

      });
   
      ref();
      document.getElementById('confirm-delete').style.visibility = "hidden";
    }
  
    )
    }
    //function to add image
//    let imageInput = document.querySelector("#file");
//    imageInput.addEventListener("change",function(){
//     let reader = new FileReader();
   
//    reader.onload()=function (event) {
//     const imageUrl = event.target.result;
//     const imgElement = document.createElement('img');
//     imgElement.src = imageUrl;
//     imagePreview.innerHTML = '';
//     imagePreview.appendChild(imgElement);
// };
//     // reader.addEventListener("load",()=>{
//     //     imgUpd=reader.result;
//     //     document.querySelector(".pic-setter").style.backgroundImage = `url(${imgUpd})`
//     // });
//     reader.readAsDataURL(this.files[0]);
//    });


   // add new user===============================

    const addUser = document.getElementById('modal');;
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
      
         
       fetch("http://localhost:5500/api/employees",{
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


      
    
   
  
 
  

//===========edit user ===============================================================

function editDetails(id){
    console.log(id);
 

    fetch(`http://localhost:5500/api/employees/${id}`,{
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
    document.getElementById("edit-username").value = employ.username;  
    document.getElementById("edit-password").value = employ.password;  
    // document.getElementById("change").value = employ.image;  

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
        dob:document.getElementById('edit-date').value,  
        gender:document.getElementsByName('flexRadioDefault').value, 
        adress :document.getElementById('edit-adress').value, 
        country:document.getElementById('edit-country').value, 
        city:document.getElementById('edit-city').value, 
        state:document.getElementById('edit-state').value,
        qualifications:document.getElementById('edit-quali').value,
        pin:document.getElementById('edit-pin').value,
        username:document.getElementById('edit-username').value,
        password:document.getElementById('edit-password').value,
        // image:document.getElementById('change').value

        
    }
   
    fetch(`http://localhost:5500/api/employees/${id}`,{
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
//==================================================================================
//search bar
function search(){
    let input = document.getElementById('site-search').value;
    input = input.toLowerCase();
    let tag = document.getElementsByTagName('tr');

    for(i=0;i<tag.length;i++){
        if(!tag[i].innerHTML.toLowerCase().includes(input)){
            tag[i].style.display = "none";
        }
        else{
            tag[i].style.display = "table-row";
        }
    }
}

  

