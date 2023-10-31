import Button from "@mui/material/Button";

const Btn = ({ content, onClick, ...props }) => {
  return (
    <Button variant="outlined" {...props} onClick={onClick}>
      {content}
    </Button>
  );
};

export default Btn;
