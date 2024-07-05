import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { POST_ADD, GET_USER_INFO, GET_IMG } from '../../../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CommentProduct({ productId, onCommentAdded }) {
    const [commentText, setCommentText] = useState('');
    const [rating, setRating] = useState(5);
    const [info, setInfo] = useState([]);

    const token = Cookies.get('tokenUser');

    useEffect(() => {
        if (token) {
            GET_USER_INFO('auth/show/info')
                .then(response => {
                    setInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (token == null) {
            toast.warn('Vui lòng đăng nhập');
        } else {
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('commentText', commentText);
            formData.append('rating', rating);

            try {
                await POST_ADD('comments/add', formData);
                setCommentText('');
                setRating(5); // Reset lại thành 5 sao sau khi submit
                if (onCommentAdded) {
                    onCommentAdded();
                }
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? "/assets/icon/star.svg" : "/assets/icon/empty-star.svg"}
                    alt={i <= rating ? "star" : "empty star"}
                    className="review-card__star"
                    onClick={() => setRating(i)}
                    style={{ cursor: 'pointer' }}
                />
            );
        }
        return stars;
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#f6f6f6", borderRadius: "15px", padding: "15px" }}>
            <div className="nguoi-dung-va-danh-gia" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="review-card__content" style={{ flex: 1 }}>
                    <img
                        src={info.avatar ? GET_IMG('auth', info.avatar) : "/assets/img/avatar/avt-1.jpg"}
                        alt="avatar"
                        className="review-card__img"
                    />
                    <div className="review-card__infor">
                        <p className="review-card__name">{info.fullname ?info.fullname : "Bạn hãy đăng nhập"}</p>
                    </div>
                </div>
                <div className="danh-gia" style={{ flex: 1, textAlign: 'right' }}>
                    <label style={{ fontWeight: "bold", paddingBlock: "10px" }}>Đánh giá</label>
                    <div className="star-rating" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {renderStars()}
                    </div>
                </div>
            </div>
            <div>
                <label style={{ fontWeight: "bold", paddingBlock: "10px" }} htmlFor="commentText">Nêu cảm nghĩ của bạn</label>
                <textarea style={{ borderWidth: "1px", borderStyle: "solid", backgroundColor: "white", width: '100%',maxHeight:"100px",height:"100px" }}
                    id="commentText"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                ></textarea>
            </div>

            <button type="submit">Đăng</button>
        </form>
    );
}
