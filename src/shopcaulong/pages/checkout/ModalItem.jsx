import React, { useState, useEffect } from 'react';
import { POST_ADD } from '../../../api/apiService';
import NotificationService from '../../../component/NotificationService';

export default function ModalItem({ showModal, closeModal }) {
    const [consigneeName, setConsigneeName] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [phone, setPhone] = useState('');

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
            const data = await response.json();
            if (data.error === 0) {
                setProvinces(data.data);
            }
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchDistricts = async (provinceId) => {
        try {
            const response = await fetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
            const data = await response.json();
            if (data.error === 0) {
                setDistricts(data.data);
                setWards([]);  // Reset wards when province changes
            }
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchWards = async (districtId) => {
        try {
            const response = await fetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            const data = await response.json();
            if (data.error === 0) {
                setWards(data.data);
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleProvinceChange = (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);
        fetchDistricts(provinceId);
    };

    const handleDistrictChange = (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        fetchWards(districtId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedProvinceName = provinces.find(province => province.id === selectedProvince)?.full_name || '';
        const selectedDistrictName = districts.find(district => district.id === selectedDistrict)?.full_name || '';
        const selectedWardName = wards.find(ward => ward.id === selectedWard)?.full_name || '';
        const fullAddress = `${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;
        const newAddress = {
            consigneeName,
            addressDetail,
            address: fullAddress,
            phone,
        };

        try {
            await POST_ADD('address/add', newAddress);
            NotificationService.success('Địa chỉ giao hàng đã được thêm thành công');
            closeModal();
            window.location.reload();
        } catch (error) {
            NotificationService.error('Đã xảy ra lỗi khi thêm địa chỉ giao hàng');
        }
    };

    return (
        <div id="modal-add-address" className={`modal ${showModal ? 'show' : 'hide'}`}>
            <div className="modal__content">
                <form action="" className="form" id="address-form" onSubmit={handleSubmit}>
                    <div className="modal__heading">Add new shopping address</div>
                    <div className="modal__body">
                        <div className="form__row">
                            <div className="form__group">
                                <label htmlFor="name" className="form__heading form__heading--small">Tên người nhận</label>
                                <div className="form__input-wrap form__input-wrap--small">
                                    <input type="text" id="consigneeName" className="form__input" minLength="2"
                                        value={consigneeName}
                                        onChange={(e) => setConsigneeName(e.target.value)}
                                        placeholder="Tên người nhận" required />
                                </div>
                                <p className="form__error">Tên phải có ít nhất 2 ký tự</p>
                            </div>
                            <div className="form__group">
                                <label htmlFor="phone" className="form__heading form__heading--small">Số điện thoại</label>
                                <div className="form__input-wrap form__input-wrap--small">
                                    <input type="tel" id="phone" className="form__input" minLength="10"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" required />
                                </div>
                                <p className="form__error">Điện thoại phải có ít nhất 10 số</p>
                            </div>
                        </div>

                        <div className="form__group">
                            <label htmlFor="address" className="form__heading form__heading--small">Địa chỉ chi tiết</label>
                            <div className="form__text-area form__text-area--small">
                                <textarea id="addressDetail" className="form__text-area-input"
                                    value={addressDetail}
                                    onChange={(e) => setAddressDetail(e.target.value)}
                                    placeholder="Địa chỉ chi tiết nơi bạn ở" required></textarea>
                            </div>
                            <p className="form__error">Địa chỉ không được trống</p>
                        </div>

                        <div className="form__group">
                            <label htmlFor="city" className="form__heading form__heading--small">Tỉnh Thành</label>
                            <div className="form__input-wrap form__input-wrap--small">
                                <select value={selectedProvince} required onChange={handleProvinceChange} style={{ border: "none", outline: "none" }} className="form__input">
                                    <option value="">Chọn Tỉnh</option>
                                    {provinces.map((province) => (
                                        <option key={province.id} value={province.id}>{province.full_name}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="form__error">Vui lòng chọn tỉnh giao hàng.</p>
                        </div>

                        <div className="form__group">
                            <label htmlFor="district" className="form__heading form__heading--small">Quận Huyện</label>
                            <div className="form__input-wrap form__input-wrap--small">
                                <select value={selectedDistrict} required onChange={handleDistrictChange} style={{ border: "none", outline: "none" }} className="form__input">
                                    <option value="">Chọn huyện</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>{district.full_name}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="form__error">Vui lòng chọn huyện giao hàng.</p>

                        </div>

                        <div className="form__group">
                            <label htmlFor="ward" className="form__heading form__heading--small">Phường Xã</label>
                            <div className="form__input-wrap form__input-wrap--small">
                                <select value={selectedWard} required onChange={(e) => setSelectedWard(e.target.value)} style={{ border: "none", outline: "none" }} className="form__input">
                                    <option value="">Chọn xã</option>
                                    {wards.map((ward) => (
                                        <option key={ward.id} value={ward.id}>{ward.full_name}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="form__error">Vui lòng chọn xã giao hàng.</p>


                        </div>

                        {/* <div className="form__group form__wrap">
                            <label className="form__checkbox">
                                <input type="checkbox" name="" id="" className="form__checkbox-input" hidden />
                                <span className="form__checkbox-label">Set as default card</span>
                            </label>
                        </div> */}
                    </div>
                    <div className="modal__btns">
                        <button toggle-target="#modal-add-address" class="btn js-toggle btn--outline " onClick={closeModal}>Cancel</button>
                        <button type="submit" toggle-target="#modal-add-address" class="btn  btn--primary" >Create</button>
                    </div>
                </form>
            </div>
            <div className="modal__overlay"></div>
        </div>
    );
}
