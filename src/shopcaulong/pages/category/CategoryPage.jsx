import React, { useEffect, useState, useRef } from 'react';
import { GET_ALL, GET_IMG } from '../../../api/apiService';
import { Link, useParams } from 'react-router-dom';

const formatVND = (number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000000);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [slug, minValue, maxValue, selectedBrands]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchProducts = () => {
    const brandParam = selectedBrands.join(',');
    GET_ALL(`products/category/${slug}?minPrice=${minValue}&maxPrice=${maxValue}&brandSlug=${brandParam}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const fetchBrands = () => {
    GET_ALL('brand/show')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });
  };

  const handleBrandChange = (e) => {
    const brandSlug = e.target.value;
    setSelectedBrands(prevSelectedBrands =>
      e.target.checked
        ? [...prevSelectedBrands, brandSlug]
        : prevSelectedBrands.filter(slug => slug !== brandSlug)
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

  return (
    <main className="main">
      <div className="container home">
        <div className="chinh">
          <div className="container trang-chu">
            <div className="chia-25">
              <div className="sort-wrapper">
                <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px", marginBlock: "20px" }}>Bộ lọc</h1>
              </div>
              <div className="thuong-hieu">
                <h2>Thương hiệu</h2>
                <hr />
                <ul>
                  {brands.map((brand) => (
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
                {/* <h2>Sản phẩm</h2> */}
              </div>
              <div className="row row-cols-3 row-cols-lg-2 row-cols-sm-1 g-3 g-md-2">
                {products.map((product) => {
                  const totalReviews = product.ratingStats?.totalReviews ?? 0;
                  const averageRating = totalReviews === 0 ? 5 : product.ratingStats?.averageRating ?? 5;
                  return (
                    <div className="col" key={product.productId}>
                      <article className="product">
                        <div className="product__wrap">
                          <Link to={`/chi-tiet/${product.slug}`}>
                            <img src={GET_IMG("products", product.galleries[0].thumbnail)} alt={product.productName} className="product__img" />
                          </Link>
                        </div>
                        <h3 className="product__heading">
                          <Link to={`/chi-tiet/${product.slug}`}>
                            {product.productName}
                          </Link>
                        </h3>
                        <p className="product__brand">{product.brand.brandName}</p>
                        <div className="product__infor">
                          <span className="product__price">{formatVND(product.productPrice)}</span>
                          <div className="product-rate">
                            <img src="/assets/icon/star.svg" alt="star" className="product-rate__icon" />
                            <span className="product-rate__val">{averageRating.toFixed(1)}</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
