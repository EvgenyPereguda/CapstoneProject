function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}



function clearList(target) {
        
  const root = document.getElementById(target);

  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }
}


async function loadTables(){
  
  clearList("tablesList");
  
  await fetch("http://localhost:3000/api/tables/")
  .then((response) => response.json())
  .then((json) => {
    json.data.forEach((item) => {   
      placeTableItem(item.id, item.Number);
    });
  })
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });

  
  

}


async function placeTableItem(PlaceID, Number) {

  var customers = [];

  // build the index

  await fetch(`http://localhost:3000/api/tables/${PlaceID}?orders`)
  .then((response) => response.json())
  .then((json) => {     
      for (var x of json.data) {
        customers.push(x);
    }
  })
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });

  const template = document.querySelector("#tableItem-template").content.cloneNode(true);

  template.querySelector("#tableNumber").innerText += " " + Number;

  let lcount = 12;

  const root = template.querySelector("#customerList");

  while (root.firstChild) {
    root.removeChild(root.lastChild);
  }

  for (let index = 0; index < lcount; index++) {       

    
      var button = document.createElement("DIV");
      button.setAttribute("class", "button buttonRound");

      if(customers.length > index ){
        const customerTemplate = document.querySelector("#customer-template").content.cloneNode(true);
        button.appendChild(customerTemplate);; 
      }
      else{
        const addCustomerTemplate = document.querySelector("#addCustomer-template").content.cloneNode(true);
        button.appendChild(addCustomerTemplate);
      }     

      
      template.querySelector("#customerList").appendChild(button);
    
  }
  
  template.querySelector("#deleteBtn").setAttribute("onclick", `showDeleteTableForm('${PlaceID}')`); 
  
  template.querySelector("#editBtn").setAttribute("onclick", `showEditTableForm('${PlaceID}')`); 
 
  document.querySelector("#tablesList").appendChild(template);

}


async function addSelectDish(CustomerID, PlaceID) {
  
  
  let dishesSelect = document.querySelector("#dishesSelect");

  if(dishesSelect.value == "")
    return;

  let order = {"DishID":`${dishesSelect.value}`, "PlaceID":`${PlaceID}`, "CustomerID":`${CustomerID}`};

  const data = JSON.stringify(order);
  
  try {
    const response = await fetch("/api/orders/create", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }

  loadOrders(); 
  
  loadCustomerOrders(CustomerID);
}

async function loadCustomerOrders(CustomerID) {
  
  clearList("customerOrdersList");
  
  await fetch("http://localhost:3000/api/orders")
  .then((response) => response.json())
  .then((json) => {
    json.data.forEach((item) => {  

      if(item.CustomerID == CustomerID){
        loadCustomerOrder(item.DishPlaceID);  
      }


    });
  })
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });  

}

async function loadCustomerOrder(DishPlaceID) {

  
  await fetch(`http://localhost:3000/api/orders/${DishPlaceID}?join`)
  .then((response) => response.json())
  .then((json) => {
    json.data.forEach((item) => {   

          addCustomOrder(item.Image, item.Name);
        });
      })
      .catch((response) => {      
        alert(`Response status = ${response.status}, message ${response.statusText}`);
      });
  
}

async function addCustomOrder(Image, Name) {  
          let customerOrdersList = document.querySelector("#customerOrdersList");

          const template = document.querySelector("#customerOrderCard-template").content.cloneNode(true);

          template.querySelector("#orderDishImage").src = Image;

          template.querySelector("#orderDishName").innerText = Name;

          customerOrdersList.appendChild(template);
}

async function showEditCustomerMainFormDialog(CustomerID) {

  document.querySelector("#dialog1").close();



  let customer = {};
  
  await fetch(`http://localhost:3000/api/customers/${CustomerID}`)
  .then((response) => response.json())
  .then((json) => {
    customer = json.data
  })
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });

  if(customer.length == 0)
    return;


  const dialog = document.querySelector("#dialog1");

  clearList("dialogContainer");

  const container = dialog.querySelector("#dialogContainer");

  const template = document.getElementById("editCustomerMainForm-template").content.cloneNode(true);

  console.log(customer);

  template.getElementById("FirstName").value = customer[0].FirstName;

  template.getElementById("LastName").value = customer[0].LastName;

  template.getElementById("Email").value = customer[0].Email;
  


  let button = template.querySelector("#confirmBtn");

  button.setAttribute("onclick", `editCustomer('${CustomerID}')`);  
  
  button = template.querySelector("#cancelBtn");

  button.setAttribute("onclick", `document.querySelector("#dialog1").close()`);   
  

  container.appendChild(template);

  dialog.showModal(); 
  
}

async function editCustomer(CustomerID) {
  
  const dialog = document.querySelector("#dialog1");
  
  dialog.close();

  const form = document.querySelector("#editCustomerMainForm");
  console.log(form);

  // Associate the FormData object with the form element
  const formData = new FormData(form);
  console.log(formData);

  const data = JSON.stringify(Object.fromEntries(formData));

  console.log(data);
    
  try {
    const response = await fetch(`/api/customers/${CustomerID}`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }

  loadTables();
  
}

async function deleteCustomer(CustomerID) {
  

  document.querySelector("#dialog1").close();
  
  await fetch(`http://localhost:3000/api/customers/${CustomerID}`, {
    method: "DELETE"
  })
  .then((response) => response.json())
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });

  loadTables();
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


async function loadCustomers(){
  
  clearList("customersList");
  
  await fetch("http://localhost:3000/api/customers/")
  .then((response) => response.json())
  .then((json) => {

    json.data.forEach((item) => {   
      placeCustomerItem(item.CustomerID, item.FirstName, item.LastName, item.Email);
    });
  })
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });

}



async function loadOrders(){
  
  clearList("ordersList");
  
  
  await fetch("http://localhost:3000/api/orders")
  .then((response) => response.json())
  .then((json) => {
    json.data.forEach((item) => {  
      loadOrder(item.id);  
    });
  })
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });  

}

async function loadOrder(OrderID) {

  
  await fetch(`http://localhost:3000/api/orders/${OrderID}?join`)
  .then((response) => response.json())
  .then((json) => {
    json.data.forEach((item) => {   
           placeOrderItem(OrderID, item.place.Number);
        });
      })
      .catch((response) => {      
        alert(`Response status = ${response.status}, message ${response.statusText}`);
      });
  
}


async function placeOrderItem(OrderID, TableNumber){



  fetch(`http://localhost:3000/api/orders/${OrderID}?dishes`)
  .then((response) => response.json())
  .then((json) => {
        placeOrderDishItems(OrderID, TableNumber, json.data)    
      })
      .catch((response) => {      
        alert(`Response status = ${response.status}, message ${response.statusText}`);
      });


}

function placeOrderDishItems(OrderID, TableNumber, Dishes){
  
  const template = document.querySelector("#orderCard-template").content.cloneNode(true);

  template.querySelector("#orderTableNumber").innerText=TableNumber;

  Dishes.forEach(dish=>{

      const orderDishCard = document.querySelector("#orderDishCard-template").content.cloneNode(true);

      orderDishCard.querySelector("#orderDishImage").src=dish.dish.Image;

      orderDishCard.querySelector("#orderDishName").innerText=dish.dish.Name; 

      var entry = document.createElement('li');

      entry.setAttribute("class", "horizontli");

      entry.appendChild(orderDishCard);

      template.querySelector("#orderDishList").appendChild(entry);
  });
 

  template.querySelector("#deleteBtn").setAttribute("onclick", `showDeleteOrderForm('${OrderID}')`); 
   
  console.log("end")

  document.querySelector("#ordersList").appendChild(template);
}


async function showDeleteOrderForm(OrderID) {

  const template = document.getElementById("confirmDeleteForm");

  let button = template.querySelector("#confirmBtn");

  button.setAttribute("onclick", `deleteOrder('${OrderID}')`);    
}


async function deleteOrder(OrderID) {
  

  document.querySelector("#dialog1").close();
  
  await fetch(`http://localhost:3000/api/orders/${OrderID}`, {
    method: "DELETE"
  })
  .then((response) => response.json())
  .catch((response) => {      
    alert(`Response status = ${response.status}, message ${response.statusText}`);
  });

  loadOrders();
}

async function placeCustomerItem(CustomerID, FirstName, LastName, Email){
  
  const template = document.querySelector("#customerCard-template").content.cloneNode(true);

  template.querySelector("#customerFirstName").innerText=FirstName;

  template.querySelector("#customerLastName").innerText=LastName;

  template.querySelector("#customerEmail").innerText=Email;  
  

  document.querySelector("#customersList").appendChild(template);
}

async function submitAddDishForm() {
  
  const dialog = document.querySelector("#dialog1");
  
  dialog.close();

  const form = document.querySelector("#addDishForm");

  // Associate the FormData object with the form element
  const formData = new FormData(form);

  const data = JSON.stringify(Object.fromEntries(formData));
    
  try {
    const response = await fetch("/api/dishes/create", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }

  
  loadDishes();
}


loadTables();

loadDishes();

loadOrders();

// setInterval(async() => {

//   console.log("setTimeout");

//   await loadTables();
  
//   await loadDishes();
  
//   await loadOrders();
// }, 1000);