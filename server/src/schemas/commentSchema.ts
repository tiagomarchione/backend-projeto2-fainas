import { TypeOf, z } from 'zod';
import * as todoRepository from '../repositories/todoRepository'

export type Comment = z.infer<typeof commentSchema>;

export const commentSchema = z.object({
    todoId: z
    .number()
    .refine(todoId => Number.isInteger(todoId))
    .refine(async todoId => {
        const todoExists = await todoRepository.existsById(todoId);
        return todoExists;
    }, {
        message: "Essa Faina não existe",
        params: ["todoId"],
    }),
    message: z.string().min(10).max(255),
})