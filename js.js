let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
 let tmp;
let searchMood;

function getTotal() {
    
if(price.value !=""){

let result = (+price.value + +taxes.value + +ads.value) -  +discount.value;

total.style.background = "#040";
total.innerHTML = result;
    }
    else{

    total.innerHTML ="";

    total.style.background = "#3e0000";

    }
}

let dataPro;

if(localStorage.getItem("product") != null){

dataPro = JSON.parse(localStorage.getItem("product"));
}
else{

 dataPro = [];
}


 submit.onclick = function(){

    let newPro ={
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,

    }

    if(title.value !="" && price.value !="" &&  category.value !=""){

 
      if( mood === "create"){

          for(let y = 0; y < count.value; y++){

        dataPro.push(newPro);     
         }

     } else{
     
        dataPro[tmp] = newPro ;

            mood ="create";
            submit.innerHTML="create";
            count.style.display = "block";

     }







        clearData();

        localStorage.setItem("product" , JSON.stringify(dataPro));

        showData();

    }
 }

function clearData(){

title.value = '';
price.value ='';
 taxes.value ='';
 ads.value = '';
 discount.value = '';
 total.innerHTML = '';
count.value = '';
category.value ='';

}


function showData(){

let table ="";

for(let x = 0; x < dataPro.length; x++){

 table += `
 
 <tr>

<td>${x + 1}</td>
<td>${dataPro[x].title}</td>
<td>${dataPro[x].price}</td>
<td>${dataPro[x].taxes}</td>
<td>${dataPro[x].ads}</td>
<td>${dataPro[x].discount}</td>
<td>${dataPro[x].total}</td>
<td>${dataPro[x].category}</td>
<td> <button onclick ="updateData(${x})" id="update">UPDATE</button></td>
<td><button onclick = "deleteData (${x}) "id="delete">DELETE</button></td>

 </tr>

 
 `
}

document.getElementById("tbody").innerHTML = table ;

document.getElementById("countProduct").innerHTML = dataPro.length;

let btnDelete = document.getElementById("deleteAll");


if(dataPro.length > 0 ){

btnDelete.style.display = "block";

}else{
    btnDelete.style.display = "none";

}


}  showData();


function deleteData(i){

dataPro.splice(i, 1);

localStorage.setItem("product" , JSON.stringify(dataPro));

 

showData();
}


function deleteAll(){

dataPro.splice(0, dataPro.length);
localStorage.setItem("product" , JSON.stringify(dataPro));
 
 showData();

}


 
function updateData(x){

title.value = dataPro[x].title;
price.value = dataPro[x].price;
taxes.value = dataPro[x].taxes;
ads.value = dataPro[x].ads;
discount.value = dataPro[x].discount;
getTotal();
count.style.display ="none"
category.value = dataPro[x].category;

submit.innerHTML = "UPDATE";

mood = "update";

tmp = x;

scroll({
 top : 0,

 behavior : "smooth",


})


 
}


function gitSearchMood(id){

    let search = document.getElementById("search")

 if(id.id === "searchTitle"){

searchMood = "title";

search.placeholder = "search by title"

 }else{

    searchMood = "category";

    search.placeholder = "search by category"

 }

 search.value ="";

 search.focus();

 showData();


}

function searchData (value) {

    let table = "";

if(searchMood == "title"){

    for(let y = 0; y < dataPro.length; y++){

if(dataPro[y].title.includes(value)){

 
 table += `
 
 <tr>

<td>${y + 1}</td>
<td>${dataPro[y].title}</td>
<td>${dataPro[y].price}</td>
<td>${dataPro[y].taxes}</td>
<td>${dataPro[y].ads}</td>
<td>${dataPro[y].discount}</td>
<td>${dataPro[y].total}</td>
<td>${dataPro[y].category}</td>
<td> <button onclick ="updateData(${y})" id="update">UPDATE</button></td>
<td><button onclick = "deleteData (${y}) "id="delete">DELETE</button></td>

 </tr>

 `
}

    }

}else{

 for(let y = 0; y < dataPro.length; y++){

if(dataPro[y].category.includes(value)){

 table += `
 
 <tr>

<td>${y + 1}</td>
<td>${dataPro[y].title}</td>
<td>${dataPro[y].price}</td>
<td>${dataPro[y].taxes}</td>
<td>${dataPro[y].ads}</td>
<td>${dataPro[y].discount}</td>
<td>${dataPro[y].total}</td>
<td>${dataPro[y].category}</td>
<td> <button onclick ="updateData(${y})" id="update">UPDATE</button></td>
<td><button onclick = "deleteData (${y}) "id="delete">DELETE</button></td>

 </tr>

 `
}

    }



}

document.getElementById("tbody").innerHTML = table;
    
}