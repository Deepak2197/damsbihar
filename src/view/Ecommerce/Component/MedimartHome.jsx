import "../../../assets/css/medimart/style.css";
import { useDispatch } from "react-redux";
import { addsubId } from "../../../network/medimartSlice";
import { useNavigate } from "react-router-dom";

const MedimartHome = ({ allData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (subId) => {
    dispatch(addsubId(subId));
    navigate("/medimart/damspublication");
  };
  return (
    <>
      {/* MEDIMART */}
      <div className="mediMartHome">
        <div className="container">
          <div className="heading">
            <h2>MediMart</h2>
          </div>

          <div className="MediDicSet">
            {Array.isArray(allData?.homeData?.ecommerce_cat_list) &&
              allData?.homeData?.ecommerce_cat_list.length > 0 &&
              allData.homeData.ecommerce_cat_list.map((ecomcat, index) => (
                <div className="mediPart" key={index}>
                  <div className="tab">
                    <img
                      src={ecomcat?.cat_img}
                      alt={ecomcat?.cat_img}
                      onClick={() => handleClick(ecomcat.id)}
                    />
                  </div>
                  <p>{ecomcat?.category || "Books"}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MedimartHome;
