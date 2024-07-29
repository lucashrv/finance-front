import {
    Container,
    WalletContainer
} from './styled'
import WalletBalance from "../../components/WalletBalance"

export default function Overview() {

    return (
        <Container>
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
        </Container>
    )
}