import { Link } from "react-router";
import { Album } from "../types/AlbumType";
import { Review } from "../types/ReviewType";

type ReviewsItemProps = {
    data: Review;
  };
  
  const ReviewItem: React.FC<ReviewsItemProps> = ({ data }) => {
    return (
    <div className="review-item">
            <h2>{data.user.username}</h2>
            <p>{data.comment}</p>

    </div>
     
    )
  }


  export default ReviewItem;