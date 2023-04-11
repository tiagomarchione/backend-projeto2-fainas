import { z } from "zod";

export const todoFindManySchema = z.object({
    direction: z.string().toLowerCase().regex(/^(asc|desc)$/).optional(),
    orderBy: z.string().regex(/^(deadline|createdAt)$/).optional(),
    limit: z.string().transform(value => Number(value)).refine(value => Number.isInteger(value) && value>=0 && value<=30).optional(),
    offset: z.string().transform(value => Number(value)).refine(value => Number.isInteger(value) && value>=0).optional(),
    search: z.string().max(50).optional()
});