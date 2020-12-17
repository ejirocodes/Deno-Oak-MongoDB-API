import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from './mongodb.ts'

const roomsCollection = db.collection('rooms');
const getAllRooms = async (ctx: RouterContext) => {
    const notes = await roomsCollection.find()
    ctx.response.body = notes
}

export {getAllRooms}