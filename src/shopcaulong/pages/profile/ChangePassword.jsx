import React, { useState } from 'react';
import { POST_ADD } from '../../../api/apiService'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Mật khẩu mới và xác nhận mật khẩu không khớp',
      });
      return;
    }

    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);

    try {
      await POST_ADD('auth/reset-password', formData);
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Đổi mật khẩu thành công!',
      }).then(() => {
        navigate('/ho-so');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        // title: 'Lỗi',  
        text: 'Mật khẩu cũ không chính xác!',
      });
    }
  };

  return (
    <div className="col-9 col-xl-8 col-lg-7 col-md-12">
      <div className="profile-content add-cart">
        <div className="add-cart__header">
          <a href="/ho-so" className="add-cart__header-btn">
            <img src="/assets/icon/nav-arrow.svg" alt="return" className="add-cart__header-icon icon" />
          </a>
          <h2 className="add-cart__header-heading">Đổi mật khẩu</h2>
        </div>
        <form onSubmit={handleSubmit} className="form add-cart__form">
          <div className="form__row add-cart__row">
            <div className="form__group">
              <label htmlFor="oldPassword" className="form__heading form__heading--small">
                Mật khẩu cũ
              </label>
              <div className="form__input-wrap form__input-wrap--small">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  name="oldPassword"
                  className="form__input"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Mật khẩu cũ"
                  required
                />
                 <img  src={`/assets/icon/${showOldPassword ? 'eye.svg' : 'eyehide.svg'}`} onClick={handleToggleOldPasswordVisibility} alt=''></img>

              </div>
            </div>
          </div>
          <div className="form__row add-cart__row">
            <div className="form__group">
              <label htmlFor="newPassword" className="form__heading form__heading--small">
                Mật khẩu mới
              </label>
              <div className="form__input-wrap form__input-wrap--small">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  className="form__input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mật khẩu mới"
                  required
                />
                 <img  src={`/assets/icon/${showNewPassword ? 'eye.svg' : 'eyehide.svg'}`} onClick={handleToggleNewPasswordVisibility} alt=''></img>
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="confirmPassword" className="form__heading form__heading--small">
                Xác nhận mật khẩu mới
              </label>
              <div className="form__input-wrap form__input-wrap--small">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="form__input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
                <img  src={`/assets/icon/${showConfirmPassword ? 'eye.svg' : 'eyehide.svg'}`}    onClick={handleToggleConfirmPasswordVisibility} alt=''></img>
              </div>
            </div>
          </div>
          {error && <p className="form__error">{error}</p>}
          <div className="modal__btns">
            <button type="button" className="btn btn--outline" onClick={() => navigate('/ho-so')}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
