import { config } from "dotenv"
import { createExpressServer } from 'routing-controllers'
import { Configurations } from "./libraries/utils/Configurations"
import { RoutesController } from "./http/controllers/RoutesController"
import { ClientService } from "./services/venom/ClientService"

config()

createClient()

const routesController = new RoutesController()

const app = createExpressServer({
    routePrefix: '/api',
    controllers: routesController.getControllers()
})

app.listen(Configurations.getServerPort(), () => console.log(`server running on port ${Configurations.getServerPort()}`))

function createClient() {
    const clientService = new ClientService()

    clientService.create().then().catch((err) => {
        console.log(err)

        throw err
    })
}


