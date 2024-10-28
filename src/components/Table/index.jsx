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
    TdActions,
    PopoverButtonsContainer,
    PaginationContainer
} from './styled'
import { CircularProgress } from '@mui/joy'
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Popper
} from '@mui/material';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';

export default function Table(props) {
    const {
        title,
        subtitle,
        headers,
        list = [],
        rowContent = [],
        count = 0,
        loading = true,
        editRoute,
        onDelete,
        loadingDelete = true,
        rowsPerPage = 10,
    } = props

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const [idDelete, setIdDelete] = useState(null);

    const open = Boolean(anchorEl);
    const idOpen = open ? 'simple-popper' : undefined;

    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get('page')) || 1;

    const totalPages = Math.ceil(count / rowsPerPage)
    const [actualPage, setActualPage] = useState(initialPage);

    const toggleDelete = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

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
                                            <Button variant="plain" size='small' aria-describedby={idOpen}>
                                                <DeleteOutlineOutlinedIcon
                                                    fontSize='large'
                                                    sx={{
                                                        fontSize: '2.8rem',
                                                        marginTop: '0.3rem',
                                                        color: '#f11717',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={(e) => {
                                                        toggleDelete(e)
                                                        setIdDelete(item.id)
                                                    }}
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

            <PaginationContainer>
                <Pagination
                    count={totalPages}
                    page={actualPage}
                    onChange={(e, value) => {
                        setActualPage(value)
                        setSearchParams({ page: value });
                    }}
                    size='large'
                    showFirstButton
                    showLastButton
                />
            </PaginationContainer>

            <Popper id={idOpen} open={open} anchorEl={anchorEl}>
                <Box sx={{
                    border: 1,
                    p: 2,
                    bgcolor: '#f5f5f5',
                    borderRadius: '5px'
                }}
                >
                    <h6>Deseja deletar?</h6>
                    <PopoverButtonsContainer>
                        <button onClick={toggleDelete}>Cancelar</button>
                        {loadingDelete
                            ? <CircularProgress size='sm' />
                            : (
                                <button
                                    onClick={async () => {
                                        await onDelete(idDelete)
                                        toggleDelete()
                                    }}
                                >
                                    Deletar
                                </button>
                            )
                        }

                    </PopoverButtonsContainer>
                </Box>
            </Popper>
        </Container>
    )
}