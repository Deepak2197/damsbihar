import "bootstrap/dist/css/bootstrap.min.css";

function NewArticledetailSkeleton() {
  const NewsArticle = Array(1).fill(0);
  const NewsArticle1 = Array(3).fill(0);
  const NewsArticle2 = Array(4).fill(0);
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
      <div className="main-conatiner-header d-flex justify-content-between flex-wrap gap-2">
        <div className="flex-grow-1">
          {NewsArticle.map((_, index) => (
            <div
              key={index}
              style={{
                ...commonStyle,
                width: "100%",
                maxWidth: "750px", // allows shrink on small screens
                height: "1.7rem",
              }}
              className="skeleton-shimmer"
            />
          ))}
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {NewsArticle1.map((_, index) => (
            <div
              key={index}
              style={{
                ...commonStyle,
                width: "100px",
                height: "2.4rem",
                borderRadius: "8px",
              }}
              className="skeleton-shimmer"
            />
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {NewsArticle2.map((_, index) => (
          <div key={index} className="col">
            <div
              style={{
                ...commonStyle,
                width: "100%",
                height: "7rem",
                borderRadius: "18px",
              }}
              className="skeleton-shimmer"
            />
          </div>
        ))}
      </div>

      {/* Section 3 */}
      <div className="cart1">
        {NewsArticle3.map((_, index) => (
          <div key={index}>
            <div
              style={{
                ...commonStyle,
                width: "100%",
                height: "7rem",
                borderRadius: "18px",
                marginTop: "2rem",
              }}
              className="skeleton-shimmer"
            >
              <div className="child-2">
                {NewsArticle5.map((_, index) => (
                  <div key={index}>
                    <div
                      style={{
                        backgroundColor: "#e0e0e0",
                        width: "30%",
                        height: "3rem",
                        borderRadius: "12px",
                        position: "relative",
                        top: "4px",
                        left: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section 4 */}
      <div className="cart2">
        {NewsArticle4.map((_, index) => (
          <div key={index}>
            <div
              style={{
                ...commonStyle,
                width: "100%",
                height: "30rem",
                borderRadius: "18px",
                marginTop: "2rem",
              }}
              className="skeleton-shimmer"
            >
              <div className="child">
                {NewsArticle5.map((_, index) => (
                  <div key={index}>
                    <div
                      style={{
                        backgroundColor: "#e0e0e0",
                        width: "30%",
                        height: "3rem",
                        borderRadius: "12px",
                        position: "relative",
                        top: "4px",
                        left: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewArticledetailSkeleton;
