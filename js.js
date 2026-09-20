let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

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

 
        for(let y = 0; y < count.value; y++){
            
        dataPro.push(newPro);
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
<td> <button id="update">UPDATE</button></td>
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