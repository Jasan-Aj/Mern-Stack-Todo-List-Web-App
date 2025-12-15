import { Todo } from "../schemas/todoScehma.mjs";

export const getTodoById = async (req, res, next) =>{
    const id = req.params.id;
    try{
        const todo = await Todo.findById(id);
        if(!todo){
            throw new Error();
        }
        req.todo = todo;
        next(); 
    }catch(err){
        res.status(400).send({msg: "failed to fetch todo!"});
    }
}
