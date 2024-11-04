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

export const NameContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    width: 32.2rem;
`

export const PassContainer = styled.div`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    width: 32.2rem;
`

export const ButtonName = styled.button`
    margin-top: .5rem;
    padding: 1rem 0;
    font-size: 1.5rem;
    background-color: #155eef;
    color: #fff;
    border-radius: 1rem;
    border: none;
    cursor: pointer;

    &:hover{
        background-color: #3473f1;
    }
`

export const ButtonPass = styled.button`
    margin-top: .5rem;
    padding: 1rem 0;
    font-size: 1.5rem;
    background-color: #155eef;
    color: #fff;
    border-radius: 1rem;
    border: none;
    cursor: pointer;

    &:hover{
        background-color: #3473f1;
    }
`