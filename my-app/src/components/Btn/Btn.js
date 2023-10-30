import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  mediaqueryWidth,
  mediaqueryStyle,
} from "../../helpers/global-variables";

const Btn = ({ content, onClick, ...props }) => {
  // mediaquery
  const mediaquery = useMediaQuery(`(min-width:${mediaqueryWidth})`);
  // table style
  const buttonStyleMobile = mediaqueryStyle;
  return mediaquery ? (
    <Button variant="outlined" {...props} onClick={onClick}>
      {content}
    </Button>
  ) : (
    <Button
      style={buttonStyleMobile}
      variant="outlined"
      {...props}
      onClick={onClick}>
      {content}
    </Button>
  );
};

export default Btn;
