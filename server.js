const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const activePorts = {}

fs.readdir('sites', function(e, files){
    files.forEach((file, index)=>{
        const root = path.resolve(path.join('sites', file));
        const port = 8081 + index;
        console.log('port:', port, 'name:', root)
        activePorts[file] = port
        startServer(root, port)
    })
    constructJSON(activePorts, ()=>{
        startServer(path.resolve('build'), 8080, {'/sites': (req,res)=>res.send(JSON.stringify(activePorts))})
    })
})

function constructJSON(activePorts, cb){
    fs.readFile('public/data.json', (e, f)=>{
        const data = JSON.parse(f.toString())
        Object.keys(data).forEach(key=>data[key].port=undefined)
        Object.entries(activePorts).forEach( ([key,val]) => data[key].port = val )
        fs.writeFile('public/data.json', JSON.stringify(data, null,2), ()=>{})
        fs.writeFile('build/data.json', JSON.stringify(data), ()=>{cb()})
    })
}

function startServer(root, port, routes = {}){
    const app = express()
    app.use(cors())
    app.use(express.static(root))
    app.get('/', async (req, res) => res.sendFile(path.join(root, 'index.html')))
    Object.entries(routes).forEach( ([key,val]) => app.get(key, val) )    
    app.listen(port, () => console.log(`${port}`))
}




