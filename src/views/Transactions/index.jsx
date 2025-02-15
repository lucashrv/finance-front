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

export default function Transactions() {

    const {
        useGetFindCountAllTransactionsQuery,
        useDeleteTransactionMutation
    } = api

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1

    const search = searchParams.get('search') || ''

    const order = searchParams.get('order') || 'created_at'

    const orderType = searchParams.get('orderType') || 'DESC'

    const { data: userTransactions, isLoading: transactionsLoading } = useGetFindCountAllTransactionsQuery({ page, limit: 10, search, order, orderType })

    const [deleteTransaction, { isLoading: loadingDelete }] = useDeleteTransactionMutation()

    const onDelete = async (id) => {
        try {
            const destroy = await deleteTransaction(id).unwrap()
            successSnackbar(destroy.message)
        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }


    const tableHeader = [
        'Item',
        'Categoria',
        'Data',
        'Valor',
    ]

    const rowContent = [
        'description',
        'category.name',
        'created_at',
        'transaction'
    ]

    return (<>
        <Container>

            <TitleContainer>
                <Title>Transações</Title>

                <Button
                    label='Criar transação'
                    fontSize='1.2rem'
                    color='success'
                    onClick={() => navigate('/transactions/new')}
                />
            </TitleContainer>

            <InputSearch
                placeholder="Pesquisar transações"
            />

            <TableContainer>
                <Table
                    title='Suas Transações'
                    subtitle={'Veja suas transações cadastradas'}
                    headers={tableHeader}
                    rowContent={rowContent}
                    list={userTransactions?.rows}
                    loading={transactionsLoading}
                    count={userTransactions?.count}
                    editRoute='/transactions/edit'
                    onDelete={onDelete}
                    loadingDelete={loadingDelete}
                    initialOrder='created_at'
                    initialOrderType='DESC'
                />
            </TableContainer>


        </Container>
    </>)
}