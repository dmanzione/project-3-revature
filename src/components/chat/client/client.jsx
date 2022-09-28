
import io from 'socket.io-client'

const socket = io()


socket.on("connect",()=>{
    
    console.log("client connected")
})



socket.on("message", function(message){
    console.log(message)
})




export default socket;