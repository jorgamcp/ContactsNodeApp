const http = require("http");
const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const conexion = require("../conexion");
const { check, validationResult } = require("express-validator");
const { redirect } = require("express/lib/response");
var router = express.Router();

router.get("/", function (request, response, next) {
  let error_msg = "Ha ocurrido un error";
  const sql_query = "SELECT * FROM contacts";

  conexion.query(sql_query, function (error, resultados) {
    // Si hay error excepcion muestralo por consola.
    if (error) return response.render("index.ejs", { error_msg: error });
    // console.log(resultados);
    return response.render("index.ejs", { data: resultados });
  });
});

router.post("/", function (request, response, next) {});

router.get("/add", function (request, response, next) {
  return response.render("add.ejs");
});

router.post("/add", function (request, response, next) {
  // console.log("has hecho post");
  // console.log(request.body.nombreFormFieldName);
  // console.log(request.body.edadFormFieldName);

  let mycontact = {
    name: request.body.nombreFormFieldName,
    age: request.body.edadFormFieldName,
  };

  if (mycontact.name === "" && mycontact.age === "") {
    console.log("name if: " + mycontact.name);
    console.log("age if: " + mycontact.age);
    return response.render("add.ejs", {
      error: "fiels blank",
      name: mycontact.name,
      age: mycontact.age,
    });
  }

  const sql_insert_query = "INSERT INTO contacts(name,age) VALUES (?,?)";
  conexion.query(
    sql_insert_query,
    [request.body.nombreFormFieldName, request.body.edadFormFieldName],
    function (error, resultados) {
      if (error) return response.render("add.ejs", { error: error });
      return response.status(200).redirect("/");
    }
  );
});

router.get("/edit/:id", function (request, response, next) {
  const { id, name, age } = request.params;

  const sql_query_search = "SELECT * FROM contacts  WHERE contact_id = ?";

  conexion.query(
    sql_query_search,
    [request.params.id],
    function (error, resultados) {
      if (error) {
        console.error("error updating", error);
        return response.status(404).render("error.ejs", { id: error });
      } else if (resultados.length > 0) {
        // console.log(resultados[0].contact_id);
        // console.log(resultados[0].name);
        // console.log(resultados[0].age);
        return response.render("edit.ejs", {
          id: resultados[0].contact_id,
          name: resultados[0].name,
          age: resultados[0].age,
        });
      } else {
        return response.status(204).render("error.ejs", {
          message: "contact not found",
          id: request.params.id,
        });
      }
    }
  );
});

router.post("/edit/:id", function (request, response, next) {
  // Destructuring
  // console.log(request.body.nombreFormFieldName); // request.body.[NOMBRE DEL 'NAME' del formulario en el ejs NO EL 'ID' SINO DA UNDEFINED]
  // console.log(request.body.edadFormFieldName);

  // console.log(" POST EDIT : Quieres actualizar el contacto");

  const sql_update_query =
    "UPDATE contacts SET name = ?, age = ? where contact_id = ?";
  conexion.query(
    sql_update_query,
    [
      request.body.nombreFormFieldName,
      request.body.edadFormFieldName,
      request.params.id,
    ], // Cojo el id de la url en el ultimo parametro
    function (error, resultados) {
      if (error) return response.render("error.ejs", { error: error });
      return response.status(200).redirect("/");
    }
  );
});

router.get("/delete/:id", function (request, response, next) {
  const { id, name, age } = request.params;

  const sql_query_search = "SELECT * FROM contacts  WHERE contact_id = ?";

  conexion.query(
    sql_query_search,
    [request.params.id],
    function (error, resultados) {
      if (error) {
        console.error("error updating", error);
        return response.status(404).render("error.ejs", { id: error });
      } else if (resultados.length > 0) {
        // console.log(resultados[0].contact_id);
        // console.log(resultados[0].name);
        // console.log(resultados[0].age);
        return response.render("delete.ejs", {
          id: resultados[0].contact_id,
          name: resultados[0].name,
          age: resultados[0].age,
        });
      } else {
        return response.status(204).render("error.ejs", {
          message: "contact not found",
          id: request.params.id,
        });
      }
    }
  );
});
router.post("/delete/:id", function (request, response, next) {
  const { id, name, age } = request.params;

  const sql_query_search = "DELETE FROM contacts  WHERE contact_id = ?";

  conexion.query(
    sql_query_search,
    [request.params.id],
    function (error, resultados) {
      if (error) {
        console.error("error deleting", error);
        return response.status(404).render("error.ejs", { id: error });
      } else if (resultados.length > 0) {
        // console.log(resultados[0].contact_id);
        // console.log(resultados[0].name);
        // console.log(resultados[0].age);
        return response.render("delete.ejs", {
          id: resultados[0].contact_id,
          name: resultados[0].name,
          age: resultados[0].age,
        });
      } else {
        return response.status(200).redirect("/");
      }
    }
  );
});

module.exports = router;
