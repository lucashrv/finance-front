
// import { Select as SelectMui } from '@mui/joy';
// import Option from '@mui/joy/Option';
// import InputErrorMessage from '../InputErrorMessage';

// export default function Select(props) {

//     const {
//         label,
//         options = [],
//         register,
//         defaultValue,
//         errors,
//         ref
//     } = props

//     return (<>
//         <SelectMui
//             placeholder={label}
//             style={{ maxWidth: 320, marginTop: 5 }}
//             {...register}
//             defaultValue={defaultValue}
//             ref={ref}
//         >
//             {options.map((item, i) => (
//                 <Option
//                     key={i}
//                     value={item.value}
//                 >
//                     {item.label}
//                 </Option>
//             ))}
//         </SelectMui>
//         {
//             errors &&
//             <InputErrorMessage message={errors.message} />
//         }
//     </>)
// }
import InputErrorMessage from '../InputErrorMessage'
import Separator from '../Separator'
import { OptionStyled, P, SelectStyled } from './styled'

export default function Select(props) {

    const {
        label,
        register,
        defaultValue,
        options = [],
        errors,
    } = props

    return (<>
        <Separator height='5px' />

        <P>{label}</P>

        <Separator />
        <SelectStyled
            id={label}
            {...register}
            defaultValue={defaultValue}
        >
            {options.map((item, i) => (
                <OptionStyled
                    key={i}
                    value={item.value}
                >
                    {item.label}
                </OptionStyled>
            ))}
        </SelectStyled>
        {
            errors &&
            <InputErrorMessage message={errors.message} />
        }
    </>)
}