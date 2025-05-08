import React from "react";
import { AlbumsContextProvider } from "./AlbumsContextProvider";
import AllAlbums from '../components/AllAlbums';


const AlbumsPage: React.FC = () => {
    return (

        <>
        <AlbumsContextProvider>
           <AllAlbums></AllAlbums>
        </AlbumsContextProvider>
        </>
    )

}

export default AlbumsPage;