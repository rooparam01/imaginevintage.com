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


//Adding Items to Cart

 
  let itemData = document.getElementsByClassName("item-data");
  
  let data = JSON.parse(localStorage.getItem("dsw-cart"))||[];

  let emptyCart = document.getElementById("cart");
  let totalItems = document.getElementById("item-count");
  totalItems.innerHTML = data.length;
  if(data === null){
    emptyCart.style.display = "block";
    cardCont.style.display = "none";
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
      // imgdiv.style.border = "1px dashed black"

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
      
console.log(itemRemove)
      itemRemove.forEach((element,i)=>{
        element.addEventListener("click",()=>{
          console.log("roopa ram")
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
      
    
      shipping.append(incQuan,remove,decQuan)
      divcontent.append(title,desc,price,cate,size,quan);
      imgdiv.append(image);
      carddiv.append(imgdiv,divcontent,shipping);
      
      cardCont.append(carddiv);
    })
  }



  



//   cartpagedatamain = document.getElementById("cartpagedatamain");
// imageofcart = document.getElementById("imageofcart");
// detailofcartpoducts = document.getElementById("detailofcartpoducts");
// let cartLength = document.getElementById("home__cartLength");

// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// let itemscount = document.getElementById("totalitemcount");

// cartLength.innerText = cart.length;
// itemscount.innerText = cart.length;

// displayandShow(cart);

// function displayandShow(cart) {
//   itemscount.innerText = cart.length;
//   cartLength.innerText = cart.length;
//   cartpagedatamain.innerHTML = "";
//   let totalprice = document.getElementById("total-price");
  
//   cart.forEach((ele) => {
//     let cardMainCont = document.createElement("div");
//     cardMainCont.classList = "cart__singleProductCard"; //give display flex

//     let imageCont = document.createElement("div");

//     let img = document.createElement("img");
//     img.src = ele.image;

//     let qtyBtnsCont = document.createElement("div");
//     qtyBtnsCont.id = "cart__qtyBtnsCont";

//     let increasequantity = document.createElement("button");
//     increasequantity.classList = "button";
//     increasequantity.innerText = "+";

//     let quantity = document.createElement("span1");
//     quantity.innerText = "Qty: " + Number(ele.qty);

//     let decreasequantity = document.createElement("button");
//     decreasequantity.classList = "button";
//     decreasequantity.innerText = "-";

//     increasequantity.addEventListener("click", () => {
//       itemscount.innerText = ele.qty++;
//       localStorage.setItem("cart", JSON.stringify(cart));
//       console.log(ele);
//       cart = JSON.parse(localStorage.getItem("cart"));
//       displayandShow(cart);

//       // window.location.reload()
//     });
//     decreasequantity.addEventListener("click", (e) => {
//       // e.preventDefault();
//       console.log("clicked");
//       if (ele.qty > 1) {
//         itemscount.innerText = ele.qty--;

//         localStorage.setItem("cart", JSON.stringify(cart));
//         cart = JSON.parse(localStorage.getItem("cart"));
//         displayandShow(cart);
//         // window.location.reload()
//       }
//     });

//     qtyBtnsCont.append(increasequantity, quantity, decreasequantity);

//     imageCont.append(img, qtyBtnsCont);

//     let productDetailsCont = document.createElement("div");
//     productDetailsCont.id = "cart__productDetailsCont";

//     let tiltle = document.createElement("h1");
//     tiltle.innerText = ele.title;

//     let description = document.createElement("p");
//     description.innerText = ele.description;

//     let rating = document.createElement("p");
//     rating.classList = "p1";
//     rating.innerText = "Rating " + ele.rating;

//     let price = document.createElement("h1");
//     price.innerText = "INR " + ele.price;

//     let remove = document.createElement("button");
//     remove.classList = "span";
//     remove.innerText = "REMOVE";

    // remove.addEventListener("click", (e) => {
    //    let filteredCart = cart.filter((element, i) => {
    //     return ele.id != element.id;
    //    });

    //   localStorage.setItem("cart", JSON.stringify(filteredCart));       cart = JSON.parse(localStorage.getItem("cart"));
    //    cartLength.innerText = cart.length;
    //    itemscount.innerText = cart.length;
    //    displayandShow(filteredCart);
    //  });
//     productDetailsCont.append(tiltle, description, rating, price, remove);
//     cardMainCont.append(imageCont, productDetailsCont);
//     cartpagedatamain.append(cardMainCont);

//     // imageofcart.append(img,increasequantity,quantity,decreasequantity)
//     //     detailofcartpoducts.append(tiltle,description,rating,price,remove)
//     //     cartpagedatamain.append(imageofcart,detailofcartpoducts)
//   });

//   let totalpricesum = 0;
//   for (let i = 0; i < cart.length; i++) {
//     totalpricesum += cart[i].price * cart[i].qty;
//   }
//   totalprice.textContent = "₹ " + totalpricesum;
// }
  


  


  
  
  


