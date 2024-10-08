import Server from './src/adapters/http/server'
import Service from './src/domain/service'
import Client from './src/adapters/data/db'

function main() {
    const dbClient = new Client()
    const service = new Service(dbClient)
    const server = new Server(service)
    console.log({service, server})
    server.init()
}

main()