var express = require("express");
var conexion = require('./../conexion');
var contactRouter = express.Router();

// all contacts
contactRouter.get("/", function (request, response) {
    const sql_query = "SELECT contact_id,name,age FROM contacts";
  
    conexion.query(sql_query, function (error, resultados) {
      // Si hay error excepcion muestralo por consola.
      if (error) throw error;
      if (resultados.length > 0) {
        response.json(resultados);
      } else {
        return response.send({
          api_info_code: 10,
          message: "No contacts in DB.",
        });
      }
    });
  });
  
// one contact
/*
 * se sustituye  ? de la query por [request.params.id] el id que me viene de la url.
 */
contactRouter.get("/:id", function (request, response) {
    const sql_query = "SELECT * FROM contacts WHERE contact_id = ?"; // ? --> Avoid SQL Injection.
    conexion.query(sql_query, [request.params.id], function (error, resultados) {
      if (error) throw error;
      if (resultados.length > 0) {
        response.json(resultados);
      } else {
        return response.status(200).send({
          api_info_code: 2,
          message: "No contact Found.",
        });
      }
    });
  });
  contactRouter.get("/:id", function (request, response) {
    let existe = false;
    const sql_query = "SELECT * FROM contacts WHERE contact_id = ?";
  
    conexion.query(sql_query, [request.params.id], function (error, resultados) {
      if (error)
        return response
          .status(404)
          .render("error.ejs", { message: error, id: request.params.id });
  
      if (resultados.length > 0) {
        console.log(resultados);
        response.render("edit", { id: resultados });
      } else {
        return response.status(404).render("error.ejs", {
          message: "contact not found",
          id: request.params.id,
        });
      }
    });
  });
  contactRouter.post("/:id", function (request, response) {
    console.log(request.body);

    if(request.body.name === ''|| request.body.age === '')
    {
      response.status(200).json({
        api_info_code:99,
        message:"Blank Fields"
      });
      return response;
    }
    // TODO: AVOID INSERT EXISTING CONTACT.

    const sql_insert_query = "INSERT INTO contacts(name,age) VALUES (?,?)";
    conexion.query(
      sql_insert_query,
      [request.body.name, request.body.age],
      function (error, resultados) {
        if (error) {
          console.error("error inserting", error);
          response.status(200).json({
            api_info_code: 100,
            message: "Error inserting contact.",
            details: error,
          });
        } else {
          response.status(201).json({
            api_info_code: 3,
            message: "Successfully Inserted record into DB",
            affectedRows: resultados.affectedRows,
            insertedId: resultados.insertId,
          });
        }
      }
    );
  });
  
  contactRouter.put("/:id", function (request, response) {
    const { id } = request.params;
    const sql_query_update =
      "UPDATE contacts SET name = ?, age = ? where contact_id = ?";
    conexion.query(
      sql_query_update,
      [request.body.name, request.body.age, id],
      function (error, resultados) {
        if (error) {
          console.error("error updating", error);
          response.json({
            api_info_code: 101,
            message: "Error updating contact.",
            details: error,
          });
        } else {
          response.status(200).json({
            api_info_code: 4,
            message: "Successfully updated contact.",
            affectedRows: resultados.affectedRows,
            changedRows: resultados.changedRows,
          });
        }
      }
    );
  });
  
  contactRouter.delete("/:id", function (request, response) {
    const { id } = request.params;
    const sql_query_delete = `DELETE FROM contacts WHERE contact_id = ${id}`;
  
    conexion.query(sql_query_delete, (error) => {
      if (error) throw error;
      response.status(200).json({
        api_info_code: 4,
        message: "Successfully deleted record DB",
      });
    });
  });
  
module.exports = contactRouter;
