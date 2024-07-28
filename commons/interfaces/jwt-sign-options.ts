import type { EAlgorithms } from "../enums/algorithms-enum";

export interface JwtSignOptions {
    header: any,
    payload: any,
    alg?: EAlgorithms,
    secretKey: string
}