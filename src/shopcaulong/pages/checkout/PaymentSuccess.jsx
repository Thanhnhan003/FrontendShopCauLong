import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import loadingAnimation from "../../../component/LoadingAnimotation.json";
import Lottie from 'react-lottie';
const PaymentSuccess = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    const txnRef = searchParams.get('vnp_TxnRef');
    const responseCode = searchParams.get('vnp_ResponseCode');
    const transactionNo = searchParams.get('vnp_TransactionNo');
    const isCod = searchParams.get('cod');
    const addressUserId = searchParams.get('addressUserId');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (isCod) {
            setLoading(false);
            setMessage('Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn sẽ được thanh toán khi nhận hàng.');
        } else if (userId && txnRef && responseCode) {
            axios.get('http://localhost:8080/orders/return', {
                params: {
                    userId,
                    vnp_TxnRef: txnRef,
                    vnp_ResponseCode: responseCode,
                    vnp_TransactionNo: transactionNo,
                    addressUserId: addressUserId
                }
            })
                .then(response => {
                    setLoading(false);
                    setMessage(response.data);
                })
                .catch(error => {
                    setLoading(false);
                    const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.';
                    console.error('Error handling payment return:', error);
                    setMessage(errorMessage);
                });
        }
    }, [isCod, userId, txnRef, responseCode, transactionNo, addressUserId]);
    
    //=====================================================

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div style={{ backgroundColor: '#f7fafc' }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', margin: '0 auto' }}>
                <svg viewBox="0 0 24 24" style={{ color: '#38a169', width: '4rem', height: '4rem', margin: '1.5rem auto' }}>
                    <path fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                    </path>
                </svg>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#1a202c', fontWeight: '600', textAlign: 'center' }}>Thanh toán được thực hiện!</h3>
                    <p style={{ color: '#4a5568', margin: '0.5rem 0' }}>Cảm ơn bạn đã hoàn tất thanh toán trực tuyến an toàn.</p>
                    <p> Chúc bạn có một ngày tuyệt vời!!  </p>
                    <div style={{ padding: '2.5rem 0', textAlign: 'center' }}>
                        <a href="/" style={{ padding: '0.75rem 3rem', backgroundColor: '#5a67d8', color: 'white', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>
                            Tiếp tục mua sắm
                        </a>
                    </div>
                </div>
            </div>
            {loading && (
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
