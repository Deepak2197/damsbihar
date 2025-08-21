import '../../view/Mycourse/style.css';

function TestSeriessSkeleton() {
  const TestSkeltonSection1 = Array(10).fill(0);
  const TestSkelton = Array(4).fill(0);
  const TestSkeltonsection3 = Array(1).fill(0);
  const TestSkeltonsection4 = Array(1).fill(0);
  const TestSkeltonsection5 = Array(12).fill(0);

  const commonStyle = {
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    marginBottom: "0.5rem",
  };

  return (
    <>
      <div >
        <div className="skeleton-1" style={{ display: "flex", gap: "18px" }}>
          {TestSkeltonSection1.map((_, index) => (
            <div key={index}>
              <div
                className="skeleton-topic skeleton-shimmer"
                style={{ ...commonStyle, width: "100px", height: "1rem" }}
              />
            </div>
          ))}
        </div>

        <div
          className="skeleton-2"
          style={{ display: "flex", gap: "30px", marginTop: "2rem" }}
        >
          {TestSkelton.map((_, index) => (
            <div key={index}>
              <div
                className="allfour skeleton-shimmer"
                style={{
                  ...commonStyle,
                  width: "183px",
                  height: "3rem",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
        </div>

        <div className="skeleton-3">
          {TestSkeltonsection3.map((_, index) => (
            <div key={index}>
              <div
                className="clickonbutton skeleton-shimmer"
                style={{
                  ...commonStyle,
                  width: "200px",
                  height: "40px",
                  marginLeft: "83%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="skeleton-4">
          {TestSkeltonsection4.map((_, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                className="alltest skeleton-shimmer"
                style={{ ...commonStyle, width: "100px", height: "20px" }}
              />
              <div
                className="note skeleton-shimmer"
                style={{ ...commonStyle, width: "380px", height: "20px" }}
              />
            </div>
          ))}
        </div>

        <div
          className="skeleton-5"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
            gap: "16px",
          }}
        >
          {TestSkeltonsection5.map((_, index) => (
            <div
              key={index}
              className="skeleton-test-series skeleton-shimmer"
              style={{
                ...commonStyle,
                width: "380px",
                padding: "1rem",
                display: "flex",
                gap: "8px",
                backgroundColor: "#f4f4f4",
                border: "1px solid #ccc",
              }}
            >
              <div
                className="circle skeleton-shimmer"
                style={{
                  ...commonStyle,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
              <div>
                <div
                  className="title skeleton-shimmer"
                  style={{ ...commonStyle, width: "100px", height: "12px" }}
                />
                <div
                  className="description skeleton-shimmer"
                  style={{ ...commonStyle, width: "60px", height: "12px" }}
                />
              </div>
              <div
                className="free skeleton-shimmer"
                style={{
                  ...commonStyle,
                  width: "55px",
                  height: "25px",
                  marginLeft: "auto", 
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TestSeriessSkeleton;
