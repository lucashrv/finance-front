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
    LoadingContainer,
    TdActions
} from './styled'
import { CircularProgress } from '@mui/joy'
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

export default function Table(props) {
    const {
        title,
        subtitle,
        headers,
        list = [],
        rowContent = [],
        loading = true,
        editRoute,
        onDelete
    } = props

    const navigate = useNavigate()

    return (
        <Container>

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
                        <Th></Th>
                    </TableRow>
                </TableHead>
                {!loading && (<>
                    <tbody>

                        {!list.length && (
                            <TableRow>
                                <Td
                                    colSpan={rowContent.length}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '1.5rem',
                                        color: '#155eef'
                                    }}
                                >
                                    Nenhum resultado encontrado!
                                </Td>
                            </TableRow>
                        )}

                        {!!list.length && list.map((item, index) => (
                            <TableRow key={index}>
                                {rowContent.map((content, i) => {
                                    let color = ''
                                    if (content === 'transaction') {
                                        if (item.type === 'INCOME') {
                                            color = 'green'
                                        } else if (item.type === 'EXPENSE') {
                                            color = 'red'
                                        }
                                    }

                                    return (
                                        <Td $color={color} key={i}>{item[content]}</Td>
                                    )
                                })}
                                <TdActions>
                                    <Box sx={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}>
                                        <Tooltip title="Editar" variant="plain">
                                            <Button variant="plain" size='small'>
                                                <EditOutlinedIcon
                                                    sx={{
                                                        fontSize: '2.8rem',
                                                        marginTop: '0.3rem',
                                                        color: '#1a81d6',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => navigate(`${editRoute}/${item.id}`)}
                                                />
                                            </Button>
                                        </Tooltip>

                                        <Tooltip title="Deletar" variant="plain">
                                            <Button variant="plain" size='small'>
                                                <DeleteOutlineOutlinedIcon
                                                    fontSize='large'
                                                    sx={{
                                                        fontSize: '2.8rem',
                                                        marginTop: '0.3rem',
                                                        color: '#f11717',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => console.log('delete')}
                                                />
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </TdActions>
                            </TableRow>
                        ))}
                    </tbody>
                </>)}
            </TableContainer>
        </Container>
    )
}