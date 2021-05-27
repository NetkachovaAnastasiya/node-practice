const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const bodyParser = require('body-parser');
app.use(bodyParser());

function readData(){
    const rawdata = fs.readFileSync('users.json');
    const users = JSON.parse(rawdata);
    return users
} 

app.get('/users', (req, res) => {
    const users = readData();
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const users = readData();
    const id = req.params.id
    const selectedUser = users.find((user) => Number(id) === user.id)
    res.json(selectedUser)
})

app.post('/users', (req, res) => {
    const users = readData();
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
    const users = readData();
    const id = req.params.id
    const newUserList = users.filter((user) => Number(id) !== user.id
    )
    fs.writeFileSync('./users.json', JSON.stringify(newUserList, null, 2));
    res.sendStatus(200);
})

app.put('/users/:id', (req, res) => {
    const users = readData();
    const id = req.params.id
    const selectedUser = users.find((user) => Number(id) === user.id)
    const newUsersList = users.filter((user) => Number(id) !== user.id)
    
    const updatedUser = {
        ...selectedUser,
        ...{
            name: req.body.name,
            lastName: req.body.lastName
        },
    };
    
    const newUserList = [updatedUser, ...newUsersList];
    fs.writeFileSync('./users.json', JSON.stringify(newUserList, null, 2));
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})