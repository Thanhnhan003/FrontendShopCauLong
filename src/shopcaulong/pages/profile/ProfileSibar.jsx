import React, { useEffect, useState } from 'react';
import { GET_USER_INFO, GET_IMG, POST_ADD } from '../../../api/apiService';
import dateString from '../../../component/FormatDate';
import "./Profile.css";

export default function ProfileSidebar() {
    const [user, setUser] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        GET_USER_INFO('auth/show/info')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    const defaultAvatar = "assets/img/avatar.jpg";
    const userAvatar = preview || (user.avatar ? GET_IMG('auth', user.avatar) : defaultAvatar);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Create a preview of the uploaded image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            POST_ADD('auth/avatar', formData)
                .then(response => {
                    console.log(response.data);
                    alert('Avatar cập nhật thành công.');
                    window.location.reload();

                    GET_USER_INFO('auth/show/info')
                        .then(response => {
                            setUser(response.data);
                            window.location.reload();
                            setPreview(null);   // Xóa bản xem trước sau khi tải lên thành công
                        })
                        .catch(error => {
                            console.error('Error fetching user:', error);
                        });
                })
                .catch(error => {
                    console.error('Error uploading avatar:', error);
                    alert('Failed to upload avatar.');
                });
        } else {
            alert('Please select a file first.');
        }
    };

    return (
        <div className="col-3 col-xl-4 col-lg-5 col-md-12">
            <aside className="profile-sidebar">
                <div className="profile-user">
                    <div className="profile-avatar-wrapper">
                        <img src={userAvatar} alt="user avatar" className="profile-user__avatar" />
                        <div className="profileupload">
                            <input type="file" id="imgInp" onChange={handleFileChange} />
                            <label htmlFor="imgInp">
                                <img src="/assets/img/edit-set.svg" alt="edit icon" />
                            </label>
                        </div>
                    </div>
                    {selectedFile && (
                        <div className="thao-tac-luu-anh">
                            <button className="luu-hinh-anh" onClick={handleSave}>Lưu ảnh</button>
                            <a href="/ho-so" className="bo-luu-anh">Bỏ lưu</a>
                        </div>
                    )}
                    <h1 className="profile-user__name">{user.fullname}</h1>
                    <p className="profile-user__desc">Đăng ký: {dateString(user.createdAt)}</p>
                </div>

                <div className="profile-menu">
                    <h3 className="profile-menu__heading">Quản lý tài khoản</h3>
                    <ul className="profile-menu__list">
                        <li className="profile-menu__item">
                            <a href="/ho-so" className="profile-menu__link">
                                <span className="profile-menu__icon-wrap">
                                    <img src="/assets/icon/profile/personal_infor.svg" alt="icon" className="profile-menu__icon icon" />
                                </span>
                                Thông tin cá nhân
                            </a>
                        </li>
                        <li className="profile-menu__item">
                            <a href="#!" className="profile-menu__link">
                                <span className="profile-menu__icon-wrap">
                                    <img src="/assets/icon/profile/address.svg" alt="icon" className="profile-menu__icon icon" />
                                </span>
                                Địa chỉ nhận hàng
                            </a>
                        </li>
                        <li className="profile-menu__item">
                            <a href="/ho-so/doi-mat-khau" className="profile-menu__link">
                                <span className="profile-menu__icon-wrap">
                                    <img src="/assets/icon/profile/privacy.svg" alt="icon" className="profile-menu__icon icon" />
                                </span>
                                Đổi mật khẩu
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="profile-menu">
                    <h3 className="profile-menu__heading">Những đồ của tôi</h3>
                    <ul className="profile-menu__list">

                        <li className="profile-menu__item">
                            <a href="#!" className="profile-menu__link">
                                <span className="profile-menu__icon-wrap">
                                    <img src="/assets/icon/profile/registries.svg" alt="icon" className="profile-menu__icon icon" />
                                </span>
                                Đơn hàng của tôi
                            </a>
                        </li>
                    </ul>
                </div>



                <div className="profile-menu">
                    <h3 className="profile-menu__heading">Dịch vụ khách hàng</h3>
                    <ul className="profile-menu__list">
                        <li className="profile-menu__item">
                            <a href="#!" className="profile-menu__link">
                                <span className="profile-menu__icon-wrap">
                                    <img src="/assets/icon/profile/help.svg" alt="icon" className="profile-menu__icon icon" />
                                </span>
                                Giúp đỡ
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
