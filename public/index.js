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
    
    const template = document.querySelector("#tableItem-template").content.cloneNode(true);
  
    template.querySelector("#tableNumber").innerText = Number;

    template.querySelector("#tableLink").href = `http://localhost:3000/client.html?placeId=${PlaceID}`;    
         
    document.querySelector("#tablesList").appendChild(template);  
  }

  loadTables();