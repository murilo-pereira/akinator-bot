import { Aki } from 'aki-api'

export class AkinatorRepository {
    private static sessions: AkinatorSession = {}

    static setSession(key: string, akiInstance: Aki){
        AkinatorRepository.sessions[key] = akiInstance
    }

    static getSession(key: string): Aki | undefined {
        if(key in AkinatorRepository.sessions){
            return AkinatorRepository.sessions[key]
        }

        return undefined
    }
}

interface AkinatorSession {
    [key: string]: Aki
}