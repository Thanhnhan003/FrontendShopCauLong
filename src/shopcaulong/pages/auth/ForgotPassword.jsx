import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import "./authstyle.css"
export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/forgot_password', { email });
            setLoading(false);
            Swal.fire({
                title: 'Thành công',
                text: response.data,
                icon: 'success',
            }).then(() => {
                navigate('/dang-nhap'); // Chuyển hướng về trang login sau khi thành công
            });
        } catch (error) {
            Swal.fire({
                title: 'Lỗi',
                text: error.response ? error.response.data : 'Đã xảy ra lỗi',
                icon: 'error',
            });
        }
    };
    return (
        <main className="main">
            <div className="auth">
                <div className="auth-media">
                    <img src="/assets/img/auth/forgot-password.png" alt="" className="auth-media__img" />
                </div>
                <div id="auth-content" className="auth-content">
                    <div className="auth-content__wrap">
                        <a href="#st">
                            <div className="logo">
                                <img src="/logo/LogoNhanSports.png" alt="Logo" className="logo__img" />
                                <h1 className="logo__heading">Nhan Sports</h1>
                            </div>
                        </a>
                        <h1 className="auth-content__heading">Đặt lại mật khẩu của bạn</h1>
                        <p className="auth-content__desc">Nhập email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn.</p>

                        {/* <div className="auth__message message message__success">We have e-mailed your password reset link!</div> */}

                        <form className="form auth__form auth__form-reset" action="/dang-nhap" onSubmit={handleSubmit}>
                            <div className="form__group">
                                <div className="form__input-wrap">
                                    <input type="email" className="form__input" placeholder="Email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required />
                                    <img src="/assets/icon/form/email.svg" alt="email icon" className="form__input-icon" />
                                    <img src="/assets/icon/form/error.svg" alt="error icon" className="form__input-error" />
                                </div>
                                <p className="form__error">Email is not valid</p>
                            </div>

                            <div className="form__btns">
                                <button className="form__btn form__submit btn btn--primary">Đặt lại mật khẩu</button>
                            </div>
                        </form>
                        <p className="auth__text">
                            <a href="/dang-nhap" class
                                ="form__link auth__link">Quay lại Đăng nhập</a>
                        </p>
                    </div>
                    {loading && <div className="loading-overlay">Loading...</div>}
                </div>
            </div>
        </main>
    );
}
