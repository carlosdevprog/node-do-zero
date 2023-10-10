import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";
const server = fastify()
//const database = new DatabaseMemory()
const database = new DatabasePostgres


//POST(criação) http://localhost:3333/videos
server.post("/videos", async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})


//GET(buscar ou listar)
server.get("/videos", async (request) => {
    const search = request.query.search

    const videos = await database.list(search)

    return videos
})


// PUT(atualizar)
// Route Parameter => id
// http://localhost:3333/videos/id
server.put("/videos/:id", async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})


//DELETE(deletar)
// Route Parameter => id
// http://localhost:3333/videos/id
server.delete("/videos/:id", async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3333
})