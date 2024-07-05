import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST_ADD_REGISTER } from "../../../api/apiService";
import NotificationService from '../../../component/NotificationService'; // Đảm bảo đường dẫn đúng
import Lottie from 'react-lottie';
import loadingAnimation from "../../../component/LoadingAnimotation.json";
export default function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false); // State for the checkbox
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleRegister = async (event) => {
 
        event.preventDefault();

        if (!agreeTerms) {
            NotificationService.warning('Bạn phải đồng ý với các điều kiện và điều khoản.');
            return;
        }

        if (password !== confirmPassword) {
            NotificationService.error('Mật khẩu nhập lại không khớp!');
            return;
        }
        setLoading(true);
        try {
            const response = await POST_ADD_REGISTER('auth/register', { fullname, email, password });
            NotificationService.success('Thành công', response.data);
            setFullname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setAgreeTerms(false);
            setLoading(false);
            navigate('/dang-nhap');
        } catch (error) {
            if (error.response && error.response.data) {
                NotificationService.error('Lỗi', error.response.data);
            } else {
                NotificationService.error('Lỗi', 'Đã xảy ra lỗi! Vui lòng thử lại.');
            }
        }
    };
    const handleToggle = () => {
        const authContent = document.getElementById('auth-content');
        if (authContent.classList.contains('hide')) {
            authContent.classList.remove('hide');
            authContent.classList.add('show');
        } else {
            authContent.classList.remove('show');
            authContent.classList.add('hide');
        }
    };
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
            <main className="main">
                <div className="auth">
                    <div className="auth-media">
                        <a href="/">
                            <div className="logo d-none d-md-flex auth-media__logo">
                                <img src="/assets/icon/logo.svg" alt="Logo" className="logo__img" />
                                <h1 className="logo__heading">grocerymart</h1>
                            </div>
                        </a>
                        <img src="/assets/img/auth/auth-img.png" alt="" className="auth-media__img" />
                        <p className="auth-media__desc"> Giá trị thương hiệu cao cấp nhất, sản phẩm chất lượng cao và dịch vụ sáng tạo</p>
                        <button className="auth-media__next-btn js-toggle" onClick={handleToggle} toggle-target="#auth-content">
                            <img src="/assets/icon/auth/next.svg" alt="next icon" className="auth-media__next d-none d-md-block" />
                        </button>
                    </div>
                    <div id="auth-content" className="auth-content hide">
                        <div className="auth-content__wrap">
                            <a href="/">
                                <div class="logo">
                                    <img src="/logo/LogoNhanSports.png" alt="Logo" class="logo__img" />
                                    <h1 class="logo__heading">Nhan Sports</h1>
                                </div>
                            </a>
                            <h1 className="auth-content__heading">Đăng ký</h1>
                            <p className="auth-content__desc">Hãy tạo tài khoản của bạn và Mua sắm như một người chuyên nghiệp và tiết kiệm tiền.</p>

                            <form className="form auth__form" action="/dang-nhap" onSubmit={handleRegister}>
                                <div className="form__group">
                                    <div className="form__input-wrap">
                                        <input type="name" name="" id=""
                                            className="form__input"
                                            placeholder="Tên của bạn"
                                            value={fullname}
                                            onChange={(e) => setFullname(e.target.value)}
                                            required autoFocus />
                                        <img src="/assets/icon/form/username.svg" alt="fullname icon" className="form__input-icon" />
                                    </div>
                                </div>
                                <div class="form__group">
                                    <div class="form__input-wrap">
                                        <input type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} name="" id="" class="form__input" placeholder="Email" required="" autofocus="" />
                                        <img src="/assets/icon/form/email.svg" alt="email icon" class="form__input-icon" />
                                        <img src="/assets/icon/form/error.svg" alt="error icon" class="form__input-error" />
                                    </div>
                                    <p class="form__error">Email không hợp lệ</p>
                                </div>

                                <div className="form__group">
                                    <div className="form__input-wrap">
                                        <input type="password" name="" id="" className="form__input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Mật khẩu" required="" autofocus="" minLength="6" />
                                        <img src="/assets/icon/form/password.svg" alt="password icon" className="form__input-icon" />
                                        <img src="/assets/icon/form/error.svg" alt="error icon" className="form__input-error" />
                                    </div>
                                    <p className="form__error">Mật khẩu có ít nhất 6 ký tự</p>
                                </div>
                                <div className="form__group">
                                    <div className="form__input-wrap">
                                        <input type="password" name="" id="" className="form__input"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Nhập lại mật khẩu" required="" autofocus="" minLength="6" />
                                        <img src="/assets/icon/form/password.svg" alt="password icon" className="form__input-icon" />
                                        <img src="/assets/icon/form/error.svg" alt="error icon" className="form__input-error" />
                                    </div>
                                    <p className="form__error">Xác nhận mật khẩu không hợp lệ</p>
                                </div>

                                <div className="form__group form__wrap">
                                    <label className="form__checkbox">
                                        <input type="checkbox" name="" id="" className="form__checkbox-input" hidden checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)} />
                                        <span className="form__checkbox-label">Tôi đồng ý với các <a st href="#st">điều kiện và điều khoản</a></span>
                                    </label>
                                </div>

                                <div className="form__btns">
                                    <button className="form__btn form__submit btn btn--primary">Đăng ký</button>
                                    <button className="form__btn btn btn--outline btn--not-margin">
                                        <img src="/assets/icon/form/google.svg" alt="google icon" className="form__btn-icon" />
                                        Đăng nhập với Google</button>
                                </div>
                            </form>
                            <p className="auth__text">
                            Bạn đã có tài khoản?
                                <a href="/dang-nhap" className="form__link auth__link">Đăng nhập</a>
                            </p>
                        </div>
                    </div>
                </div>
                {loading && (
                    <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Lottie options={defaultOptions} height={400} width={400} />
                    </div>
                )}
            </main>
        </>
    )
}
