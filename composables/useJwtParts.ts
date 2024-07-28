export const useJwtParts = () => {
    return useState('jwtParts', () => reactive({
        header: '',
        payload: '',
        secret: 'secret-to-sign-token'
    }))
}
