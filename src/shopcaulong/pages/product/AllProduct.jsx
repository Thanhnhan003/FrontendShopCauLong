import React, { useEffect, useState, useRef } from 'react';
import { GET_ALL } from '../../../api/apiService';
import ListProduct from './ListProduct';
import "./styleproduct.css";

const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function AllProduct() {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(10000000);
    const [categoryBrandData, setCategoryBrandData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GET_ALL('products/categories-brands')
            .then(response => {
                setCategoryBrandData(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories and brands:', error);
            });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategories, selectedBrands, minValue, maxValue]);

    const fetchProducts = () => {
        const categoryParam = selectedCategories.join(',');
        const brandParam = selectedBrands.join(',');
        GET_ALL(`products?category=${categoryParam}&brand=${brandParam}&minPrice=${minValue}&maxPrice=${maxValue}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories(prev =>
            checked ? [...prev, value] : prev.filter(c => c !== value)
        );
    };

    const handleBrandChange = (event) => {
        const { value, checked } = event.target;
        setSelectedBrands(prev =>
            checked ? [...prev, value] : prev.filter(b => b !== value)
        );
    };

    const sliderRef = useRef(null);

    const valueToPercentage = (value) => (value / 10000000) * 100;
    const percentageToValue = (percentage) => (percentage / 100) * 10000000;

    const handleMouseDown = (handle) => (e) => {
        e.preventDefault();

        const slider = sliderRef.current;

        const onMouseMove = (moveEvent) => {
            const sliderRect = slider.getBoundingClientRect();
            const offsetX = moveEvent.clientX - sliderRect.left;
            const newPercentage = (offsetX / sliderRect.width) * 100;
            const newValue = percentageToValue(newPercentage);

            if (handle === 'min' && newValue >= 0 && newValue <= maxValue) {
                setMinValue(newValue);
            } else if (handle === 'max' && newValue >= minValue && newValue <= 10000000) {
                setMaxValue(newValue);
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const sliderWidth = valueToPercentage(maxValue - minValue);

    const filteredCategories = categoryBrandData.filter(categoryWithBrands =>
        selectedBrands.length === 0 || categoryWithBrands.brands.some(brand => selectedBrands.includes(brand.slug))
    );

    const filteredBrands = categoryBrandData.reduce((acc, categoryWithBrands) => {
        if (selectedCategories.length === 0 || selectedCategories.includes(categoryWithBrands.category.slug)) {
            categoryWithBrands.brands.forEach(brand => {
                if (!acc.find(b => b.brandId === brand.brandId)) {
                    acc.push(brand);
                }
            });
        }
        return acc;
    }, []);

    return (
        <main className="main">
            <div className="container home">
                <div className="chinh">
                    <div className="container trang-chu">
                        <div className="chia-25">
                            <div className="sort-wrapper">
                                <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px", marginBlock: "20px" }}>Bộ lọc</h1>
                            </div>
                            <div className="danh-muc">
                                <h2>Danh mục</h2>
                                <hr />
                                <ul>
                                    {filteredCategories.map((categoryWithBrands) => (
                                        <li key={categoryWithBrands.category.categoryId}>
                                            <input
                                                type="checkbox"
                                                value={categoryWithBrands.category.slug}
                                                onChange={handleCategoryChange}
                                            />
                                            <p style={{ paddingLeft: "5px" }}>{categoryWithBrands.category.categoryName}</p>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="thuong-hieu">
                                <h2>Thương hiệu</h2>
                                <hr />
                                <ul>
                                    {filteredBrands.map((brand) => (
                                        <li key={brand.brandId}>
                                            <input
                                                type="checkbox"
                                                value={brand.slug}
                                                onChange={handleBrandChange}
                                            />
                                            <p style={{ paddingLeft: "5px" }}> {brand.brandName}</p>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="loc-theo-gia">
                                <h2>Lọc theo giá</h2>
                                <hr />
                                <div className="sidebar-content">
                                    <div ref={sliderRef} id="slider-range" className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content">
                                        <div className="ui-slider-range ui-corner-all ui-widget-header" style={{ left: `${valueToPercentage(minValue)}%`, width: `${sliderWidth}%` }}></div>
                                        <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{ left: `${valueToPercentage(minValue)}%` }} onMouseDown={handleMouseDown('min')}></span>
                                        <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{ left: `${valueToPercentage(maxValue)}%` }} onMouseDown={handleMouseDown('max')}></span>
                                    </div>
                                    <div className="filter-type-price">
                                        <label htmlFor="amount">Giá:</label>
                                        <input style={{ width: "70%" }} type="text" id="amount" value={`${formatVND(minValue)} - ${formatVND(maxValue)}`} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chia-75">
                            <div className="sort-wrapper">
                                <div style={{ textAlign: "left", fontWeight: "bold", fontSize: "30px", marginBlock: "20px" }}>Danh sách sản phẩm</div>
                            </div>
                            <ListProduct products={products} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
