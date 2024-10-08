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
        console.log(request.params)
        const res = await this.service.getOrder(request.params.id)
        if(res == null){
            return h.response().code(404)
        }
        return h.response(res)
    }


    
    async listOrders(request: Request,h: ResponseToolkit): Promise<ResponseObject> {
        return h.response("Listing all orders")
    }
    
    async createOrder(request: Request, h:ResponseToolkit): Promise<ResponseObject> {
        if(this.validatePayload(request.payload)) {
            const {customer, status, cart, shipping} = <IPostOrder>request.payload
            const order = new Order(customer, status, cart, shipping)
            const res = await this.service.createOrder(order)
            console.log(res)
            return h.response("Order created sucessfully")
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