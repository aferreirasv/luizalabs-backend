export default class Product {
    amount: number
    price: number
    name: string

    constructor(amount: number,price: number,name : string) {
        this.amount = amount
        this.price = price
        this.name = name
    }
}