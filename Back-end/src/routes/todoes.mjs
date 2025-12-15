import { Router } from "express";
import { Todo } from "../schemas/todoScehma.mjs";
import { getTodoById } from "../utils/middlewares.mjs";

export const router = Router();

router.get("/",(req, res)=>{
    return res.redirect("/myTodoes")
});

router.get("/myTodoes",async (req, res)=>{
    try{
        const todoes = await Todo.find();
        return res.json(todoes);
    }catch(err){
        return res.status(400).json({msg: "failed to fetch todo!"});
    }
});

router.get("/myTodoes/:id",getTodoById,(req, res)=>{
    const todo = req.todo;
    return res.json(todo);
});

router.post("/myTodoes",async(req, res)=>{
    const {body} = req;
    try{
        const newtodo = new Todo(body)
        const savedtodo = await newtodo.save();
        return res.json(savedtodo);
    }catch(err){
        return res.status(400).json({msg: "failed to add todo!"});
    }
});

router.patch("/myTodoes/:id",getTodoById, async (req, res)=>{
    const todo = req.todo;
    const {body} = req;
    if(body.title){
        todo.title = body.title;
    }
    if(body.description == ""){
        todo.description = "";
    }
    if(body.description){
        todo.description = body.description
    }

    try{
        await todo.save();
        return res.json(todo);
    }catch(err){
        return res.status(400).json({msg: "failed to update todo!"});
    }
});

router.delete("/myTodoes/:id",getTodoById, async (req, res)=>{
    const todo = req.todo;
    try{
        await todo.deleteOne();
        return res.json({msg: "its changed"});
    }catch(err){
        return res.status(400).json(false);
    }
});


router.patch("/myTodoes/updateStatus/:id",getTodoById, async(req, res)=>{
    const todo = req.todo;
    todo.status = !todo.status;
    try{
        const updatedTodo = await todo.save();
        return res.json(updatedTodo);
    }catch(err){
        return res.status(400).json({msg: "cant update the status"})
    }
});


router.use((req, res, next) => {
    res.status(404).json({ 
        message: "Route not found",
    });
});