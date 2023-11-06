const React = require('react');
const ReactDOM = require('react-dom');

class SongContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songs: props.songs,
        };

        // Testing with artificial lag
        // setTimeout(this.loadSongsFromServer, 3000);

        // Make a request to the server
        this.loadSongsFromServer();
    }

    render() {
        if (this.state.songs.length === 0) {
            return(
                <div>
                    <h3>No Songs Yet!</h3>
                </div>
            )
        }

        // Assuming we have songs
        // Make a list and show on the screen
        const songList = this.state.songs.map(song => {
            return (
                <div key={song.title}>
                    <h2>{song.artist} - <i>{song.title}</i></h2>
                </div>
            );
        });

        return(
            <div>
                <h1>My Favorite Songs!</h1>
                {songList}
            </div>
        );
    }

    loadSongsFromServer = async () => {
        const response = await fetch('/getSongs');
        const songs = await response.json();
        this.setState({songs: songs});
    }
}

const init = () => {
    ReactDOM.render(
        <SongContainer songs={[]} />,
        document.getElementById('app')
    );
}

window.onload = init;
