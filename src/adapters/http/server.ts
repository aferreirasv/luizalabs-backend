import * as Hapi  from '@hapi/hapi'

import OrderRouter from './order/router'
import OrderHandler from './order/handler'

import Service from '../../domain/service'


export default class Server {
    
    service: Service
    server: Hapi.Server<Hapi.ServerApplicationState>
    orderHandler: OrderHandler

    constructor(service : Service) {
        this.service = service
        this.server = Hapi.server({
            port: 8000,
            host: "localhost"
        })
        this.orderHandler = new OrderHandler(service)
    }  

    async init() {
        console.log({this: this, getOrder: this.getOrder})
        this.server.ext('onRequest', (request, h) => {
            console.log(`${request.method.toUpperCase()} ${request.path}`)
            return h.continue
        })
    
        this.server.route(OrderRouter.getRoutes(this.orderHandler))
        
        await this.server.start()
        console.log("Server running on %s", this.server.info.uri)
    }

    async getOrder(request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
        console.log(request.params)
        try {
            const res = await this.service.getOrder(request.params.id)
            if(res == null){
                console.log("Not Found")
                return h.response().code(404)
            }
            return h.response(res)
        } catch(e: any) {
            console.error(e)
            return h.response(e).code(500)
        }
        
    }

}

process.on('unhandleRejection', (err) => {
    console.log(err)
    process.exit(1)
})
