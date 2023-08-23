import react, {useState} from 'React';

import { HexagonRow } from "../HexagonRow/HexagonRow";
import {
  shufflelImages,
  landfieldsArr,
  shuffleNumberArray,
  fieldNumbersArr,
  getRandomName,
  portsArr,
} from "../../helpers/create_board.js";
import Btn from "../Btn/Btn.js";

function CatanBoard() {
  // Hooks
  const [landfields, setLandfields] = useState(landfieldsArr);
  const [numbers, setNumbers] = useState(fieldNumbersArr);
  const [mapName, setName] = useState(getRandomName());

  const handleShuffleClick = () => {
    const shuffledElements = shufflelImages({ landfields });
    setLandfields(shuffledElements);

    const shuffledNumbers = shuffleNumberArray({ numbers, shuffledElements });
    setNumbers(shuffledNumbers);

    const mapName = getRandomName();
    setName(mapName);
  };

  return (
    <div catanBoard>
      <Btn
        style={{ marginTop: "20px" }}
        onClick={handleShuffleClick}
        variant="contained"
        content="SHUFFLE"
        className="Btn"
      />
      <HexagonRow
        ports={portsArr}
        portIdx={0}
        portIdxEnd={4}
        landfields={landfields}
        numbers={numbers}
        arrayStart={0}
        arrayEnd={0}
        idxAdder={0}
        className="singleHexagon fourWaters"
      />

      <HexagonRow
        ports={portsArr}
        portIdx={4}
        portIdxEnd={5}
        landfields={landfields}
        numbers={numbers}
        arrayStart={0}
        arrayEnd={3}
        idxAdder={0}
        className="singleHexagon three"
      />
      <HexagonRow
        ports={portsArr}
        portIdx={6}
        portIdxEnd={7}
        landfields={landfields}
        numbers={numbers}
        arrayStart={3}
        arrayEnd={7}
        idxAdder={3}
        className="singleHexagon four"
      />
      <HexagonRow
        ports={portsArr}
        portIdx={8}
        portIdxEnd={9}
        landfields={landfields}
        numbers={numbers}
        arrayStart={7}
        arrayEnd={12}
        idxAdder={7}
        className="singleHexagon"
      />
      <HexagonRow
        ports={portsArr}
        portIdx={10}
        portIdxEnd={11}
        landfields={landfields}
        numbers={numbers}
        arrayStart={12}
        arrayEnd={16}
        idxAdder={12}
        className="singleHexagon four"
      />
      <HexagonRow
        ports={portsArr}
        portIdx={12}
        portIdxEnd={13}
        landfields={landfields}
        numbers={numbers}
        arrayStart={16}
        arrayEnd={19}
        idxAdder={16}
        className="singleHexagon three"
      />

      {/* Last row of water hexagon fields */}
      <HexagonRow
        ports={portsArr}
        portIdx={14}
        portIdxEnd={18}
        landfields={landfields}
        numbers={numbers}
        arrayStart={0}
        arrayEnd={0}
        idxAdder={0}
        className="singleHexagon fourWaters"
      />
    </div>
  );
}

export default CatanBoard;
