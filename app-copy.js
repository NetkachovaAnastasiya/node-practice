
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const bodyParser = require('body-parser');
app.use(bodyParser());


app.get('/users', (req, res) => {
    const rawdata = fs.readFileSync('users.json');
    const users = JSON.parse(rawdata);  
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const rawdata = fs.readFileSync('users.json');
    const users = JSON.parse(rawdata);
    const id = req.params.id
    const findId = users.find((user) => Number(id) === user.id
    )
    res.json(findId)
})

app.post('/users', (req, res) => {
    const rawdata = fs.readFileSync('./users.json');
    const users = JSON.parse(rawdata);
    const newUser =  {
        "id": Math.floor(Math.random() * (1000 - 1)) + 1,
        "name": req.body.name,
        "lastName": req.body.lastName
    }
    users.push(newUser);
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync('./users.json', data)

    res.send(201);
})

app.delete('/users/:id', (req, res) => {
    const rawdata = fs.readFileSync('./users.json');
    const users = JSON.parse(rawdata);
    const id = req.params.id
    const deleteUserId = users.filter((user) => Number(id) !== user.id
    )
    fs.writeFileSync('./users.json', deleteUserId)
    res.json(deleteUserId)
})

app.put('/users/:id', (req, res) => {
    const rawdata = fs.readFileSync('./users.json');
    const users = JSON.parse(rawdata);
    const id = req.params.id
    const selectedUser = users.find((user) => Number(id) === user.id)
    const newUsersList = users.filter((user) => Number(id) !== user.id)
    console.log(selectedUser)
    console.log(newUsersList)
    
    const updatedUser = {
        ...selectedUser,
        ...{
        name: req.body.name,
        lastName: req.body.lastName
        },
    };

    console.log(updatedUser)
    
    const listOfNewUsers = [updatedUser, ...newUsersList];
    fs.writeFileSync('./users.json', JSON.stringify(listOfNewUsers, null, 2));
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})