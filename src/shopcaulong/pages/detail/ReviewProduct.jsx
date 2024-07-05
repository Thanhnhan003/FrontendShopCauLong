import React, { useState, useEffect } from 'react';
import { GET_ID, GET_IMG } from '../../../api/apiService';
import CommentProduct from './CommentProduct';
import formatDate from "../../../component/FormatDate.jsx"
export default function ReviewProduct({ productId }) {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 3;

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        GET_ID('comments', productId)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching addresses:', error);
            });
    };
    const handleCommentAdded = () => {
        fetchComments();
    };
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(comments.length / commentsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? "/assets/icon/star.svg" : "/assets/icon/empty-star.svg"}
                    alt={i <= rating ? "star" : "empty star"}
                    className="review-card__star"
                />
            );
        }
        return stars;
    };
    return (
        <>
            <div className="row row-cols-3 gx-lg-2 row-cols-md-1 gy-md-3">
                {currentComments.map(comment => (
                    <div className="col" key={comment.commentId}>
                        <article className="review-card">
                            <div className="review-card__content">
                                <img
                                    src={comment.user.avatar ? GET_IMG('auth', comment.user.avatar) : "/assets/img/avatar/avt-1.jpg"}
                                    alt="avatar"
                                    className="review-card__img"
                                />
                                <div className="review-card__infor">
                                    <p className="review-card__name">{comment.user.fullname}</p>
                                    <p className="review-card__desc">{comment.commentText}</p>
                                </div>
                            </div>
                            <div className="review-card__rating">
                                <div className="review-card__stars">
                                    {renderStars(comment.rating)}
                                </div>
                                <span className="review-card__text">{formatDate(comment.createdAt)}</span>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
            <div className="pagination" style={{ paddingBlock: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ marginRight: '10px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}>Previous</button>
                <span style={{ margin: '0 10px', fontSize: '16px', fontWeight: 'bold' }}>{currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(comments.length / commentsPerPage)} style={{ marginLeft: '10px', padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', opacity: currentPage >= Math.ceil(comments.length / commentsPerPage) ? 0.5 : 1 }}>Next</button>
            </div>
            <CommentProduct productId={productId} onCommentAdded={handleCommentAdded}/>
        </>
    )
}
