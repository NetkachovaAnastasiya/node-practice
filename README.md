Users CRUD

1. Clone project node-practice
2. Open terminal
3. Use command: npm install
4. Then use command: npm run start
5. Run Postman on your PC
Routes examples for Postman:
GET: http://localhost:4000
POST: http://localhost:4000
PUT: http://localhost:4000/1
DELETE: http://localhost:4000/2
6. Run MySql Workbench (login: root, pasword: root)
7. Create new Schema (users)
8. Create new Table with name: users_info, 
with next columns: 
ID with datatype INT (PK, NN, UQ, AI), Name with datatype VARCHAR(45)(NN), Surname with datatype VARCHAR(45)(NN)
9. Create new Procedure (Add_or_Update_UI)
Add this code to the Routine:


CREATE DEFINER=`root`@`localhost` PROCEDURE `Add_or_Update_UI`(
IN _ID INT, 
IN _Name varchar(45),
IN _Surname varchar(45)
)
BEGIN
    IF _ID = 0 THEN
        INSERT INTO users_info(Name, Surname)
        VALUES (_Name,_Surname );

        SET _ID = LAST_INSERT_ID();
    ELSE
        UPDATE users_info
        SET
        Name = _Name,
        Surname = _Surname
        WHERE ID = _ID;
    END IF;
    SELECT * FROM users_info;
END


