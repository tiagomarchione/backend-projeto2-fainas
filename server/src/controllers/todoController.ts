import Router from "express";
import * as todoCrud from "../todoCrud";
import { todoFindManySchema } from "../schemas/todoFindManySchema";
import * as todoRepository from "../repositories/todoRepository";
import { commentSchema } from "../schemas/commentSchema";

export const todoController = Router();

//listar
todoController.get('/', async (req, res) => {
    const params = await todoFindManySchema.safeParseAsync(req.query);
    if(params.success) {
        const todolist = await todoRepository.findMany(params.data);
        res.status(200).json(todolist);
    } else {
        res.status(200).json({
            todolist: [],
            count: 0,
        });
    }
});

//listar comentários pelo id
todoController.get('/comments/:id', async (req, res) => {
    const results = await todoRepository.findCommentsByTodoId(Number(req.params.id));
    res.status(200).json(results);
});

//criar comentário
todoController.post('/comments', async (req, res) => {
    const response = await todoRepository.createComment(req.body);
    res.status(201).json(response);
});

//criar
todoController.post('/', async(req, res) => {
    const results = await todoRepository.create(req.body);
    res.status(201).json(results);
});

//criar vários
todoController.post('/create-many', async(req, res) => {
    const { success } = await todoRepository.createMany(req.body);
    res.status(201).json({
        success,
    });
});

//atualizar parcialmente
todoController.patch('/:id', async (req, res) => {
    const {success, todo} = await todoCrud.updateTodo(
        Number(req.params.id),
        req.body
    );

    res.status(200).json({
        success,
        data: todo,
    });
});

//listar pelo id
todoController.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const todo = await todoRepository.findOneById(id);
    res.status(200).json(todo);
});

//alterar pelo id
todoController.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { success, todo } = await todoRepository.updateById(id, req.body);
    res.status(200).json({
        success,
        data: todo,
    });
});

//deletar pelo id
todoController.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { success, todo } = await todoRepository.deleteById(id);
    res.status(200).json({
        success,
        data: todo,
    });
})