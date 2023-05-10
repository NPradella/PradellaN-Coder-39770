import express from 'express'
import fs from 'fs'
import router from './routes/index.js'
import __dirname from './utils.js'

let server = express()

let PORT = 8080

let ready = ()=> console.log('Server ready on port 8080')


server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(express.static(__dirname + '/public'))
server.use('/', router)
server.listen(PORT, ready)





    