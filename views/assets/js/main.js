var boton = document.querySelectorAll("#mibotoncabron");
const container = document.getElementById("exampleModal");
const modal = new bootstrap.Modal(container);

boton[0].addEventListener("click", async function (e) {
  e.preventDefault();
  console.log("quieres enviar el form del modal!");

  let nombre = document.querySelector("#nombreFormField").value;
  let edad = document.querySelector("#edadFormField").value;

  console.log("nombre " + nombre);
  console.log("edad" + edad);

  const rawResponse = await fetch("/contacts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: nombre, age: edad }),
  });
  const content = await rawResponse.json();

  modal.hide();
  console.log(content);
  await repaintHTMLTable({
    contact_id: content.insertedId,
    name: nombre,
    age: edad,
  });
});

async function repaintHTMLTable(json) {
  console.log("json var" + JSON.stringify(json));
  var tbodyRef = document
    .getElementById("mycontacttable")
    .getElementsByTagName("tbody")[0];

  // Insert a row at the end of table
  var newRow = tbodyRef.insertRow();

  // Insert a cell at the end of the row
  var contactid = newRow.insertCell();
  var contactName = newRow.insertCell();
  var contactAge = newRow.insertCell();
  var edit = newRow.insertCell();
  var del = newRow.insertCell();

  // Append a text node to the cell
  var textContactId = document.createTextNode(json.contact_id);
  var textContactName = document.createTextNode(json.name);
  var textContactAge = document.createTextNode(json.age);

  var textEdit = document.createTextNode("Editar");
  var textDel = document.createTextNode("Eliminar");
  var aEditar = document.createElement("a");
  var aEliminar = document.createElement("a");

  aEditar.appendChild(textEdit);
  aEliminar.appendChild(textDel);

  aEditar.title = "Editar";
  aEliminar.title = "Eliminar";
  aEditar.href = `editModal`; 
  aEliminar.href = `/delete/${json.contact_id}`;

  contactid.appendChild(textContactId);
  contactName.appendChild(textContactName);
  contactAge.appendChild(textContactAge);

  edit.appendChild(aEditar);
  del.appendChild(aEliminar);
}