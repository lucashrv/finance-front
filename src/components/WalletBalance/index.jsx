import {
    Container,
    Title,
    Value,
    ProgressContainer,
} from './styled'
import { CircularProgress } from '@mui/joy'

export default function WalletBalance(props) {

    const {
        title,
        value,
        color = "#000",
        loading = true
    } = props

    return (
        <Container>

            <Title>{title}</Title>

            {!loading && (
                <Value $color={color}>{value}</Value>
            )}

            {loading && (
                <ProgressContainer>
                    <CircularProgress size='md' variant="soft" />
                </ProgressContainer>
            )}

        </Container>
    )
}