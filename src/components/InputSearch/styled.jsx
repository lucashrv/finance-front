import styled from "styled-components";

export const ContainerSearch = styled.div`
    margin-top: 2rem;
`

export const Input = styled.input`
    width: 100%;
    height: 2.5rem;
    border-radius: 1.5rem 0 0 1.5rem;
    border: none;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 500;

    &:focus {
        outline: none;
    }
`

export const ButtonIcon = styled.button`
    background-color: #fff;
    height: 3rem;
    width: 3rem;
    border-radius: 1.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`