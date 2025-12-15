import { Router } from "express";
import { Todo } from "../schemas/todoScehma.mjs";

export const router = Router();

const getTodoById = async (req, res, next) =>{
    const id = req.params.id;
    try{
        const todo = await Todo.findById(id);
        req.todo = todo;
        next(); 
    }catch(err){
        res.status(400).send(err);
    }
}

router.get("/",(req, res)=>{
    return res.redirect("/myTodoes")
});

router.get("/myTodoes",async (req, res)=>{
    try{
        const todoes = await Todo.find();
        return res.send(todoes);
    }catch(err){
        return res.status(400).send(err);
    }
});

router.get("/myTodoes/:id",getTodoById,(req, res)=>{
    const todo = req.todo;
    return res.send(todo);
});

router.post("/myTodoes",async(req, res)=>{
    const {body} = req;
    try{
        const newtodo = new Todo(body)
        const savedtodo = await newtodo.save();
        return res.send(savedtodo);
    }catch(err){
        return res.status(400).send(err);
    }
});

