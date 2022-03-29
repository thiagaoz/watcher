import { Link } from "react-router-dom";

function Navbar (props) {

    const printWatchlist = () => {
        if (!props.renderDisplay) {
            props.mountDisplay();
            console.log("Mount Display");
        }

        const filtered = [];
        for (const show of props.shows) {
            if (show.watchlist){
                filtered.push(show);
            }
        }
        return props.setFilteredOnApp(filtered);
    };

    return (
        <div key="container-logo" className="container-logo">
            <h1>WATCHER</h1>
            <p>Track your shows</p>
            <div className="container-links">
                <Link to="/">
                    <button type="button" onClick={printWatchlist}>Watchlist</button>
                </Link>
                <Link to="/">
                    <button type="button" onClick={() => {props.setFilteredOnApp(false)}}>Shows</button>
                </Link>
                <Link to="/add" >
                    <button type="button">Add</button>
                </Link>
                
                <Link to="/pick">
                    <button type="button">Pick</button>
                </Link>
                <Link to="/search">
                    <button type="button">Search</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;