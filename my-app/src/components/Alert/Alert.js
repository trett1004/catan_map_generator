import Alert from '@mui/material/Alert';

const GreenAlert = ({content, severity, ...props}) => <Alert {...props} severity={severity}>{content}</Alert>



export default GreenAlert;