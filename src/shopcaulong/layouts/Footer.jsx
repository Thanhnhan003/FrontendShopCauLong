import React from 'react'

export default function Footer() {
    return (
        <>
            <footer id="footer" class="footer">
                <div class="container">
                    <div class="footer__row">
                        <div class="footer__col">
                            {/* <!-- Logo --> */}
                            <a href="#">
                                <div class="logo header-logo">
                                    <img src="/logo/LogoNhanSports.png" alt="Logo" class="logo__img header-logo__img" />
                                    <h1 class="logo__heading header-logo__heading">NhanSports</h1>
                                </div>
                            </a>
                            <p class="footer__desc">NhanSports là hệ thống cửa hàng cầu lông với hơn 50 chi nhánh trên toàn quốc, cung cấp sỉ và lẻ các mặt hàng dụng cụ cầu lông từ phong trào tới chuyên nghiệp</p>
                            <p class="footer__desc"> Với sứ mệnh: "NhanSports cam kết mang đến những sản phẩm, dịch vụ chất lượng tốt nhất phục vụ cho người chơi thể thao để nâng cao sức khỏe của chính mình."</p>
                            {/* <p class="footer__desc footer__desc--short">Receive product news and updates.</p>
                    <form action="" class="footer-form">
                        <div class="footer-form__wrap">
                            <input type="email" class="footer-form__input" placeholder="Email address" required
                                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"/>
                            <button class="footer-form__btn btn btn--primary">SEND</button>
                        </div>
                    </form> */}
                        </div>
                        <div class="footer__col">
                            <h3 class="footer__heading">CỮA HÀNG</h3>
                            <ul class="footer__list">
                                <li class="footer__item">
                                    <a href="/tat-ca-san-pham" class="footer__link">Tất cả sản phẩm</a>
                                </li>
                                <li class="footer__item">
                                    <a href="/tin-tuc" class="footer__link">Tin tức</a>
                                </li>
                                <li class="footer__item">
                                    <a href="/lien-he" class="footer__link">Liên hệ</a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer__col">
                            <h3 class="footer__heading">Hỗ trợ</h3>
                            <ul class="footer__list">
                                <li class="footer__item">
                                    <a href="/lien-he" class="footer__link">Định vị cữa hàng</a>
                                </li>
                                <li class="footer__item">
                                    <a href="/ho-so" class="footer__link">Trạng thái đặt hàng</a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer__col">
                            <h3 class="footer__heading">CÔNG TY</h3>
                            <ul class="footer__list">
                                <li class="footer__item">
                                    <a href="#!" class="footer__link">Hướng dẫn sử dụng</a>
                                </li>
                                {/* <li class="footer__item">
                                    <a href="#!" class="footer__link">Terms of Use</a>
                                </li>
                                <li class="footer__item">
                                    <a href="#!" class="footer__link">Privacy</a>
                                </li>
                                <li class="footer__item">
                                    <a href="#!" class="footer__link">Careers</a>
                                </li>
                                <li class="footer__item">
                                    <a href="#!" class="footer__link">About</a>
                                </li>
                                <li class="footer__item">
                                    <a href="#!" class="footer__link">Affiliates</a>
                                </li> */}
                            </ul>
                        </div>
                        <div class="footer__col">
                            <h3 class="footer__heading">LIÊN HỆ</h3>
                            <p class="footer__label">Email</p>
                            <a href="mailto: sirobuff01@gmail.com" class="footer__infor">sirobuff01@gmail.com</a>

                            <p class="footer__label">Hotline</p>
                            <a href="tel: 0966882622" class="footer__infor">0966882622</a>

                            <p class="footer__label">Địa chỉ</p>
                            <p class="footer__infor">50/40 đường 79, phước long B, Thanh phố Thủ Đức in Hồ Chí Minh City</p>

                            <p class="footer__label">Thơi gian mở cữa</p>
                            <time class="footer__infor">08h00-20h00</time>
                        </div>
                    </div>

                    <div class="footer__bottom">
                        <p class="footer__copyright">© 2021 - 2024 Nhan Sport. Đã đăng ký Bản quyền.</p>
                        <div class="footer-socials">
                            <button class="footer-social footer-social__facebook">
                                <a href="https://www.facebook.com/profile.php?id=100056078738635" alt="">
                                    <img src="/assets/icon/socials/facebook.svg" alt="facebook icon"
                                        class="footer-social__icon icon " />
                                </a>
                            </button>
                            <button class="footer-social footer-social__youtube">
                                <a href="https://www.youtube.com/channel/UCJxG-FBtJtqfNG5Iif_KhnQ" alt="">
                                    <img src="/assets/icon/socials/youtube.svg" alt="youtube icon" class="footer-social__icon " />
                                </a>
                            </button>
                            <button class="footer-social footer-social__tiktok">
                                <a href="https://www.tiktok.com/@th_nhzn003?_t=8nNEr6jdyfV&_r=1" alt="">
                                    <img src="/assets/icon/socials/tiktok.svg" alt="tiktok icon" class="footer-social__icon " />
                                </a>
                            </button>
                            <button class="footer-social footer-social__twitter">
                                <a href="/#st" alt="">
                                    <img src="/assets/icon/socials/twitter.svg" alt="twitter icon" class="footer-social__icon " />
                                </a>
                            </button>
                            {/* <button class="footer-social footer-social__linkedin">
                                <img src="/assets/icon/socials/linkedin.svg" alt="linkedin icon" class="footer-social__icon " />
                            </button> */}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
