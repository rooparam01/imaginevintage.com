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
        console.log(arr.data);
        //products=arr.data;
        localStorage.setItem("dsw-product",JSON.stringify(arr.data));
    } catch (error) {
        console.log(error);
    }
}



display(products);

function display(arr) {
    
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

//adding product into cart functionality
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


function checkDuplicate(el) {
    for(let i=0;i<cartLS.length;i++){
        if(cartLS[i].id===el.id){
            return true;
        }
    }
    return false;
}
