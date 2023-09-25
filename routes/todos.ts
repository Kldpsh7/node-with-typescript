import {Router} from 'express';
import { todo } from 'node:test';

import {Todo} from '../models/todo'

let todos:Todo[] = [];

const router = Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/',(req,res,next)=>{
    const newTodo:Todo = {
        id:new Date().toISOString(),
        text:req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({message:'Success',todo:newTodo});
})

router.put('/todo/:todoId',(req,res,next)=>{
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id===tid);
    console.log('id = ',tid);
    console.log('index = '+todoIndex)
    console.log('item = '+todos[todoIndex])
    if(todoIndex>=0){
        todos[todoIndex]={id:tid,text:req.body.text};
        return res.status(200).json({message:'Successfully updated'})
    }
    res.status(404).json({message:'Could not find todo for this id'});
})

router.delete('/todo/:todoId',(req,res,next)=>{
    const tid=req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id===tid);
    console.log('id = ',tid);
    console.log('index = '+todoIndex);
    console.log('item = '+todos[todoIndex]);
    if(todoIndex>=0){
        todos.splice(todoIndex,todoIndex);
        return res.status(200).json({message:'Deleted Successfully',todos:todos});
    }
    res.status(404).json({message:'Could not find todo for this id'})
})

export default router;