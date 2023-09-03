import React, { useState } from "react";

import CatanBoard from "../CatanBoard/CatanBoard";
import ShuffleBtn from "../Btn/ShuffleBtn";
import MapName from "../MapName/MapName";
import RatingSection from "../RatingSection/RatingSection";
import { landfieldsArr, fieldNumbersArr } from "../../helpers/create_board.js";

function MainSection() {
  const [landfields, setLandfields] = useState(landfieldsArr);
  const [numbers, setNumbers] = useState(fieldNumbersArr);
  const [mapName, setName] = useState();

  return (
    <>
      <ShuffleBtn
        setLandfields={setLandfields}
        setNumbers={setNumbers}
        setName={setName}
      />
      <MapName mapName={mapName} />
      <CatanBoard
        landfields={landfields}
        numbers={numbers}
        setLandfields={setLandfields}
        setNumbers={setNumbers}
        setName={setName}
      />
      <RatingSection
        landfields={landfields}
        numbers={numbers}
        mapName={mapName}
        setLandfields={setLandfields}
        setNumbers={setNumbers}
        setName={setName}
      />
    </>
  );
}

export default MainSection;