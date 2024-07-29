export default function Separator(props) {
    const {
        width = '100%',
        height
    } = props

    return (
        <div
            style={{ width, height }}
        ></div>
    )
}