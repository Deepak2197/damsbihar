import { Link } from "react-router-dom";
import "./style.css";
import { FaBookmark } from "react-icons/fa";
import { Button } from "antd";

const QbankReview = () => {
  return (
    <div className="qbanKReview">
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Review</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="disorderResult">
        <div className="container Mycontainer">
          <div className="disorderBox">
            <div className="HeadinG">
              <h3>Genetic & metabolic disorders</h3>
            </div>
            <div className="qsnRating">
              <h4>Questions : 10</h4>
              <h4>Rating : 4</h4>
            </div>
            <div className="bookMark">
              <FaBookmark />
              <h4>Bookmarks (5)</h4>
            </div>
          </div>
          <div className="answeRBox">
            <div className="complete">
              <img src="/web/circle-check.svg" />
              <h3>Complete</h3>
            </div>
            <h5>You Complete this test on Mon, 28 Jul 2025 at 11:00 AM.</h5>

            <div className="righTWrong">
              <div className="answeRBook">
                <div className="riGHtBox">10</div>
                <p>Right</p>
              </div>
              <div className="answeRBook">
                <div className="riGHtBox">2</div>
                <p>Wrong</p>
              </div>
              <div className="answeRBook">
                <div className="riGHtBox">2</div>
                <p>Skipped</p>
              </div>
            </div>
          </div>
          <div className="reviWButton">
            <Button>Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QbankReview;
