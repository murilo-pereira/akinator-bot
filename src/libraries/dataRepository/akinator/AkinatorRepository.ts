import { Aki } from 'aki-api'

export class AkinatorRepository {
    private static sessions: AkinatorSession = {}

    static setSession(key: string, akiInstance: Aki): void {
        AkinatorRepository.sessions[key] = akiInstance
    }

    static getSession(key: string): Aki | undefined {
        if(key in AkinatorRepository.sessions){
            return AkinatorRepository.sessions[key]
        }

        return undefined
    }

    static deleteSession(key: string): void {
        delete AkinatorRepository.sessions[key]
    }
}

interface AkinatorSession {
    [key: string]: Aki
}