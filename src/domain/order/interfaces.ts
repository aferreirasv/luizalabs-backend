import Status from './status'

export interface Order {
    id?: string
    customer: string
    status: Status
    date: string
    cart: Product[]
    subtotal?: number
    shipping: number
    total?: number
}

export interface Product {
    amount: number
    price: number
    name: string
}

export interface Orders {
    count: number
    orders: Order[]
}

export interface Pricing {
    total: number
    subtotal: number
}