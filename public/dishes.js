

async function placeDishItem(DishID, Image, Name, Description, Price){
  
    const template = document.querySelector("#dishCard-template").content.cloneNode(true);
  
    template.querySelector("#dishImg").src=Image;
  
    template.querySelector("#dishName").innerText=Name;
  
    template.querySelector("#dishDescription").innerText=Description;
  
    template.querySelector("#dishPrice").innerText=Price;  
    
    template.querySelector("#deleteBtn").setAttribute("onclick", `showDeleteDishForm('${DishID}')`); 
    
    template.querySelector("#editBtn").setAttribute("onclick", `showEditDishForm('${DishID}')`); 
  
  
    document.querySelector("#dishesList").appendChild(template);
  }
  
  async function showDeleteDishForm(DishID){
      
    const template = document.getElementById("confirmDeleteForm");
  
    let button = template.querySelector("#confirmBtn");
  
    button.setAttribute("onclick", `deleteDish('${DishID}')`);  

  }
  
  async function deleteDish(DishID) {
  
    document.querySelector("#dialog1").close();
    
    await fetch(`http://localhost:3000/api/dishes/${DishID}`, {
      method: "DELETE"
    })
    .then((response) => response.json())
    .catch((response) => {      
      alert(`Response status = ${response.status}, message ${response.statusText}`);
    });
  
    loadDishes();
  }
  
  async function showEditDishForm(DishID){
  
    let dish = {};
    
    await fetch(`http://localhost:3000/api/dishes/${DishID}`)
    .then((response) => response.json())
    .then((json) => {
      dish = json.data
    })
    .catch((response) => {      
      alert(`Response status = ${response.status}, message ${response.statusText}`);
    });
  
    if(dish.length == 0)
      return;
    
    const template = document.getElementById("editDishForm");
  
    template.querySelector("#Image").value = dish[0].Image;
  
    template.querySelector("#Name").value = dish[0].Name;
  
    template.querySelector("#Description").value = dish[0].Description;
  
    template.querySelector("#Price").value = dish[0].Price;
  
  
    let button = template.querySelector("#confirmBtn");
  
    button.setAttribute("onclick", `editDish('${DishID}')`); 
      
  }
  
  async function editDish(DishID){
    
    const form = document.querySelector("#editDishForm");
  
    // Associate the FormData object with the form element
    const formData = new FormData(form);
  
    const data = JSON.stringify(Object.fromEntries(formData));
      
    try {
      const response = await fetch(`/api/dishes/${DishID}`, {
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
  
    loadDishes();
  }
  