export class Order {
    id: String
    customer: String
    status: Status
    date: Date
    cart: Product[]
    subtotal: Number
    shipping: Number
    total: Number

    constructor(
        id: String, customer: String, status: Status,
        date : Date, cart: Product[], subtotal: Number, 
        shipping: Number, total: Number
    ){
        this.id = id
        this.customer = customer
        this.status = status
        this.date = date
        this.cart = cart
        this.subtotal = subtotal
        this.shipping = shipping
        this.total = total
    }
}

enum Status {
    "pendente",
    "enviado",
    "entregue"
}

class Product {
    amount: Number
    price: Number
    name: String

    constructor(amount: Number,price: Number,name : String) {
        this.amount = amount
        this.price = price
        this.name = name
    }
}