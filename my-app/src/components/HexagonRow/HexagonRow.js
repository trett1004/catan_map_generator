import React from 'react';

const getClass = (idx, idxAdder, numbers) => {
    return numbers[idx + idxAdder] === -1 ? "hexagonBg hidden" : "hexagonBg";
}

// const getPortClass = (portIdx) => {
//     return numbers[portIdx] === -1 ? "hexagonBg hidden" : "hexagonBg";
// }

export const Hexagon = ({ allElements, numbers, className, idxAdder, arrayStart, arrayEnd, ports, portIdx, portIdxEnd, ...props }) => {
    return (
        <div className={className}>
            {/* water fields on the left */}
            {arrayEnd !== 0 && ports?.slice(portIdx, portIdxEnd).map((element, idx) => {
                return (
                    <div key={idx} className={element}>
                        <div className='hidden'>{ports[portIdx]}</div>
                    </div>
                );
            })}
            {/* most upper and most lowest water hexagons and all land fields in the middle */}
            {/* land fields */}
            {arrayEnd !== 0 ? (
                allElements.slice(arrayStart, arrayEnd).map((element, idx) => (
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
            {/* water fields on the right */}
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

