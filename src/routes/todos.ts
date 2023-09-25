import {Router} from 'express';
import { todo } from 'node:test';

import {Todo} from '../models/todo'

type reqBody = {text:string};
type reqParams = {todoId:string};

let todos:Todo[] = [];

const router = Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/',(req,res,next)=>{
    const body = req.body as reqBody;
    const newTodo:Todo = {
        id:new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);
    res.status(201).json({message:'Success',todo:newTodo});
})

router.put('/todo/:todoId',(req,res,next)=>{
    const params = req.params as reqParams;
    const body = req.body as reqBody;
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id===tid);
    if(todoIndex>=0){
        todos[todoIndex]={id:tid,text:body.text};
        return res.status(200).json({message:'Successfully updated'})
    }
    res.status(404).json({message:'Could not find todo for this id'});
})

router.delete('/todo/:todoId',(req,res,next)=>{
    const params = req.params as reqParams;
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id===tid);
    if(todoIndex>=0){
        todos.splice(todoIndex,1);
        return res.status(200).json({message:'Deleted Successfully',todos:todos});
    }
    res.status(404).json({message:'Could not find todo for this id'})
})

export default router;