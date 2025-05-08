import { AlbumType } from "../types/AlbumTypeType";


type AlbumTypeItemProps = {
    data: AlbumType;
  };
  
  const AlbumTypeItem: React.FC<AlbumTypeItemProps> = ({ data }) => {
    return (
    <div className="review-item">
            <h2>{data.name}</h2>
            <p>{data.description}</p>

    </div>
     
    )
  }


  export default AlbumTypeItem;