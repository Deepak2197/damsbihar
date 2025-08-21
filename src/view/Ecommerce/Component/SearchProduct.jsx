import React, { useState } from 'react';
import axiosInstance from '../../../API/axiosConfig';

function SearchProduct( {handleProduct }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchSection, setSearchSection] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    
    if (value.trim().length > 1) {
        setSearchSection(true);
      Search(value); // pass updated queryText directly
    }else{
        setSearchSection(false)
    }
  };

  const Search = async (query) => {
    const searchPayload = {
      user_id: 4,
      search_key: query,
    };

    try {
      const response = await axiosInstance.post(
        "v2_data_model/search_book_list",
        searchPayload
      );
      setSearchResult(response?.data?.data || []);
  } catch (err) {
    console.error(err);
    setSearchSection(false); // Also hide if there’s an error
  }
  };

  

//   const handleProduct = (id,title) => {
//     const product = searchResult.find(p => p.id === id);
//     if (onProductSelect && product) {
//       onProductSelect(product);
//     }
//   };
  

  return (
    <div className="container mt-4">
      <div className="">
      <div className="search_br position-relative">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="input-group position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Products"
                    id="search_category"
                    fdprocessedid="9py130"
                    onChange={handleSearchChange}
                  />
                  <button className="btn" type="button" fdprocessedid="327h5f">
                    <img
                      src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/search-icon.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

        {searchSection && searchResult.length > 0 && (
          <div className="search-results">
            {searchResult.map(
              (product, index) =>
                product?.title && (
                  <div key={index} className="result-card">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProduct(product.id, product.title); // call the function with data
                      }}
                    >
                      <img
                        src={product.featured_image}
                        alt={product.title}
                        className="result-image"
                      />
                      <div className="result-title">
                        {product.title.length > 40
                          ? `${product.title.substring(0, 40)}...`
                          : product.title}
                      </div>
                    </a>
                  </div>
                )
            )}
          </div>
        )}
      </div>

      {/* Scoped styles */}
      <style jsx>{`
        .search-component {
          position: relative;
          max-width: 100%;
        }

        .search-results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 16px;
          max-height: 320px;
          overflow-y: auto;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        }

        .result-card {
          background: white;
          border-radius: 8px;
          padding: 8px;
          text-align: center;
          transition: transform 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .result-card:hover {
          transform: translateY(-3px);
        }

        .result-image {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 5px;
        }

        .result-title {
          margin-top: 6px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #333;
        }

        .input-group input {
          border-radius: 10px 0 0 10px;
        }

        .input-group .btn {
          border-radius: 0 10px 10px 0;
        }

        @media (max-width: 576px) {
          .search-results {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            max-height: 240px;
          }
        }
      `}</style>
    </div>
  );
}

export default SearchProduct;
