import { HexagonRow } from "./HexagonRow";
import { portsArr } from "../../helpers/create_board.js";

function CatanBoard({ landfields, numbers }) {
  return (
    <div data-testid="wrapper">
      {/* Upper row with 4 water fields */}
      <HexagonRow
        ports={portsArr}
        portIdx={0}
        portIdxEnd={4}
        landfields={landfields}
        numbers={numbers}
        arrayStart={0}
        arrayEnd={0}
        idxAdder={0}
        className="hexagonRow fourWaters"
        data-testid="hexagonRowd"
      />
      {/* Second row with 3 landfields and 1 water field on most left and most right */}
      <HexagonRow
        ports={portsArr}
        portIdx={4}
        portIdxEnd={5}
        landfields={landfields}
        numbers={numbers}
        arrayStart={0}
        arrayEnd={3}
        idxAdder={0}
        className="hexagonRow three"
        data-testid="hexagonRow"
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
        className="hexagonRow four"
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
        className="hexagonRow"
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
        className="hexagonRow four"
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
        className="hexagonRow three"
      />

      {/* {/* Lowest row with 4 water fields */}
      <HexagonRow
        ports={portsArr}
        portIdx={14}
        portIdxEnd={18}
        landfields={landfields}
        numbers={numbers}
        arrayStart={0}
        arrayEnd={0}
        idxAdder={0}
        className="hexagonRow fourWaters"
      />
    </div>
  );
}

export default CatanBoard;
