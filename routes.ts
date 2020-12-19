import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from './mongodb.ts'

const roomsCollection = db.collection('rooms');

const getAllRooms = async (ctx: RouterContext) => {
    const rooms = await roomsCollection.find()
    ctx.response.body = rooms
}

const createRooms = async (ctx: RouterContext) => {
    const { room_number, size, price, isAvalable } = await ctx.request.body().value;
    const room: any = {
        room_number,
        size,
        price,
        isAvalable
    }
    const id = await roomsCollection.insertOne(room)

    room._id = id;
    ctx.response.status = 201
    ctx.response.body = room

}
const getRoom = async (ctx: RouterContext) => {
    
    // get the id of the document from the params object
    const id = ctx.params.id
    const room = await roomsCollection.findOne({ _id: { $oid: id } })
    ctx.response.body = room

}


export { getAllRooms, createRooms, getRoom }