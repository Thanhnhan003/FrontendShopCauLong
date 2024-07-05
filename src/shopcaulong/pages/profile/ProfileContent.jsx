import React, { useEffect, useState } from 'react';
import { GET_USER_INFO, GET_INFO_BY_TOKEN } from '../../../api/apiService';
import dateString from '../../../component/FormatDate';
import ProfileOrderDetailModal from './ProfileOrderDetailModal';

const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function ProfileContent() {
    const [user, setUser] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        fetchAddresses();
        fetchOrders();
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

    const fetchOrders = () => {
        GET_INFO_BY_TOKEN('orders/users')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    };

    useEffect(() => {
        GET_USER_INFO('auth/show/info')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    const getTotalPrice = (orderDetails) => {
        if (!orderDetails) return 0;
        return orderDetails.reduce((sum, detail) => sum + (detail.quantity * detail.price), 0);
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "1":
                return { label: "Chưa xử lý", className: "badges bg-lightred" };
            case "2":
                return { label: "Đang vận chuyển", className: "badges bg-lightyellow" };
            case "3":
                return { label: "Đã giao hàng", className: "badges bg-lightgreen" };
            default:
                return { label: "Từ chối đơn hàng", className: "badges bg-lightred" };
        }
    };

    const openModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    return (
        <div className="col-9 col-xl-8 col-lg-7 col-md-12">
            <div className="profile-content">
                <div className="row row-cols-1 gy-3">
                    <div className="col">
                        <h2 className="profile-content__heading">Thông tin tài khoản</h2>
                        <p className="profile-content__desc">Địa chỉ, thông tin liên lạc</p>
                        <div className="row row-cols-2 gy-2 row-cols-lg-1">
                            <div className="col">
                                <a href="#!">
                                    <article className="profile-infor">
                                        <div className="profile-infor__img-wrap">
                                            <img src="/assets/icon/profile/privacy.svg" alt="icon" className="profile-infor__img icon" />
                                        </div>
                                        <div className="profile-infor__content">
                                            <p className="profile-infor__title">Địa chỉ Email</p>
                                            <p className="profile-infor__desc">{user.email}</p>
                                        </div>
                                    </article>
                                </a>
                            </div>

                            {addresses.map((address) => (
                                <div className="col" key={address.addressUserId}>
                                    <a href="#!">
                                        <article className="profile-infor">
                                            <div className="profile-infor__img-wrap">
                                                <img src="/assets/icon/profile/address.svg" alt="icon" className="profile-infor__img icon" />
                                            </div>
                                            <div className="profile-infor__content">
                                                <p className="profile-infor__title">Địa chỉ giao hàng</p>
                                                <p className="profile-infor__desc">{address.address}</p>
                                            </div>
                                        </article>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col">
                        <h2 className="profile-content__heading">Đơn hàng của bạn</h2>
                        <p className="profile-content__desc">Thông tin đơn hàng</p>
                        <div className="row row-cols-1">
                            <div className="col">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="centered-header">
                                            <th>Chi tiết đơn hàng</th>
                                            <th>Ngày đặt đơn hàng</th>
                                            <th>Địa chỉ</th>
                                            <th>Loại thanh toán</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.orderId}>
                                                <td>
                                                    <img
                                                        style={{ display: "block", marginLeft: "auto", marginRight: "auto", cursor: "pointer" }}
                                                        src='/assets/icon/eye.svg'
                                                        alt='eye'
                                                        onClick={() => openModal(order.orderId)}
                                                    />
                                                </td>
                                                <td>{dateString(order.orderTime)}</td>
                                                <td>{order.deliveryAddressUser.address}</td>
                                                <td>{order.namePayment}</td>
                                                <td>{formatVND(getTotalPrice(order.orderDetails))}</td>
                                                <td>
                                                    <span className={getStatusLabel(order.status).className}>
                                                        {getStatusLabel(order.status).label}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="profile-item__separate"></div>
                        </div>
                    </div>
                </div>
            </div>

            <ProfileOrderDetailModal isOpen={isModalOpen} onRequestClose={closeModal} orderId={selectedOrderId} />
        </div>
    );
}
