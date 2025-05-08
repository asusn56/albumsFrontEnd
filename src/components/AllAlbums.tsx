
import { useAlbums } from "../pages/AlbumsContextProvider"
import AlbumItem from "./AlbumItem";


const AllAlbums = () => {
 const {albums} = useAlbums();
  
   
  
    return (
    <div className="album-list">
      {albums.map((album) => (
        <AlbumItem key={album._id} data={album} />
      ))}

        </div>
    //     <div className="card" key={album._id}>
    //       <header>
    //         <h2>
    //           <Link to={`/albums/${album._id}`}>
    //             {album.title}
    //           </Link>
    //         </h2>
    //       </header>
    //       <img
    //         src={album.coverImageUrl}
    //         alt={`${album.title} cover`}
    //       />
    //       <div className="content">
    //         <p>{album.description}</p>
    //       </div>
    //       <footer>
    //         <small>By {album.artist.title}</small>
    //       </footer>
    //     </div>
    //   ))}
    // </div>
    //   <div className="all-albums">
    //     <div className="album">
    //     <h2>Album List</h2>
      
    //       {albums.map((album) => (
    //         <li key={album._id}>
    //          <img  src={album.coverImageUrl}/>
    //          <div className="content"><p>
    //           {album.description}
    //           </p>
    //          </div>
    //           <strong><Link to={`/albums/${album._id}`}>{album.title}</Link></strong> - {album.artist.title}
    //           <br></br>
    //         </li>
    //       ))}
        
    //     </div>
    //   </div>
    // );
  
  
  
  
    )
  };
  
  export default AllAlbums;