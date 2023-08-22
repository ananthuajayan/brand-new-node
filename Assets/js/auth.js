
var register = document.getElementById('registration-form');
register.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert("mnfc");
    

     var username =  document.getElementById('username').value;
     var email =  document.getElementById('useremail').value;
     var password =  document.getElementById('userpass').value;
     console.log(username,email,password);

     fetch('http://localhost:5500/api/users/register',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            username:username,
            email:email,
            password:password
        })

     })
     .then(res=>res.json())
     .then((employ)=>{console.log(employ);})

})