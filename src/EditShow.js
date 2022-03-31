import {useState, useRef, useEffect} from "react";

function EditShow(props){
    const [show, setShow] = useState({...props.show});

    const saveButtonClicked = () => {

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(show),
        }
             //http://localhost:3000/shows/
        fetch(`http://localhost:3000/shows/${show.id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    props.saveChanges(show);
                    console.log("Edit fez sua parte");
                }
            });
        
        props.mountManager("display");
        
    };

    return (
    <div>
        <h2>Edit the Show</h2>
        <form>
            <label htmlFor="title-field">TITLE: </label>
            <input id="title-field" type="text" value={show.title}  onChange={(e) => setShow({...show, title: e.target.value}) }></input>
            <br></br>
            <label htmlFor="type-field">RELEASE: </label>
            <input type="number" value={show.release} onChange={(e) => setShow({...show, release: e.target.value}) }></input>
            <br></br>
            <label htmlFor="watchlist-field">WATCHLIST: </label>
            <input type="checkbox" checked={show.watchlist} onChange={(e) => setShow({...show, watchlist: !show.watchlist}) }></input>

            <br></br><br></br>
            <button type="button" onClick={saveButtonClicked}>Save</button>
        </form>
    </div>)
}

export default EditShow;