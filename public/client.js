
let currentDishList = new Array();

let placeId = 7;

let orderPrice = 0;

const searchParams = new URLSearchParams(window.location.search);

if(searchParams.has('placeId'))
  placeId = searchParams.get('placeId');


async function loadStripe() {

  document.querySelector("#navbarToggle").click();

  // Load the publishable key from the server. The publishable key
  // is set in your .env file.
  const {publishableKey} = await fetch('/config').then((r) => r.json());
  if (!publishableKey) {
    addMessage(
      'No publishable key returned from the server. Please check `.env` and try again'
    );
    alert('Please set your Stripe publishable API key in the .env file');
  }

  const stripe = Stripe(publishableKey, {
    apiVersion: '2020-08-27',
  });
    
          
  let dishList = "";

  for(let dishID of currentDishList){

    dishList += `,${dishID}`;
  } 
  
  if(dishList){
    dishList = dishList.substring(1);
  }

  const {
    error: backendError,
    clientSecret
  } = await fetch(`/create-payment-intent?dishList=${dishList}`).then(r => r.json());
  if (backendError) {
    // addMessage(backendError.message);
  }

  // Initialize Stripe Elements with the PaymentIntent's clientSecret,
  // then mount the payment element.
  const loader = 'auto'
  const elements = stripe.elements({ clientSecret, loader });
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');
  // Create and mount the linkAuthentication Element to enable autofilling customer payment details
  const linkAuthenticationElement = elements.create("linkAuthentication");
  linkAuthenticationElement.mount("#link-authentication-element");

  

  // When the form is submitted...
  const form = document.getElementById('payment-form');
  let submitted = false;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable double submission of the form
    if(submitted) { return; }
    submitted = true;
    form.querySelector('button').disabled = true;

    const nameInput = document.querySelector('#name');

    // Confirm the payment given the clientSecret
    // from the payment intent that was just created on
    // the server.
    const {error: stripeError} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/return.html`,
      }
    });

    if (stripeError) {

      // reenable the form.
      submitted = false;
      
      form.querySelector('button').disabled = false;

      return;
    }
    
  });
  
}

const navbarToggle = document.getElementById("navbarToggle");
  
const orderMenu = document.getElementById("orderMenu");

navbarToggle.addEventListener("click", () => {
  orderMenu.classList.toggle("active");
});

async function processCheckout(){
              
  let dishList = "";

  for(let dishID of currentDishList){

    dishList += `,${dishID}`;
  } 
  
  if(dishList){
    dishList = dishList.substring(1);
  }

  const data = JSON.stringify({"Email" : "you@server.com", "placeId" : placeId} );
      
  try {
    const response = await fetch(`/api/orders/create?dishList=${dishList}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    });
    
  } catch (e) {
    console.error(e);
  }

  currentDishList = new Array();

  await updateBasketList();

}


function clearList(target) {
        
  const root = document.getElementById(target);

  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }
}

async function loadDishes(){
  
  clearList("dishesList");
  
  await fetch("http://localhost:3000/api/dishes/")
  .then((response) => response.json())
  .then((json) => {
    json.data.forEach((item) => {   
      placeDishItem(item.id, item.Image, item.Name, item.Description, item.Price);
    });
  })
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });

}


async function placeDishItem(DishID, Image, Name, Description, Price){
  
  const template = document.querySelector("#dishCard-template").content.cloneNode(true);

  template.querySelector("#dishImg").src=Image;

  template.querySelector("#dishName").innerText=Name;

  template.querySelector("#dishDescription").innerText=Description;

  template.querySelector("#dishPrice").innerText=Price;  
    
  template.querySelector("#addDishBtn").setAttribute("onclick", `addDish('${DishID}')`); 
  
  document.querySelector("#dishesList").appendChild(template);
}

async function addDish(DishID){

  currentDishList.push(DishID);

  await updateBasketList();

}

async function updateBasketList(){

  clearList('orderList');

  orderPrice = 0;

  if(currentDishList.length == 0)
  {
    document.querySelector("#orderCount").innerHTML = "";
    document.querySelector("#orderPrice").innerHTML = "0";  
    document.querySelector("#checkoutBtn").disabled = true;
    document.querySelector("#orderCount").style.display = 'none';
    
  }
  else{
    document.querySelector("#orderCount").style.display = 'block';
    document.querySelector("#orderCount").innerHTML = currentDishList.length;

    currentDishList.forEach(async(DishID, index) =>{

      await fetch(`http://localhost:3000/api/dishes/${DishID}`)
      .then((response) => response.json())
      .then((json) => {
        json.data.forEach((item) => {   
          placeOrderItem(index, item.Image, item.Name, item.Price);

          orderPrice += parseFloat(item.Price)
          
    
          if(orderPrice > 0){
            document.querySelector("#orderPrice").innerHTML = orderPrice;
        
            document.getElementById("checkoutBtn").disabled = false;
          }
        });
      })
      .catch((response) => {      
        alert(`Response status = ${response.status}, message ${response.statusText}`);
      });


    });
  }  
}


async function placeOrderItem(index, Image, Name, Price){
  
  const template = document.querySelector("#orderCard-template").content.cloneNode(true);

  template.querySelector("#overImg").src=Image;

  template.querySelector("#overName").innerText=Name;

  template.querySelector("#overPrice").innerText=Price;  
    
  template.querySelector("#deleteOrderBtn").setAttribute("onclick", `removeOrder('${index}')`); 
  
  document.querySelector("#orderList").appendChild(template);
}

async function removeOrder (index) {

  currentDishList.splice(index, 1);
  
  await updateBasketList();
  
}
loadDishes();