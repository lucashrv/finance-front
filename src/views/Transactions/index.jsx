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

export default function Transactions() {

    const {
        useGetFindCountAllTransactionsQuery,
        useDeleteTransactionMutation
    } = api

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page')) || 1

    const navigate = useNavigate()

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const { data: userTransactions, isLoading: transactionsLoading } = useGetFindCountAllTransactionsQuery({ page, limit: 10 })

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

    const userTransactionsFormated = !!userTransactions ?
        userTransactions?.rows?.map(item => {

            const options = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }

            const date = new Date(item.created_at).toLocaleDateString('pt-br')

            return {
                ...item,
                transaction: item.transaction.toLocaleString('pt-BR', options),
                category_name: item['category.name'],
                date
            }
        }) : []

    const rowContent = [
        'description',
        'category_name',
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

            <TableContainer>
                <Table
                    title='Suas Transações'
                    subtitle={'Veja suas transações cadastradas'}
                    headers={tableHeader}
                    rowContent={rowContent}
                    list={userTransactions?.rows}
                    count={userTransactions?.count}
                    loading={transactionsLoading}
                    editRoute='/transactions/edit'
                    onDelete={onDelete}
                    loadingDelete={loadingDelete}
                />
            </TableContainer>


        </Container>
    </>)
}