import { config } from "dotenv"
import { Whatsapp } from "venom-bot"
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

    clientService.create().then(async (client: Whatsapp) => {
        if(Configurations.getWhatsappProfileName().length > 0){
            await client.setProfileName(Configurations.getWhatsappProfileName())
        }
    }).catch((err) => {
        console.log(err)

        throw err
    })
}


