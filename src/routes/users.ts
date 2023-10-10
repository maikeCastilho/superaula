import { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function usersRoutes(app: FastifyInstance) {
    //BUSCANDO TODOS OS USERS
    app.get('/users', async () => {
        const user = await prisma.user.findMany({
        });
        return user
    })

    app.get('/users/:id', async (request) => {

        const paramsSchema = z.object({
            id: z.string()
        })
        const { id } = paramsSchema.parse(request.params);
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            }
        })
        return user;
    })

    app.post('/users/cadastro', async (request) => {
        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
        })
        const {name, email} = bodySchema.parse(request.body)
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
            }
        })
    })

    app.delete('/users/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string(),
        })
        const { id } = paramsSchema.parse(request.params);
        await prisma.user.delete({
            where: {
                id
            }
        })
        return `usuario limado com sucesso ${id}`
    })


    
    app.put('/users/:id', async request  => {
        const paramsSchema = z.object({
            id: z.string(),
        })

        const bodySchema = z.object({
            name: z.string(),
            email: z.string(),
        })
        const { id } = paramsSchema.parse(request.params);
        const { name, email  } = bodySchema.parse(request.body);
        const user = await prisma.user.update({
            where: { 
                id
            },

            data: {
                name,
                email,
            }

        })
        return user
    })



}
