import { Buffer } from "buffer";
import { TokenException } from "~/commons/exceptions/token-exception";

export function getJwtParts(token: string, signature: boolean = false): any {
    try {
        let tokenParts = token.split('.').map(part => {
            return Buffer.from(part, 'base64').toString('utf-8');
        })

        const header = JSON.parse(tokenParts[0]);
        const payload = JSON.parse(tokenParts[1]);
        
        let ret: string[] = [header, payload];

        if(signature) {
            ret.push(JSON.parse(tokenParts[2]));
        }

        return ret;
    } catch (e) {
        throw new TokenException();
    }
}

export function encodeJwtPart(part: {}) {
    return btoa(JSON.stringify(part)).replace(/={1,2}$/, '')
}
