import React, { useState, useEffect } from "react";

import { RatingBox } from "./RatingBox.js";
import TableOfRatings from "./TableOfRatings.js";


function RatingSection({ setLandfields, setNumbers, setName, landfields, numbers, mapName }) {
  // Hooks
  const [dbData, setData] = React.useState(null);
  const [databaseExists, setDatabaseExists] = useState(false);

  // GET Request to server
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        setData(resJson.array);
      })
      .then(() => setDatabaseExists(true))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {databaseExists && (
        <>
          <div className="ratingBox">
            <RatingBox
              landfields={landfields}
              numbers={numbers}
              mapName={mapName}
              dbData={dbData}
              setData={setData}
            />
          </div>
          <div className="tableOfRatings">
            <TableOfRatings
              setLandfields={setLandfields}
              setNumbers={setNumbers}
              setName={setName}
              dbData={dbData}
              setData={setData}
            />
          </div>
        </>
      )}
    </>
  );
}

export default RatingSection;