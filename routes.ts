import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from './mongodb.ts'

const roomsCollection = db.collection('rooms');

const getAllRooms = async (ctx: RouterContext) => {
    const rooms = await roomsCollection.find()
    ctx.response.body = rooms
}

const createRooms = async (ctx: RouterContext) => {
    const { room_number, size, price, isAvailable } = await ctx.request.body().value;
    const room: any = {
        room_number,
        size,
        price,
        isAvailable
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

const updateRoom = async (ctx: RouterContext) => {
    // get the id of the document from the params object
    const id = ctx.params.id
    const { room_number, size, price, isAvailable } = await ctx.request.body().value;

    const { modifiedCount } = await roomsCollection.updateOne({ _id: { $oid: id } }, {
        $set: {
            price,
            isAvailable
        }
    })
    // iIf the id does not exist in collection, we return a 404 status and send a custom message
    if (!modifiedCount) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Room not found' }
        return;
    }
    ctx.response.body = await roomsCollection.findOne({ _id: { $oid: id } })
}

const deleteRoom = async (ctx: RouterContext) => {
    console.log(ctx.params.id);
    
    const id = ctx.params.id
    const room = await roomsCollection.deleteOne({ _id: { $oid: id } });
    if (!room) {
        ctx.response.status = 404;
        ctx.response.body = { message: 'Room not found' }
        return;
    }
    ctx.response.status = 204;
}


export { getAllRooms, createRooms, getRoom, updateRoom, deleteRoom }