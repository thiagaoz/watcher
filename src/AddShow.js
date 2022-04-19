import {useState, useRef} from "react";

function AddShow (props) {

const [submitButton, setSubmitButton] = useState();
const [radioType, setRadioType] = useState("movie");
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const urlRef = useRef("https://www.themoviedb.org/movie/603-the-matrix");

//https://www.themoviedb.org/movie/603-the-matrix
//https://www.themoviedb.org/tv/92749-moon-knight

const handleSubmit = (e) => {
  e.preventDefault();
  if (submitButton === "submitToAPI") {
    const urlArr = urlRef.current.value.split("/");
    const typeTemp = (urlArr[3]);
    const id = (urlArr[4].split("-")[0]);
    fetch(`https://api.themoviedb.org/3/${typeTemp}/${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Something went wrong');
      })
      .then((data) => {
        if (typeTemp === "movie") {
          e.target.title.value = data.original_title;
          e.target.type.value = typeTemp;
          e.target.release.value = data.release_date.split("-")[0];
          e.target.runtime.value = data.runtime;
        }
        else if (typeTemp === "tv"){
          e.target.title.value = data.name;
          e.target.type.value = typeTemp;
          e.target.release.value = data.first_air_date.split("-")[0];
          e.target.runtime.value = data.episode_run_time;
          e.target.status.value = data.status.value==="Ended" ? "canceled" : "running";
        }
      });
      return setRadioType(typeTemp);
  }

  else if (submitButton === "submitToServer") {
    const show = {
      title: e.target.title.value,
      type: e.target.type.value,
      release: e.target.release.value,
      runtime: e.target.runtime.value,
      status: e.target.status.value,
      watchlist: e.target.watchlist.checked
    };

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(show)
    };

    fetch("http://localhost:3000/shows", requestOptions)
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Error on AddShow POST");
      })
      .then((data) => {
        props.addShow(data);
        console.log(`${data.title} (${data.release}) adicionado com sucesso`);
      })

  }

  else console.log("erro no submit");

  
};

const handleRadioType = (e) => {
  setRadioType(e.target.value);
};

return (
<div>
  <form onSubmit={handleSubmit}>
    <h3>Add a show yours</h3>
    <div name="add_with_moviedb" style={{display: "inline-block", margin: '.5rem'}}>
        The Movie DB link:{" "}
        <input type="text" ref={urlRef} style={{ width: 400 }}  defaultValue="https://www.themoviedb.org/movie/603-the-matrix"></input>
      <input type="submit" id="action1" value="Fetch" onClick={(e) => setSubmitButton("submitToAPI")} />
    </div>  
    
    <div >
      Title: 
      <input type="text" name="title"/>
      <br></br>
      <input type="radio" name="type" value="movie" checked={radioType==="movie"}  onChange={handleRadioType}/>Movie
      <input type="radio" name="type" value="tv" checked={radioType==="tv"} onChange={handleRadioType} style={{marginLeft: "5%"}}/>TV
      <br></br>
      <label htmlFor="status-running" />Running
      <input type="radio"  name="status" value="running" disabled={radioType === "movie"} />
      <label htmlFor="status-canceled" style={{marginLeft: "5%"}} />Canceled
      <input type="radio" id="status-canceled" name="status" value="canceled"  disabled={radioType === "movie"}/>
      <br></br>
      {"  "}Release:{" "}
      <input type="number" name="release" style={{width: 50}}/>
      {"  "}Runtime: {" "}
      <input type="number" name="runtime" style={{width: 50}}/> Minutes
      <br></br>
      Watchlist?
      <input type="checkbox" name="watchlist" defaultChecked />
      <br></br>
      <input type="submit" id="action2" value="ADD" onClick={(e) => setSubmitButton("submitToServer")} />
    </div>
  </form>
</div>
)
};
export default AddShow;