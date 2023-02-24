//api url-->
let api="https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products";

//products div element-->
let cardDiv=document.getElementById("card-items");

//LS and fetching data part-->
let products=JSON.parse(localStorage.getItem("dsw-product"))||[];
if(products.length<20){
  fetchData(api);
}

async function fetchData(url) {
    try {
        let res= await fetch(url);
        let arr=await res.json();
        // console.log(arr.data);
        //products=arr.data;
        localStorage.setItem("dsw-product",JSON.stringify(arr.data));
    } catch (error) {
        console.log(error);
    }
}

//only men's products-->
let mens=products.filter((el)=>{
  return el.category==='men'
});
console.log(mens);

display(mens);

function display(arr) {
    cardDiv.innerHTML="";
    let item=
    `<div id="cards">
       ${arr.map((el) => 
        createCard(
            el.image,
            el.title,
            el.category,
            el.brand,
            el.price)).join('')}        
    </div>`;
    
    cardDiv.innerHTML=item;
}
 
function createCard(image,title,category,brand,price) {
    let card=
    `<div class="card">
        <img src="${image}" alt="error">
        <h4>${title}</h4>
        <p>${category}</p>
        <p>${brand}</p>
        <p><b>$${price}</b></p>
        <button class="addBtn">Add To Cart</button>
    </div>`
    
    return card;
}

//adding product into cart functionality-->
let cartLS=JSON.parse(localStorage.getItem("dsw-cart"))||[];

let addBtnArr=document.querySelectorAll(".addBtn");

for(let i=0;i<addBtnArr.length;i++){
    addBtnArr[i].addEventListener("click",()=>{
        console.log(products[i]);
        if(checkDuplicate(products[i])){
            alert("Product already added");
        }else{
            cartLS.push({...products[i],quantity:1});
            localStorage.setItem("dsw-cart",JSON.stringify(cartLS));
            alert("Product Added into the cart");
        }
    })
}

//checking duplicate products
function checkDuplicate(el) {
    for(let i=0;i<cartLS.length;i++){
        if(cartLS[i].id===el.id){
            return true;
        }
    }
    return false;
}

//filter and sorting product functionalities part-->
//Using select tag-->
let sortSelect=document.getElementById("sort");

sortSelect.addEventListener("change",()=>{
    let sortData=mens.sort((a,b)=>{
       if(sortSelect.value==="Price Low To High"){
        return a.price-b.price;
       }else if(sortSelect.value==="Price High To Low"){
        return b.price-a.price;
       }
    });
    display(sortData);
});

//checkbox tags-->
let checkboxArr=document.querySelectorAll('.check');  //<---checkbox variable array

let brandArr=[];
let filterByBrand=[];
for(let i=0;i<checkboxArr.length;i++){
    
    checkboxArr[i].addEventListener("click",()=>{
        
        if(checkboxArr[i].checked==true){
            //console.log(checkboxArr[i].value,"checked");
            
            brandArr.push(checkboxArr[i].value);
            
            //console.log(brandArr);
        }else{
            //console.log(checkboxArr[i].value,"unchecked");
            brandArr=brandArr.filter((el)=>{
                return el != checkboxArr[i].value;
            })
            //console.log(brandArr);
        }

        filterByBrand=mens.filter((element)=> brandArr.includes(element.brand));    
        
        //console.log('filterdata',filterByBrand);    

        display(filterByBrand);
    });
}

//radio buttons tags-->
let filterPrice=document.getElementsByName("price-radio");


for(let i=0;i<filterPrice.length;i++){
    filterPrice[i].addEventListener("click",()=>{
       if(filterByBrand.length==0){
        //console.log('empty')
        let filteredData=mens.filter((el)=>{
            if(filterPrice[i].value==="lte-1000"){
              return el.price<=1000;
            }else if(filterPrice[i].value==="lte-2000"){
              return el.price<=2000;
            }else if(filterPrice[i].value==="lte-3000"){
              return el.price<=3000;
            }else if(filterPrice[i].value==="lte-4000"){
              return el.price<=4000;
            }else{
              return el.price;
            }
         })
         display(filteredData);
       }else{
        //console.log('not empty');
        let filteredData=filterByBrand.filter((el)=>{
            if(filterPrice[i].value==="lte-1000"){
              return el.price<=1000;
            }else if(filterPrice[i].value==="lte-2000"){
              return el.price<=2000;
            }else if(filterPrice[i].value==="lte-3000"){
              return el.price<=3000;
            }else if(filterPrice[i].value==="lte-4000"){
              return el.price<=4000;
            }else{
              return el.price;
            }
         })
         display(filteredData);
       }
    })
}

