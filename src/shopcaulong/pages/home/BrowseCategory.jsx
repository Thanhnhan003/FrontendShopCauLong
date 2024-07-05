import React, { useEffect, useState } from 'react';
import { GET_ALL, GET_IMG } from '../../../api/apiService';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination } from 'swiper/modules';

export default function BrowseCategory() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        GET_ALL('category/show')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return (
        <>
            <div className="home__container">
                <div className="home__header">
                    <h2 className="home__heading">Danh mục sản phẩm</h2>
                </div>
                <div className="home__cate">
                    {categories.length > 3 ? (
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                // When window width is >= 320px
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                // When window width is >= 640px
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 20,
                                },
                                // When window width is >= 768px
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {categories.map(category => (
                                <SwiperSlide key={category.categoryId}>
                                    <Link to={`/danh-muc/${category.slug}`}>
                                        <article className="cate-item">
                                            <img src={GET_IMG('category', category.thumbnail)} alt="cate-item" className="cate-item__thumb" />
                                            <div className="cate-item__infor">
                                                <h3 className="cate-item__heading">{category.categoryName}</h3>
                                                <p className="cate-item__desc">{category.categoryDescription}</p>
                                            </div>
                                        </article>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="row row-cols-3 row-cols-md-1">
                            {categories.map(category => (
                                <div className="col" key={category.categoryId}>
                                    <Link to={`/danh-muc/${category.slug}`}>
                                        <article className="cate-item">
                                            <img src={GET_IMG('category', category.thumbnail)} alt="cate-item" className="cate-item__thumb" />
                                            <div className="cate-item__infor">
                                                <h3 className="cate-item__heading">{category.categoryName}</h3>
                                                <p className="cate-item__desc">{category.categoryDescription}</p>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
