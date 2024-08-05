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
import { useSnackbars } from '../../../hooks/useSnackbars';
import { api } from '../../../store';
import createSchema from '../../../schemas/category/createSchema'
import updateSchema from '../../../schemas/category/updateSchema'

export default function CategoriesForm() {

    const {
        useCreateCategoryMutation,
        useUpdateCategoryMutation,
        useGetOneCategoryQuery,
    } = api

    const params = useParams()

    const id = useMemo(() => !!params.id, [])

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const { data: categoryEdit } = useGetOneCategoryQuery({ id: params.id }, { skip: !id })

    const [
        create,
        { isLoading: loadingCreate }
    ] = useCreateCategoryMutation()

    const [
        update,
        { isLoading: loadingUpdate }
    ] = useUpdateCategoryMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(id ? updateSchema : createSchema),
        values: categoryEdit,
        resetOptions: {
            keepDirtyValues: true
        }
    })

    const onSave = async (data) => {
        try {
            const save =
                id
                    ? await update({ id: params.id, body: data }).unwrap()
                    : await create(data).unwrap()

            successSnackbar(save.message)
        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }

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
                <Title>{`${id ? 'Editar' : 'Cadastrar'} Categoria`}</Title>
                <Container component="main" >
                    <Box component="form" noValidate onSubmit={handleSubmit(onSave)}>
                        <Input
                            label='Nome da categoria'
                            register={register('name')}
                            focus={!id}
                            errors={errors.name}
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
                                loading={loadingCreate || loadingUpdate}
                                onClick={() => navigate(-1)}
                            />
                            <Button
                                label={`${id ? 'Editar' : 'Cadastrar'}`}
                                padding='3px'
                                fontSize='11px'
                                color='success'
                                loading={loadingCreate || loadingUpdate}
                            />
                        </Grid>
                    </Box>
                </Container>
            </Paper>
        </Grid >
    )
}