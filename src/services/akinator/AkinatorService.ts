import { Message, Whatsapp } from "venom-bot"
import { Aki } from "aki-api"
import { guess } from "aki-api/typings/src/functions"
import { AkinatorRepository } from "../../libraries/dataRepository/akinator/AkinatorRepository"

export class AkinatorService {
    private client: Whatsapp

    constructor(client: Whatsapp) {
        this.client = client
    }

    public async start(message: Message): Promise<void> {
        const aki = new Aki({ region: 'pt' })

        await aki.start()

        AkinatorRepository.setSession(message.from, aki)

        await this.client.sendText(message.from, aki.question ?? '')
        await this.client.sendText(message.from, this.processAnswers(aki.answers))
    }

    public async processResponses(message: Message): Promise<void> {
        const aki = AkinatorRepository.getSession(message.from)

        if(!aki){
            await this.client.sendText(message.from, 'Envie start para começar')

            return
        }

        if (aki.progress >= 70 || aki.currentStep >= 78) {
            await aki.win()

            await this.client.sendImage(message.from, this.processAnswers(aki.answers))

            AkinatorRepository.deleteSession(message.from)

            return
        }

        const value = this.parseResponse(message.body)

        if(value === null){
            await this.client.sendText(message.from, 'Opção inválida')

            return
        }

        await aki.step(value)

        await this.client.sendText(message.from, aki.question ?? '')
        await this.client.sendText(message.from, this.processAnswers(aki.answers))
    }

    private parseResponse(body: string): 0 | 1 | 2 | 3 | 4 | null {
        const value = parseInt(body)

        switch (value) {
            case 1:
                return 0
            case 2:
                return 1
            case 3:
                return 2
            case 4:
                return 3
            case 5:
                return 4
            default:
                return null
        }
    }

    private processAnswers(values: string[] | guess[]): string {
        if(typeof values[0] === 'string'){
            let modifiedValue = ''

            for (const [index, value] of values.entries()) {
                modifiedValue += `${index + 1} - ${value}\n`
            }

            return modifiedValue
        }

        if(!values[0]){
            return ''
        }

        return values[0].absolute_picture_path
    }
}