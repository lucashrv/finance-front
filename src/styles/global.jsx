import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style-type: none;
    }

    :root {
        font-size: 62.5%; /* 1rem = 10px */
    }

    body {
        font-size: 1.6rem;
        min-width: 60rem;
        max-width: 192rem;
        background-color: #ECEFF2;
        font-family: "Inter", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-variation-settings: "slnt" 0;
        color: #101828;
    }

    // Scrollbar custom
    ::-webkit-scrollbar {
    width: 0.8rem;
    }

    ::-webkit-scrollbar-track {
    background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
    background: #a8a8a8;
    }

    ::-webkit-scrollbar-thumb:hover {
    background: #888;
    }
`

export default GlobalStyle
