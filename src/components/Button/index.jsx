import { LoadingButton } from "@mui/lab"

export default function Button(props) {

    const {
        label,
        type = 'submit',
        color,
        variant = 'contained',
        fontSize = '16px',
        padding = '5px',
        borderRadius = '15px',
        onClick,
        onSubmit,
        loading
    } = props

    return (
        <LoadingButton
            sx={{
                border: '1px solid #00000036',
                padding,
                cursor: 'pointer',
                fontSize,
                borderRadius,
                boxShadow: '-3px 3px 10px 1px #4f4f4f36',
            }}
            color={color}
            variant={variant}
            type={type}
            onClick={onClick}
            onSubmit={onSubmit}
            loading={loading}
        >
            {label}
        </LoadingButton>
    )
}