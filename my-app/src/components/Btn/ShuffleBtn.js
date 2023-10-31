import Btn from "./Btn";
import {
  shufflelImages,
  shuffleNumberArray,
  getRandomName,
} from "../../helpers/create_board.js";
import "./ShuffleBtn.css";
import { classes } from "../../helpers/theme";

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
        content="SHUFFLE THE FIELDS"
        color="success"
        size="large"
        sx={classes.shuffleBtnMediaQuery}
      />
    </div>
  );
}

export default ShuffleBtn;
