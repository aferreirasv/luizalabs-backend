import * as Hapi  from '@hapi/hapi'
import OrderRouter from './order/router'    
import OrderHandler from './order/handler'
import OrderService from '../../domain/order/service'

export default class Server {
    orderHandler: OrderHandler
    orderRouter: OrderRouter
    app: Hapi.Server<Hapi.ServerApplicationState>
    
    constructor(service: OrderService) {
        this.orderHandler = new OrderHandler(service)
        this.orderRouter = new OrderRouter()
        this.app = Hapi.server({
            routes:{
                cors: {
                    origin: ['*'],
                    headers: ['Accept', 'Content-Type'],
                    additionalHeaders: ['X-Requested-With']
                }
            }
        })
        this.app.route(this.orderRouter.getRoutes(this.orderHandler))
        this.app.ext('onRequest', (request, h) => {
            console.log(`${request.method.toUpperCase()} ${request.path}`)
            return h.continue
        })
    }
    
    async listen(port: string | number, host?: string) {
        this.app.settings.host = host || '0.0.0.0'
        this.app.settings.port = port

        console.log(this.app.settings)
        
        await this.app.start()
        console.log('Server running one %s', this.app.info.uri) 
    }
    
}
