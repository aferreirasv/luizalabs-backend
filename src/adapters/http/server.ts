import * as Hapi from '@hapi/hapi'

import orderRoutes from './order/router'
export const init = async () => {
    const server = Hapi.server({
        port: 8090,
        host: "localhost"
    })
   
    server.ext('onRequest', (request, h) => {
        console.log(request)
        return h.continue
    })

    server.route(orderRoutes)

    await server.start()
    console.log("Server running on %s", server.info.uri)
}

process.on('unhandleRejection', (err) => {
    console.log(err)
    process.exit(1)
})
