import React from 'react';

const getClass = (idx, idxAdder, numbers) => {
    return numbers[idx + idxAdder] === -1 ? "hexagonBg hidden" : "hexagonBg";
}

// const getPortClass = (portIdx) => {
//     return numbers[portIdx] === -1 ? "hexagonBg hidden" : "hexagonBg";
// }

export const Hexagon = ({ allElements, numbers, className, idxAdder, arrayStart, arrayEnd, ports, portIdx, portIdxEnd, ...props }) => {
    // console.log('className HR', className)
    // console.log('ports HR', ports)
    // console.log('portIdx HR', portIdx)
    console.log('numbers', numbers)
    console.log('arrayEnd', arrayEnd)
    return (
        <div className={className}>
            {/* water field on the left */}
            {arrayEnd !== 0 && ports?.slice(portIdx, portIdxEnd).map((element, idx) =>
                <div key={idx} className={element}>
                    <div className={getClass(idx, idxAdder, numbers)}>{ports[portIdx]}</div>
                </div>
            )}
            {/* most upper and most lowest water hexagons and all land fields in the middle */}
            {arrayEnd !== 0 ? (
                allElements.slice(arrayStart, arrayEnd).map((element, idx) => (
                    <div key={idx} className={element}>
                        <div className={getClass(idx, idxAdder, numbers)}>{numbers[idx + idxAdder]}</div>
                    </div>
                ))
            ) : (
                ports.slice(portIdx, portIdxEnd).map((element, idx) => (
                    <div key={idx} className={element}>
                        <div className={className}>{ports[portIdx + idx]}</div>
                    </div>
                ))
            )}
            {/* water field on the right */}
            {arrayEnd !== 0 &&  ports?.slice(portIdx + 1, portIdx + 2).map((element, idx) =>
                <div key={idx} className={element}>
                    <div className={getClass(idx, idxAdder, numbers)}>{ports[portIdxEnd]}</div>
                </div>
            )}
        </div>
    );
}

