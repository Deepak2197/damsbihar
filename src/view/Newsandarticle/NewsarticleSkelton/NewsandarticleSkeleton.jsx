import "bootstrap/dist/css/bootstrap.min.css";

function NewsandarticleSkeleton() {
  const NewsArticle = Array(1).fill(0);
  const NewsArticle1 = Array(9).fill(0);
  const NewsArticle2 = Array(12).fill(0);
  const NewsArticle3 = Array(1).fill(0);
  const NewsArticle4 = Array(1).fill(0);
  const NewsArticle5 = Array(1).fill(0);

  const commonStyle = {
    backgroundColor: "#e0e0e0",
    borderRadius: "18px",
    marginBottom: "0.5rem",
  };

  return (
    <div className="container mt-5 pt-5">
      {/* Section 1 */}
      <div className="d-flex gap-3 mb-4 justify-content-start">
        {NewsArticle.map((_, index) => (
          <div
            key={index}
            style={{ ...commonStyle, width: "50px", height: "2.5rem" }}
            className="skeleton-shimmer"
          />
        ))}
      </div>

      {/* Section 2 */}
      <div className="d-flex flex-wrap gap-3 mb-4 justify-content-start">
        {NewsArticle1.map((_, index) => (
          <div
            key={index}
            style={{ ...commonStyle, width: "120px", height: "2rem", borderRadius: "10px" }}
            className="skeleton-shimmer"
          />
        ))}
      </div>

      {/* Section 3 */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center">
        {NewsArticle2.map((_, index) => (
          <div key={index} className="col d-flex justify-content-center">
            <div
              style={{
                ...commonStyle,
                width: "100%",
                maxWidth: "328px",
                height: "20rem",
                borderRadius: "18px",
                position: "relative",
              }}
              className="skeleton-shimmer"
            >
              <div
                style={{
                  ...commonStyle,
                  width: "100%",
                  height: "10rem",
                  borderRadius: "12px",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Section 4 */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 gap-3">
        {/* Left */}
        <div className="d-flex justify-content-center" style={{ flex: "1 1 100px" }}>
          {NewsArticle3.map((_, index) => (
            <div
              key={index}
              style={{ ...commonStyle, width: "100px", height: "4rem" }}
              className="skeleton-shimmer"
            />
          ))}
        </div>

        {/* Center */}
        <div className="d-flex gap-3 flex-wrap justify-content-center" style={{ flex: "2 1 auto" }}>
          {[...NewsArticle4, ...NewsArticle4, ...NewsArticle4].map((_, index) => (
            <div
              key={index}
              style={{ ...commonStyle, width: "60px", height: "3.5rem" }}
              className="skeleton-shimmer"
            />
          ))}
        </div>

        {/* Right */}
        <div className="d-flex justify-content-center" style={{ flex: "1 1 100px" }}>
          {NewsArticle5.map((_, index) => (
            <div
              key={index}
              style={{ ...commonStyle, width: "100px", height: "4rem" }}
              className="skeleton-shimmer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsandarticleSkeleton;
