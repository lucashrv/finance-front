import {
    Container,
    HeaderContainer,
    Title,
    TabsContainer,
    WalletContainer,
    TableContainer
} from './styled'
import WalletBalance from "../../components/WalletBalance"
import Table from '../../components/Table';
import { api } from '../../store';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { useSnackbars } from './../../hooks/useSnackbars';

export default function Overview() {

    const {
        useGetAllTransactionsQuery,
        useGetConnectedUserQuery
    } = api

    const { successSnackbar, errorSnackbar } = useSnackbars()

    const userName = JSON.parse(localStorage.getItem('user')).name

    const date = new Date();

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

    const startLastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0);
    const endLastMonth = new Date(date.getFullYear(), date.getMonth(), 0, 23, 59, 59);

    const startYear = new Date(date.getFullYear(), 0, 1, 0, 0, 0);
    const endYear = new Date(date.getFullYear(), 11, 31, 23, 59, 59);

    const tableHeader = [
        'Item',
        'Categoria',
        'Data',
        'Valor',
    ]

    const [buttonIndex, setButtonIndex] = useState('month');

    const [searchDate, setSearchDate] = useState({
        startDate: startOfMonth.toISOString(),
        endDate: endOfMonth.toISOString()
    })

    const { data: connectedUser, isLoading: userLoading } = useGetConnectedUserQuery()

    const { data: userTransactions, isLoading: transactionsLoading } = useGetAllTransactionsQuery({
        startDate: searchDate.startDate,
        endDate: searchDate.endDate
    })

    const [deleteTransaction, { isLoading: loadingDelete }] = api.useDeleteTransactionMutation()

    const onDelete = async (id) => {
        try {
            const destroy = await deleteTransaction(id).unwrap()
            successSnackbar(destroy.message)
        } catch (error) {
            errorSnackbar(error.data.error)
        }
    }

    const userTransactionsFormated = !!userTransactions ?
        userTransactions.map(item => {

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
        'date',
        'transaction'
    ]

    const income = !!userTransactions && userTransactions.reduce((acc, item) => {
        if (item.type === 'INCOME') {
            return acc + item.transaction
        }
        return acc
    }, 0)

    const expense = !!userTransactions && userTransactions.reduce((acc, item) => {

        if (item.type === 'EXPENSE') {
            return acc + item.transaction
        }
        return acc
    }, 0)

    return (
        <Container>

            <HeaderContainer>
                <Title>{`Olá, ${userName}`}</Title>

                <TabsContainer>
                    <ToggleButtonGroup
                        value={buttonIndex}
                        onChange={(event, newValue) => {
                            setButtonIndex(newValue);
                        }}
                    >
                        <Button
                            value="month"
                            sx={{
                                padding: '0.8rem 1.5rem',
                                fontSize: '1.2rem'
                            }}
                            onClick={() => {
                                setSearchDate({
                                    startDate: startOfMonth.toISOString(),
                                    endDate: endOfMonth.toISOString()
                                })
                            }}
                        >
                            Este mês
                        </Button>
                        <IconButton
                            value="lastmonth"
                            sx={{
                                padding: '0.8rem 1.5rem',
                                fontSize: '1.2rem'
                            }}
                            onClick={() => {
                                setSearchDate({
                                    startDate: startLastMonth.toISOString(),
                                    endDate: endLastMonth.toISOString()
                                })
                            }}
                        >
                            Último mês
                        </IconButton>
                        <IconButton
                            value="year"
                            sx={{
                                padding: '0.8rem 1.5rem',
                                fontSize: '1.2rem'
                            }}
                            onClick={() => {
                                setSearchDate({
                                    startDate: startYear.toISOString(),
                                    endDate: endYear.toISOString()
                                })
                            }}
                        >
                            Este ano
                        </IconButton>
                    </ToggleButtonGroup>
                </TabsContainer>
            </HeaderContainer>

            <WalletContainer>
                <WalletBalance
                    title='Saldo'
                    value={connectedUser?.balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                    color="#155eef"
                    loading={userLoading}
                />
                <WalletBalance
                    title='Rendimentos'
                    value={income.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                    color="green"
                    loading={transactionsLoading}
                />
                <WalletBalance
                    title='Despesas'
                    value={expense.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' })}
                    color="#e40000"
                    loading={transactionsLoading}
                />
            </WalletContainer>

            <TableContainer>
                <Table
                    title={'Últimas transações'}
                    subtitle={'Veja suas últimas transações realizadas'}
                    headers={tableHeader}
                    list={userTransactionsFormated}
                    rowContent={rowContent}
                    loading={transactionsLoading}
                    editRoute='/transactions/edit'
                    onDelete={onDelete}
                    loadingDelete={loadingDelete}
                />
            </TableContainer>

        </Container>
    )
}