import { EAttacks } from "~/commons/enums/attacks-enum";

export const useJwtForm = () => {
    return useState('jwtForm', () => reactive({
        token: getInitialJwt(),
        attack: EAttacks.CUSTOM,
        payload: getInitialJwt()
    }));
}
