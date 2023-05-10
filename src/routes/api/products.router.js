import {Router} from 'express';
import prodManager from '../../managers/ProductManager.js'
const router = Router()


router.get('/', async(req,res) =>{
  try{
      let products = prodManager.getProducts()
      if (products.length>0){
          return res.json({
              status:200,
              message: products
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

router.get('/:pid', (req,res) =>{
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
    
})



router.post('/', async (req,res)=>{
    try{
        let title = req.body.title ?? null;
        let description = req.body.description ?? null;
        let price = req.body.price ?? null;
        let thumbnail = req.body.thumbnail ?? null;
        let code = req.body.code ?? null;
        let stock = req.body.stock ?? 0;
        if(title&&description&&price&&thumbnail&&code&&stock){
            let newProduct = await prodManager.addProduct({title, description, price, thumbnail, code, stock})
            return res.json({
                status:201,
                message:'product created with id ' + newProduct.id
        })} else{
            return res.json({
                status:400,
                message:'There`s missing information. Product couldn`t be created '
            })
            }
    }catch(error){
        return res.json({
            status:500,
            message: 'error'
        })
    }
        
})


router.put('/:pid', async (req, res) => {
    if (req.body && req.params.pid) {
      try {
        let id = Number(req.params.pid);
        let data = req.body;
        await prodManager.updateProduct(id, data);
        return res.json({
          status: 200,
          message: 'Product updated!',
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

  router.delete('/:pid', async (req, res) => {
    if(req.params.pid){
        try{
            let id = Number(req.params.pid);
            await prodManager.deleteProduct(id);
            return res.json({
                status: 200,
                message: 'Product deleted!',
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

export default router