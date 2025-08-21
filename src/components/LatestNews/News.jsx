import Item from "antd/es/list/Item";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const News = ({ newzData, breadValue }) => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id") || "4";
  const formatSecondsToDate = (seconds) => {
    if (seconds) {
      // Create a new Date object using the seconds
      const date = new Date(Number(seconds));

      // Define options for formatting the date
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      // Format the date
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      // Return the formatted date string
      return formattedDate;
    }
  };
  const newsLatestFilter = newzData
    ?.slice()
    ?.sort((a, b) => Number(b.creation_date) - Number(a.creation_date));
  const news = newsLatestFilter?.slice(0, breadValue);

  const slugify = (title) => {
    return encodeURIComponent(title)
      .replace(/%20/g, "-") // spaces → dashes
      .replace(/%3A/g, "_") // colon → dash
      .replace(/%26/g, "and") // & → and
      .replace(/%27/g, "") // apostrophe → remove
      .replace(/%2F/g, "-") // slash → dash (optional)
      .replace(/%/g, "") // final safety net
      // .replace(/:/g, "_") // final safety net
  };
  return (
    <div className={userId == 4 ? "newsBG" : ""}>
      <div className={userId == 4 ? "container" : ""}>
        <div className="row">
          <div className="md-12">
            <div
              className={`newNewsPartician ${
                userId === "4" ? "newNewsPartician1" : ""
              }`}
            >
              <div className="headinGSystem ">
                <h2>News</h2>
                <span
                  className="seeAll newseebtn"
                  style={{
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontWeight: 500,
                    color: "#007aff",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate(`/News`)}
                >
                  See all
                </span>
              </div>
              <div className="newSPart" style={{ cursor: "pointer" }}>
                {news?.map((news, i) => (
                  <div
                    key={i}
                    className="newSBox"
                    onClick={() => {
                      if (news?.slug != undefined) {
                        navigate(`/article-news/${news.slug}`);
                      } else {
                        navigate(`/news-article/news=${slugify(news.title)}`);
                      }
                    }}
                  >
                    <div className="newSPic">
                      <img
                        src={news?.image == null ? "/news.png" : news.image}
                      />
                    </div>
                    <div className="newSText">
                      <h2>{news?.title}</h2>
                      <div className="newsBotomtext">
                        <div className="dateSec">
                          <p>{formatSecondsToDate(news.creation_date)}</p>
                        </div>
                        <ul>
                          <li className="thumb">
                            <img
                              src={
                                news?.is_liked == 1
                                  ? `${window.IMG_BASE_URL}/emdpublic/dailycases/likes.svg`
                                  : `${window.IMG_BASE_URL}/emdpublic/dailycases/like.svg `
                              }
                              alt="likes"
                              style={{ marginRight: "5px" }}
                            />
                          </li>
                          <li className="heart">
                            {news?.is_bookmarked == 0 ? (
                              <FaHeart color="gray" size={16} />
                            ) : (
                              <span>
                                <FaHeart color="#FF1E1E" size={16} />
                                &nbsp;
                              </span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
