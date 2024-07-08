export const useJwtForm = () => {
    return useState('jwtForm', () => reactive({
        token: '',
        attack: '',
        payload: ''
    }));
}
