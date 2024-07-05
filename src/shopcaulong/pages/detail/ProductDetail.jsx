import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GET_ID, GET_IMG, POST_ADD, GET_ALL } from '../../../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import { containerStyle, headingStyle, quantitySelectorStyle, buttonStyle, inputStyle } from './style'
import ReviewProduct from './ReviewProduct';
import DescriptionProduct from './DescriptionProduct';
import RelatedProducts from './RelatedProducts';
// Chuyển sang tiền việt
const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};
export default function ProductDetail() {
    const [activeItem, setActiveItem] = useState('Description');
    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    const token = Cookies.get('tokenUser');
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [productDescription, setDescription] = useState('');

    const [quantity, setQuantity] = useState(1);
    const [quantityProduct, setQuantityProduct] = useState('');
    const [price, setPrice] = useState('');
    const [productId, setProductId] = useState('');
    const { slug } = useParams();

    const [ratingStats, setRatingStats] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await GET_ID('products/slug', slug);
                setProduct(response.data);
                setMainImage(GET_IMG('products', response.data.galleries[0].thumbnail));
                setQuantityProduct(response.data.quantity);
                setPrice(response.data.productPrice);
                setProductId(response.data.productId);
                setDescription(response.data.productDescription);

            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [slug]);

    useEffect(() => {
        if (productId) {
            const fetchRatingStats = async () => {
                try {
                    const response = await GET_ALL(`comments/statistics/${productId}`);
                    setRatingStats(response.data);
                } catch (error) {
                    console.error('Failed to fetch rating statistics', error);
                }
            };

            fetchRatingStats();
        }
    }, [productId]);

    const changeMainImage = (thumbnail) => {
        setMainImage(GET_IMG('products', thumbnail));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    if (!ratingStats) {
        return <div>Loading...</div>;
    }

    const { totalReviews } = ratingStats;
    const averageRating = totalReviews === 0 ? 5 : ratingStats.averageRating;

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < quantityProduct) {
            setQuantity(quantity + 1);
        } else {
            toast.warn('Số lượng sản phẩm không đủ.');
        }
    };

    const handleInputChange = (e) => {
        let value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= quantityProduct) {
            setQuantity(value);
        } else if (value > quantityProduct) {
            toast.warn('Số lượng sản phẩm không đủ.');
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        const formData = new FormData();
        formData.append('productId', product.productId);
        formData.append('quantity', quantity);

        POST_ADD('cart/add', formData)
            .then(response => {
                console.log('Added to cart:', response.data);
                toast.success('Sản phẩm đã được thêm vào giỏ hàng.');
            })
            .catch(error => {
                if (token == null) {
                    toast.warn('Vui lòng đăng nhập.');
                } else {
                    toast.warn('Lỗi thêm vào giỏ hàng.');
                }
            });
    };

    return (
        <>
            <main class="main product-detail">
                <div class="container" >
                    <div class="product-container d-none d-lg-block">
                        <div class="search-bar">
                            <input type="text" name="" id="" class="search-bar__input" placeholder="Seach for item" />
                            <button>
                                <img src="/assets/icon/filter-search.svg" alt="search" class="search-bar__icon icon" />
                            </button>
                        </div>
                    </div>

                    <div class="product-container">
                        <ul class="breadscrumbs">
                            <li class="breadscrumbs__item">
                                <a href="/" class="breadscrumbs__link">
                                    Trang chủ
                                    <img src="/assets/icon/arrow-right.svg" alt="arrow icon" class="breadscrumbs__icon" />
                                </a>
                            </li>
                            <li class="breadscrumbs__item">
                                <a href={`/danh-muc/${product.category.slug}`} class="breadscrumbs__link">
                                    {product.category.categoryName}
                                    <img src="/assets/icon/arrow-right.svg" alt="arrow icon" class="breadscrumbs__icon" />
                                </a>
                            </li>
                            <li class="breadscrumbs__item">
                                <a href={`/duyet-san-pham/${product.category.slug}/${product.brand.slug}`} class="breadscrumbs__link">
                                    {product.brand.brandName}
                                    <img src="/assets/icon/arrow-right.svg" alt="arrow icon" class="breadscrumbs__icon" />
                                </a>
                            </li>
                            <li class="breadscrumbs__item">
                                <a href="#!" class="breadscrumbs__link breadscrumbs__link--current">
                                    {product.productName}
                                </a>
                            </li>

                        </ul>
                    </div>

                    <div class="product-container">
                        <div class="row">
                            <div className="col-5 col-xl-6 col-lg-12">
                                <div className="product-preview">
                                    <div className="product-preview__list">
                                        <div className="product-preview__item" >
                                            <img src={mainImage} alt="product-preview-item-4"
                                                class="product-preview__img" />

                                        </div>
                                    </div>

                                    <div className="product-preview__thumbs">
                                        {product.galleries.map((gallery, index) => (
                                            <img
                                                key={index}
                                                src={GET_IMG('products', gallery.thumbnail)}
                                                alt={`product-preview-thumb-${index}`}
                                                className={`product-preview__thumbs-img ${mainImage === GET_IMG('products', gallery.thumbnail) ? 'product-preview__thumbs-img--current' : ''}`}
                                                onClick={() => changeMainImage(gallery.thumbnail)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div class="col-7 col-xl-6 col-lg-12">
                                <form className="form product-form">
                                    <section className="product-infor">
                                        <h2 className="product-infor__heading">{product.productName}</h2>
                                        <div className="row">
                                            <div className="col-5 col-xl-12">
                                                <div className="product-infor__rating">
                                                    <img src="/assets/icon/star.svg" alt="rating" className="product-infor__rating-icon" />
                                                    <span className="product-infor__rating-text">({averageRating.toFixed(1)}) {totalReviews} Đánh giá</span>
                                                </div>
                                                <div className="product-infor__wrapper" style={containerStyle}>
                                                    <label htmlFor="" className="form__heading" style={headingStyle}>Số lượng</label>
                                                    <div className="quantity-selector" style={quantitySelectorStyle}>
                                                        <div type="button" className="btn-quantity" style={buttonStyle} onClick={decreaseQuantity}><img src="/assets/icon/button/decreasequantity.svg" alt="" /></div>
                                                        <input
                                                            type="number"
                                                            className="quantity-input"
                                                            style={inputStyle}
                                                            value={quantity}
                                                            onChange={handleInputChange}
                                                        />
                                                        <div type="button" className="btn-quantity" style={buttonStyle} onClick={increaseQuantity}><img src="/assets/icon/button/increasequantity.svg" alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="product-infor__wrapper" style={{ ...containerStyle, display: "flex", alignItems: "baseline" }}>
                                                    <img src='/assets/img/product/track.png' style={{ maxWidth: "30px", width: "100%", marginRight: "10px" }} alt='track' />
                                                    <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Tồn kho: {quantityProduct}</h1>
                                                </div>


                                            </div>
                                            <div className="col-7 col-xl-12">
                                                <div className="product-item product-item--margin-lg">
                                                    <img src="/assets/icon/product-item/doc.svg" alt="product-item icon" className="product-item__icon" />
                                                    <div className="product-item__infor">
                                                        <p className="product-item__heading">Hóa đơn nhanh</p>
                                                    </div>
                                                </div>
                                                <div className="product-item">
                                                    <img src="/assets/icon/product-item/cart.svg" alt="product-item icon" className="product-item__icon" />
                                                    <div className="product-item__infor">
                                                        <p className="product-item__heading">Vận chuyển</p>
                                                        <p className="product-item__desc">Trong 1-3 ngày</p>
                                                    </div>
                                                </div>
                                                <div className="product-item">
                                                    <img src="/assets/icon/product-item/bag.svg" alt="product-item icon" className="product-item__icon" />
                                                    <div className="product-item__infor">
                                                        <p className="product-item__heading">Cửa hàng</p>
                                                        <p className="product-item__desc">Còn 2 cửa hàng</p>
                                                    </div>
                                                </div>

                                                <div className="product-cart">
                                                    {/* <p className="product-cart__price">
                                                        $500.00
                                                        <span className="product-cart__discount">10%</span>
                                                    </p> */}
                                                    <p className="product-cart__price product-cart__price--big">
                                                        {formatVND(price)}
                                                    </p>

                                                    <div className="product-cart__btns">
                                                        <button className="btn btn--primary product-cart__btn" onClick={handleAddToCart}>
                                                            Thêm vào giỏ hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="product-container">
                        <div class="product-remark js-tabs">
                            <ul className="product-remark__list">
                                <li className={activeItem === 'Description' ? "product-remark__item product-remark__item--active" : "product-remark__item"} onClick={() => handleItemClick('Description')}>Mô tả sản phẩm</li>
                                <li className={activeItem === 'Review' ? "product-remark__item product-remark__item--active" : "product-remark__item"} onClick={() => handleItemClick('Review')}>Đánh giá ({totalReviews})</li>
                            </ul>
                            <div class="product-remark__contents">

                                <div className={activeItem === 'Description' ? "product-content product-content--active" : "product-content"}>
                                    <DescriptionProduct productDescription={productDescription} />
                                </div>
                                <div className={activeItem === 'Review' ? "product-content product-content--active" : "product-content"}>
                                    <h2 class="product-content__heading">Khách hàng của chúng tôi đang nói gì?</h2>
                                    <ReviewProduct productId={productId} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="product-container">
                        <RelatedProducts slug={slug} />
                    </div>


                </div>
            </main>
            <ToastContainer
                position="bottom-left"
                // position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </>
    )
}
