import Typography from "@mui/material/Typography";
import "./MapName.css"

function MapName(props) {
  return (
    <div className="mapName">
      <Typography variant="h4">Map: {props.mapName}</Typography>
    </div>
  );
}

export default MapName;