
class ProductManager{
    constructor(){
        this.products = []


    }
    addProduct({title, description, price, thumbnail, code, stock}){

        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined || title === undefined  ){
                console.log('ERROR, todos los campos son obligatorios')
        }else{
            let id
        if (this.products.length === 0){
            id = 1
        } else {
            
            let lastProduct = this.products[this.products.length-1]
            
           id = lastProduct.id + 1
        }
        let product = {title, description, price, thumbnail, code, stock, id}
        this.products.push(product)
        }   
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
     }
     
    }
}


    let modificarProductos = new ProductManager()

    modificarProductos.addProduct({title: 'cama', description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})
    modificarProductos.addProduct({description: 'para dormir', price:5, thumbnail: 'imgsource', code: 1 , stock: 10})

    modificarProductos.getProducts()

    modificarProductos.getProductById(1)
    modificarProductos.getProductById(2)
