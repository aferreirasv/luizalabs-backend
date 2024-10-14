import * as Hapi  from '@hapi/hapi'
import OrderRouter from './order/router'    
import OrderHandler from './order/handler'
import OrderService from '../../domain/order/service'
import * as HapiSwagger from 'hapi-swagger'
import plugins from './plugins'

export default class Server {
    orderHandler: OrderHandler
    orderRouter: OrderRouter
    app: Hapi.Server<Hapi.ServerApplicationState>
    
    constructor(orderHandler: OrderHandler) {
        this.orderHandler = orderHandler
        this.orderRouter = new OrderRouter()
        this.app = Hapi.server({
            routes:{
                cors: {
                    origin: ['*'],
                    headers: ['Accept', 'Content-Type', 'Access-Control-Expose-Headers'],
                    additionalHeaders: ['X-Requested-With','X-Total-Count'], 
                }
            }
        })
        this.app.route(this.orderRouter.getRoutes(this.orderHandler))
        this.app.ext('onRequest', (request, h) => {
            console.log(`${request.method.toUpperCase()} ${request.path}`)
            return h.continue
        })
        
    }

    async registerPlugins() {
        return this.app.register(plugins)
    }
    
    async listen(port: string | number, host?: string) {
        this.app.settings.host = host || '0.0.0.0'
        this.app.settings.port = port
        
        try {
            await this.registerPlugins()
        } catch (e) {
            console.error('Failed registering plugins: ', e)
        }
        
        await this.app.start()
        console.log('Server running on %s', this.app.info.uri) 
    }
    
}
