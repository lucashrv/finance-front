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
import InputSearch from '../../components/InputSearch';

export default function Categories() {

    const {
        useGetFindCountAllCategoriesQuery
    } = api

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1

    const search = searchParams.get('search') || ''

    const order = searchParams.get('order') || 'name'

    const orderType = searchParams.get('orderType') || 'ASC'

    const { data: categoriesData, isLoading: categoriesLoading } = useGetFindCountAllCategoriesQuery({ page, limit: 10, search, order, orderType })

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
                    fontSize='1.2rem'
                    color='success'
                    onClick={() => navigate('/categories/new')}
                />
            </TitleContainer>

            <InputSearch
                placeholder="Pesquisar categorias"
            />

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