import React from 'react';

const getClass = (idx, numbers) => {
    console.log('numbers', numbers)
    console.log('idx', idx)
    return numbers[idx] === -1 ? "hexagonBg hidden" : "hexagonBg";
}

const Hexagon = ({ allElements, numbers, className, idxAdder, arrayStart, arrayEnd,...props }) => {
    console.log('className', className)
    console.log('arayStart', arrayStart)
    console.log('arrayEnd', arrayEnd)
    console.log('idxAdder', idxAdder)
    return (
        <div className={className}>
            {allElements.slice(arrayStart, arrayEnd).map((element, idx) => (
                <div className={element}>
                    <div className={getClass(idx, numbers)}>{numbers[idx + idxAdder]}</div>
                </div>
            ))}
        </div>
    );
}

export default Hexagon;
