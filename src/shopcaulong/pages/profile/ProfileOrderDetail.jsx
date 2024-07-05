import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ID, GET_IMG } from '../../../api/apiService';
import dateString from '../../../component/FormatDate';

const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function ProfileOrderDetail({ orderId }) {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrderDetail();
    }, [orderId]);

    const fetchOrderDetail = () => {
        GET_ID(`orders`, orderId)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.error('Fetching order detail error:', error);
            });
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    const totalQuantity = order.orderDetails.reduce((sum, detail) => sum + detail.quantity, 0);
    const totalPrice = order.orderDetails.reduce((sum, detail) => sum + (detail.quantity * detail.price), 0);

    return (
        <div className="order-detail-modal">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Chi tiết đơn hàng</h4>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <div className="card-body">
                                    <h4 className="text-center font-weight-bold">1. Thông tin của bạn</h4>
                                    <p><strong>Tên:</strong> {order.user.fullname}</p>
                                    <p><strong>Email:</strong> {order.user.email}</p>
                                    <p><strong>Thời gian đặt:</strong> {dateString(order.orderTime)}</p>
                                </div>
                            </div>
                            <div className="col-12 mb-4">
                                <div className="card-body">
                                    <h4 className="text-center font-weight-bold">2. Thông tin địa chỉ giao hàng</h4>
                                    <p><strong>Người nhận:</strong> {order.deliveryAddressUser.consigneeName}</p>
                                    <p><strong>Địa chỉ:</strong> {order.deliveryAddressUser.addressDetail}, {order.deliveryAddressUser.address}</p>
                                    <p><strong>Số điện thoại:</strong> {order.deliveryAddressUser.phone}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h4 className="text-center font-weight-bold">3. Thông tin sản phẩm đặt hàng</h4>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Sản phẩm</th>
                                        <th>Thương hiệu</th>
                                        <th>Loại</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderDetails.map(detail => (
                                        <tr key={detail.orderDetailId}>
                                            <td>
                                                <Link to={`/chi-tiet/${detail.product.slug}`}>
                                                    <img className="product-img" src={GET_IMG('products', detail.product.galleries[0].thumbnail)} alt={detail.product.productName}></img>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/chi-tiet/${detail.product.slug}`}>
                                                    {detail.product.productName}
                                                </Link>
                                            </td>
                                            <td>{detail.product.brand.brandName}</td>
                                            <td>{detail.product.category.categoryName}</td>
                                            <td>{detail.quantity}</td>
                                            <td>{formatVND(detail.price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-right font-weight-bold mt-4">
                            <p>Tổng số lượng: {totalQuantity} sản phẩm</p>
                            <p>Tổng giá: {formatVND(totalPrice)} VND</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
