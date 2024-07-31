import {
    Container,
    HeaderContainer,
    TableContainer,
    TableHead,
    TableRow,
    Td,
    Th,
    Title,
    SubTitle,
    LoadingContainer
} from './styled'
import { CircularProgress } from '@mui/joy'

export default function Table(props) {
    const {
        title,
        subtitle,
        headers,
        list = [],
        rowContent = [],
        loading = true
    } = props

    return (
        <Container
        // style={{ width }}
        >

            <HeaderContainer>
                <Title>{title}</Title>
                <SubTitle>{subtitle}</SubTitle>
            </HeaderContainer>

            {loading && (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            )}

            <TableContainer>
                <TableHead>
                    <TableRow>
                        {headers.map((header, i) => (
                            <Th key={i}>{header}</Th>
                        ))}
                    </TableRow>
                </TableHead>
                {!loading && (<>
                    <tbody>
                        {list.map((item, index) => (
                            <TableRow key={index}>
                                {rowContent.map((content, i) => {
                                    let color = ''
                                    if (content === 'transaction') {
                                        if (item[content][0] === '-') {
                                            color = 'red'
                                        } else if (item[content][0] === 'R') {
                                            color = 'green'
                                        }
                                    }

                                    return (
                                        <Td $color={color} key={i}>{item[content]}</Td>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </tbody>
                </>)}
            </TableContainer>
        </Container>
    )
}