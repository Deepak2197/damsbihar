 function CoursesDqbSkeleton() {
  const CoursesDqbSkeleton = Array(3).fill(0);
  const CoursesDqbSkeleton2 = Array(4).fill(0);
  const CoursesDqbSkeleton3 = Array(1).fill(0);
  const CoursesDqbSkeleton4 = Array(15).fill(0);
  const commonStyle = {
    borderRadius: "4px",
    marginBottom: "0.5rem",
  };

  return (
    <>
      <div
        className="skeleton-symbol"
        style={{ display: "flex", gap: "40px", margin: "40px 70px" }}
      >
        {CoursesDqbSkeleton.map((_, index) => (
          <div key={index}>
            <div
              className="skeleton-topic skeleton-animate"
              style={{
                ...commonStyle,
                width: "200px",
                height: "8rem",
                borderRadius: "20px",
              }}
            />
            <div
              className="skeleton-topic skeleton-animate"
              style={{
                ...commonStyle,
                width: "130px",
                height: "0.6rem",
                borderRadius: "15px",
                marginLeft: "16%",
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="skeletonoftwo"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          className="skeleton-title"
          style={{
            display: "flex",
            gap: "30px",
            marginLeft: "4.5rem",
            width: "50%",
          }}
        >
          {CoursesDqbSkeleton2.map((_, index) => (
            <div key={index}>
              <div
                className="skeleton-topic skeleton-animate"
                style={{
                  ...commonStyle,
                  width: "160px",
                  height: "1.4rem",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
        </div>

        <div className="skeleton-title" style={{ width: "50%" }}>
          {CoursesDqbSkeleton3.map((_, index) => (
            <div key={index}>
              <div
                className="skeleton-topic skeleton-animate"
                style={{
                  ...commonStyle,
                  width: "430px",
                  height: "1.4rem",
                  borderRadius: "10px",
                  marginLeft: "14rem",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="skeleton-detail-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(345px, 1fr))",
          marginLeft: "4.5rem",
        }}
      >
        {CoursesDqbSkeleton4.map((_, index) => (
          <div key={index}>
            <div
              className="skeleton-detaile skeleton-animate"
              style={{
                ...commonStyle,
                border: "1px solid white ",
                width: "300px",
                height: "5.6rem",
                borderRadius: "7px",
              }}
            >
              <div
                className="inside-detaile"
                style={{
                  display: "flex",
                  margin: "1rem .04rem",
                  gap: "10px",
                }}
              >
                <div
                  className="skeleton-animate"
                  style={{
                    marginLeft: "0.5rem",
                    borderRadius: "350px",
                    width: "50px",
                    height: "3rem",
                  }}
                />
                <div>
                  <div
                    className="skeleton-animate"
                    style={{
                      width: "100px",
                      height: "0.6rem",
                      marginBottom: "0.3rem",
                    }}
                  />
                  <div
                    className="skeleton-animate"
                    style={{
                      width: "50px",
                      height: "0.5rem",
                      marginTop: "1.6rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default(CoursesDqbSkeleton)
