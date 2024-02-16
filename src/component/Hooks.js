import React, { useState } from 'react';
function Hooks() {
    const [count, setCount] = useState(0)
    return (
        <div>
            Count is {count}
            <button onClick={() => { setCount(count + 1) }}>Click</button>
        </div>
    )
}
export default Hooks;