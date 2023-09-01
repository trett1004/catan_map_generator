import Typography from "@mui/material/Typography";

function MapName(props) {
  return (
    <div className="mapName">
      <Typography variant="h4">Map: {props.mapName}</Typography>
    </div>
  );
}

export default MapName;
