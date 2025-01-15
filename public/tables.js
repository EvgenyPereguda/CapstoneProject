
  
  async function submitAddTableForm() {
      
    const form = document.querySelector("#addTableForm");
  
    // Associate the FormData object with the form element
    const formData = new FormData(form);
  
    const data = JSON.stringify(Object.fromEntries(formData));
      
    try {
      const response = await fetch("/api/tables/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      });
      
      loadTables();
    } catch (e) {
      console.error(e);
    }
      
    loadDishes();
  }

  

async function showDeleteTableForm(TableID) {
      
    const template = document.getElementById("confirmDeleteForm");
  
    let button = template.querySelector("#confirmBtn");
  
    button.setAttribute("onclick", `deleteTable('${TableID}')`);  
    
    button = template.querySelector("#cancelBtn");
  
    button.setAttribute("onclick", `document.querySelector("#dialog1").close()`);   
    
  }

  async function deleteTable(TableID) {
    
  
    document.querySelector("#dialog1").close();
    
    await fetch(`http://localhost:3000/api/tables/${TableID}`, {
      method: "DELETE"
    })
    .then((response) => response.json())
    .catch((response) => {      
      alert(`Response status = ${response.status}, message ${response.statusText}`);
    });
  
    loadTables();
  }

  async function showEditTableForm(TableID){
  
    let table = {};
    
    await fetch(`http://localhost:3000/api/tables/${TableID}`)
    .then((response) => response.json())
    .then((json) => {
        table = json.data
    })
    .catch((response) => {      
      alert(`Response status = ${response.status}, message ${response.statusText}`);
    });
      
    if(table.length == 0)
      return;
      
    const template = document.getElementById("editTableForm");
  
    template.querySelector("#Number").value = table[0].Number;
    
  
    let button = template.querySelector("#confirmBtn");
  
    button.setAttribute("onclick", `editTable('${TableID}')`);      
  
  }
  

async function editTable(TableID){

  
    const dialog = document.querySelector("#dialog1");
    
    dialog.close();
  
    const form = document.querySelector("#editTableForm");
  
    // Associate the FormData object with the form element
    const formData = new FormData(form);
  
    const data = JSON.stringify(Object.fromEntries(formData));
      
    try {
      const response = await fetch(`/api/tables/${TableID}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      });
    } catch (e) {
      console.error(e);
    }
  
    loadTables();
  }
  