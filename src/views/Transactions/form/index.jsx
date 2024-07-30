import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Container,
    Grid,
    Paper
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Title from '../../../components/Title';
import Select from '../../../components/Select';
import { useSnackbars } from '../../../hooks/useSnackbars';
import Separator from '../../../components/Separator/index';
import { useGetAllQuery } from '../../../store/category/categorySliceApi'
import createSchema from './../../../schemas/transaction/createSchema';
import { useCreateMutation } from '../../../store/transaction/transactionSliceApi';

export default function TransactionsForm() {

    const params = useParams()

    const id = useMemo(() => !!params.id, [])

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const { data: getAllCategory, isLoading: categoryLoading } = useGetAllQuery()

    const [
        create,
        { isLoading: loadingCreate }
    ] = useCreateMutation()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        // resolver: zodResolver(id ? updateSchema : createSchema),
        resolver: zodResolver(createSchema),
        // values: userEdit,
        resetOptions: {
            keepDirtyValues: true
        }
    })

    !categoryLoading && setValue('category_id', getAllCategory[0].id)

    const onSave = async (data) => {
        console.log(data);
        try {
            // const save =
            //     id
            //         ? await updateUser({ id: params.id, body: data }).unwrap()
            //         : await signUp(data).unwrap()

            const save = await create(data)

            successSnackbar(save.data.message)
        } catch (error) {
            // errorSnackbar(error.data.error)
        }
    }

    const selectOptions = !!getAllCategory ? getAllCategory.map(item => {
        return { label: item.name, value: item.id }
    }) : []

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
                            label='Item da transação'
                            register={register('description')}
                            errors={errors.description}
                        />
                        <Separator />
                        <Select
                            label="Categoria"
                            register={register('category_id', {
                                setValueAs: v => Number(v),
                            })}
                            options={selectOptions}
                            errors={errors.category_id}
                        />
                        <Separator />
                        <Input
                            label='Valor da transação'
                            placeholder='Rendimento + / Despesa -'
                            type='number'
                            value={e => console.log(e.target.value)}
                            register={register('transaction', {
                                setValueAs: v => parseFloat(v),
                            })}
                            errors={errors.transaction}
                        />
                        <Separator />
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
                                loading={loadingCreate}
                                onClick={() => navigate(-1)}
                            />
                            <Button
                                label={`${id ? 'Editar' : 'Cadastrar'}`}
                                padding='3px'
                                fontSize='11px'
                                color='success'
                                loading={loadingCreate}
                            />
                        </Grid>
                    </Box>
                </Container>
            </Paper>
        </Grid >
    )
}