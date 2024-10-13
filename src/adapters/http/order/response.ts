import { Product } from '../../../domain/order/interfaces'
import Status from '../../../domain/order/status'

interface PostOrderResponse {
    id: string
    customer: string
    status: Status
    date: Date
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

interface GetOrderResponse {
    id: string
    customer: string
    status: Status
    date: Date
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

interface PutOrderResponse {
    id: string
    customer: string
    status: Status
    date: Date
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

interface ListOrdersResponse {
    id: string
    customer: string
    status: Status
    date: Date
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

export {ListOrdersResponse, GetOrderResponse, PostOrderResponse, PutOrderResponse}