import { ServerRoute,Request, ResponseToolkit,ResponseObject } from "@hapi/hapi";
import Service from '../../../domain/service'
import Order from '../../../domain/order'


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
    
}