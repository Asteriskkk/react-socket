const http = require('http')
const server = http.createServer()
const os = require('os-utils')

const io = require('socket.io')(
    server,
    {transports:['websocket','polling']
})


// lister for socket connections
io.on('connection',client =>{

    //emit cpu event every second
    setInterval(function(){
        os.cpuUsage((cpuPercent)=>{
            console.log(cpuPercent)
            client.emit('cpu',{
                name:new Date().getSeconds(),
                value:cpuPercent*100
            })
        })
    },1000)

})



server.listen(8000)