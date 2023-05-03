import fs from 'fs'

class CartManager{
    constructor(path){
    this.carts = []
    this.path = path
    this.init(path)
}
init(path){
    let file = fs.existsSync(path)
    if (!file){
        fs.writeFileSync(path, '[]')
            console.log('file created at path' + this.path)
            return 'file created at path' + this.path
    } else {
        this.carts = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        
    }
}
async addCart(productId, quantity){
    if (productId === undefined || quantity === undefined){
            console.log('ERROR, todos los campos son obligatorios')
        }else{
            try {
        
            let cart = { productId, quantity}
        
            if (this.carts.length === 0) {
                cart.id = 1 
            } else {
                let next_id = this.carts[this.carts.length-1].id+1
                cart.id = next_id
            
        }
        
        this.carts.push(cart)
        
        let data_json = JSON.stringify(this.carts,null,2)
        
        await fs.promises.writeFile(this.path,data_json)
        console.log('created cart´s  id: '+cart.id)
        return 'product´s id: '+cart.id
    } catch(error){
            console.log('addCart:error')
    }   }
}
async getCarts() {
    if (this.carts.length === 0) {
      console.log('getCarts: Not found');
      return 'Not found';
       }else{
        console.log(this.carts);
        return this.carts;
       }
     }
      
  async getCartById(id) {
       let cart = this.carts.find((cart) => cart.id === id);
       if (cart === undefined) {
             console.log('getCartById: Not found');
            return 'Not found';
    }else{
        console.log(cart);
        return cart;
    }
      
    
  }
}

let cartsManager = new CartManager('./data/carts.js')

// async function createCarts(){
// await cartsManager.addCart(2,4)
// await cartsManager.addCart(2,4)
// await cartsManager.addCart(2,4)
// await cartsManager.addCart(2,4)
// await cartsManager.addCart(2,4)
// }

// createCarts()

export default cartsManager