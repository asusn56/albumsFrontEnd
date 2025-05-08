import { Link } from "react-router";
import { Album } from "../types/AlbumType";

type AlbumItemProps = {
    data: Album;
  };
  
  const AlbumItem: React.FC<AlbumItemProps> = ({ data }) => {
    return (
    <div className="album-item">
    
     <div className="title"> <h3>
        <Link to={`/albums/${data._id}`}>{data.title}</Link>
      </h3></div>
      <div className="album-image-wrapper">
       {<img src={data.coverImageUrl} alt={data.title} />}
      </div>
      <div className="album-info">
      <p>Artist: {data.artist.title ? data.artist.title : "Not Found"}</p>
      <p>Album Title: {data.title ? data.title  : "Not Found"}</p>
      
      </div>
      </div>
    )
  }


  export default AlbumItem;