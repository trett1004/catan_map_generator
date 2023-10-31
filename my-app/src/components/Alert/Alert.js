import Alert from "@mui/material/Alert";

const AlertField = ({ content, severity, ...props }) => (
  <Alert {...props} severity={severity}>
    {content}
  </Alert>
);

export default AlertField;
