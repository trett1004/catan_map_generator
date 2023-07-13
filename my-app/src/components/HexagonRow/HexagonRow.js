import React from 'react';

const getClass = (idx, idxAdder, numbers) => {
    return numbers[idx+idxAdder] === -1 ? "hexagonBg hidden" : "hexagonBg";
}

export const Hexagon = ({ allElements, numbers, className, idxAdder, arrayStart, arrayEnd,...props }) => {
    return (
        <div className={className}>
            {allElements.slice(arrayStart, arrayEnd).map((element, idx) => (
                <div className={element}>
                    <div className={getClass(idx, idxAdder, numbers)}>{numbers[idx + idxAdder]}</div>
                </div>
            ))}
        </div>
    );
}

// Old code from App.js before refactoring
{/* <div className="singleHexagon four">
    {allElements.slice(3, 7).map((element, idx) => <div className={element}><div className={getClass(idx + 3)}>{numbers[idx + 3]}</div></div>)}
</div> */}