import { Buffer } from "buffer";
import { importPKCS8, SignJWT } from "jose";
import type { JwtSignOptions } from "~/commons/interfaces/jwt-sign-options";
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

export async function jwtSign(jwtSignOptions: JwtSignOptions) {
    let secret, alg;

    if(!jwtSignOptions.alg) {
        alg = jwtSignOptions.header['alg']
    } else {
        alg = jwtSignOptions.alg
    }

    if(alg.startsWith('HS')) {
        secret = new TextEncoder().encode(jwtSignOptions.secretKey)
    } else {
        secret = await importPKCS8(jwtSignOptions.secretKey, alg);
    }

    return await new SignJWT(jwtSignOptions.payload)
        .setProtectedHeader({
            alg: jwtSignOptions.alg,
            typ: 'JWT',
            ...jwtSignOptions.header
        })
        .sign(secret);
}