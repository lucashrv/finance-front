import styled from "styled-components";

export const Container = styled.div`
    border: 1px solid #85858560;
    background-color: #fff;
    width: 40rem;
    border-radius: 1.2rem;
`

export const Title = styled.h4`
    color: #00000092;
    font-size: 1.7rem;
    padding-left: 2rem;
    margin: 2rem 0;
    font-weight: 600;
`

export const Value = styled.div`
    color: ${props => props.$color};
    padding-left: 2rem;
    font-size: 4rem;
    font-weight: 600;
    margin-bottom: 2rem;
`

export const ProgressContainer = styled.div`
    padding: 1rem 0 1rem 2rem;
`
