import Btn from "./Btn";
import {
  shufflelImages,
  shuffleNumberArray,
  getRandomName,
} from "../../helpers/create_board.js";
import "./ShuffleBtn.css";

function ShuffleBtn({ setLandfields, setNumbers, setName }) {
  const handleShuffleClick = () => {
    const shuffledElements = shufflelImages();
    setLandfields(shuffledElements);

    const shuffledNumbers = shuffleNumberArray({ shuffledElements });
    setNumbers(shuffledNumbers);

    setName(getRandomName());
  };

  return (
    <div className="shuffleBtn">
      <Btn
        onClick={handleShuffleClick}
        variant="contained"
        content="SHUFFLE THE BOARD"
        color="success"
        size="large"
      />
    </div>
  );
}

export default ShuffleBtn;
