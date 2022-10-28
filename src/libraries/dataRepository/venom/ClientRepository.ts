import { Whatsapp } from 'venom-bot'

export class ClientRepository {
    private static client: Whatsapp
    private static isConnected: boolean
    private static base64: string

    public static setClient(client: Whatsapp) {
        ClientRepository.client = client
    }

    public static getClient(): Whatsapp {
        return ClientRepository.client
    }

    public static setIsConnected(isConnected: boolean) {
        ClientRepository.isConnected = isConnected
    }

    public static getIsConnected(): boolean {
        return ClientRepository.isConnected
    }

    public static setBase64(base64: string) {
        ClientRepository.base64 = base64
    }

    public static getBase64(): string {
        return ClientRepository.base64
    }
}