import {useState} from "react";

function SearchBar ({shows, setFilteredOnApp}){
    const [filters, setFilters] = useState({
        title: "",
        type: "all",
    });

    const searchButtonPressed = ()  => {
        const showsFiltered = [];
        if (filters.title === "" && filters.type === "all"){
            return setFilteredOnApp();
        }
        for (const show of shows){
            if (filters.title !== "" && !show.title.toLowerCase().includes(filters.title)){
                continue;
            }
            if (filters.type !== "all" && show.type !== filters.type){
                continue;
            }
            showsFiltered.push(show);
        }
        
        console.log("Encontrado(s) " + showsFiltered.length + " shows com nome de '"+ filters.title+ "'"  );
        return setFilteredOnApp(showsFiltered);
    };

    function searchTitleChange(e){
        setFilters({...filters, title: e.target.value.toLowerCase()});
        console.log(filters);
    };

    function searchTypeChange(e){
        setFilters({...filters, type: e.target.value});
        console.log(filters);
    };

    return(
        <div>
            <h2>Search your Watchlist</h2>
            <form>
                <label htmlFor="search-title">Title: </label>
                <input id="search-title" type="text" onChange={searchTitleChange}></input>
                <br></br><br></br>
                <input id="type-movie" type="radio" value="movie" checked={filters.type === "movie"} onChange={searchTypeChange} />Movie
                <input id="type-series" type="radio" value="tv" checked={filters.type === "tv"} onChange={searchTypeChange} />Series
                <input id="type-ass" type="radio" value="all" checked={filters.type === "all"} onChange={searchTypeChange} />All Types
                <br></br><br></br>
                <button type="button" onClick={searchButtonPressed}>Search</button>
                <br></br><br></br>
            </form>
        </div>
    );
};

export default SearchBar;