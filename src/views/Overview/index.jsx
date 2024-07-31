import {
    Container,
    HeaderContainer,
    Title,
    TabsContainer,
    WalletContainer
} from './styled'
import WalletBalance from "../../components/WalletBalance"
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Table from '../../components/Table';
import { useGetAllQuery } from '../../store/transaction/transactionSliceApi';

export default function Overview() {

    const userName = JSON.parse(localStorage.getItem('user')).name

    const tableHeader = [
        'Item',
        'Categoria',
        'Data',
        'Valor',
    ]

    const { data: userTransactions, isLoading: transactionsLoading } = useGetAllQuery()

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

    return (
        <Container>

            <HeaderContainer>
                <Title>{`Olá, ${userName}`}</Title>

                <TabsContainer>
                    <Tabs
                        aria-label="date-tabs"
                        defaultValue={0}
                        sx={{ bgcolor: 'transparent' }}
                    >
                        <TabList
                            disableUnderline
                            sx={{
                                p: 0.5,
                                gap: 0.5,
                                borderRadius: 'xl',
                                bgcolor: '#fff',
                                color: '#000000ac',
                                fontSize: '1.6rem',
                                fontWeight: 600,
                                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                    boxShadow: 'sm',
                                    bgcolor: '#155eef28',
                                    color: '#155eef'
                                },
                            }}
                        >
                            <Tab
                                disableIndicator
                                onClick={() => { }}
                            >
                                Este mês
                            </Tab>
                            <Tab
                                disableIndicator
                                onClick={() => { }}
                            >
                                Último mês
                            </Tab>
                            <Tab
                                disableIndicator
                                onClick={() => { }}
                            >
                                Este ano
                            </Tab>
                        </TabList>
                    </Tabs>
                </TabsContainer>
            </HeaderContainer>

            <WalletContainer>
                <WalletBalance
                    title='Saldo'
                    value="R$ 55.852,65"
                    isBalance={true}
                />
                <WalletBalance
                    title='Rendimentos'
                    value="R$ 55.852,65"
                />
                <WalletBalance
                    title='Despesas'
                    value="R$ 55.852,65"
                />
            </WalletContainer>

            <Table
                title={'Últimas transações'}
                subtitle={'Veja suas últimas transações realizadas'}
                headers={tableHeader}
                list={userTransactionsFormated}
                rowContent={rowContent}
                loading={transactionsLoading}
            />

        </Container>
    )
}