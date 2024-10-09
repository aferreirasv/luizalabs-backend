import { ServerRoute,Request, ResponseToolkit,ResponseObject, PluginProperties } from "@hapi/hapi";
import Service from '../../../domain/service'
import Order from '../../../domain/order'
import Product from '../../../domain/product'
import Status from '../../../domain/status'


export default class OrderHandler {

    service: Service

    constructor(service: Service) {
        this.service = service
    }

    async getOrder(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
        const res = await this.service.getOrder(request.params.id)
        if(res == null){
            return h.response().code(404)
        }
        return h.response(<IListOrder>res)
    }


    
    async listOrders(request: Request,h: ResponseToolkit): Promise<ResponseObject> {
        const res = await this.service.listOrders(parseInt(request.query.page), parseInt(request.query.amount))
        if(res == null) {
            return h.response().code(404)
        }
        return h.response({data: {page: request.query.page, orders: <IListOrder[]>res}})
    }
    
    async createOrder(request: Request, h:ResponseToolkit): Promise<ResponseObject> {
        if(this.validatePayload(request.payload)) {
            const {customer, status, cart, shipping} = <IPostOrder>request.payload
            const order = new Order(customer, status, cart, shipping)
            const res = await this.service.createOrder(order)
            console.log(res)
            return h.response(<IListOrder>res)
        }
        return h.response().code(400)
    }

    validatePayload(payload: any):boolean {
        if(payload.customer&&payload.status&&payload.cart&&payload.shipping)
        {
            return true
        }
        return false
    }

}

interface IPostOrder {
    customer: string
    status: string
    cart: Product[]
    shipping: number
}

interface IListOrder {
    id: string
    customer: string
    status: Status
    date: Date
    cart: Product[]
    shipping: number
    subtotal: number
    total: number
}