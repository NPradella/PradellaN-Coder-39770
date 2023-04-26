const fs = require('fs')

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
            return 'product´s id: '+data.id
        } catch(error){
                console.log('addProduct:error')
        }   }
    }
    getProducts(){
            console.log(this.products)
            return this.products
    }
    getProductById(id){
    
     let producto = this.products.find(producto => producto.id === id )
     if(producto === undefined){
        console.log('Not Found')
     }else{
        console.log(producto)
        return producto
     }
     
    }

    async updateProduct(id, data){

        try {
            let product = this.getProductById(id)
            for (let prop in data){
                product[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('UpdateProduct: done ')
        } catch(error){
            console.log('updateProduct: error')
        }

    }

    async deleteProduct(id){
        try{
            this.products = this.products.filter(each=>each.id!==id)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('deleteProduct: done')
        }catch(error){
            console.log('deleteProduct: error')
        }

    }
}


    let modificarProductos = new ProductManager('./data/data.js')
    
    async function manageProducts(){
        await modificarProductos.addProduct({title: 'cama', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'mesa', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'puerta', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'casco', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'remera', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'campera', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'pantalon', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'gorro', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'auriculares', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'antifaz', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.addProduct({title: 'velador', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
        await modificarProductos.getProductById(9)
        await modificarProductos.updateProduct(9, { title: 'pelota'})
        await modificarProductos.deleteProduct(10)
        await modificarProductos.getProducts()
    }
    
    manageProducts()
    
    