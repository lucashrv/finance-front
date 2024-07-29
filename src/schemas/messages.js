
const messages = (info = '') => {
    const message = {
        required: 'O campo é obrigatório',
        email: 'Formato de email inválido',
        minSize: `Deve conter pelo menos ${info} caracteres`,
        maxSize: `Deve conter ao máximo ${info} caracteres`,
        number: 'O campo deve ser numérico'
    }

    return message
}

export default messages
