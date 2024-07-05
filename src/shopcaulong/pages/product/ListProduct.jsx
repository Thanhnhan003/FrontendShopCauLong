import React, { useState } from 'react';
import { GET_IMG } from '../../../api/apiService';
import { Link } from 'react-router-dom';

const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function ListProduct({ products }) {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Get current page products
    const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle next and previous
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const paginationControls = (
        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button 
                onClick={handlePrevious} 
                className="pagination__button" 
                style={{ margin: '0 5px', padding: '5px 10px', cursor: currentPage > 1 ? 'pointer' : 'not-allowed', backgroundColor: currentPage > 1 ? '#007bff' : '#ccc', color: '#fff', border: 'none', borderRadius: '3px' }} 
                disabled={currentPage === 1}
            >
                Trước
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`pagination__button ${currentPage === index + 1 ? 'active' : ''}`}
                    style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer', backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff', color: currentPage === index + 1 ? '#fff' : '#000', border: '1px solid #007bff', borderRadius: '3px' }}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                onClick={handleNext} 
                className="pagination__button" 
                style={{ margin: '0 5px', padding: '5px 10px', cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', backgroundColor: currentPage < totalPages ? '#007bff' : '#ccc', color: '#fff', border: 'none', borderRadius: '3px' }} 
                disabled={currentPage === totalPages}
            >
                Sau
            </button>
        </div>
    );

    return (
        <div>
            <div className="row row-cols-3 row-cols-lg-2 row-cols-sm-1 g-3 g-md-2">
                {currentProducts.map((product) => {
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
                                        <img src="./assets/icon/star.svg" alt="star" className="product-rate__icon" />
                                        <span className="product-rate__val">{averageRating.toFixed(1)}</span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    );
                })}
            </div>
            {paginationControls}
        </div>
    );
}
