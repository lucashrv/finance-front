import Drawer from '@mui/joy/Drawer';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MenuIcon from '@mui/icons-material/Menu';
import { DrawerContainer } from './styled';
import {
    LogoContainer,
    Logo
} from '../Navbar/styled';

export default function DrawerMenu() {
    const [openDrawer, setOpenDrawer] = useState(false);

    const navigate = useNavigate()

    const toggleDrawer = (event) => {
        setOpenDrawer(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        navigate('/login')
    }

    return (
        <DrawerContainer>
            <ButtonGroup variant="plain">
                <Button onClick={toggleDrawer}>
                    <MenuIcon sx={{ fontSize: '3rem' }} />
                </Button>
            </ButtonGroup>

            <Drawer
                anchor='right'
                open={openDrawer}
                onClose={toggleDrawer}
            >
                <LogoContainer
                    onClick={() => {
                        navigate('/overview')
                        toggleDrawer()
                    }}
                    style={{
                        margin: '3rem auto',
                    }}
                >
                    <AttachMoneyIcon
                        sx={{
                            fontSize: '3.7rem',
                            color: '#155eef'
                        }}
                    />

                    <Logo>finance</Logo>
                </LogoContainer>

                <List
                    sx={{ fontSize: '2.2rem', textAlign: 'center' }}
                >
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate('/overview')
                                toggleDrawer()
                            }}
                        >
                            Visão geral
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate('/transactions')
                                toggleDrawer()
                            }}
                        >
                            Transações
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate('/categories')
                                toggleDrawer()
                            }}
                        >
                            Categorias
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate('/overview')
                                toggleDrawer()
                            }}
                        >
                            Carteira
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={handleLogout}
                            style={{ color: '#155eef' }}
                        >
                            Sair
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </DrawerContainer>
    );
}