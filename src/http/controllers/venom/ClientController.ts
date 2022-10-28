import 'reflect-metadata'
import { Get, Controller } from 'routing-controllers'
import { sleep } from "venom-bot/dist/utils/sleep"
import { ClientService } from "../../../services/venom/ClientService"
import { ClientRepository } from "../../../libraries/dataRepository/venom/ClientRepository"

@Controller('/client')
export class ClientController {
    private clientService: ClientService

    constructor() {
        this.clientService = new ClientService()
    }

    @Get("/get-qrcode")
    public async getQrCode() {
        if(ClientRepository.getIsConnected()) {
            return `<div>
                        <p>Client is connected!</p>
                    </div>`
        }

        this.clientService.create()

        while (ClientRepository.getBase64().length === 0){
            await sleep(1)
        }

        return `<div>
                    <img src="${ClientRepository.getBase64()}"  alt="qrcode"/>
                </div>`
    }
}