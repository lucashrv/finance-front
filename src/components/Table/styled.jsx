import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    border-radius: 1.5rem;
    border: 1px solid #85858560;
    padding-bottom: 1rem;
`

export const HeaderContainer = styled.div`
    padding: 3rem;
`

export const Title = styled.p`
    font-size: 2.2rem;
    font-weight: 600;
`

export const SubTitle = styled.p`
    font-size: 1.5rem;
    font-weight: 500;
    color: #00000096;
`

export const TableContainer = styled.table`
    width: 100%;
    font-size: 1.4rem;
    border-collapse: collapse;
`

export const TableHead = styled.thead`
    background-color: #ececec;
`

export const TableRow = styled.tr`
`

export const Th = styled.th`
    padding: 1rem;
    font-weight: 500;
    color: #000000ac;
    border-top: 1px solid #85858560;
    border-bottom: 1px solid #85858560;
    text-align: left;

    &:first-child {
        padding-left: 3rem;
    }
`

export const Td = styled.td`
    padding: 1.1rem;
    border-top: 1px solid #85858560;
    border-bottom: 1px solid #85858560;
    text-align: left;
    color: ${(props) => props.$color};
    white-space: nowrap;

    &:first-child {
        color: #000;
        font-weight: 600;
        padding-left: 3rem;
    }
`

export const TdActions = styled.td`
    border-top: 1px solid #85858560;
    border-bottom: 1px solid #85858560;
    width: 6.3rem;
`

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const PopoverButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;

    &>button {
        cursor: pointer;
        font-size: 10px;
        border: 1px solid;
        border-radius: 3px;
        padding: 3px;
        color: #fff;
    }

    &>button:first-of-type {
        background-color: #5cc224;
    }

    &>button:last-child {
        background-color: #e92323;
    }

    &>button:first-of-type:hover {
        background-color: #5ccf1e;
    }

    &>button:last-child:hover {
        background-color: #ff6b6b;
    }
`
export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`
