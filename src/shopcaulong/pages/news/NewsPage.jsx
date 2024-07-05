import React, { useState, useEffect } from 'react';
import { GET_ALL, GET_IMG } from '../../../api/apiService';
import { Link } from 'react-router-dom';
import './NewsList.css';
import FormatDate from "../../../component/FormatDate"

const normalizeText = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};
const NewsPage = () => {
    const [newsList, setNewsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNewsList, setFilteredNewsList] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        GET_ALL('news/show')
            .then(response => {
                setNewsList(response.data);
                setFilteredNewsList(response.data);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        const normalizedSearchQuery = normalizeText(searchQuery);
        const filteredList = newsList.filter(news =>
            normalizeText(news.title).includes(normalizedSearchQuery)
        );
        setFilteredNewsList(filteredList);
    };

    return (
        <>
            <div className='search-container'>
                <input
                    type="text"
                    placeholder="Tìm kiếm tin tức..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='search-input'
                />
                <button onClick={handleSearchClick} className='search-button'>Tìm kiếm</button>
            </div>
            <div className="news-container">
                {filteredNewsList.map(news => (
                    <div className="news-item" key={news.id}>
                        <div className="news-thumbnail">
                            <img src={GET_IMG('news', news.thumbnail)} alt={news.title} />
                        </div>
                        <div className="news-details">
                            <div className="news-meta">
                                <a href={`/tin-tuc/${news.slug}`} alt="">
                                    <img src="https://fbshop.vn/template/assets/images/icon-blogh-date.png" alt="date icon" className="news-detail-icon" />
                                </a>
                                <p className="news-detail-date">{FormatDate(news.createdAt)}</p>
                            </div>
                            <Link to={`/tin-tuc/${news.slug}`} className="news-title">{news.title}</Link>
                            {/* <p className="news-content">{news.content}</p> */}
                            <Link to={`/tin-tuc/${news.slug}`} className="news-link">Đọc thêm</Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NewsPage;
