import styles from "./ShowsDisplay.module.css";

function ShowsDisplay (props) {

  const deleteButtonClicked = (show) => {
      const requestOptions = {
        method: "DELETE"
      };
      fetch(`http://localhost:3000/shows/${show.id}`, requestOptions)
        .then((response) => {
          if (response.ok) {
            if(props.shows.length === 1) {
              props.deleteShow([]);
            }
            else{
              const idx = props.shows.indexOf(show);
              props.deleteShow(props.shows.slice(idx, 1));
            }
          }
        }
        );
  };

  const editButtonClicked = (show) => {
    props.passShowToEdit(show);
  };
 
  if (props.shows.length === 0) {return <p> Nenhum show encontrado</p> }
  return (
      <div>
        {props.shows.map((show) => {
            return (
                <div key={show.id} className={styles.showsDisplay}>
                    <p className={styles.showsTitles}> {show.title}</p>
                    <button className={styles.displayButton} id={styles.watchlistButton} onClick={() => {console.log(props.shows)}} 
                      type="button">{show.watchlist ? "On Watchlist" : "Old"} </button>
                    <button className={styles.displayButton} id={styles.watchlistButton}  onClick={() => editButtonClicked(show)}
                      type="button">Edit </button>
                    <button className={styles.deleteButton} type="button" onClick={ () => deleteButtonClicked(show) }>Delete</button>
                </div>
            );
        })}
      </div>
  );
}

function toTitleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

export default ShowsDisplay;