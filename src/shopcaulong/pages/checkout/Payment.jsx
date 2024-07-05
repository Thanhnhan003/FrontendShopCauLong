import React, { useState, useEffect } from 'react';
import { GET_INFO_BY_TOKEN, GET_CART_TOKEN, POST_ADD_ORDER, CHECKOUT, DELETE_ID } from '../../../api/apiService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ModalItem from './ModalItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from 'react-lottie';
import loadingAnimation from "../../../component/LoadingAnimotation.json";
// Chuyển sang tiền việt
const formatVND = (number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function Shipping() {

  const [CartItem, setCartItem] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => setShowModal(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    GET_CART_TOKEN('cart/items')
      .then(response => {
        const items = response.data;
        setCartItem(items);
        // Calculate subtotal
        const total = items.reduce((acc, item) => acc + parseInt(item.product.productPrice, 10), 0);
        setSubtotal(total);
      })
      .catch(error => {
        console.error('Error fetching latest cart:', error);
        console.log(error);
      });
  }, []);

  const shippingFee = 0; // Example shipping fee
  const totalPrice = subtotal;
  //=======================================================================
  const [paymentMethod, setPaymentMethod] = useState('');
  const [addressUserId, setAddressUserId] = useState('');
  const [addresses, setAddresses] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = () => {
    GET_INFO_BY_TOKEN('address/user')
      .then(response => {
        setAddresses(response.data);
      })
      .catch(error => {
        console.error('Error fetching addresses:', error);
      });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddressUserId(event.target.value);
  };

  const handleConfirmClick = () => {

    if (!addressUserId) {
      toast.warning('Vui lòng chọn địa chỉ giao hàng.');
      return;
    }
    if (paymentMethod === 'vnpay') {
      CHECKOUT(`orders/payment?addressUserId=${addressUserId}`)
        .then(response => {
          window.location.href = response.data.paymentUrl;
        })
        .catch(error => {
          const errorMessage = error.response?.data || 'Không thể khởi tạo thanh toán. Vui lòng thử lại.';
          console.error('Payment initiation failed:', error);
          toast.warning(errorMessage);
        });
    } else if (paymentMethod === 'cod') {
      setLoading(true);

      POST_ADD_ORDER(`orders/cod?addressUserId=${addressUserId}`)
        .then(response => {
          const success = response?.data;
          setLoading(false);
          toast.success(success);
          navigator(`/orders/return?cod=true&addressUserId=${addressUserId}`);
        })
        .catch(error => {
          setLoading(false);
          const errorMessage = error.response?.data || 'Không thể tạo đơn hàng COD. Vui lòng thử lại.';
          toast.warning(errorMessage);
        });
    } else {
      toast.warning('Vui lòng chọn phương thức thanh toán.');
    }
  };
  //======================================================================
  const handleDeleteAddress = (addressId) => {
    const formData = new FormData();
    formData.append('addressId', addressId);
    DELETE_ID('address/delete', formData)
      .then(() => {
        toast.success('Địa chỉ đã được xóa thành công');
        fetchAddresses(); // Refresh the address list after deletion
      })
      .catch(error => {
        console.error('Error deleting address:', error);
        toast.error('Không thể xóa địa chỉ. Vui lòng thử lại.');
      });
  };
  //======================================================================
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <>
      <main class="main checkout">
        <div class="container">
          <div class="checkout-container d-none d-lg-block">
            <div class="search-bar">
              <input type="text" name="" id="" class="search-bar__input" placeholder="Seach for item" />
              <button>
                <img src="/assets/icon/filter-search.svg" alt="search" class="search-bar__icon icon" />
              </button>
            </div>
          </div>

          <div class="checkout-container">
            <ul class="breadscrumbs checkout__breadscrumbs">
              <li class="breadscrumbs__item">
                <a href="./index-logined.html" class="breadscrumbs__link">
                  Home
                  <img src="/assets/icon/arrow-right.svg" alt="arrow icon" class="breadscrumbs__icon" />
                </a>
              </li>

              <li class="breadscrumbs__item">
                <a href="./checkout.html" class="breadscrumbs__link">
                  Thông tin thanh toán
                  <img src="/assets/icon/arrow-right.svg" alt="arrow icon" class="breadscrumbs__icon" />
                </a>
              </li>

              <li class="breadscrumbs__item">
                <a href="#!" class="breadscrumbs__link breadscrumbs__link--current">
                  Thanh toán đơn hàng
                </a>
              </li>
            </ul>
          </div>

          <div class="checkout-container">
            <div class="row gy-xl-3">
              <div class="col-8 col-xl-12">
                {/* Địa chỉ thanh toán */}
                <div class="checkout-content">
                  <h1 class="checkout-content__heading">1. Địa chỉ vận chuyển đến nơi người nhận hàng
                    {/* <span class="checkout-content__no-wrap">Mon, May 16</span>
                    —
                    <span class="checkout-content__no-wrap">Tue, May 24</span> */}
                  </h1>

                  <div class="checkout-infor__separate"></div>

                  <div class="address">
                    <div class="address-header">
                      <div class="address-header__content">
                        <h2 class="checkout__sub-heading">Địa chỉ giao hàng</h2>
                        <p class="address-header__desc">Chúng tôi nên giao hàng cho bạn ở đâu?</p>
                      </div>
                      <button class="address-header__btn btn btn--primary btn--rounded js-toggle"
                        toggle-target="#modal-add-address" onClick={handleCloseModal}>
                        <img src="/assets/icon/btn-add.svg" alt="plus"
                          class="address-header__btn-icon" />
                        Thêm địa chỉ mới
                      </button>
                    </div>

                    <div class="address__list">
                      {/* <!-- <p class="address__message">
                                        Not address yet. <a href="#!" class="address__message-link js-toggle" toggle-target="#modal-add-address"> Add a new address</a>
                                    </p> --> */}
                      {addresses.map(address => (
                        <article class="address-item " key={address.addressUserId}>
                          <div class="address-item__left">
                            <div class="address-item__check">
                              <label class="address-item__checkbox">
                                <input
                                  type="radio"
                                  name="address"
                                  value={address.addressUserId}
                                  className="address-item__input"
                                  onChange={handleAddressChange}
                                />
                              </label>
                            </div>

                            <div class="address-item__infor">
                              <h3 class="address-item__heading">{address.consigneeName}</h3>
                              <p class="address-item__desc">{address.address}</p>
                              <ul class="address-item__list">
                                <li class="address-item__text">Vận chuyển</li>
                                <li class="address-item__text">Giao hàng từ cửa hàng</li>
                              </ul>
                            </div>
                          </div>

                          <div class="address-item__right">
                            <button className="checkout-item__btn" onClick={() => handleDeleteAddress(address.addressUserId)}>
                              <img src="/assets/icon/trash.svg" alt="trash"
                                className="checkout-item__icon" />
                              Delete
                            </button>

                          </div>
                        </article>
                      ))}
                    </div>

                  </div>


                </div>
                {/* Phương thức thanh toán */}
                <div class="checkout-content">
                  <h2 class="checkout-content__heading">2.Phương thức thanh toán</h2>
                  <div class="checkout-infor__separate"></div>

                  <h3 class="checkout__sub-heading ">Phương thức thanh toán có sẵn</h3>

                  <div class="payment__list">
                    <label>
                      <article class="payment-item">
                        <div class="payment-item__img">
                          <img src="/assets/img/iconcod.png" alt="payment thumb"
                            class="payment-item__thumb" />

                        </div>
                        <div class="payment-item__select">
                          <div class="payment-item__infor">
                            <p class="payment-item__heading">Thanh toán khi nhận hàng</p>
                            <p class="payment-item__desc">Vận chuyển: 2-3 ngày</p>
                          </div>
                          <span class="address-item__checkbox payment-item__choice">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cod"
                              className="address-item__input payment-item__choice-input"
                              onChange={handlePaymentMethodChange}
                            />
                            {/* <span class="payment-item__choice-data">Free</span> */}
                          </span>
                        </div>
                      </article>
                    </label>

                    <label>
                      <article class="payment-item">
                        <div class="payment-item__img">
                          <img src="/assets/img/iconvnpay.jpg" alt="payment thumb"
                            class="payment-item__thumb" />
                        </div>
                        <div class="payment-item__select">
                          <div class="payment-item__infor">
                            <p class="payment-item__heading">VNPay</p>
                            <p class="payment-item__desc">Vận chuyển: 2-3 ngày</p>
                          </div>
                          <span class="address-item__checkbox payment-item__choice">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="vnpay"
                              className="address-item__input payment-item__choice-input"
                              onChange={handlePaymentMethodChange}
                            />
                            {/* <span class="payment-item__choice-data">$12.00</span> */}
                          </span>
                        </div>
                      </article>
                    </label>
                  </div>
                </div>
              </div>
              {/* Tổng */}
              <div class="col-4 col-xl-12">
                <div class="checkout-infor checkout-pay">
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

                  <a href="#st" onClick={handleConfirmClick} class="btn btn--primary checkout-pay__btn">Mua {formatVND(totalPrice)}</a>
                </div>

                <a href="#!">
                  <div class="checkout-gift">
                    <div class="checkout-gift__wrapper">
                      <img src="/assets/icon/gift.svg" alt="gift" class="checkout-gift__img" />
                    </div>

                    <div class="checkout-gift__content">
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
      {loading && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
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
      <ModalItem showModal={showModal} closeModal={closeModal} />

    </>
  )
}
