import z from 'zod';

const titleMinLength = 5;
const titleMaxLength = 50;
const descriptionMinLength = 20;
const descriptionMaxLength = 255;
const categoryMinLength = 3;
const categoryMaxLength = 25;

const errors = {
    titleMinLength: (length: number) => `O título precisa ter pelo menos ${length} caracteres`,
    titleMaxLength: (length: number) => `O título precisa ter no máximo ${length} caracteres`,
    descriptionMinLength: (length: number) => `A descrição precisa ter pelo menos ${length} caracteres`,
    descriptionMaxLength: (length: number) => `A descrição precisa ter no máximo ${length} caracteres`,
    categoryMinLength: (length: number) => `A categoria precisa ter pelo menos ${length} caracteres`,
    categoryMaxLength: (length: number) => `A categoria precisa ter no máximo ${length} caracteres`,
    deadlineMinDate: () => 'A data tem que ser maior que a data de hoje',
}

const title = z.string().min(titleMinLength, {
    message: errors.titleMinLength(titleMinLength),
}).max(titleMaxLength, {
    message: errors.titleMaxLength(titleMaxLength),
});

const description = z.string().min(descriptionMinLength, {
    message: errors.descriptionMinLength(descriptionMinLength),
}).max(descriptionMaxLength, {
    message: errors.descriptionMaxLength(descriptionMaxLength),
});

const category = z.string().min(categoryMinLength, {
    message: errors.categoryMinLength(categoryMinLength),
}).max(categoryMaxLength, {
    message: errors.categoryMaxLength(categoryMaxLength),
});

const deadline = z.date().min(new Date(), {
    message: errors.deadlineMinDate()
});

export const todoSchema = z.object({
    title, description, deadline, category
});