import type { EAlgorithms } from "../enums/algorithms-enum";

export interface IAttack {
    algorithms: EAlgorithms | EAlgorithms[],
    options: any
}
