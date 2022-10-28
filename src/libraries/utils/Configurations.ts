export namespace Configurations {
    export function getServerPort(): string {
        return process.env.SERVER_PORT!
    }

    export function getVenomSessionName(): string {
        return process.env.VENOM_SESSION_NAME!
    }

    export function getVenomFolderNameToken(): string {
        return process.env.VENOM_FOLDER_NAME_TOKEN!
    }
}