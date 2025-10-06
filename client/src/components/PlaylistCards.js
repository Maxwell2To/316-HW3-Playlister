import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PlaylistCard from './PlaylistCard.js'
import { GlobalStoreContext } from '../store/index.js'
import DeleteListModal from './DeleteListModal.js'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const PlaylistCards = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    /* Old useEffect
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    */

    ////////New code////////
    useEffect(() => {
        async function loadPlaylists() {
            await store.loadIdNamePairs();

            const savedId = localStorage.getItem("currentPlaylistId");
            if (savedId) {
                store.setCurrentList(savedId);
            }
        }
        loadPlaylists();
    }, [store]);
    ////////New code////////




    function handleCreateNewList() {
        store.createNewList();
    }
    //let listCard = "";
    let listCard = null;
    if (store.idNamePairs && store.idNamePairs.length > 0) {
        listCard = store.idNamePairs.map((pair) => (
            <PlaylistCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    else {
        listCard = (
            <p style={{ textAlign: "center", color: "#777", marginTop: "20px" }}>
                No playlists yet.
            </p>
        );
    }
    
    let deleteListModal = "";
    if (store.isDeleteListModalOpen())
        deleteListModal = <DeleteListModal />;
    return (
        <div id="playlist-selector">
            <div id="playlist-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className="playlister-button"
                    value="+" />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                {
                    deleteListModal
                }                
            </div>
        </div>)
}

export default PlaylistCards;