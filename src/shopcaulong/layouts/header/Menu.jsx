import React, { useEffect, useState } from "react";
import { GET_ALL, GET_IMG } from '../../../api/apiService';

export default function Menu() {
    const [listCategoryBrand, setListCategoryBrand] = useState([]);
    const [openClick, setOpenClick] = useState(false);

    useEffect(() => {
        GET_ALL('products/categories-brands')
            .then(response => {
                setListCategoryBrand(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    const handleMenuClick = () => {
        setOpenClick(!openClick);
    };

    return (
        <ul className="nav__list js-dropdown-list">
            <li className={`nav__item ${openClick ? 'nav__item--active' : ''}`}>
                <button className="nav__link" onClick={handleMenuClick}>
                    Danh mục sản phẩm
                    <img src="/assets/icon/nav-icon.svg" alt="" className="nav__icon icon" />
                </button>
                <div className="dropdown js-dropdown">
                    <div className="dropdown__body">
                        <div className="menu">
                            <div className="sub-menu sub-menu--not-main">
                                {listCategoryBrand.map((categoryWithBrands) => (
                                    <div className="sub-menu__col" key={categoryWithBrands.categoryId}>
                                        <div className="menu-col">
                                            <div className="menu-col__icon" style={{ marginRight: "10px" }}>
                                                <img src={GET_IMG("category", categoryWithBrands.category.thumbnail)}
                                                    className="menu-col__icon-symbol" alt="" style={{ width: "30px", height: "30px" }} />
                                            </div>
                                            <div className="menu-col__content">
                                                <a href={`/danh-muc/${categoryWithBrands.category.slug}`} alt="">
                                                    <h2 className="menu-col__heading" style={{ fontSize: "18px", fontWeight: "bold" }}>
                                                        {categoryWithBrands.category.categoryName}
                                                    </h2>
                                                </a>

                                                <ul className="menu-col__list">
                                                    {categoryWithBrands.brands.map((brand) => (
                                                        <li className="menu-col__item" key={brand.brandId}>
                                                            <a href={`/duyet-san-pham/${categoryWithBrands.category.slug}/${brand.slug}`} className="menu-col__link">
                                                                {categoryWithBrands.category.categoryName} {brand.brandName}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li className="nav__item">
                <a href="/tat-ca-san-pham" className="nav__link">
                    Tất cả sản phẩm
                </a>
            </li>
            <li className="nav__item">
                <a href="/tin-tuc" className="nav__link">
                    Tin tức
                </a>
            </li>
            <li className="nav__item">
                <a href="/lien-he" className="nav__link">
                    Liên hệ
                </a>
            </li>
        </ul>
    );
}
