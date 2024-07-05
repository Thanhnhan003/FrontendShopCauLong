import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_q2ljuch', 'template_2heoxvk', form.current, '6aDrLqoujBkYuX2mj')
      .then((result) => {
        console.log(result.text);
        toast.success("Gửi liên hệ thành công!");
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <main className="main">
      <div className="container home">
        <p style={{ textAlign: 'center', fontSize: "50px", fontWeight: "bold", margin: "15px" }}>LIÊN HỆ</p>
        <div className="contact-container">
          <div className="contact-sidebar">
            <div className="contact-item">
              <i className="icon-phone" />
              <div className="contact-text">
                <p>Tư vấn và CSKH</p>
                <strong>0979.170.274</strong>
              </div>
            </div>
            <div className="contact-item">
              <i className="icon-phone" />
              <div className="contact-text">
                <p>Hàn vợt carbon</p>
                <strong>0866.346.993</strong>
              </div>
            </div>
            <div className="contact-item">
              <i className="icon-email" />
              <div className="contact-text">
                <p>Email liên hệ</p>
                <strong>sirobuff01@gmail.com</strong>
              </div>
            </div>
            <div className="contact-item">
              <i className="icon-location" />
              <div className="contact-text">
                <p>Xem hệ thống cửa hàng</p>
                <strong>Tại Hà Nội và Tp. Hồ Chí Minh</strong>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>Gửi tin nhắn cho NhanSports</h2>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <label>Họ và tên *</label>
                <input type="text" name="user_name" placeholder="Nhập họ và tên của bạn" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="user_email" placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Số điện thoại *</label>
                <input type="phone" name="phone" placeholder="Email" />
              </div>
              <div className="form-group">
                <label>Nội dung tin nhắn *</label>
                <textarea  type="message" name="message" placeholder="Nội dung"></textarea>
              </div>
              <button className="nutbamgui" type="submit">Gửi đi</button>
            </form>
          </div>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5541.929267620602!2d106.77315420197246!3d10.831521885874766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zQ2FvIMSQ4bqzbmcgQ8O0bmcgVGjGsMahbmcgVFAuSENN!5e0!3m2!1svi!2s!4v1718890580103!5m2!1svi!2s"
            width="1200"
            height="550"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
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
    </main>
  );
}
