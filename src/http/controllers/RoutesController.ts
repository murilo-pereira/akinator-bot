import { ClientController } from "./venom/ClientController"


export class RoutesController {
    public getControllers(): Function[] | string[] {
        return [
            ClientController
        ]
    }
}