import { useState, useEffect, useRef } from "react";

function PickShow({shows}){
    const randomIdxRef = useRef(Math.floor(Math.random() * shows.length));
    const [randomIdx, setRandomIdx] = useState(randomIdxRef.current);
    

    const updateIdx = () => {
        randomIdxRef.current = Math.floor(Math.random() * shows.length);
        setRandomIdx(randomIdxRef.current);
    };

    useEffect(() =>{
        updateIdx();
        console.log("useEffect");
    }, [shows.length]);

    console.log(randomIdx, randomIdxRef);
    if (shows.length > 0)
    {
        return (
        <div>
            <h2>{shows[randomIdx].title}</h2>
            <button type="button" onClick={updateIdx}>Try Again</button>
        </div>
        );
    } else {
        return (
            <div>
                <h2>{"Empty watchlist"}</h2>
                <button type="button" onClick={updateIdx}>Try Again</button>
            </div>
        )
    }
};

export default PickShow;