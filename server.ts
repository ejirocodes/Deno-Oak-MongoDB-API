import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { getAllRooms, createRooms } from './routes.ts'

const app = new Application();

const router = new Router(); 

const port: number = 8000;
// app.use(ctx => {
//     ctx.response.body = 'Hello Deno'
// })

router.get('/', (ctx) => {
    ctx.response.body = 'Hello from Deno'
})
    .get('/rooms', getAllRooms)
    .post('/rooms', createRooms)


app.use(router.routes());
app.use(router.allowedMethods())
app.listen({ port })
console.log(`Server is running on port ${port}`);
