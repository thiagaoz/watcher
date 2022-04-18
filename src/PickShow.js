import { useState, useEffect, useCallback} from "react";


function PickShow({shows}){
    const currentYear = new Date().getFullYear();
    const watchlist = shows.filter( show =>  show.watchlist);
    const [randomShow, setRandomShow] = useState();

    const pickRandomShow = useCallback((arrOfShows = watchlist) => {
        const randomIndex = Math.floor(Math.random() * arrOfShows.length);
        setRandomShow(arrOfShows[randomIndex])
    }, [watchlist]); 
    //const filterRef = useRef({releaseMin: 0});
    
    useEffect(() =>{
        pickRandomShow();
    }, [pickRandomShow]);

    const adjustReleaseInput = (num, str) => {
        if (str === "min" && !num) return 0;
        if (str === "max" && !num) return currentYear;
        if (num >= currentYear) return currentYear;
        if (num <= 1888) return 1888;
        return num;       
    };

    const filterWatchlist = (e) =>{
        e.preventDefault();
        console.log(currentYear);
        e.target.releaseMin.value = adjustReleaseInput(e.target.releaseMin.value, "min");
        e.target.releaseMax.value = adjustReleaseInput(e.target.releaseMax.value, "max");

        if (e.target.releaseMin.value > e.target.releaseMax.value) return alert("Impossible release timeframe!");
        if (e.target.runtimeMin.value > e.target.runtimeMax.value) return alert("Impossible runtime timeframe!");

        const filteredWatchlist = [];
        const filter = {
            releaseMin: (e.target.releaseMin.value),
            releaseMax: (e.target.releaseMax.value) , 
            runtimeMin: e.target.runtimeMin.value ? e.target.runtimeMin.value : 0,
            runtimeMax: e.target.runtimeMax.value ? e.target.runtimeMax.value: 9999,
            type: e.target.type.value,
        };
        console.log(filter);
        //console.log(watchlist);
        for (const show of watchlist){
            if(show.release < filter.releaseMin || show.release > filter.releaseMax){
                console.log("Release not valid: " +show.title);
                continue;
            }
            if(show.runtime.total < filter.runtimeMin || show.runtime.total > filter.runtimeMax){
                console.log("Runtime not valid: " + show.title);
                continue;
            }
            if(filter.type && show.type !== filter.type){
                console.log("Type not valid: " +show.title);
                continue;
            }
            //console.log(show);
            filteredWatchlist.push(show);

        };
        console.log(filteredWatchlist)
        pickRandomShow(filteredWatchlist);
        e.target.releaseMin.value = filter.releaseMin;
        e.target.releaseMax.value = filter.releaseMax;
    }

    if (watchlist.length > 0 )
    {
        return (
        <div>
            <h3>Today's show is:</h3>
            <h1>{randomShow ? randomShow.title : "Empty pick"}</h1>
            <br></br>
            <h2>--- Specify ---</h2>
            <form onSubmit={filterWatchlist}>
                <div style={{display: "inline-block"}}>
                    Released between the years:  
                    <input type="number" name="releaseMin" placeholder="Min Year" style={{width: 70, textAlign: "center", margin: '.5rem'}}></input>
                    {"  "}and{" "}
                    <input type="number" name="releaseMax" placeholder="Max Year" style={{width: 70, textAlign: "center", margin: '.5rem'}}></input>
                </div>
                <br></br>
                <div style={{display: "inline-block", padding: 10}}>
                    Runtime: {" "}   
                    <input type="number" name="runtimeMin" placeholder="Min" style={{width: 50, textAlign: "center"}}></input>
                    {" "}and{" "}
                    <input type="number" name="runtimeMax" placeholder="Max" style={{width: 50, textAlign: "center"}}></input>
                </div>
                <br></br>
                <div id="type-container" style={{ padding: 10}}>
                    <input type="radio" name="type" value="movie" />Movie
                    <input type="radio" name="type" value="tv" />TV
                    <input type="radio" name="type" value="" defaultChecked/>Any
                </div>
                <br></br>
                <button type="submit" >Pick my show</button>
            </form>
        </div>
        );
    } else {
        return (
            <div>
                <h2>{"Empty watchlist"}</h2>
                <button type="button" >Try Again</button>
                <br></br><br></br>
                
            </div>
        )
    }
};

export default PickShow;