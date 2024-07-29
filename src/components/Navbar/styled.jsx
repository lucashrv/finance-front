import styled from "styled-components";

export const NavbarContainer = styled.header`
    height: 8.8rem;
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    box-shadow: 1px 1px 30px 5px rgba(0, 0, 0, 0.144);
    padding: 0 4rem;
`

export const LogoContainer = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const Logo = styled.h1`
    color: #101828;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 3rem;
`

export const Menu = styled.ul`
    display: flex;
    align-items: center;
`

export const MenuItem = styled.li`
    &>a {
        color: ${(props) => props.$active ? '#155eef' : '#000000ac'};
        background-color: ${(props) => props.$active ? '#155eef28' : '#fff'};
        font-size: 1.6rem;
        font-weight: 600;
        padding: .5rem 1rem;
        border-radius: .8rem;
        white-space: nowrap;
    }

    &>a:hover {
        color: #155eef;
        background-color: #155eef28;
    }
`

export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
`

export const AvatarContainer = styled.div`

`
