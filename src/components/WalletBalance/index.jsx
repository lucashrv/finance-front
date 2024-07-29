import {
    Container,
    Title,
    Value
} from './styled'

export default function WalletBalance(props) {

    const {
        title,
        value,
        isBalance
    } = props

    return (
        <Container>

            <Title>{title}</Title>

            <Value $isBalance={isBalance}>{value}</Value>

        </Container>
    )
}