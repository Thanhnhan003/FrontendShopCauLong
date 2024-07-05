import React, { useState } from 'react';
import { LOGIN } from '../../../api/apiService';
import { useNavigate } from 'react-router-dom';
import NotificationService from '../../../component/NotificationService'; // Import the NotificationService

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await LOGIN('auth/login', { email, password });
      navigate('/'); // navigate to the dashboard page after successful login
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Đăng nhập thất bại';
        NotificationService.error('Lỗi đăng nhập', errorMessage);
      } else {
        NotificationService.error('Lỗi đăng nhập', 'Không thể kết nối đến máy chủ');
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  }
  return (
    <>
      <main class="main">
        <div class="auth">
          <div class="auth-media">

            <img src="/assets/img/auth/auth-img.png" alt="" class="auth-media__img" />
            <p class="auth-media__desc"> Giá trị thương hiệu cao cấp nhất, sản phẩm chất lượng cao và dịch vụ sáng tạo</p>

          </div>
          <div id="auth-content" class="auth-content ">
            <div class="auth-content__wrap">
              <a href="/">
                <div class="logo">
                  <img src="/logo/LogoNhanSports.png" alt="Logo" class="logo__img" />
                  <h1 class="logo__heading">Nhan Sports</h1>
                </div>
              </a>
              <h1 class="auth-content__heading">Welcome comback</h1>
              <p class="auth-content__desc"> Chào mừng bạn quay lại đăng nhập. Với tư cách là khách hàng cũ, bạn có quyền truy cập vào tất cả thông tin đã lưu trước đó của mình.</p>

              <form class="form auth__form" onSubmit={handleSubmit} action="/">
                <div class="form__group">
                  <div class="form__input-wrap">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="" id="" class="form__input" placeholder="Email" required="" autofocus="" />
                    <img src="/assets/icon/form/email.svg" alt="email icon" class="form__input-icon" />
                    <img src="/assets/icon/form/error.svg" alt="error icon" class="form__input-error" />
                  </div>
                  <p class="form__error">Email không hợp lệ</p>
                </div>
                <div class="form__group">
                  <div class="form__input-wrap">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} name="" id="" class="form__input" placeholder="Password" required="" minlength="6" />
                    
                    <img
                      src={`/assets/icon/${showPassword ? 'eye.svg' : 'eyehide.svg'}`}
                      onClick={togglePasswordVisibility}
                      alt="toggle password visibility"
                      className="form__toggle-password"
                      style={{ cursor: 'pointer' }}
                    />
                     <img src="/assets/icon/form/password.svg" alt="password icon" class="form__input-icon" />
                    <img src="/assets/icon/form/error.svg" alt="error icon" class="form__input-error" />
                  </div>
                  <p class="form__error">Mật khẩu có ít nhất 6 ký tự</p>
                </div>

                <div class="form__group form__wrap">
                  {/* <label class="form__checkbox">
                    <input type="checkbox" name="" id="" class="form__checkbox-input" hidden />
                    <span class="form__checkbox-label">Set as default card</span>
                  </label> */}
                  <a href="/quen-mat-khau" class="form__link">Quên mật khẩu</a>
                </div>

                <div class="form__btns">
                  <button class="form__btn form__submit btn btn--primary">Đăng nhập</button>
                  <button class="form__btn btn btn--outline btn--not-margin">
                    <img src="/assets/icon/form/google.svg" alt="google icon" class="form__btn-icon" />
                    Đăng nhập với Google</button>
                </div>
              </form>
              <p class="auth__text">
                Bạn chưa có tài khoản?
                <a href="/dang-ky" class="form__link auth__link">Đăng ký</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
