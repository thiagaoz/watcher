import useEffect from "react";

function Watchlist({shows, setFilteredOnApp}){

    const filterWatchlist = () => {

        const filtered = [];
        for (const show of shows) {
            if (show.watchlist){
                filtered.push(show);
            }
        }
        return setFilteredOnApp(filtered);
    }

    return (
        <div>
            <h2>Watchlist</h2>
            <button type="button" onClick={filterWatchlist}>Filter</button>
        </div>
    );
};

export default Watchlist;