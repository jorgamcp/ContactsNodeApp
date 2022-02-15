//  This  gives me the number row of the table
//  if the contact with contactid is 6 and it's in first position on
//  db this'll return 1. the first position not the contactId
//  var table = document.getElementById("mycontacttable");
// var GBLID = -1;
// var mycontactOBJ = {};
// function fillBoostrapModal(contobj)
// {
//     var nombreContacto = contobj[0].name;
//     var edadContacto = contobj[0].age;
//     console.info('info  name '+ nombreContacto);
//     console.info('edad '+ edadContacto);


//     var editModal = new bootstrap.Modal(document.querySelector('#editModal'));
    
//     // editModal.html = "nombreFormFieldmod"
     
//      editModal.show();
    
// }

// async function getDataFromServer(contact_id)
// {
//   await  fetch(`/contacts/${contact_id}`)
//     .then(response => response.json())
//     .then(contact => fillBoostrapModal(contact));
// }

// const createClickHandler = (row) => {
//   return async () => {
//     const [cell] = row.getElementsByTagName("td");
//     const id = cell.innerHTML;
//     //console.log(id);
//    await   getDataFromServer(id);
//     return id;
//   };
// };

// const table = document.querySelector("table");
// for (const currentRow of table.rows) {
//     //console.log(currentRow.children[0].textContent);
//     var contact_id = currentRow.children[0].textContent;
//     currentRow.children[3].onclick =  async () => await getDataFromServer(currentRow.children[0].textContent); // get contact_id of the row
//   //GBLID = currentRow.onclick = createClickHandler(currentRow);
// }
