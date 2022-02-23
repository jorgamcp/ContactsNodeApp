//  This  gives me the number row of the table
//  if the contact with contactid is 6 and it's in first position on
//  db this'll return 1. the first position not the contactId
var table = document.getElementById("mycontacttable");
var GBLID = -1;
let mycontactOBJ = {};
let jsondata;
window.addEventListener("DOMContentLoaded", function () {
  const editmodal = new bootstrap.Modal(
    document.getElementById("editModal"),
    {}
  );
  //sendEditModal();
  cerrarModal();
});

function cerrarModal() {
  var cerrarmodalButton = document
    .getElementById("closemodaldown")
    .addEventListener("click", function () {
      console.log("cerrar el modal!");
      const editmodal = document.querySelector("#editModal");
      var modal = bootstrap.Modal.getOrCreateInstance(editmodal);
      modal.hide();
    });
}

function fillBoostrapModal(contobj) {
  var nombreContacto = contobj[0].name;
  var edadContacto = contobj[0].age;
  // console.info('info  name '+ nombreContacto);
  // console.info('edad '+ edadContacto);

  document.getElementById("nombreFormFieldmod").value = nombreContacto;
  document.getElementById("edadFormFieldmod").value = edadContacto;

  mycontactOBJ.name = nombreContacto;
  mycontactOBJ.age = edadContacto;

  // console.log(contobj[0]);
  var ob = {
    contact_id: contobj[0].contact_id,
    name: contobj[0].name,
    age: contobj[0].age,
  };
  console.log("ob " + ob.name + ob.contact_id + ob.age);

  document.getElementById("mibotonsendedit").onclick = function () {
    
    var sendObj = { contact_id:ob.contact_id , name: document.getElementById("nombreFormFieldmod").value, age: document.getElementById("edadFormFieldmod").value };
    const urlPut = `/contacts/${ob.contact_id}`;



    fetch(urlPut,{
      method:'PUT',
      body: JSON.stringify(sendObj),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .catch(error => console.error('error updating contact  ' + error));
    
    
      repaintHTMLTable();
    //document.getElementById('edadFormFieldmod').value
  };
}


async function repaintHTMLTable(){
  //TODO: delete all rows in table except headers, call api to json GET and regenerate table;
  // Borro tabla excepto Tbody;
    var myTable=document.getElementById('mycontacttable');
    var rowCount  = myTable.rows.length; while(--rowCount) myTable.deleteRow(rowCount);
  
     fetch('/contacts').then(
       function(c) {return c.json();}
     ).then(
       function(json)
       {
         jsondata = json;
       }
     )

     console.log(jsondata);
    
    // Repintamos el Tbody
   var row = `
  <tr id=${jsondata[i].contact_id}.contact_id>
      <td >${jsondata[i].contact_id}</td>
      <td>${jsondata[i].name}</td>
      <td>${jsondata[i].age}</td>
      <td>
        <a data-bs-target="#editModal" data-bs-toggle="modal" href="editModal" name="${jsondata[i].contact_id}"> Editar</a>
      </td>
      <td>
        <a href="/delete/${jsondata[i].contact_id}"> Eliminar</a>
      </td>
  </tr>`;

}

function getDataFromServer(contact_id) {
  fetch(`/contacts/${contact_id}`)
    .then((response) => response.json())
    .then((contact) => fillBoostrapModal(contact));
}

// const createClickHandler = (row) => {
//   return async () => {
//     const [cell] = row.getElementsByTagName("td");
//     const id = cell.innerHTML;
//     //console.log(id);
//    await   getDataFromServer(id);
//     return id;
//   };
// };

table = document.querySelector("table");
for (const currentRow of table.rows) {
  //console.log(currentRow.children[0].textContent);
  var contact_id = currentRow.children[0].textContent;
  currentRow.children[3].onclick = async () =>
    await getDataFromServer(currentRow.children[0].textContent); // get contact_id of the row
}
