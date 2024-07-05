import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GET_ALL, GET_IMG } from '../../../api/apiService';

const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function SearchProduct() {
    const { name } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await GET_ALL(`products/search?name=${name}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Không tìm thấy sản phẩm', error);
            }
        };

        fetchProducts();
    }, [name]);

    return (
        <>
            <main class="main">
                <div class="container home">
                    <div className="home__container">
                        <div className="home__header">
                            <h2 className="home__heading">Sản phẩm bạn tìm: {name}</h2>
                        </div>
                    </div>
                    {/* products */}
                    <div className="row row-cols-5 row-cols-lg-2 row-cols-sm-1 g-3 g-md-2">
                        {products.map((product) => {
                            const totalReviews = product.ratingStats?.totalReviews ?? 0;
                            const averageRating = totalReviews === 0 ? 5 : product.ratingStats?.averageRating ?? 5;
                            return (
                                <div className="col" key={product.productId}>
                                    <article className="product">
                                        <div className="product__wrap">
                                            <Link to={`/chi-tiet/${product.slug}`}>
                                                <img src={GET_IMG("products", product.galleries[0].thumbnail)} alt={product.productName} className="product__img" />
                                            </Link>
                                        </div>
                                        <h3 className="product__heading">
                                            <Link to={`/chi-tiet/${product.slug}`}>
                                                {product.productName}
                                            </Link>
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
                            );
                        })}
                    </div>
                </div>
            </main>

        </>
    );
}
