
const os = require('os');
const interfaces = os.networkInterfaces();

let serverIP;

Object.keys(interfaces).forEach( (interfaceName) => {
    interfaces[interfaceName].forEach((interface) =>{
        if(interface.internal === false && interface.family === 'IPv4'){
            serverIP = interface.address;
        }
    })
})

module.exports =  serverIP;