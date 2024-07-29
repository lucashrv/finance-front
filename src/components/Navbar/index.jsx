import { useEffect, useState } from 'react';
import {
    NavbarContainer,
    LogoContainer,
    Logo,
    Menu,
    MenuItem,
    UserContainer,
    AvatarContainer
} from './styled'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/joy/Avatar';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import Dropdown from '@mui/joy/Dropdown';
import { Menu as JoyMenu } from '@mui/joy';
import MenuButton from '@mui/joy/MenuButton';
import { MenuItem as JoyMenuItem } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';


export default function Navbar() {

    const [activeLink, setActiveLink] = useState(0)

    const navigate = useNavigate()

    const location = useLocation();

    const userName = JSON.parse(localStorage.getItem('user')).name

    const handleSetActiveLink = (index) => {
        setActiveLink(index)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        navigate('/login')
    }

    useEffect(() => {
        const pathname = location.pathname

        MenuLinks.map(item => {
            if (pathname === item.link) {
                handleSetActiveLink(item.id)
            }
        })
    }, [])

    const MenuLinks = [
        {
            id: 0,
            label: 'Visão geral',
            link: '/overview',
        },
        {
            id: 1,
            label: 'Transações',
            link: '/transactions',
        },
        {
            id: 2,
            label: 'Contas',
            link: '/overview',
        },
        {
            id: 3,
            label: 'Carteira',
            link: '/overview',
        },
    ]

    return (<>
        <NavbarContainer>

            <LogoContainer onClick={() => navigate('/')}>
                <AttachMoneyIcon
                    sx={{
                        fontSize: '3.7rem',
                        color: '#155eef'
                    }}
                />

                <Logo>finance</Logo>
            </LogoContainer>

            <Menu>
                {MenuLinks.map((item, i) => (
                    <MenuItem
                        key={i}
                        $active={activeLink === i ? 'true' : ''}
                        onClick={() => handleSetActiveLink(i)}
                    >
                        <Link to={item.link}>{item.label}</Link>
                    </MenuItem>
                ))}
            </Menu>

            <UserContainer>

                <AvatarContainer>
                    <Dropdown >
                        <MenuButton
                            slots={{ root: IconButton }}

                            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}

                        >
                            <Badge
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="soft"
                                badgeContent={
                                    <ArrowDropDownIcon sx={{ color: '#000' }} />
                                }
                                badgeInset="14%"
                                sx={{ '--Badge-paddingX': '0px', cursor: 'pointer' }}
                            >
                                <Avatar
                                    alt={userName}
                                    variant="solid"
                                    size='lg'
                                // src="/static/images/avatar/3.jpg"
                                />
                            </Badge>
                        </MenuButton>
                        <JoyMenu sx={{ fontSize: '1.5rem' }}>
                            <JoyMenuItem>Perfil</JoyMenuItem>
                            <JoyMenuItem>Conta</JoyMenuItem>
                        </JoyMenu>
                    </Dropdown>
                </AvatarContainer>

                <LogoutIcon
                    sx={{
                        fontSize: '2.5rem',
                        color: '#155eef',
                        cursor: 'pointer',
                    }}
                    onClick={handleLogout}
                />
            </UserContainer>

        </NavbarContainer>
    </>)
}