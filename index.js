const express = require('express');
const student = require('./student');

const app = express()
app.use(express.json())

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

app.get('/api/student/get', (req, res) => {
    res.json(student)
})

app.post('/api/student/post', (req, res) => {

    if(!req.body.email){
        res.status(400)
        return res.json({ error: "email is required.."})
    }
    const user = {
        id: student.length + 1,
        name: req.body.name,
        email: req.body.email
    }
    student.push(user);
    res.json(user);
})

app.put('/api/student/put/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const email = req.body.email

    const index = student.findIndex((student) => {
        return (student.id == id)
    })

    if (index >= 0) {
        const std = student[index]
        std.name = name
        std.email = email
        res.json(std)
    } else {
        res.status(400)
    }
})

app.delete('/api/student/delete/:id', (req, res) => {
    const id = req.params.id

    const index = student.findIndex((student) => {
        return (student.id == id)
    })

    if (index >= 0) {
        const std = student[index]
        student.splice(index, 1)
        res.json(std)
    } else {
        res.status(400)
    }
})

app.options('/api/student/options', (req, res) => {
    
})



