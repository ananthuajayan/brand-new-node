let employee = document.getElementById('table-back');
let output = "";
let count = 1;

fetch("http://localhost:5001/api/employees")
.then((res) => res.json())
.then((employ) =>{ console.log(employ);

    employ.forEach(post=>{
     var id = post.id;
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
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
    </div>
    </td>
   
    </tr>
     `
     employee.innerHTML = output;
count++;
    })

})


