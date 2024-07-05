import React, { useEffect, useState, useRef } from "react";
import Cookies from 'js-cookie';
import { LOGOUT, GET_USER_INFO, GET_IMG, GET_ALL } from '../../../api/apiService';
import Cart from "./Cart";
import Menu from "./Menu";
import SearchModal from "./SearchModal";
export default function Header({ selector, path }) {
    const [info, setInfo] = useState([]);

    const token = Cookies.get('tokenUser');


    useEffect(() => {
        if (token) {
            GET_USER_INFO('auth/show/info')
                .then(response => {
                    setInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, [token]);
    const handleLogout = () => {
        LOGOUT();
        window.location.reload();

    };
    const parentRef = useRef(null);


    useEffect(() => {
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const load = (selector, path) => {
            const cached = localStorage.getItem(path);
            if (cached) {
                const el = $(selector);
                if (el) {
                    el.innerHTML = cached;
                }
            }

            fetch(path)
                .then((res) => res.text())
                .then((html) => {
                    if (html !== cached) {
                        const el = $(selector);
                        if (el) {
                            el.innerHTML = html;
                            localStorage.setItem(path, html);
                        }
                    }
                })
                .finally(() => {
                    window.dispatchEvent(new Event("template-loaded"));
                });
        };

        if (parentRef.current) {
            load(selector, path);
        }

        // Other functions
        const isHidden = (element) => {
            if (!element) return true;

            if (window.getComputedStyle(element).display === "none") {
                return true;
            }

            let parent = element.parentElement;
            while (parent) {
                if (window.getComputedStyle(parent).display === "none") {
                    return true;
                }
                parent = parent.parentElement;
            }

            return false;
        };

        const debounce = (func, timeout = 300) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        };

        const calArrowPos = debounce(() => {
            const dropdownList = $(".js-dropdown-list");
            if (!dropdownList || isHidden(dropdownList)) return;

            const items = $$(".js-dropdown-list > li");

            items.forEach((item) => {
                const arrowPos = item.offsetLeft + item.offsetWidth / 2;
                item.style.setProperty("--arrow-left-pos", `${arrowPos}px`);
            });
        });

        window.addEventListener("resize", calArrowPos);
        window.addEventListener("template-loaded", calArrowPos);

        const handleActiveMenu = () => {
            const dropdowns = $$(".js-dropdown");
            const menus = $$(".js-menu-list");
            const activeClass = "menu-col__item--active";

            const removeActive = (menu) => {
                const activeItem = menu.querySelector(`.${activeClass}`);
                if (activeItem) {
                    activeItem.classList.remove(activeClass);
                }
            };

            const init = () => {
                menus.forEach((menu) => {
                    const items = menu.children;
                    if (!items.length) return;

                    removeActive(menu);
                    if (window.innerWidth > 991) items[0].classList.add(activeClass);

                    Array.from(items).forEach((item) => {
                        item.onmouseenter = () => {
                            if (window.innerWidth <= 991) return;
                            removeActive(menu);
                            item.classList.add(activeClass);
                        };
                        item.onclick = () => {
                            if (window.innerWidth > 991) return;
                            removeActive(menu);
                            item.classList.add(activeClass);
                            item.scrollIntoView();
                        };
                    });
                });
            };

            init();

            dropdowns.forEach((dropdown) => {
                dropdown.onmouseleave = () => init();
            });
        };

        window.addEventListener("template-loaded", handleActiveMenu);

        const initJsToggle = () => {
            $$(".js-toggle").forEach((button) => {
                const target = button.getAttribute("toggle-target");
                if (!target) {
                    document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
                }
                button.onclick = (e) => {
                    e.preventDefault();
                    const targetElement = $(target);
                    if (!targetElement) {
                        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
                    }
                    const isHidden = targetElement.classList.contains("hide");

                    requestAnimationFrame(() => {
                        targetElement.classList.toggle("hide", !isHidden);
                        targetElement.classList.toggle("show", isHidden);
                    });
                };

                document.onclick = function (e) {
                    const targetElement = $(target);
                    if (!targetElement) return;

                    if (!e.target.closest(target)) {
                        const isHidden = targetElement.classList.contains("hide");
                        if (!isHidden) {
                            button.click();
                        }
                    }
                };
            });
        };

        window.addEventListener("template-loaded", initJsToggle);

        window.addEventListener("template-loaded", () => {
            const links = $$(".js-dropdown-list > li > a");

            links.forEach((link) => {
                link.onclick = () => {
                    if (window.innerWidth > 991) return;
                    const item = link.closest("li");
                    item.classList.toggle("nav__item--active");
                };
            });
        });

        window.addEventListener("template-loaded", () => {
            const tabsSelector = "product-remark__item";
            const contentsSelector = "product-content";

            const tabActive = `${tabsSelector}--active`;
            const contentActive = `${contentsSelector}--active`;

            const tabContainers = $$(".js-tabs");
            tabContainers.forEach((tabContainer) => {
                const tabs = tabContainer.querySelectorAll(`.${tabsSelector}`);
                const contents = tabContainer.querySelectorAll(`.${contentsSelector}`);
                tabs.forEach((tab, index) => {
                    tab.onclick = () => {
                        const activeTab = tabContainer.querySelector(`.${tabActive}`);
                        const activeContent = tabContainer.querySelector(`.${contentActive}`);
                        if (activeTab) activeTab.classList.remove(tabActive);
                        if (activeContent) activeContent.classList.remove(contentActive);
                        tab.classList.add(tabActive);
                        contents[index].classList.add(contentActive);
                    };
                });
            });
        });

        const addressForm = document.getElementById("address-form");
        if (addressForm) {
            addressForm.addEventListener("submit", function (event) {
                event.preventDefault();
                console.log("Form submitted with data:", new FormData(this));
                const modal = document.getElementById("modal-add-address");
                if (modal) {
                    modal.classList.remove("show");
                    modal.classList.add("hide");
                }
            });
        }

        window.addEventListener("template-loaded", () => {
            const switchBtn = document.querySelector("#switch-theme-btn");
            if (switchBtn) {
                switchBtn.onclick = function () {
                    const isDark = localStorage.dark === "true";
                    document.querySelector("html").classList.toggle("dark", !isDark);
                    localStorage.setItem("dark", !isDark);
                    switchBtn.querySelector("span").textContent = isDark ? "Dark mode" : "Light mode";
                };
                const isDark = localStorage.dark === "true";
                switchBtn.querySelector("span").textContent = isDark ? "Light mode" : "Dark mode";
            }
        });

        const isDark = localStorage.dark === "true";
        document.querySelector("html").classList.toggle("dark", isDark);
    }, [selector, path]);
    const [isSearchModalOpen, setSearchModalOpen] = useState(false);

    const handleCloseModal = () => {
        setSearchModalOpen(false);
    };

    const handleSearchButtonClick = () => {
        setSearchModalOpen(true);
    };
    return (
        <>
            <SearchModal isOpen={isSearchModalOpen} onClose={handleCloseModal} />
            {/* Header */}
            <header id="header" class="header header--sticky">
                <div class="container" ref={parentRef}>
                    <div class="header__body">
                        {/* Menu on motab */}
                        <button class="header__menu d-none d-lg-block js-toggle" toggle-target="#nav">
                            <img src="/assets/icon/menu.svg" alt="Header menu" class="header__menu-icon icon" />
                        </button>

                        {/* Logo */}
                        <a href="/">
                            <div class="logo header-logo" style={{}}>
                                <img src="/logo/LogoNhanSports.ico" alt="Logo" class="logo__img header-logo__img" />
                                <h1 class="logo__heading header-logo__heading">Nhan Sports</h1>
                            </div>
                        </a>


                        <nav id="nav" class="nav hide">
                            <button class="nav__btn-close js-toggle" toggle-target="#nav">
                                <img src="/assets/icon/nav-arrow.svg" alt="" class="nav__btn-icon icon" />
                            </button>

                            <a href="/thu-tuc-thanh-toan" class="nav-data d-none d-md-flex">
                                <img src="/assets/icon/header-cart.svg" alt="Header cart" class="nav-data__icon icon" />
                                <p class="nav-data__infor">Giỏ hàng</p>
                                {/* <span class="nav-data__quantity">3</span> */}
                            </a>
                            <Menu />
                        </nav>

                        <div class="overlay js-toggle" toggle-target="#nav"></div>
                        {token ? (
                            <>
                                <div class="header__btns d-md-none">
                                    <button class="header__search" onClick={handleSearchButtonClick}>
                                        <img src="/assets/icon/header-search.svg" alt="Header search" class="icon" />
                                    </button>
                                    <Cart />
                                </div>

                                <div class="header__avt-wrap">
                                    {info.avatar ? (
                                        <img src={GET_IMG("auth", info.avatar)} alt="Header avatar" className="header__avt js-toggle" toggle-target="#avt-content" />
                                    ) : (
                                        <img src="/assets/img/header-avatar.jpg" alt="Header avatar" className="header__avt js-toggle" toggle-target="#avt-content" />
                                    )}
                                    <div class="cart-wrapper hide" id="avt-content">
                                        <section class="cart avt-desc">
                                            <img src="/assets/img/filter-arrow-bg.png" alt="arrow" class="cart__arrow icon" />

                                            <div class="avt-desc__header">
                                                {info.avatar ? (
                                                    <img src={GET_IMG("auth", info.avatar)} alt="avatar" class="avt-desc__img" />
                                                ) : (
                                                    <img src="/assets/img/header-avatar.jpg" alt="avatar" class="avt-desc__img" />

                                                )}
                                                <div class="avt-desc__content">
                                                    <p class="avt-desc__name">{info.fullname}</p>
                                                    <p class="avt-desc__infor">{info.email}  </p>
                                                </div>
                                            </div>

                                            <ul class="avt-desc__list">
                                                <li class="avt-desc__item avt-desc__item--separate">
                                                    <a href="/ho-so" class="avt-desc__link">
                                                        Hồ sơ
                                                    </a>
                                                </li>

                                                <li class="avt-desc__item avt-desc__item--separate">
                                                    <a href="#!" class="avt-desc__link avt-desc__mode" id="switch-theme-btn">
                                                        <span>Dark mode</span>
                                                        <img src="/assets/icon/mode.svg" alt="icon" class="avt-desc__link-icon icon" />
                                                    </a>
                                                </li>

                                                <li class="avt-desc__item avt-desc__item--separate" onClick={handleLogout}>
                                                    <a href="/dang-nhap" class="avt-desc__link">
                                                        Đăng xuất
                                                    </a>
                                                </li>
                                            </ul>
                                        </section>
                                    </div>
                                </div>
                            </>

                        ) : (
                            <div class="header__btns">
                                <a href="/dang-nhap" class="header__btn btn btn--text d-md-none">Đăng Nhập</a>
                                <a href="/dang-ky" class="header__btn btn btn--primary">Đăng ký</a>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    )

}
