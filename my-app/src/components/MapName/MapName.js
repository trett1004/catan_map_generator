import Typography from "@mui/material/Typography";
import "./MapName.css";
import { theme, classes } from "../../helpers/theme";

function MapName(props) {
  return (
    <div className="mapName">
      <Typography sx={classes.h3Custom} variant="h3">
        Map: {props.mapName}
      </Typography>
    </div>
  );
}

export default MapName;
