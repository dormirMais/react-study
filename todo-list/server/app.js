const express = require('express')
const app = express()
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let id = 2;
const todoList = [{
    id: 1,
    text: "todo1",
    done: true
},
{
    id: 2,
    text: "todo2",
    done: true
}];



app.get("/api/todo", (req, res) => {
    console.log(todoList);
    res.json(todoList);
})
app.post("/api/todo/:todo_id", (req, res) => {
    todoList.forEach(todo => {
        if (String(todo.id) === req.params.todo_id)
            todo.done = !(todo.done);
    })
    console.log(todoList);


})

app.post("/api/todo", (req, res) => {
    const { text } = req.body;
    todoList.push({
        id: id++,
        text,
        done: false
    });
    return res.send("success");
})

app.listen(4000, () => {
    console.log("server start!!")
})