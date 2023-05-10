import {Router} from 'express';
import cartsManager from '../../managers/CartManager.js'
import prodManager from '../../managers/ProductManager.js';
const router = Router()


router.get('/', async(req,res) =>{
    try{
        let carts = await cartsManager.getCarts()
        if (carts.length>0){
            return res.json({
                status:200,
                message: carts
            })
        }else{
            return res.json({
                status:400,
                message: 'not found'
            })
        }
    }catch(error){
        error
    }
})
router.post('/', async (req,res) =>{
    try{
        let response = await cartsManager.addCart(req.body)
        if (response===201){
            return res.json ({
                status:201,
                message: 'cart created'
            })
        }
        return res.json({
            status:400,
            message:'not created'
        })
    }catch(error){
        error
    }
})

router.get ('/:cid', async (req,res) =>{
    let parametros= req.params
    console.log(parametros)
    let cid = Number(parametros.cid)
    console.log(cid)
    let findCartWithId = await cartsManager.getCartById(cid)
    console.log(findCartWithId)
    if(findCartWithId){
        return res.send({
            success:true,
            cart:  findCartWithId
        })
    }else{
        return res.send({
            success:false,
            product: 'not found'
        })
    }
    
})


router.delete('/:cid', async (req, res) => {
    if(req.params.cid){
        try{
            let id = Number(req.params.cid);
            await cartsManager.deleteCart(id);
            return res.json({
                status: 200,
                message: 'Cart deleted!',
            })
        }catch(error){
            console.log(error);
            return res.json({
            status: 500,
            message: 'Internal server error',
        });
        }
    }else{
            res.json({
            status: 400,
            message: 'Error, missing data',
            });
    }

    })


    router.put('/:cid/product/:pid/:quantity', async (req, res) => {
        const {cid, pid, quantity} = req.params;
        const data = req.body;
        if (data && cid && pid && quantity) {
          try {
            console.log('la data es', data)
            let carrito = await cartsManager.getCartById(cid)
            let product = await prodManager.getProductById(pid)
            if(product.stock<quantity){
                data.quantity = product.stock
            }
            console.log(product.stock)
            console.log(data.quantity)
            let substraction = product.stock - data.quantity
            let addition = Number(carrito.quantity) + Number(data.quantity)
            await cartsManager.updateCart(Number(cid), {quantity:addition});
            await prodManager.updateProduct(product.id, {stock:substraction} )
            return res.json({
              status: 200,
              message: 'Cart updated!',
            });
          } catch (error) {
            console.log(error);
            return res.json({
              status: 500,
              message: 'Internal server error',
            });
          }
        } else {
          res.json({
            status: 400,
            message: 'Error, missing data',
          });
        }
      })
      
      router.delete('/:cid/product/:pid/:quantity', async (req, res) => {
        const {cid, pid, quantity} = req.params;
        const data = req.body;
        if (data && cid && pid && quantity) {
          try {
            let carrito = await cartsManager.getCartById(cid)
            let product = await prodManager.getProductById(pid)
            let substraction = 0;
            let addition = 0;
            if((Number(carrito.quantity) - Number(data.quantity))<0){
              substraction = 0;
              addition = Number(product.stock) + Number(carrito.quantity)
            }else{
              substraction = Number(carrito.quantity) - Number(data.quantity)
              addition = Number(product.stock) + Number(data.quantity)
            }
            console.log('substraction es ', substraction)
            console.log('addition es', addition)
            await cartsManager.updateCart(Number(cid), {quantity:substraction});
            await prodManager.updateProduct(product.id, {stock:addition} )
            return res.json({
              status: 200,
              message: 'Cart updated!',
            });
          } catch (error) {
            console.log(error);
            return res.json({
              status: 500,
              message: 'Internal server error',
            });
          }
        } else {
          res.json({
            status: 400,
            message: 'Error, missing data',
          });
        }
      });

export default router