
export default function DQBskeleton() {
  const dbq = Array(25).fill(0);

  const commonStyle = {
    borderRadius: "4px",
    marginBottom: "0.5rem",
  };

  return (
    <>
     <div style={{marginTop:'6rem'
     }}>
         <div
        className="skeleton-detail-grid"
        style={{
          width:'80%',
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginLeft: "10rem",
          gap:'1rem'
        }}
      >
        {dbq.map((_, index) => (
          <div key={index}>
            <div
              className="skeleton-detaile skeleton-animate"
              style={{
                ...commonStyle,
                border: "1px solid white ",
                // width: "300px",
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
     </div>
    </>
  );
}
