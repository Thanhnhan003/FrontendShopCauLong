import React, { useState, useEffect } from 'react';
import { GET_IMG, GET_CART_TOKEN } from '../../../api/apiService';

const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function Cart() {
    const [CartItem, setCartItem] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        // Set an interval to fetch cart items every 10 seconds (10000 milliseconds)
        const intervalId = setInterval(fetchCartItems, 100);

        // Initial fetch
        fetchCartItems();

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
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
            });
    };

    const shippingFee = 0; // Example shipping fee
    const totalPrice = subtotal;
    return (
        <>
            <div className="header__cta">
                <div className="header__btn-cart">
                    <button className="header__btn">
                        <img src="/assets/icon/header-cart.svg" alt="Header cart" className="icon" />
                        <span className="header-btn__title">{formatVND(subtotal)}</span>
                    </button>

                    <div className="cart-wrapper">
                        <section className="cart">
                            <img src="/assets/img/filter-arrow-bg.png" alt="arrow" className="cart__arrow icon" />
                            <div className="cart-header">
                                <p className="cart-header__quantity">
                                    {CartItem.length > 0 ? `Bạn đang có ${CartItem.length} sản phẩm` : 'Bạn không có sản phẩm nào trong giỏ hàng.'}
                                </p>
                                {CartItem.length > 0 && <a href="/thu-tuc-thanh-toan" className="cart-header__link">Xem tất cả</a>}
                            </div>

                            {CartItem.length > 0 && (
                                <>
                                    <div className="cart-items-container">
                                        <div className="row row-cols-3">
                                            {CartItem.map((cartItem) => (
                                                <div className="col" key={cartItem.cartId}>
                                                    <div className="cart-item">
                                                        <div className="cart-item__img">
                                                            <img src={GET_IMG("products", cartItem.product.galleries[0].thumbnail)} alt=""
                                                                className="cart-item__thumb" />
                                                        </div>
                                                        <p className="cart-item__name">{cartItem.product.productName}</p>
                                                        <p className="cart-item__price">{formatVND(cartItem.totalPrice)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="cart-body">
                                        <div className="cart-body__row">
                                            <p className="cart-body__title">Tổng phụ::</p>
                                            <p className="cart-body__content">{formatVND(subtotal)}</p>
                                        </div>
                                        <div className="cart-body__row">
                                            <p className="cart-body__title">Vận chuyển:</p>
                                            <p className="cart-body__content">{formatVND(shippingFee)}</p>
                                        </div>
                                        <div className="cart-body__row">
                                            <p className="cart-body__title cart-body__title--bold">Tổng giá:</p>
                                            <p className="cart-body__content cart-body__content--bold">{formatVND(totalPrice)}</p>
                                        </div>
                                    </div>

                                    <div className="cart-footer">
                                        <button>
                                            <a href="/thu-tuc-thanh-toan"
                                                className="cart-footer__btn btn btn--primary btn--rounded">Kiểm tra tất cả</a>
                                        </button>
                                    </div>
                                </>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
