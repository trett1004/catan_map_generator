import React from "react";
import "./HexagonRow.css";

const getClass = (idx, idxAdder, numbers) => {
  // this function manipulates the classes of the numbers to change appearance...
  // check if it is -1 (desertfield) than hide, else if  6 or 8 than make number red color,...
  // else dont change anything (black color)
  return numbers[idx + idxAdder] === -1
    ? "hexagonBg hidden"
    : numbers[idx + idxAdder] === 6
    ? "hexagonBg redNumber"
    : numbers[idx + idxAdder] === 8
    ? "hexagonBg redNumber"
    : "hexagonBg";
};

// this component creates a row of hexagons, using the props from the ...
// of the component you can steer which fields and numbers are displayed at a specific <div>.
export const HexagonRow = ({
  landfields,
  numbers,
  className,
  idxAdder,
  arrayStart,
  arrayEnd,
  ports,
  portIdx,
  portIdxEnd,
  ...props
}) => {
  return (
    <div className={className}>
      {/* this div renders the water field on the left */}
      {/* e.g. for second row (pattern applies to all following divs):
    prop arrayEnd is 3, prop portIdx is 4, prop portIdxEnd is 5:
    It will render a single hexagon with the 4th element of portsarray which is a normal water field without a port*/}
      {arrayEnd !== 0 &&
        ports?.slice(portIdx, portIdxEnd).map((element, idx) => {
          //  why arrayEnd is needed? arrayEnd!==0 is an identifier that ensures most upper and most lower water-field rows are not rendered twice
          return (
            <div
              data-testid="water-hexagon-on-left"
              key={idx}
              className={element}>
              <div className="hidden" data-testid="hexagon-water-left-writing">
                {ports[portIdx]}
              </div>
            </div>
          );
        })}
      {/* most upper and most lowest water hexagons and all land fields in the middle */}
      {/* land fields*/}
      {arrayEnd !== 0
        ? landfields.slice(arrayStart, arrayEnd).map((element, idx) => (
            <div data-testid="hexagon-land-field" key={idx} className={element}>
              <div
                className={getClass(idx, idxAdder, numbers)}
                data-testid="numbers">
                {numbers[idx + idxAdder]}
              </div>
            </div>
          ))
        : // water fields most upper and most lowest row
          ports.slice(portIdx, portIdxEnd).map((element, idx) => (
            <div
              key={idx}
              className={
                (portIdx === 0 ? "portRotation60Deg " : "portRotation200Deg ") +
                element
              }
              data-testid="hexagon-water-field-port-rotation">
              <div className="hidden" data-testid="hexagon-water-writing">
                {ports[portIdx + idx]}
              </div>
            </div>
          ))}
      {/* continuing with water fields on the right */}
      {arrayEnd !== 0 &&
        ports?.slice(portIdx + 1, portIdx + 2).map((element, idx) => {
          return (
            <div
              data-testid="water-hexagon-on-right"
              key={idx}
              className={`${idx === 0 ? "portRotation180Deg" : ""} ${element}`}>
              <div className="hidden" data-testid="hexagon-water-right-writing">
                {ports[portIdxEnd]}{" "}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default HexagonRow;
