import rmdir from 'rimraf'
import { create, Message, Whatsapp } from "venom-bot"
import { ClientRepository } from "../../libraries/dataRepository/venom/ClientRepository"
import { SocketStream } from "venom-bot/dist/api/model/enum"
import { AkinatorService } from "../akinator/AkinatorService"
import { Configurations } from "../../libraries/utils/Configurations"

export class ClientService {
    async create(): Promise<Whatsapp> {
        rmdir(`${__dirname}/${Configurations.getVenomFolderNameToken()}`, (_) => {})

        if(ClientRepository.getClient() && !ClientRepository.getIsConnected()) {
            await ClientRepository.getClient().close()
        }

        return create({
            session: Configurations.getVenomSessionName(),
            catchQR: (base64Qrimg) => {
                ClientRepository.setBase64(base64Qrimg)
            },
            folderNameToken: Configurations.getVenomFolderNameToken(),
            mkdirFolderToken: __dirname
        }).then(async (client) => {
            ClientRepository.setClient(client)
            ClientRepository.setBase64('')
            ClientRepository.setIsConnected(true)

            await this.stateControl(client)
            await this.startAkinator(client)

            return client
        }).catch((err) => {
            ClientRepository.setBase64('')
            ClientRepository.setIsConnected(false)
            return err
        })
    }

    private async stateControl(client: Whatsapp){
        await client.onStreamChange(async (state: SocketStream) => {
            if (state === SocketStream.DISCONNECTED) {
                ClientRepository.setIsConnected(false)
            }
        })
    }

    private async startAkinator(client: Whatsapp) {
        const akinatorService = new AkinatorService(client)

        await client.onMessage(async (message: Message) => {
            if(message.isGroupMsg){
                return
            }

            if ((message.body === 'start' || message.body === 'Start')) {
                return akinatorService.start(message)
            }

            return akinatorService.processResponses(message)
        })
    }

}