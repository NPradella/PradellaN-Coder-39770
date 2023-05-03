import express from 'express'
import prodManager from './ProductManager.js'
import cartsManager from './CartManager.js'
let server = express()

let PORT = 8080

let ready = ()=> console.log('Server ready on port 8080')

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))

let products_route = '/api/products'
let products_function = (req,res) =>{
    let quantity = req.query.quantity ?? 999
   let products = prodManager.getProducts().slice(0,quantity)
   return res.send({
    success:true,
    products
})
}

server.get(products_route, products_function)

let id_route = '/api/products/:pid'
let id_function = (req,res) =>{
    let parametros= req.params
    console.log(parametros)
    let pid = Number(parametros.pid)
    console.log(pid)
    let findWithId = prodManager.getProductById(pid)
    console.log(findWithId)
    if(findWithId){
        return res.send({
            success:true,
          product:  findWithId
        })
    }else{
        return res.send({
            success:false,
            product: 'not found'
        })
    }
    
}

server.get (id_route, id_function)

let carts_route = '/api/carts';
let carts_function = async (req,res) => {
let carts = await cartsManager.getCarts()
   return res.send({
    success:true,
    carts
})
}
server.get (carts_route, carts_function)

let cartId_route = '/api/carts/:cid'
let cartId_function = async (req,res) =>{
    let parametros= req.params
    console.log(parametros)
    let cid = Number(parametros.cid)
    console.log(cid)
    let findCartWithId = await cartsManager.getCartById(cid)
    console.log(findCartWithId)
    if(findCartWithId){
        return res.send({
            success:true,
          product:  findCartWithId
        })
    }else{
        return res.send({
            success:false,
            product: 'not found'
        })
    }
    
}
server.get (cartId_route, cartId_function)
