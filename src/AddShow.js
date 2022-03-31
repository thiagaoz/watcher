import {useState, useRef} from "react";

function AddShow (props) {
    const [title, setTitle] = useState("");
    const [watchlist, setWatchlist] = useState(false);
    const [radioType, setRadioType] = useState({movie: false, series:false})
    const [release, setRelease] = useState("");
    const [runtime, setRuntime] = useState({hours: "", minutes: ""}); 
    const [status, setStatus] = useState();
    
    
    const addShowButtonPressed = (e) => {
      if (title === ""){
        return alert("Need a title!");
      }
      if (release < 1888){
        return alert("The first motion picture is from 1888!");
      }
      if (!radioType.movie && !radioType.series){
        return alert("Need a type!");
      }


      const show = {
          title: title.toLowerCase(),
          type: (radioType.movie ? "movie" : "series"),
          watchlist: watchlist,
          release: release,
          status: status,
          runtime: {
            hours: runtime.hours ? runtime.hours : 0,
            minutes: runtime.minutes ? runtime.minutes : 0,
            total: (runtime.hours*60 + runtime.minutes),
          },
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(show),
      }
      fetch("http://localhost:3000/shows", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        props.addShow(data);
        console.log(data);
      })

      console.log(`${title} (${release}) adicionado com sucesso`);
      setTitle("");
      setRelease("");
      setRuntime({hours: "", minutes: ""});
      handleRadioType(e);
      setWatchlist(false);
      setStatus();

    };

    const handleRadioType = (e) => {
      setRadioType(() => {
        return {
          movie: false,
          series: false,
          [e.target.value]: true
          };
      });
    };
 
    const setReleaseYear = (e) => {
      if (e.target.value.length > 4){
        return console.log("limite excedido! " + e.target.value);
      }

      setRelease(parseInt(e.target.value));
    };


    return (
    <div>
        <h2>Add a show</h2>
        <form>
            <label htmlFor="title-field">Title: </label>
            <input id="title-field" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <br></br><br></br>

            <label htmlFor="release-field">Release: </label>
            <input id="release-field" type="number" value={release} placeholder="1888 or +" onChange={ setReleaseYear }/>
            <br></br><br></br>

            Runtime
            <br></br>
            <input label="Hours: " type="number" value={runtime.hours} style={{width: 50}} placeholder="Hours"
              onChange={ (e) => {setRuntime({...runtime, hours: parseInt(e.target.value)})} }></input>

            <input label="Minutes: " type="number" value={runtime.minutes} style={{width: 50, marginLeft: 10}} placeholder="Min"
              onChange={ (e) => {setRuntime({...runtime, minutes: parseInt(e.target.value)})} }></input>
            <br></br><br></br>

            <div >
              <input type="radio" name="type" value="movie" checked={radioType.movie} onChange={handleRadioType}/> Movie
              <input type="radio" name="type" value="series" checked={radioType.series} onChange={handleRadioType}/> Series
            </div>

            <br></br>
            <label htmlFor="status-field">Status</label>
            <br></br>

            <div >
              <input type="radio" name="status" value={"running"}  disabled={radioType.movie} checked={status === "running"} 
                onChange={(e) => {setStatus(e.target.value)}}/> Running
              <input type="radio" name="status" value={"canceled"}  disabled={radioType.movie} checked={status === "canceled"} 
                onChange={(e) => {setStatus(e.target.value)}}/> Canceled
            </div>
            <br></br><br></br>

            <label htmlFor="watchlist-checkbox">Add to Watchlist?</label>
            <input id="watchlist-checkbox" type="checkbox"  checked={watchlist} onChange={ (e) => setWatchlist(!watchlist)}></input>
            <br></br><br></br>

            <button type="button" onClick={addShowButtonPressed}>ADD</button>
        </form>
    </div>
    )
};

export default AddShow;