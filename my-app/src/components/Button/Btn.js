import Button from '@mui/material/Button';

const Btn = ({content, onClick, ...props} ) => <Button {...props} onClick={onClick}>{content}</Button>

export default Btn;

