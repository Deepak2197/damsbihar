import "../../../assets/css/ecommerce/style.css";

const ProductListSkeleton = () => {
  const skeletonArray = Array(8).fill(0); 

  return (
    <div className="product-skeleton-grid" id="ajaxResponce">
      {skeletonArray.map((_, index) => (
        <div key={index} className="product-skeleton-card">
          <div className="skeleton skeleton-img" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-author" />
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-meta" />
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
