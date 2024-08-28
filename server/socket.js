import {Server as SocketIOServer} from "socket.io"
import colors from "colors"
import Message from "./models/MessagesModel.js"
const setupSocket =(server)=>{

    const io = new SocketIOServer(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"],
            credentials:true,
        }
    })


    const userSocketMap = new Map()

    const disconnect = (socket)=>{
        console.log(`client discoonected ${socket.id}`.bgRed)
        for (const [userId,socketId] of userSocketMap.entries() ) {
            if (socketId===userId) {
                userSocketMap.delete(userId)
                break;
            }
            
        }
    }

    const sendMessage = async (message)=>{
        const senderSocketId = userSocketMap.get(message.sender)
        const recipientSocketId = userSocketMap.get(message.recipient)

        const createdMessage = await Message.create(message)

        const messageData = await Message.findById(createdMessage._id)
        .populate("sender","id email firstName lastname image color")
        .populate("recipient","id email firstName lastname image color")

        if (recipientSocketId) {
            io.to(recipientSocketId).emit("recieveMessage",messageData)
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("recieveMessage",messageData)
        }
    }

    io.on("connection",(socket)=>{
        
        const userId = socket.handshake.query.userId

        if (userId) {
            userSocketMap.set(userId,socket.id)
            console.log(`User connected: ${userId} with socket ID:${socket.id}`.bgMagenta)
        }else{
            console.log("User ID not provided during connection")
        }
        socket.on("sendMessage",sendMessage)
        socket.on("disconnect",()=>disconnect(socket))
    })
}

export default setupSocket