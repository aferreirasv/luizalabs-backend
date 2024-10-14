import Server from './adapters/http/server'
import OrderHandler from './adapters/http/order/handler'
import OrderService from './domain/order/service'
import DBClient from './adapters/data/db'

function main() {
    const dbClient = new DBClient()
    const service = new OrderService(dbClient)
    const handler = new OrderHandler(service)
    const server = new Server(handler)
    server.listen(process.env.PORT || '8000')
}

main()
