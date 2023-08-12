function remove(){
    document.getElementById("confirm-delete").style.visibility = "hidden";
  }
  function alertz(){
    document.getElementById("zero").style.visibility = "hidden";
  }
  function alertvisible(){
    document.getElementById("zero").style.visibility = "visible";
  } 
  
 function ref(){
let employee = document.getElementById('table-back');
let output = "";
let count = 1;

fetch("http://localhost:5001/api/employees")
.then((res) => res.json())
.then((employ) =>{ console.log(employ);

    employ.forEach(post=>{

// for(i=0;i<employ.length;i++){

    // const post = employ[i];
     var id = post._id;
    //  console.log(id);
     output+=`
     <tr>
    <td scope="row">${count}</th>
        <td class="zero">
            <div class="pic-setter">
                
            </div>
            ${post.salutation + " "+post.firstName + " "+post.lastName}
        </td>
    <td>${post.email}</td>
    <td>${post.phone}</td>
    <td>${post.gender}</td>
    <td>${post.dob}</td>
    <td>${post.country}</td>
    
    <td class="dropdown" class= dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fa-solid fa-ellipsis"></i>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="http://127.0.0.1:5501/view.html?id=${id}"><i class="fa fa-sharp fa-light fa-eye" id="buttonDropdown_action" ></i>view</a></li>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1"><i class="fa fa-sharp fa-light fa-pen" id="buttonDropdown_action"></i>edit</button>
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


