function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
  
  // Get the dropdown container element
  const dropdownContainer = document.getElementById("dropdown-container");
  
  
  // Get all the buttons
  const buttons = document.querySelectorAll(".bt");
  
  // Added a click event listener to each button
  buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    // Show the dropdown container
    dropdownContainer.style.display = "flex";
    dropdownContainer.style.justifyContent = "space-evenly";
  
    // Prevent the document click event from hiding the dropdown
    event.stopPropagation();
  });
  });
  
  // Add a click event listener to the document
  window.addEventListener("click", () => {
  // Hide the dropdown container
  dropdownContainer.style.display = "none";
  });
  
  const renderMain = document.getElementById("logos")
  
  renderMain.addEventListener("click",()=>{
  location.href = "./index.html"
  
  })
  
  //First Link section
  
  const firstLink = document.getElementById("firstLink")
  const secondLink= document.getElementById("secondLink")
  
  firstLink.addEventListener("click",()=>{
    //Here below instead of hashTag give the first Link
    location.href = "#"
  })
  secondLink.addEventListener("click",()=>{
  
    //Here below instead of hashTag give the second Link
    location.href = "#"
  })



// ---------------- All Variables Of Event Listeners ------------>

 let bill = document.getElementById("bill");
  let itemData = document.getElementsByClassName("item-data");
  let subtotal = document.getElementById("subtotal");
  let tax = document.getElementById("tax");
  let totalOrder = document.getElementById("total-order");
  let promocodeless = document.getElementById("promoCode");
  let applybtn = document.getElementById("apply");
  let orderItem = document.getElementById("order-now");
  
  let data = JSON.parse(localStorage.getItem("dsw-cart"))||[];
  

  let emptyCart = document.getElementById("cart");
  let t_i = document.getElementById("total-i")
  let totalItems = document.getElementById("item-count");
  totalItems.innerHTML = data.length;
  t_i.innerHTML = data.length;
  if(data === null){
    emptyCart.style.display = "block";
    cardCont.style.display = "none";
    bill.style.display = "none";
  }
  
  let cardCont = document.getElementById("card-cont");
  displayCart(data);
  console.log(cardCont)
  


  function displayCart(data){
    cardCont.innerHTML = "";

    data.forEach((ele)=>{
        
      
      let carddiv = document.createElement("div");
      carddiv.classList="cartdiv";

      let imgdiv = document.createElement("div")
      imgdiv.style.height= "100%";
      imgdiv.style.width= "30%";

      let image=document.createElement("img")
      image.src=ele.image
      image.style.height = "100%";
      image.style.width = "100%";
      image.style.margin = "0px 0px";

      let divcontent=document.createElement("div");
      divcontent.style.margin = "10px 25px"

      let title=document.createElement("h5")
      title.textContent=ele.brand
      title.style.margin = "2px 0px"

      let desc=document.createElement("h5")
      desc.textContent=ele.title
      desc.style.margin = "2px 0px"

      let price=document.createElement("h5")
      price.textContent=`$ ${ele.price}`
      price.style.margin = "2px 0px"

      let cate=document.createElement("p")
      cate.textContent= `Category: ${ele.category}`;
      cate.style.margin = "15px 0px"
      cate.style.fontSize="15px"

      let size=document.createElement("p")
      size.textContent=`Size: ${ele.id}`;
      size.style.margin = "-15px 0px"
      size.style.fontSize="15px"

      let quan=document.createElement("p")
      quan.textContent=`Quantity: ${ele.quantity}`;
      quan.style.margin = "15px 0px"
      quan.style.fontSize="15px"

      let shipping = document.createElement("div");
      shipping.style.height="30px";
      shipping.style.width = "200px"
      shipping.style.margin= "15px 200px"
      shipping.style.display = "flex";
      shipping.style.justifyContent = "space-between"

      let incQuan = document.createElement("button");
      incQuan.innerText = "+";
      incQuan.style.fontSize = "15px"
      incQuan.style.width= "20%"
      incQuan.addEventListener("click",()=>{
         ele.quantity++
         quan.textContent = `Quantity:${ele.quantity}`
          


      })
       

      let decQuan = document.createElement("button");
      decQuan.innerText = "-";
      decQuan.style.fontSize = "15px"
      decQuan.style.width= "20%"
      decQuan.addEventListener("click",()=>{
         
         if(ele.quantity>1){
          ele.quantity--
          quan.textContent = `Quantity:${ele.quantity}`
         }

      })
      

      let remove = document.createElement("button");
      remove.classList = "removeItem";
      let itemRemove = document.querySelectorAll(".removeItem")

      remove.innerText = "remove";
      remove.style.fontSize = "15px"
      remove.style.width= "50%"
      
         
      itemRemove.forEach((element,i)=>{
        element.addEventListener("click",()=>{
          if(data.length===1){
            localStorage.setItem("dsw-cart",(""))
          window.location.reload()
          }else{
            let removeData = data.filter((element,j)=>{

              return i!=j;
            })
            displayCart(removeData)
            localStorage.setItem("dsw-cart",JSON.stringify(removeData))
            window.location.reload()
          }
        })
      })
      
    // ----------------> All Appends ---------------------->
      shipping.append(incQuan,remove,decQuan)
      divcontent.append(title,desc,price,cate,size,quan);
      imgdiv.append(image);
      carddiv.append(imgdiv,divcontent,shipping);
      
      cardCont.append(carddiv);

    })

    // ----------------> Total Calculation Of Cart ---------------------->
    var sum = 0;
    data.forEach((el)=>{
      sum+=el.price*t_i.textContent;
    })
    subtotal.textContent = `$${sum}`
    totalOrder.textContent = `$${sum}`
  }


  // -------------> Promo Code Apply function --------------->

  applybtn.addEventListener("click",()=>{
    let code = "luckyless"
    if(promocodeless.value==code){
      totalOrder.textContent -=100;
    }
  })


  // ----------------------------> Order Data Function (Order Placed Function) ------------->

  orderItem.addEventListener("click",()=>{
    let user = localStorage.getItem("userAuthenticationName");

    if(user){

    let name = user;
    let ordernumber = Math.trunc(Math.random()*99999);
    let txnid = Math.trunc(Math.random()*99999999);
    let status = "delivered";
    let amount = totalOrder.textContent;
    let items = t_i.textContent;


      let obj = {
            "name" : name,
            "ordernumber" : ordernumber,
            "txnid" : txnid,
            "status" : status,
            "amount" : amount,
            "items" :  items,
      }

      let orderdata = JSON.parse(localStorage.getItem("placedorders")) || [];
      orderdata.push(obj);
      alert("Order Placed Succesfully");
      localStorage.setItem("dsw-cart") = "";
    }
    else{
      alert("You need to login first")
    }

  })
