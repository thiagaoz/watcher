import './App.css';
import AddShow from './AddShow';
import {useEffect, useState, useRef} from "react";
import ShowsDisplay from './ShowsDisplay';
import styled from "styled-components";
import SearchBar from './SearchBar';
import Watchlist from './Watchlist';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './Navbar';
import PickShow from './PickShow';

function App() {
  const [shows, setShows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [renderDisplay, setRenderDisplay] = useState(true);
  const [showId, setShowId] = useState("");
  const showIdRef = useRef();

  //console.log("App iniciados");
  useEffect(() => {
    fetch("http://localhost:3000/shows")
    .then((response) => response.json())
    .then((data) => {
        setShows(data);
        setFiltered(data);
    });
  }, [shows.length]);

  function addShow(newShow) {
    setShows([...shows, newShow]);
  }

  function deleteShow(updatedShows){
    console.log(updatedShows);
    setShows(updatedShows);
    console.log(shows);
  }

  function setFilteredOnApp(newFiltered = false){
    if (!renderDisplay) setRenderDisplay(true);
    if (newFiltered === false) {
      setFiltered(shows);
    }
    else{
      setFiltered(newFiltered);
    }
  }

  const dismountShowMountEdit = (id) => {
    setRenderDisplay(false);
    console.log("papai onlin, id = "+ id);
  };
 
  const mountDisplay= () => { setRenderDisplay(true) };
  return (
    <Router>
        <div className="App">
        <Navbar shows={shows} setFilteredOnApp={setFilteredOnApp} mountDisplay={mountDisplay} renderDisplay={renderDisplay}/>  
          <Switch>
          <Route exact path="/search"> 
            <SearchBar shows={shows} setFilteredOnApp={setFilteredOnApp}/>
            <ShowsDisplay shows={filtered} deleteShow={deleteShow} />
          </Route> 
          <Route exact path="/">
            { renderDisplay ?
              <ShowsDisplay shows={filtered} deleteShow={deleteShow} dismountShowMountEdit={dismountShowMountEdit}/>
              :
              null
            }
          </Route>
          <Route exact path="/add"> <AddShow shows={shows} addShow={addShow}/></Route>
          <Route exact path="/pick">
            <PickShow shows={shows}/> 
          </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;


{/*
Specify indication
Remove / add watchlist
Edit SHOW page
*/}