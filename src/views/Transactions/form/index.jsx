import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Container,
    Grid,
    Paper
} from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Title from '../../../components/Title';
import Select from '../../../components/Select';
import { useSnackbars } from '../../../hooks/useSnackbars';
import Separator from '../../../components/Separator/index';

export default function TransactionsForm() {

    const params = useParams()

    const id = useMemo(() => !!params.id, [])

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const defaultValues = {
        transaction: 0,
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // resolver: zodResolver(id ? updateSchema : createSchema),
        defaultValues,
        // values: userEdit,
        resetOptions: {
            keepDirtyValues: true
        }
    })

    const onSave = async (data) => {
        console.log(data);
        try {
            // const save =
            //     id
            //         ? await updateUser({ id: params.id, body: data }).unwrap()
            //         : await signUp(data).unwrap()

            // successSnackbar(save.message)
        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }

    const selectOptions = [
        { label: 'Usuário', value: 'user' },
        { label: 'Administrador', value: 'admin' },
    ]

    return (
        <Grid container spacing={1}>
            <Paper
                sx={{
                    p: 2,
                    ml: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    minWidth: 250,
                    maxHeight: 'calc(100vh - 75px)',
                    overflow: 'auto',
                    margin: '3rem'
                }}
            >
                <Title>{`${id ? 'Editar' : 'Cadastrar'} Transação`}</Title>
                <Container component="main" >
                    <Box component="form" noValidate onSubmit={handleSubmit(onSave)}>
                        <Input
                            label='Transação'
                            register={register('transaction')}
                            focus={!id}
                            errors={errors.transaction}
                        />
                        <Separator />
                        <Input
                            label='Saldo'
                            register={register('balance', {
                                setValueAs: v => parseFloat(v),
                            })}
                            errors={errors.balance}
                        />
                        <Separator />
                        <Select
                            label="Permissões"
                            register={register('role')}
                            options={selectOptions}
                            errors={errors.role}
                        />
                        <Grid
                            container
                            style={{
                                padding: '25px 0 10px 0',
                                display: 'flex',
                                alignItems: 'center',
                                'justifyContent': 'flex-end',
                                gap: '10px',
                            }}
                        >
                            <Button
                                label='Voltar'
                                padding='3px'
                                fontSize='11px'
                                type='button'
                                loading={false}
                                onClick={() => navigate(-1)}
                            />
                            <Button
                                label={`${id ? 'Editar' : 'Cadastrar'}`}
                                padding='3px'
                                fontSize='11px'
                                color='success'
                                loading={false}
                            />
                        </Grid>
                    </Box>
                </Container>
            </Paper>
        </Grid >
    )
}