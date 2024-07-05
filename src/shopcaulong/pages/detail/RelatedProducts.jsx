import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ID, GET_IMG, GET_ALL } from '../../../api/apiService';
const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};
export default function RelatedProducts({ slug }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GET_ID('products/similar', slug)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching latest products:', error);
            });
    }, []);
    useEffect(() => {
        const fetchRatingStats = async (productId) => {
            try {
                const response = await GET_ALL(`comments/statistics/${productId}`);
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.productId === productId
                            ? { ...product, ratingStats: response.data }
                            : product
                    )
                );
            } catch (error) {
                console.error('Failed to fetch rating statistics', error);
            }
        };

        products.forEach(product => {
            if (!product.ratingStats) {
                fetchRatingStats(product.productId);
            }
        });
    }, [products]);
    return (
        <>
            <div class="product-remark js-tabs">
                <div class="product-remark__contents">
                    <div className="product-content product-content--active">
                        <h2 class="product-content__heading">NHỮNG SẢN PHẨM TƯƠNG TỰ</h2>
                        <div class="row row-cols-5 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-3 g-md-2">
                            {products.map((product) => {
                                const totalReviews = product.ratingStats?.totalReviews ?? 0;
                                const averageRating = totalReviews === 0 ? 5 : product.ratingStats?.averageRating ?? 5;
                                return (
                                    <div class="col" key={product.productId}>
                                        <article class="product">
                                            <div class="product__wrap">
                                                <a href={`/chi-tiet/${product.slug}`}>
                                                    <img src={GET_IMG("products", product.galleries[0].thumbnail)} alt={product.productName} className="product__img" />
                                                </a>
                                            </div>
                                            <h3 class="product__heading">
                                                <a href={`/chi-tiet/${product.slug}`}>
                                                    {product.productName}
                                                </a>
                                            </h3>

                                            <p className="product__brand">{product.brand.brandName}</p>
                                            <div className="product__infor">
                                                <span className="product__price">{formatVND(product.productPrice)}</span>
                                                <div className="product-rate">
                                                    <img src="/assets/icon/star.svg" alt="star" className="product-rate__icon" />
                                                    <span className="product-rate__val">{averageRating.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        </article>
                                    </div>

                                )
                            })}
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
