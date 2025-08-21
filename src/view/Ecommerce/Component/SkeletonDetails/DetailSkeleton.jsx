import '..//SkeletonDetails/SkeletonDetaile.css';

function DetailSkeleton() {
  const skeletonArray = Array(1).fill(0);

  return (
    <>
      <div className="skelton" style={{ display: "Flex", marginLeft: "2rem" }}>
        <div className="product-skeleton-grid" id="ajaxResponce">
          {skeletonArray.map((_, index) => (
            <div key={index}>
              <div className="product-skeleton-card" style={{ width: "450px" }}>
                <div
                  className=" skeleton skeleton-img"
                  style={{ height: "250px" }}
                />
              </div>
              <div
                style={{ display: "flex", gap: "20px", marginTop: "1.6rem" }}
              >
                <div
                  className="skeleton skeleton-price"
                  style={{ width: "70px", height: "50px" }}
                />
                <div
                  className="skeleton skeleton-meta"
                  style={{ width: "70px", height: "50px" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="product-skeleton-grid" id="ajaxResponce">
          {skeletonArray.map((_, index) => (
            <div key={index}>
              <div
                className="skeleton skeleton-title"
                style={{
                  width: "140px",
                  height: "25px",
                  borderRadius: "30px",
                  gap: "20px",
                }}
              />
              <div
                className="skeleton skeleton-author"
                style={{
                  width: "300px",
                  height: "25px",
                  borderRadius: "30px",
                  marginTop: "1rem",
                }}
              />
              <div
                className="skeleton skeleton-price"
                style={{
                  width: "500px",
                  height: "25px",
                  borderRadius: "30px",
                  marginTop: "1.6rem",
                }}
              />
              <div
                className="skeleton skeleton-meta"
                style={{ width: "400px", height: "25px", marginTop: "1.5rem" }}
              />
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <div
                  className="skeleton skeleton-meta"
                  style={{ height: "30px", width: "100px", marginTop: "1rem" }}
                />
                <div
                  className="skeleton skeleton-meta"
                  style={{ height: "30px", width: "100px", marginTop: "1rem" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{ height: "500px", width: "400px", marginLeft: "35rem" }}
        className="product-skeleton-grid"
        id="ajaxResponce"
      >
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            style={{ backgroundColor: "", width: "800px" }}
            className="product-skeleton-card"
          >
            <div style={{ height: "15px" }} className="skeleton skeleton-img" />
            <div
              style={{ height: "15px", width: "690px" }}
              className="skeleton-part"
            >
              <div
                style={{ height: "15px", width: "750px" }}
                className="skeleton skeleton-title"
              />
              <div
                style={{ height: "15px", width: "750px" }}
                className="skeleton skeleton-author"
              />
              <div
                style={{ height: "15px", width: "740px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "730px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "760px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "770px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "760px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "740px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "780px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "797px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "7570px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "798px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "780px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "790px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "799px" }}
                className="skeleton skeleton-meta"
              />
              <div
                style={{ height: "15px", width: "790px" }}
                className="skeleton skeleton-meta"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DetailSkeleton;
