import { databasePool } from "../database/databasePool";
import { todoSchema } from "../schemas/todoSchema";
import { todoFindManySchema } from "../schemas/todoFindManySchema";
import { commentSchema, Comment } from "../schemas/commentSchema";

export type Todo = {
    id: number;
    title: string;
    description: string;
    deadline: string;
    createdAt: Date;
    category: string;
};

export type TodoComment = {
    id: number;
    mensage: string;
    createdAt: Date;
}

export async function existsById(id: number) : Promise<boolean> {
    const connection = await databasePool.getConnection();
    const [[{ count }]] = (await connection.query('SELECT COUNT(*) AS count FROM todolist WHERE id =?', [id])) as any;
    return count > 0;
}

export async function findOneById(id: number) : Promise<Todo> {
    const connection = await databasePool.getConnection();
    const [[todo]] = (await connection.query('SELECT * FROM todolist WHERE id=?', [id])) as any;
    connection.release();
    return todo;
}

export async function findMany({
    direction = "asc",
    orderBy = "createdAt",
    limit = 10,
    offset = 0,
    search,
} : {
    direction?: string,
    orderBy?: string,
    limit?: number,
    offset?: number,
    search?: string,
} = {}) : Promise<{
    count: number,
    todolist: Todo[],
}> {
    const connection = await databasePool.getConnection();
    const [todolist] = (await connection.query(`SELECT * FROM todolist ${search ? `WHERE description LIKE '%${search}%' OR title LIKE '%${search}%' OR category LIKE '%${search}%'`: ""} ORDER BY ${orderBy} ${direction} LIMIT ${limit} OFFSET ${offset};`)) as any;
    const [[{ count }]] = await connection.query("SELECT COUNT(*) AS count FROM todolist;") as any;
    connection.release();
    return { todolist, count};
}

export async function findCommentsByTodoId(todoId: number) {
    const connection = await databasePool.getConnection();
    const [response] = (await connection.query(`
        SELECT
            comments.id AS commentId,
            todolist.id AS todoId,
            comments.createdAt AS commentCreatedAt,
            todolist.createdAt AS todoCreatedAt,
            message
        FROM comments
        JOIN todolist ON comments.todoId = todolist.id
        WHERE todolist.id = ?;
    `, [todoId])) as any;
    connection.release();
    return response;
}

export async function createComment(comment : Comment) {
    const validComment = await commentSchema.safeParseAsync(comment);
    if (validComment.success) {
        const connection = await databasePool.getConnection();
        const [response] = (await connection.query('INSERT INTO comments (todoId, message) VALUES (?, ?);', [validComment.data.todoId, validComment.data.message])) as any;
        const success = response.affectedRows > 0;
        connection.release();
        return { success, errors: [] };
    } else {
        return {
            success: false,
            errors: validComment.error.errors,
        }
    }
     
}

export async function create(todoFields : Todo) {
    const deadlineDate = new Date(todoFields.deadline)
    const validTodo = await todoSchema.safeParseAsync({...todoFields, deadline : deadlineDate});
    if(!validTodo.success) {
        return {
            todo: null,
            success: false,
            errors: validTodo.error.errors,
        };
    }
    const { title, description, deadline, category } = validTodo.data;
    const connection = await databasePool.getConnection();
    const [response] = (await connection.query('INSERT INTO todolist (title, description, deadline, category) VALUES (?, ?, ?, ?);', [title, description, new Date(deadline), category])) as any;
    connection.release();
    const success = response.affectedRows > 0;
    const id = response.insertId;
    const todo = await findOneById(id);
    return { todo, success, errors: [] };
}

export async function createMany(todolist : Todo[]) {
    const todolistQueries = todolist.map(() => 'INSERT INTO todolist (title, description, deadline, category) VALUES (?, ?, ?, ?);').join('');
    const todolistArguments = todolist.map(({ title, description, deadline, category }) => [title, description, deadline, category]).flat();
    const connection = await databasePool.getConnection();
    const [responses] = (await connection.query(todolistQueries, todolistArguments)) as any;
    connection.release();
    const success = responses.length > 0;
    return { success };
}

export async function updateById(id: number, todoFields: Todo) {
    const connection = await databasePool.getConnection();
    const [response] = (await connection.query('UPDATE todolist SET title=?, description=?, deadline=?, category=? where id=?;', [todoFields.title, todoFields.description, todoFields.deadline, todoFields.category, id])) as any;
    connection.release();
    const success = response.affectedRows > 0;
    const todo = await findOneById(id);
    return { todo, success };
}

export async function deleteById(id: number) {
    const todo = await findOneById(id);
    const connection = await databasePool.getConnection();
    const [response] = (await connection.query('DELETE FROM todolist WHERE id=?', [id])) as any;
    connection.release();
    const success = response.affectedRows > 0;
    return { success, todo };        
}