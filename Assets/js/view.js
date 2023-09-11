

function remove(){ 
    document.getElementById("confirm-delete").style.visibility = "hidden";
  }

  function viewPage(id){
    window.location.href = `http://127.0.0.1:5500/show.html?id=${id}`;
   
}
 
 function ref(){
let employee = document.getElementById('table-back');
let count = 1;
let output="";

fetch("http://localhost:5500/api/employees")
.then((res) => res.json())
.then((employ) =>{ console.log(employ); 
// const path = image.path
    employ.forEach(row=>{
     var id = row._id;
    output +=`
     <tr class ="pro">
    <td scope="row">${count}</th>
        <td class="zero">
        <div class="pic-setter">
        <img src="${row.image && row.image.path}" alt="">
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

 


    })
    employee.innerHTML=output;
    
    //============================== pagination starts here ========================
    let tag = document.getElementsByClassName('pro'); 
    let pageNum = document.getElementById('pagination-num');
    let display = 4// it decide how many row should appear in a page.
    let flag = 1;
    let buttonCount = Math.ceil(tag.length/display)//to round up the figure.
    console.log(buttonCount);

pageNum.innerHTML="";
    
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
        let display = 4;
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
            console.log(this.innerHTML)
           document.getElementById('next-button').setAttribute('disabled',true);
           document.getElementById('prev-button').removeAttribute('disabled');
        }
        else if(this.innerHTML==1){
            console.log(this.innerHTML)
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
      if(flag === 1){
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


ref();
async function deletion(id){  
    document.getElementById('confirm-delete').style.visibility = "visible";
    var del=document.getElementById("del")
    del.addEventListener('click', ()=>{
    fetch(`http://localhost:5500/api/employees/${id}`,{
        method:'DELETE'

      });
   
      ref();
      document.getElementById('confirm-delete').style.visibility = "hidden";
    }
  
    )
    }


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
    // var image = document.getElementById('file').value;
    // console.log(image )
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
    var imageInput = document.getElementById('file');
    console.log(imageInput.value);

        var imageFile = imageInput.files[0];

        if (!imageFile) {
            alert('Please select an image to upload.');
            return;
        }
        var formData = new FormData();
        formData.append('image', imageFile);
 
formData.append('salutation', salutation);
formData.append('firstName', firstName);
formData.append('lastName', secondName);
formData.append('email', email);
formData.append('phone', telephone);
formData.append('gender', Gender); // Use the 'gender' variable you defined
formData.append('adress', inputAdress);
formData.append('country', country);
formData.append('state', state);
formData.append('city', city);
formData.append('pin', pin);
formData.append('qualifications', qualifications);
formData.append('username', username);
formData.append('password', password);
formData.append('dob', inputdate4);
      
         
       fetch("http://localhost:5500/api/employees",{
        method:'POST',
        headers:{
            // 'content-type':'application/json'
        },
        
        body:formData
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
   const imageView = document.getElementById("img-edit"); 
   imageView.src = '';
   imageView.src = employ.image.path;
   
    console.log(employ.image.path);

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
         image:document.getElementById('change').value

        
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
 


  

