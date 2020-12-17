import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { getAllRooms } from './routes.ts'

const app = new Application();

const router = new Router();

// app.use(ctx => {
//     ctx.response.body = 'Hello Deno'
// })

router.get('/', (ctx) => {
    ctx.response.body = 'Hello from Deno'
})
    .get('/rooms', getAllRooms);


app.use(router.routes());
app.use(router.allowedMethods())
app.listen({ port: 8000 })
console.log('Server is running');
