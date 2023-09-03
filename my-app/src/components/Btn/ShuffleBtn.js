import Btn from "./Btn";
import {shufflelImages, shuffleNumberArray, getRandomName} from "../../helpers/create_board.js";

function ShuffleBtn({setLandfields, setNumbers, setName}) {
    const handleShuffleClick = () => {
        const shuffledElements = shufflelImages();
        setLandfields(shuffledElements);

        const shuffledNumbers = shuffleNumberArray({ shuffledElements });
        setNumbers(shuffledNumbers);

        setName(getRandomName());
      };

    return (
      <Btn
        style={{ marginTop: "20px" }}
        onClick={handleShuffleClick}
        variant="contained"
        content="SHUFFLE THE BOARD"
        className="Btn"
      />
    )
}

export default ShuffleBtn;