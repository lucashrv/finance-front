import styled from "styled-components";

export const Container = styled.main`
    margin: 4rem auto;
    width: 90%;
`

export const HeaderContainer = styled.section`
    margin: 4rem 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1200px) {
        flex-direction: column;
        gap: 4rem;
    }
`

export const Title = styled.h1`
    font-size: 3rem;
    max-width: 32rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const TabsContainer = styled.div``

export const WalletContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1200px) {
        flex-direction: column;
        gap: 3rem;
    }
`
