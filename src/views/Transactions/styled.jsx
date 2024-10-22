import styled from "styled-components";

export const Container = styled.main`
    margin: 4rem auto;
    width: 90%;
`

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 450px) {
        justify-content: center;
        flex-direction: column;
        gap: 2rem;
    }
`

export const Title = styled.h1`
    font-size: 4rem;
`

export const TableContainer = styled.h1`
    margin-top: 3rem;
`
