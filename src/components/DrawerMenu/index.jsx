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
                        navigate('/')
                        toggleDrawer()
                    }}
                    style={{
                        margin: '3rem auto',
                        paddingRight: '1rem'
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
                    sx={{ fontSize: '2.4rem', gap: 1 }}
                >
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate('/')
                                toggleDrawer()
                            }}
                        >
                            <p style={{ width: '100%', textAlign: 'center' }}>Visão geral</p>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate('/transactions')
                                toggleDrawer()
                            }}
                        >
                            <p style={{ width: '100%', textAlign: 'center' }}>Transações</p>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                navigate('/categories')
                                toggleDrawer()
                            }}
                        >
                            <p style={{ width: '100%', textAlign: 'center' }}>Categorias</p>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={handleLogout}
                            style={{ color: '#155eef' }}
                        >
                            <p style={{ width: '100%', textAlign: 'center' }}>Sair</p>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </DrawerContainer>
    );
}