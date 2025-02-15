import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress } from '@mui/material';
import {
    Input,
    ButtonIcon,
    ContainerSearch
} from './styled';
import './style.css'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

export default function InputSearch(props) {
    const {
        loading = false,
        placeholder
    } = props

    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('search') || '')

    const handleSubmit = (e) => {
        e.preventDefault()

        const newParams = new URLSearchParams(searchParams);

        newParams.set("page", 1);
        newParams.set("search", search);

        setSearchParams(newParams);
    }

    return (
        <ContainerSearch>
            <Paper
                component="form"
                sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 250,
                    height: 30,
                    borderRadius: 15,
                }}
                onSubmit={handleSubmit}
            >
                <Input
                    spellCheck="false"
                    type='text'
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                {!loading && <>
                    <ButtonIcon onSubmit={handleSubmit} type="submit">
                        <SearchIcon
                            className='button-icon'
                        />
                    </ButtonIcon>
                </>}
                {loading && <>
                    <ButtonIcon>
                        <CircularProgress style={{ color: '#155eef', width: '20px', height: '20px' }} />
                    </ButtonIcon>
                </>}

            </Paper >
        </ContainerSearch>
    )
}