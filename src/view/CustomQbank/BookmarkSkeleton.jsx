import { FaAngleRight } from "react-icons/fa";
export default function BookMarkSkeleton() {
  const BookMark = Array(10).fill(0);

  const commonStyle = {
    backgroundColor:'#F0F0F0',
    borderRadius: "4px",
    marginBottom: "0.5rem",
  };

  return (
    <>
      <div className="skeleton-detail-grid">
        {BookMark.map((_, index) => (
          <div key={index}
              className="skeleton-detaile skeleton-animate"
              style={{
                ...commonStyle,
                border: "1px solid white ",
                width: "98%",
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
                    backgroundColor:'#D6D2D2'
                  }}
                />
                <div>
                  <div
                    className="skeleton-animate"
                    style={{
                      width: "150px",
                      height: "0.6rem",
                      marginBottom: "0.3rem",
                      backgroundColor:'#D6D2D2'
                    }}
                  />
                  <div
                    className="skeleton-animate"
                    style={{
                      width: "120px",
                      height: "0.5rem",
                      marginTop: "1.6rem",
                      backgroundColor:'#D6D2D2'
                    }}
                  />
                </div>
                <div style={{marginLeft:'60rem'}}/>
                <FaAngleRight style={{marginTop:'1rem',fontSize:'25px'}}/>
              </div>
            </div>
        ))}
      </div>
    </>
  );
}
