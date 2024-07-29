// import TextField from '@mui/material/TextField';
// import InputErrorMessage from '../InputErrorMessage';

// const Input = (props) => {
//     const {
//         label = '',
//         type = 'text',
//         errors = false,
//         register,
//         focus = false,
//         ml = '0rem',
//         defaultValue
//     } = props

//     return (<>
//         <TextField
//             margin="none"
//             fullWidth
//             label={label}
//             type={type}
//             size="medium"
//             defaultValue={defaultValue}
//             {...register}
//             sx={{ maxWidth: 320, marginTop: 1, marginLeft: ml }}
//             autoFocus={focus}
//         />
//         {
//             errors &&
//             <InputErrorMessage message={errors.message} />
//         }
//     </>)
// }

// export default Input

import InputErrorMessage from '../InputErrorMessage'
import Separator from '../Separator'
import { InputStyled, P } from './styled'

export default function Input(props) {

    const {
        label,
        register,
        defaultValue,
        errors,
        type = 'text',
        focus = false
    } = props

    return (<>
        <Separator height='5px' />

        <P>{label}</P>

        <Separator />
        <InputStyled
            autoFocus={focus}
            {...register}
            defaultValue={defaultValue}
            type={type}
        />
        {
            errors &&
            <InputErrorMessage message={errors.message} />
        }
    </>)
}