// This  gives me the number row of the table
// if the contact with contactid is 6 and it's in first position on
// db this'll return 1. the first position not the contactId
// var table = document.getElementById("mycontacttable");
var GBLID = -1;
var mycontactOBJ = {};

function getDataFromServer(contact_id)
{
    fetch(`/contacts/${contact_id}`)
    .then(response => response.json())
    .then(contact => mycontactOBJ = contact);
}

function fillBoostrapModal(contobj)
{
    console.info(contobj);
}
const createClickHandler = (row) => {
  return () => {
    const [cell] = row.getElementsByTagName("td");
    const id = cell.innerHTML;
    //console.log(id);
    getDataFromServer(id);
    return id;
  };
};

const table = document.querySelector("table");
for (const currentRow of table.rows) {
    //console.log(currentRow.children[0].textContent);
    var contact_id = currentRow.children[0].textContent;
    currentRow.children[3].onclick = () => getDataFromServer(currentRow.children[0].textContent); // get contact_id of the row
  //GBLID = currentRow.onclick = createClickHandler(currentRow);
}
