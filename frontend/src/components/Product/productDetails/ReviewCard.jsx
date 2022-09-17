import React from 'react';
import "./ReviewCard.css";
import ReactStars from 'react-rating-stars-component';
function ReviewCard({ name, rating, comment }) {
    let profilePic = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    return (
        <div className='reviewCard'>
            <div className="reviewCard__block1">
                <img src={profilePic} alt="profile pic" />
                <p className='reviewCard__name'>{name}</p>
                < ReactStars
                    count={5} //total number of stars
                    value={rating} //input rating value
                    edit={false}
                    size={window.innerWidth < 600 ? 14 : 18}
                    isHalf={true}
                    activeColor="tomato"
                />
            </div>
            <div className="reviewCard__block2">
                <p className='reviewCard__comment'>{comment}</p>
            </div>
        </div>
    );
}

export default ReviewCard;