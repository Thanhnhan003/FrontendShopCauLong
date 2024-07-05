import React, { useEffect, useState } from 'react';
import { GET_ALL } from '../../../api/apiService';

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        GET_ALL('banners/enabled')
            .then(response => {
                setBanners(response.data);
            })
            .catch(error => {
                console.error('Error fetching banners:', error);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [banners.length]);

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
    };

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    };

    return (
        <div className="home__container">
            <div className="slideshow" style={{ position: 'relative' }}>
                <div className="slideshow__body" style={{ display: 'flex', overflow: 'hidden', position: 'relative' }}>
                    {banners.map((banner, index) => (
                        <div
                            key={banner.bannerId}
                            className={`slideshow__item ${index === currentSlide ? 'active' : ''}`}
                            style={{
                                position: 'relative',
                                flexShrink: 0,
                                width: '100%',
                                paddingTop: '34%',
                                transform: `translateX(-${currentSlide * 100}%)`
                            }}
                        >
                            <a href={`/${banner.urlLink}`} className="slideshow__link">
                                <picture>
                                    <img  src={banner.urlImg} alt={banner.bannerName} className="slideshow__img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',borderRadius:"15px" }} />
                                </picture>
                            </a>
                        </div>
                    ))}
                </div>
                <button
                    className="slideshow__nav slideshow__nav--prev"
                    onClick={handlePrev}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        border: 'none',
                        padding: '10px',
                        cursor: 'pointer',
                        // zIndex: 10,
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        left: '10px'
                    }}
                >
                    &#8249;
                </button>
                <button
                    className="slideshow__nav slideshow__nav--next"
                    onClick={handleNext}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        border: 'none',
                        padding: '10px',
                        cursor: 'pointer',
                        // zIndex: 10,
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        right: '10px'
                    }}
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
}
