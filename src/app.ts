import Server from './adapters/http/server'
import OrderService from './domain/order/service'
import DBClient from './adapters/data/db'

function main() {
    const dbClient = new DBClient()
    const service = new OrderService(dbClient)
    const server = new Server(service)
    server.listen(process.env.PORT || '8000')
}

main()
