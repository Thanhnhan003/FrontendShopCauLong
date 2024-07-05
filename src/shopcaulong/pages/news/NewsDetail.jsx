import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_ID, GET_IMG } from '../../../api/apiService';
import './NewsDetail.css';
import FormatDate from '../../../component/FormatDate';

const NewsDetail = () => {
    const { slug } = useParams();
    const [news, setNews] = useState(null);

    useEffect(() => {
        fetchNewsDetail();
    }, [slug]);

    const fetchNewsDetail = () => {
        GET_ID('news/slug', slug)
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching news detail:', error);
            });
    };

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <main className="main">
            <div className="container home">
                <div className="news-detail-container">
                    <div className="news-detail-header">
                        <h1 className="news-detail-title">{news.title}</h1>
                        <div className="news-meta">
                            <img src="https://fbshop.vn/template/assets/images/icon-blogh-date.png" alt="date icon" className="news-detail-icon" />
                            <p className="news-detail-date">{FormatDate(news.createdAt)}</p>
                        </div>
                    </div>
                    <div className="news-detail-content">
                        <div className="news-detail-body" dangerouslySetInnerHTML={{ __html: news.content }}></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NewsDetail;
