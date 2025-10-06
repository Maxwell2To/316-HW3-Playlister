import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import EditSongModal from './EditSongModal.js'
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function SongCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <EditSongModal />;
    }

    //New code to protect against null
    if (!store.currentList) {
        return (
            <div id="playlist-cards">
                <p style={{ textAlign: "center", color: "#777", marginTop: "20px" }}>
                    No playlist selected
                </p>
                {modalJSX}
            </div>
        );
    }

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
        }
        {modalJSX}
        </div>
    )
}

export default SongCards;