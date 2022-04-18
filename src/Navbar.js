import { Link } from "react-router-dom";

function Navbar (props) {

    const printWatchlist = () => {
        props.mountManager("display");
        const filtered = [];
        for (const show of props.shows) {
            if (show.watchlist){
                filtered.push(show);
            }
        }
        return props.setFilteredOnApp(filtered);
    };

    const printAllShows = () => {
        props.mountManager("display");
        props.setFilteredOnApp(false)
    };

    return (
        <div key="container-logo" className="container-logo">
            <h1>WATCHER</h1>
            <p>Track your shows</p>
            powered by:
            <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg" 
                width="15%"
                alt="Logo from The Movie Database"
            />
            <div className="container-links">
                <Link to="/">
                    <button type="button" onClick={printWatchlist}>Watchlist</button>
                </Link>
                <Link to="/">
                    <button type="button" onClick={printAllShows}>Shows</button>
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