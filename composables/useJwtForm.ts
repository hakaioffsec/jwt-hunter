import { EAttacks } from "~/commons/enums/attacks-enum";

export const useJwtForm = () => {
  return useState('jwtForm', () => reactive({
    token: '',
    attack: EAttacks.CUSTOM,
    payload: ''
  }))
}
