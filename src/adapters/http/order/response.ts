import { Product } from '../../../domain/order/interfaces'
import Status from '../../../domain/order/status'

interface PostOrderResponse {
    id: string
    customer: string
    status: Status
    date: string
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

interface GetOrderResponse {
    id: string
    customer: string
    status: Status
    date: string
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

interface PutOrderResponse {
    id: string
    customer: string
    status: Status
    date: string
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

interface ListOrdersResponseItem {
    id: string
    customer: string
    status: Status
    date: string
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}

interface ListOrdersResponse {
    count: number
    orders: ListOrdersResponseItem[]
}


export {ListOrdersResponse, GetOrderResponse, PostOrderResponse, PutOrderResponse}