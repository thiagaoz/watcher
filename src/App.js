import './App.css';
import AddShow from './AddShow';
import {useEffect, useState} from "react";
import ShowsDisplay from './ShowsDisplay';
import styled from "styled-components";
import SearchBar from './SearchBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './Navbar';
import PickShow from './PickShow';
import EditShow from './EditShow';

function App() {
  const [shows, setShows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [renderDisplay, setRenderDisplay] = useState(true);
  const [showToEdit, setShowToEdit] = useState();
  const [renderEdit, setRenderEdit] = useState(false);

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

  const passShowToEdit = (show) => {
    setShowToEdit(show);
    mountManager("edit");
  };
 
  const saveChanges = (show) => { 
    const updatedShows = shows.slice(show.id, 1);
    updatedShows.push(show)
    setShows([...shows, updatedShows])
  };
  
  const mountManager = (str) => {
    if (str === "display") {
      setRenderDisplay(true);
      setRenderEdit(false);
    }
    if (str === "edit"){
      setRenderDisplay(false);
      setRenderEdit(true);
    }
  };

  return (
    <Router>
        <div className="App">
        <Navbar shows={shows} setFilteredOnApp={setFilteredOnApp} mountManager={mountManager} />  
          <Switch>
          <Route exact path="/search"> 
            <SearchBar shows={shows} setFilteredOnApp={setFilteredOnApp}/>
            <ShowsDisplay shows={filtered} deleteShow={deleteShow} />
          </Route> 
          <Route exact path="/">
            { renderDisplay ?
                <ShowsDisplay shows={filtered} deleteShow={deleteShow} passShowToEdit={passShowToEdit}/>
              :
                null
            }
            { renderEdit ? <EditShow show={showToEdit} saveChanges={saveChanges} mountManager={mountManager} /> : null }
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
