import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function Title(props) {
    const {
        color = '#1F77FD'
    } = props

    return (
        <Typography component="h2" variant="h2" sx={{ color, margin: '2rem' }} gutterBottom>
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};

export default Title;