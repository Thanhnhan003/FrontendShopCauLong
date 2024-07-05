import React, { useState, useEffect } from 'react';
import { GET_IMG, GET_CART_TOKEN, DELETE_ID } from '../../../api/apiService';
import { useNavigate } from 'react-router-dom';

import NotificationService from '../../../component/NotificationService';
// Chuyển sang tiền việt
const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function Checkout() {
    const [CartItem, setCartItem] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        GET_CART_TOKEN('cart/items')
            .then(response => {
                const items = response.data;
                setCartItem(items);
                // Calculate subtotal
                const total = items.reduce((acc, item) => acc + parseInt(item.totalPrice, 10), 0);
                setSubtotal(total);
            })
            .catch(error => {
                console.error('Error fetching latest cart:', error);
                console.log(error);
            });
    };

    const handleDelete = (productId) => {
        NotificationService.warning('Bạn có chắc chắn muốn xóa sản phẩm này?', 'Sản phẩm sẽ được xóa khỏi giỏ hàng.').then((result) => {
            if (result.isConfirmed) {
                DELETE_ID(`cart/remove?productId=${productId}`)
                    .then(() => {
                        NotificationService.success('Thành công', 'Sản phẩm đã được xóa.');
                        fetchCartItems();
                    })
                    .catch(error => {
                        NotificationService.error('Lỗi', 'Có lỗi xảy ra khi xóa sản phẩm.');
                        console.error('Error deleting item:', error);
                    });
            }
        });
    };
    const shippingFee = 0; // Example shipping fee
    const totalPrice = subtotal;

    return (
        <>
            <main className="main checkout">
                <div className="container">
                    <div className="checkout-container d-none d-lg-block">
                        <div className="search-bar">
                            <input type="text" name="" id="" className="search-bar__input" placeholder="Seach for item" />
                            <button>
                                <img src="/assets/icon/filter-search.svg" alt="search" className="search-bar__icon icon" />
                            </button>
                        </div>
                    </div>

                    <div className="checkout-container">
                        <ul className="breadscrumbs checkout__breadscrumbs">
                            <li className="breadscrumbs__item">
                                <a href="/" className="breadscrumbs__link">
                                    Trang chủ
                                    <img src="/assets/icon/arrow-right.svg" alt="arrow icon" className="breadscrumbs__icon" />
                                </a>
                            </li>

                            <li className="breadscrumbs__item">
                                <a href="#!" className="breadscrumbs__link breadscrumbs__link--current">
                                    Thông tin thanh toán
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="checkout-container">
                        <div className="row gy-xl-3">
                            <div className="col-8 col-xl-12">
                                <div className="checkout-content">
                                    {CartItem.length === 0 ? (
                                        <p style={{ fontSize: "1.6rem", fontWeight: "500", lineHeight: "1" }}>Không có sản phẩm trong giỏ hàng.</p>
                                    ) : (
                                        <div className="checkout-content__list">
                                            {CartItem.map((cartItem) => (
                                                <article className="checkout-item" key={cartItem.cartId}>
                                                    <a href="./product-detail.html"> <img src={GET_IMG("products", cartItem.product.galleries[0].thumbnail)}
                                                        alt="item" className="checkout-item__thumb" /></a>
                                                    <div className="checkout-item__content">
                                                        <div className="checkout-item__content-left">
                                                            <a href="./product-detail.html">
                                                                <h2 className="checkout-item__heading">{cartItem.product.productName}</h2>
                                                            </a>
                                                            <p className="checkout-item__desc">
                                                                {formatVND(cartItem.totalPrice)} | <span className="checkout-item__desc--color">Trong kho</span>
                                                            </p>
                                                            <div className="checkout-item__controls">
                                                                <div className="checkout-item__control">
                                                                    <span className="checkout-item__control-value">{cartItem.product.brand.brandName}</span>
                                                                </div>
                                                                <div className="checkout-item__control">
                                                                    <button className="checkout-item__control-btn">
                                                                        <img src="/assets/icon/btn-minus.svg" alt="minus"
                                                                            className="checkout-item__control-icon icon" />
                                                                    </button>
                                                                    <span className="checkout-item__control-value">{cartItem.quantity}</span>
                                                                    <button className="checkout-item__control-btn">
                                                                        <img src="/assets/icon/btn-add.svg" alt="add"
                                                                            className="checkout-item__control-icon icon" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="checkout-item__content-right">
                                                            <p className="checkout-item__price">{formatVND(cartItem.totalPrice)}</p>
                                                            <div className="checkout-item__cta">
                                                                <button className="checkout-item__btn" onClick={() => handleDelete(cartItem.product.productId)}>
                                                                    <img src="/assets/icon/trash.svg" alt="trash"
                                                                        className="checkout-item__icon" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}
                                    <div className="checkout-content__infor d-md-none">
                                        <div className="row">
                                            <div className="col-8 col-xxl-7">
                                                <div className="checkout-continue">
                                                    <a href="./product-detail.html" className="checkout-continue__link">
                                                        <img src="/assets/icon/filter-arrow.svg" alt="arrow"
                                                            className="checkout-continue__link-icon icon" />
                                                        Tiếp tục mua sắm
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-4 col-xxl-5">
                                                <div className="checkout-infor">
                                                    <div className="checkout-infor__row">
                                                        <p className="checkout-infor__title">Tổng phụ:</p>
                                                        <p className="checkout-infor__data">{formatVND(subtotal)}</p>
                                                    </div>
                                                    <div className="checkout-infor__row">
                                                        <p className="checkout-infor__title">Vận chuyển:</p>
                                                        <p className="checkout-infor__data">{formatVND(shippingFee)}</p>
                                                    </div>
                                                    <div className="checkout-infor__separate"></div>
                                                    <div className="checkout-infor__row">
                                                        <p className="checkout-infor__title checkout-infor__title--big">Tổng giá:</p>
                                                        <p className="checkout-infor__data checkout-infor__data--big">{formatVND(totalPrice)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 col-xl-12">
                                <div className="checkout-infor checkout-pay">
                                    <div className="checkout-infor__row">
                                        <p className="checkout-infor__title">Tổng phụ (mặt hàng)</p>
                                        <p className="checkout-infor__data">{CartItem.length}</p>
                                    </div>
                                    <div className="checkout-infor__row">
                                        <p className="checkout-infor__title">Giá (Tổng cộng)</p>
                                        <p className="checkout-infor__data">{formatVND(subtotal)}</p>
                                    </div>
                                    <div className="checkout-infor__row">
                                        <p className="checkout-infor__title">Vận chuyển</p>
                                        <p className="checkout-infor__data">{formatVND(shippingFee)}</p>
                                    </div>

                                    <div className="checkout-infor__separate checkout-pay__separate"></div>
                                    <div className="checkout-infor__row">
                                        <p className="checkout-infor__title">Tổng giá được tính</p>
                                        <p className="checkout-infor__data">{formatVND(totalPrice)}</p>
                                    </div>

                                    <a href="/dia-chi-va-phuong-thuc-thanh-toan" className="btn btn--primary btn--rounded checkout-pay__btn">Tiếp tục thanh toán</a>
                                </div>

                                <a href="#!">
                                    <div className="checkout-gift">
                                        <div className="checkout-gift__wrapper">
                                            <img src="/assets/icon/gift.svg" alt="gift" className="checkout-gift__img" />
                                        </div>

                                        <div className="checkout-gift__content">
                                            <p className="checkout-gift__heading">Gửi đơn đặt hàng này như một món quà.</p>
                                            <p className="checkout-gift__desc">Các mặt hàng có sẵn sẽ được chuyển đến người nhận quà của bạn.
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            \
        </>
    );
}