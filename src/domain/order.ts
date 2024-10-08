import Product from './product'
import Status from './status'

export default class Order {
    id?: string
    customer: string
    status: Status
    date?: Date
    cart: Product[]
    subtotal?: number
    shipping: number
    total?: number

    constructor(
        id: string, customer: string, status: string,
        date : Date, cart: Product[], subtotal: number, 
        shipping: number, total: number
    ){
        this.id = id
        this.customer = customer
        this.status = Status[status as keyof typeof Status]
        this.date = date
        this.cart = cart
        this.subtotal = subtotal
        this.shipping = shipping
        this.total = total
    }

    init() {
        this.date = new Date()
        this.calculatePrices()
    }

    calculatePrices() {
        var acc : number = 0
        this.cart.forEach(
            (cur: Product) => {
                acc += (cur.amount * cur.price)
            }
        )
        this.subtotal = acc
        this.total = acc + this.shipping
    }
}



