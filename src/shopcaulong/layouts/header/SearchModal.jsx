import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchModal.css";

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/tim-kiem/${query}`);
      onClose();
    }
  };

  return (
    <div className={`search-modal ${isOpen ? 'open' : ''}`}>
      <button type="button" className="close" onClick={onClose}>×</button>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Nhập tìm kiếm sản phẩm bạn muốn"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-lg btn-golden">Tìm kiếm</button>
      </form>
    </div>
  );
};

export default SearchModal;
