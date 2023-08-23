import React from "React";

const getClass = (idx, idxAdder, numbers) => {
    // check it it s -1 than hide, else if  6 or 8 than make red, else leave it normal
    return numbers[idx + idxAdder] === -1
        ? "hexagonBg hidden"
        : numbers[idx + idxAdder] === 6
            ? "hexagonBg redNumber"
            : numbers[idx + idxAdder] === 8
                ? "hexagonBg redNumber"
                : "hexagonBg";
}

// this component creates a row of hexagons, using the props from the instance of the component you can steer which fields and numbers are displayed.
export const HexagonRow = ({ landfields, numbers, className, idxAdder, arrayStart, arrayEnd, ports, portIdx, portIdxEnd, ...props }) => {
    return (
        <div className={className}>
            {/* starting water fields on the left */}
            {arrayEnd !== 0 && ports?.slice(portIdx, portIdxEnd).map((element, idx) => {
                return (
                    <div key={idx} className={element}>
                        <div className='hidden'>{ports[portIdx]}</div>
                    </div>
                );
            })}
            {/* most upper and most lowest water hexagons and all land fields in the middle */}
            {/* continueing with land fields*/}
            {arrayEnd !== 0 ? (
                landfields.slice(arrayStart, arrayEnd).map((element, idx) => (
                    <div key={idx} className={element}>
                        <div className={getClass(idx, idxAdder, numbers)}>{numbers[idx + idxAdder]}</div>
                    </div>
                ))
                // water fields most upper and most lowest row
            ) : (
                ports.slice(portIdx, portIdxEnd).map((element, idx) => (
                    <div key={idx} className={(portIdx === 0 ? 'portRotation60Deg ' : 'portRotation200Deg ') + element}>
                        <div className='hidden'>{ports[portIdx + idx]}</div>
                    </div>
                ))
            )}
            {/* continuing with water fields on the right */}
            {arrayEnd !== 0 && ports?.slice(portIdx + 1, portIdx + 2).map((element, idx) => {
                return (
                    <div key={idx} className={`${idx === 0 ? "portRotation180Deg" : ""} ${element}`}>
                        <div className='hidden'>{ports[portIdxEnd]}</div>
                    </div>
                )
            }
            )}
        </div>
    );
}

export default HexagonRow;

