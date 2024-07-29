import { ContainerFlexCenter } from "../../styles/utils";
import { zodResolver } from '@hookform/resolvers/zod';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import { useSnackbars } from '../../hooks/useSnackbars';
import signUpSchema from '../../schemas/user/signUpSchema';
import { useSignUpMutation } from '../../store/user/userSliceApi';

const defaultTheme = createTheme();

export default function SignUpIndex() {

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const [
        signUp,
        { isLoading: loadingSignUp }
    ] = useSignUpMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const handleSignUp = async (data) => {
        try {
            const create = await signUp(data).unwrap()

            successSnackbar(create.message)
            navigate('/login')
        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }

    return (
        <ContainerFlexCenter>

            <ThemeProvider theme={defaultTheme}>
                <Container
                    component="main"
                    maxWidth="xs"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '32rem'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#155eef' }}>
                            <AttachMoneyIcon />
                        </Avatar>
                        <Typography component="h1" variant="h3">
                            Crie sua conta
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 2 }}>
                            <Input
                                label='Nome'
                                focus={true}
                                register={register('name')}
                                errors={errors.name}
                            />
                            <Input
                                label='Email'
                                register={register('email')}
                                errors={errors.email}
                            />
                            <Input
                                label='Senha'
                                type='password'
                                register={register('password')}
                                errors={errors.password}
                            />
                            <Input
                                label='Confirme a senha'
                                type='password'
                                register={register('confirmPassword')}
                                errors={errors.confirmPassword}
                            />
                            <Grid item xs={10}>
                                <LoadingButton
                                    type="submit"
                                    loading={loadingSignUp}
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2, mb: 2, height: '4rem', fontSize: '1.2rem' }}
                                >
                                    CADASTRE-SE
                                </LoadingButton>
                            </Grid>
                            <Grid
                                container
                                style={{
                                    marginRight: '5rem'
                                }}
                                justifyContent="center"
                            >
                                <Grid item>
                                    <Link
                                        href="/login"
                                        variant="body2"
                                        sx={{
                                            fontSize: '1.6rem'
                                        }}
                                    >
                                        Já possui um conta? Entre
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </ContainerFlexCenter>
    )
}