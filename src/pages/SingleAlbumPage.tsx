import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAlbums } from "./AlbumsContextProvider"
import { Album } from "../types/AlbumType";
import { Review } from "../types/ReviewType";

import { getAllReviews } from "../api/reviews";
import { getAllFormats } from "../api/formats";
import { AlbumFormat } from "../types/AlbumFormatType";
import ReviewItem from "../components/reviewsComponent";
import FormatItem from "../components/formatComponent";
import AlbumTypeItem from "../components/AlbumTypeComponent";
import ReviewForm from "../components/ReviewFormComponent";
import { useAuth } from "../AuthContext";
const SingleAlbumPage: React.FC = () => {
    const { id } = useParams();
    const {loading, getAlbum  } = useAlbums();
    const { user } = useAuth()
  
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [reviewError, setReviewError] = useState<string | null>(null);
    
    const [availableFormats, setAvailableFormats] = useState<AlbumFormat[]>([]);
    
    useEffect(() => {
      if (!id) return;

      const fetchReviews = async () => {
          try {
              const data = await getAllReviews();
              setReviews(data);
              
          } catch (err) {
              console.error("Failed to load reviews", err);
              setReviewError("Failed to load reviews");
          } finally {
              setReviewLoading(false);
          }
      };

    const fetchAlbumFormats = async () => {
        const data = await getAllFormats();
       
        setAvailableFormats(data);
        return data;
      };



      fetchReviews();
     
      fetchAlbumFormats();
  }, [id]);


  
    
  const albumFormats = availableFormats.filter(
    (format) => format.album._id === id
  );
  const albumReviews = reviews.filter(
    (review) => review.album._id === id
  );
    if (loading) return <div>Loading...</div>;
    if(!id){
      return   <div>Album not found</div>
    }
    
  
    const album: Album | undefined = id ? getAlbum(id) : undefined;
    if(!album){
        return   <div>Album not found</div>
    }
    

    console.log(albumFormats);

return (

  <>
   <div className="album-page">
   <div className="album-page-header">
    <h2>{album.artist.title} - {album.title} </h2>
    </div>
    <div className="album-page-types">
    
    
    {album.albumType.map((albumType) => (
        <AlbumTypeItem key={albumType._id} data={albumType} />
      ))}
 
     
  <div className="format-item-wrapper">
  {albumFormats.map((albumFormat) => (
        <FormatItem key={albumFormat._id} data={albumFormat} />
      ))}
        </div>





</div>
 <div className="album-page-reviews">
   <h2>Reviews:</h2>
      
   {albumReviews.map((review) => (
        <ReviewItem key={review._id} data={review} />
      ))}

      </div>
      </div>
      {user && (
      <ReviewForm album={album} />
    )}
    </>
);
      
}


export default SingleAlbumPage;