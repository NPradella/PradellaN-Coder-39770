import fs from 'fs'
class ProductManager{
    constructor(path){
        this.products = []
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
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
                console.log('data recovered')
                return 'data recovered'
            
        }
    }
    async addProduct({title, description, price, thumbnail, code, stock}){
        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || title === undefined  ){
                console.log('ERROR, todos los campos son obligatorios')}else
                {
        try {
            if(stock === undefined) {
                stock = 0;
            }
            
            let data = { title, description, price, thumbnail, code, stock }
            
            if (this.products.length === 0) {
                
                data.id = 1 
            } else {
                let next_id = this.products[this.products.length-1].id+1
                
                data.id = next_id
                
            }
            
            this.products.push(data)
            
            let data_json = JSON.stringify(this.products,null,2)
            
            await fs.promises.writeFile(this.path,data_json)
            console.log('created product´s  id: '+data.id)
            return data
        } catch(error){
                console.log('addProduct:error')
        }   }
    }
    getProducts(){
            console.log(this.products)
            return this.products
    }
    async getProductById(id){
     let producto = await this.products.find(each => each.id == id )
     if(!producto){
        console.log('Not Found')
     }else{
        return producto
     }
     
    }

    async updateProduct(id, data) {
        
        try {
            console.log('data ', data)
          let product = await this.getProductById(id);
          if (product) {
            for (let prop in data) {
              product[prop] = data[prop];
            }
            let data_json = JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, data_json);
            console.log('updateProduct: done');
          } else {
            console.log('Product not found');
          }
        } catch (error) {
          console.log('updateProduct: error');
          throw error;
        }
      }

      async deleteProduct(id) {
        try {
            let one = this.products.find(each=>each.id===id)
            if (one) {
                this.products = this.products.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('deleted product`s id : '+id)
                return 200
            }
            console.log('not found')
            return null
        } catch(error) {
            console.log(error)
            return null
        }
    }
}
let prodManager = new ProductManager('./src/data/products.json')



 
// class CartManager {
//     constructor(path){
//         this.carts = []
//         this.path = path
//         this.init(path)
//     }
//     init(path){
//         let file = fs.existsSync(path)
//         if (!file){
//             fs.writeFileSync(path, '[]')
//                 console.log('file created at path' + this.path)
//                 return 'file created at path' + this.path
//         } else {
//             this.carts = JSON.parse(fs.readFileSync(path,'UTF-8'))
//                 console.log('data recovered')
//                 return 'data recovered'
            
//         }
//     }
  
//     async addCart(productId, quantity) {
//         if (!productId || !quantity) {
//             console.log('ERROR: Debes proporcionar el id de producto y la cantidad');
//         }else{
//         try {
               
//           let cart = {
//             id: this.carts.length + 1,
//             products: [{productId, quantity }],
//           };
      
//           this.carts.push(cart);
      
//           const data_json = JSON.stringify(this.carts, null, 2);
//           await fs.promises.writeFile(this.path, data_json);
      
//           console.log('Carrito agregado, id: ' + cart.id);
//           return 'Carrito agregado, id: ' + cart.id;
//         } catch (error) {
//           console.log('addCart: error');
//           return 'addCart: error';
//         }}
//       }
  
//     getCarts() {
//       if (this.carts.length === 0) {
//         console.log('getCarts: Not found');
//         return 'Not found';
//       }
  
//       console.log(this.carts);
//       return this.carts;
//     }
  
//     getCartById(id) {
//       let cart = this.carts.find((cart) => cart.id === id);
//       if (cart === undefined) {
//         console.log('getCartById: Not found');
//         return 'Not found';
//       }
  
//       console.log(cart);
//       return cart;
//     }
//   }



//     let managerProduct = new ProductManager('./data/products.js')
//     let managerCarts = new CartManager('./data/carts.js')

//         async function createCarts(){
//             await managerCarts.addCart(2,4)
//             await managerCarts.addCart(5,1)
//             await managerCarts.addCart(7, 2)
//             await managerCarts.addCart(9, 4)
//         }

//         createCarts()
    // async function managerProduct(){
    //     await managerProduct.addProduct({title: 'cama', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'mesa', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'puerta', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'casco', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'remera', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'campera', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'pantalon', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'gorro', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'auriculares', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'antifaz', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.addProduct({title: 'velador', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    //     await managerProduct.getProductById(9)
    //     await managerProduct.updateProduct(9, { title: 'pelota'})
    //     await managerProduct.deleteProduct(10)
    //     await managerProduct.getProducts()
    // }
    export default prodManager;
    