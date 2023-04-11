import { promises as fs } from 'fs';
import type { Todo } from './types';

export async function createTodo(Todo: Partial<Todo>) {
    const { id: lastestId } = await JSON.parse(
        (await fs.readFile("../lastest-id.json")).toString()
    );

    Todo.id = lastestId + 1;
    await fs.writeFile(
        "../lastest-id.json",
        JSON.stringify({
            id: Todo.id,
        })
    );

    Todo.createdAt = new Date();
    await fs.writeFile(
        `../todolist/${Todo.id}.json`,
        JSON.stringify(Todo, undefined, 2)
    );

    return {success: true, Todo};
}

export async function deleteTodo(id: number) {
    let success = false;
    let todo = null;

    try {
        const todoBuffer = await fs.readFile(`../todolist/${id}.json`);
        todo = JSON.parse(todoBuffer.toString());
        await fs.unlink(`../todolist/${id}.json`);
        success = true;
        if (!success) {
            todo = null;
        }
    } catch {
        success = false;
    }

    return {
        success,
        todo,
    }
}

export async function getTodo(id: number) {
    const todoBuffer = await fs.readFile(`../todolist/${id}.json`);
    const todo = JSON.parse(todoBuffer.toString());
    return todo;
}

export async function getTodos() {
    const todosPaths = (await fs.readdir('../todolist')).map((path) => (`../todolist/${path}`));
    const todosPromises = todosPaths.map((path) => fs.readFile(path));
    const todosBuffers = await Promise.all(todosPromises);
    const todolist = todosBuffers
    .map(Todo => JSON.parse(Todo.toString()))
    .map(({ description, ...Todo }) => Todo)
    .sort((a,b) => {
        return new Date(a.deadline as string).getTime() - new Date(b.deadline as string).getTime()
    });
    return todolist;
    
};

export async function updateTodo(id: number, updateTodo: Partial<Todo>) {
    const currentTodoBuffer = await fs.readFile(`../todolist/${id}.json`);
    const currentTodo = JSON.parse(currentTodoBuffer.toString());
    const todo = {
        ...currentTodo,
        ...updateTodo,
    };
    
    await fs.writeFile(
        `../todolist/${id}.json`,
        JSON.stringify(todo, undefined, 2)
    );

    return {success: true, todo};
}