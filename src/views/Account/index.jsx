import { api } from './../../store/index';
import {
    Container,
    TitleContainer,
    Title,
    ButtonName,
    ButtonPass,
    NameContainer,
    PassContainer
} from './styled'
import { useNavigate } from 'react-router-dom';
import { useSnackbars } from './../../hooks/useSnackbars';
import Input from '../../components/Input';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import changeNameSchema from '../../schemas/user/nameSchema';
import changePasswordSchema from '../../schemas/user/passwordSchema';

export default function Account() {

    const {
        useGetConnectedUserQuery,
        useChangeUserNameMutation,
        useChangeUserPasswordMutation
    } = api

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const { data: connectedUser, isLoading: connectedUserLoading } = useGetConnectedUserQuery()

    const [
        updateName,
    ] = useChangeUserNameMutation()

    const [
        updatePass,
    ] = useChangeUserPasswordMutation()

    const {
        register: registerName,
        handleSubmit: handleSubmitName,
        formState: { errors: nameErrors }
    } = useForm({
        resolver: zodResolver(changeNameSchema),
        values: { name: connectedUser?.name },
    })

    const {
        register: registerPass,
        handleSubmit: handleSubmitPass,
        formState: { errors: passErrors }
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
    })

    const onSaveName = async (data) => {
        try {
            const save = await updateName(data).unwrap()

            localStorage.setItem('user', JSON.stringify({
                name: data.name,
            }))

            successSnackbar(save.message)
        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }

    const onSavePass = async (data) => {
        try {
            const save = await updatePass(data).unwrap()

            successSnackbar(save.message)

            localStorage.removeItem('token')
            localStorage.removeItem('user')

            setTimeout(() => {
                navigate('/login')
            }, 1000);

        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }

    return (<>
        <Container>

            <TitleContainer>
                <Title>Conta</Title>
            </TitleContainer>

            <Box component="form" noValidate onSubmit={handleSubmitName(onSaveName)}>
                <NameContainer>
                    <Input
                        label='Nome de usuário'
                        register={registerName('name')}
                        errors={nameErrors.name}
                    />

                    <ButtonName
                        type="submit"
                    >
                        Alterar Nome
                    </ButtonName>
                </NameContainer>
            </Box>

            <Box component="form" noValidate onSubmit={handleSubmitPass(onSavePass)}>
                <PassContainer>
                    <Input
                        label='Senha atual'
                        register={registerPass('currentPassword')}
                        type="password"
                        errors={passErrors.currentPassword}
                    />

                    <Input
                        label='Nova senha'
                        register={registerPass('newPassword')}
                        type="password"
                        errors={passErrors.newPassword}
                    />

                    <Input
                        label='Confirme a nova senha'
                        register={registerPass('confirmPassword')}
                        type="password"
                        errors={passErrors.confirmPassword}
                    />

                    <ButtonPass
                        type="submit"
                    >
                        Alterar Senha
                    </ButtonPass>
                </PassContainer>

            </Box>

        </Container>
    </>)
}