const express = require("express");
const mysqlConnection = require("../utils/database");

const Router = express.Router();

Router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM users.users_info",
    (err, results, fields) => {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/", (req, res) => {
    let ui = req.body;
    const sql =
      "SET @ID = ?;SET @Name = ?;SET @Surname = ?; CALL Add_or_Update_UI(@ID, @Name, @Surname);";
    mysqlConnection.query(
      sql,
      [
        ui.ID,
        ui.Name,
        ui.Surname
      ],
      (err, results, fields) => {
        if (!err) {
          results.forEach((element) => {
            if (element.constructor == Array) res.send(element);
          });
        } else {
          console.log(err);
        }
      }
    );
  });

  Router.put("/", (req, res) => {
    let ui = req.body;
    const sql =
      "SET @ID = ?;SET @Name = ?;SET @Surname = ?; CALL Add_or_Update_UI(@ID, @Name, @Surname);";
    mysqlConnection.query(
      sql,
      [
        ui.ID,
        ui.Name,
        ui.Surname
      ],
      (err, results, fields) => {
        if (!err) {
          res.send(
            "The data for the selected user has been successfully updated."
          );
        } else {
          console.log(err);
        }
      }
    );
  });
  
  Router.delete("/:id", (req, res) => {
    mysqlConnection.query(
      "DELETE FROM users_info WHERE ID= ? ",
      [req.params.id],
      (err, results, fields) => {
        if (!err) {
          res.send("The selected user has been successfully deleted.");
        } else {
          console.log(err);
        }
      }
    );
  });
  
  module.exports = Router;

 