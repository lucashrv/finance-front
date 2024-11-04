import { api } from './../../store/index';
import {
    Container,
    TitleContainer,
    Title,
    TableContainer
} from './styled'
import Button from '../../components/Button'
import Table from '../../components/Table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSnackbars } from './../../hooks/useSnackbars';

export default function Categories() {

    const {
        useGetFindCountAllCategoriesQuery
    } = api

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1

    const { data: categoriesData, isLoading: categoriesLoading } = useGetFindCountAllCategoriesQuery({ page, limit: 10 })

    const [deleteCategory, { isLoading: loadingDelete }] = api.useDeleteCategoryMutation()

    const onDelete = async (id) => {
        try {
            const destroy = await deleteCategory(id).unwrap()
            successSnackbar(destroy.message)
        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }


    const tableHeader = [
        'Nome',
        'Data de criação'
    ]

    const rowContent = [
        'name',
        'created_at'
    ]

    return (<>
        <Container>

            <TitleContainer>
                <Title>Categorias</Title>

                <Button
                    label='Criar categoria'
                    padding='1rem'
                    fontSize='1.2rem'
                    color='success'
                    onClick={() => navigate('/categories/new')}
                />
            </TitleContainer>

            <TableContainer>
                <Table
                    title='Suas Categorias'
                    subtitle={'Veja suas categorias cadastradas'}
                    headers={tableHeader}
                    list={categoriesData?.rows}
                    count={categoriesData?.count}
                    rowContent={rowContent}
                    loading={categoriesLoading}
                    editRoute='/categories/edit'
                    onDelete={onDelete}
                    loadingDelete={loadingDelete}
                />
            </TableContainer>


        </Container>
    </>)
}