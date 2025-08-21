import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../API/axiosConfig";
import { FaAngleRight, FaAngleUp } from "react-icons/fa";
import "./style.css";

const DamsDeck = () => {
  const user_id = sessionStorage.getItem("id");
  const [deckcards, setDeck] = useState([]);
  const [totalReviewLeft, setTotalReviewLeft] = useState(0);
  const [totalStudied, setTotalStudied] = useState(0);
  const [expandedDecks, setExpandedDecks] = useState({}); // State to manage expanded/collapsed decks

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axiosInstance.post("/v2_data_model/deck", {
          user_id: user_id,
        });

        const decks = res?.data?.data || [];

        // Calculate total review left and total studied cards
        let reviewLeft = 0;
        let studied = 0;
        decks.forEach((deck) => {
          if (deck.subdeck && deck.subdeck.length > 0) {
            deck.subdeck.forEach((subdeck) => {
              reviewLeft += parseInt(subdeck.review_today || 0);
            });
            studied += parseInt(deck.read_cards || 0);
          }
        });

        setTotalReviewLeft(reviewLeft);
        setTotalStudied(studied);
        setDeck(decks);
      } catch (error) {
        console.error("Error fetching deck data:", error);
      }
    };
    getdata();
  }, [user_id]);

  // Toggle the expanded state of a deck
  const toggleDeck = (deckId) => {
    setExpandedDecks((prev) => ({
      ...prev,
      [deckId]: !prev[deckId],
    }));
  };

  return (
    <div className="Damsdeck">
      <div className="page-content position-relative"></div>
      <div className="container">
        <div className="bannersection">
          <div className="bnrPart">
            <p>
              Which 'Back to Basics' lecture would{" "}
              <span>you like me to use for the AI Predictive Test?</span>
            </p>
            <img src="/web/shifubnr.gif" />
          </div>
        </div>
        <div className="subjectList">
          <div className="heading">
            <h3>Select Subject</h3>
          </div>
          <div className="suBBox">
            <div className="inneRBox">
              <div className="textPart">
                <p>Anatomy</p>
              </div>
            </div>
            <div className="inneRBox">
              <div className="textPart">
                <p>Biochemistry</p>
              </div>
            </div>
            <div className="inneRBox">
              <div className="textPart">
                <p>Pharmacology</p>
              </div>
            </div>
            <div className="inneRBox">
              <div className="textPart">
                <p>Microbiology</p>
              </div>
            </div>
            <div className="inneRBox">
              <div className="textPart">
                <p>Pathology</p>
              </div>
            </div>
            <div className="inneRBox">
              <div className="textPart">
                <p>Physiology</p>
              </div>
            </div>
            <div className="inneRBox">
              <div className="textPart">
                <Link to="/selectsubject">
                  <p>Obstetrics</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* New Card and Review Card Section */}
        <div className="Boxdata">
          <Link>
            <div className="BoxInner">
              <img
                src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/newCard.png"
                alt="new card"
              />
              <h4>New Card</h4>
            </div>
          </Link>
          <Link to={"/review-card"}>
            <div className="BoxInner">
              <img
                src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/Cardreview.png"
                alt="review card"
              />
              <h4>Review Card</h4>
            </div>
          </Link>
        </div>
        {/* Bottom Buttons */}
        <div className="bottomBtn">
          <button>Randomize Cards</button>
          <Link to={"/allcards/1"}>
            <button>All Cards</button>
          </Link>
          <Link to={"/allcards/2"}>
            <button>Bookmarked Card</button>
          </Link>
          <Link to={"/allcards/3"}>
            <button>Suspended Card</button>
          </Link>
          <Link to="/deckprogress">
            <button>My Progress</button>
          </Link>
        </div>

        {/* Header Section */}
        <div className="review-header">
          <div className="textPart">
            <h3>Review Left</h3>
            <p>
              Today: <span>{totalReviewLeft}</span>
            </p>
            <p>Studied {totalStudied} Cards</p>
          </div>
          <div className="imgPart">
            <img src={`${window.IMG_BASE_URL}/revamp-web/etc/review.svg`} />
          </div>
        </div>

        {/* Deck List with Dropdown */}
        <div className="setOfDeckDiv">
          {deckcards.map((deck) => {
            // Skip decks with no subdecks (like "ram")
            if (!deck.subdeck || deck.subdeck.length === 0) return null;

            const isExpanded = expandedDecks[deck.d_id] || false;

            return (
              <div key={deck.d_id} className="deck-section">
                {/* Deck Header with Dropdown Toggle */}
                <div
                  className="deck-header"
                  onClick={() => toggleDeck(deck.d_id)}
                >
                  <div className="deck-title-wrapper">
                    <span className="deck-icon">🟣</span>
                    <h4>{deck.title}</h4>
                  </div>
                  <div className="deck-stats">
                    <p>
                      {deck.read_cards}/{deck.total_card} Studied
                    </p>
                    <p>{deck.left_cards} Left</p>
                  </div>
                  <span
                    className={`dropdown-arrow ${isExpanded ? "expanded" : ""}`}
                  >
                    <FaAngleUp />
                  </span>
                </div>

                {/* Subdeck List (shown when expanded) */}
                {isExpanded && (
                  <div className="subdeck-list">
                    {deck.subdeck.map((subdeck) => (
                      <div key={subdeck.sd_id} className="subdeck-item">
                        <div className="subdeck-info">
                          <span className="subdeck-icon">👤</span>
                          <div className="subdeck-details">
                            <h5>{subdeck.title}</h5>
                          </div>
                          <div className="subdeck-stats">
                            <p>{subdeck.read_cards} Left</p>
                            <p>{subdeck.review_today} Review Today</p>
                          </div>
                        </div>
                        <Link to={`/readcard/${1}S${subdeck?.sd_id}`}>
                          {/* <Link to={`/readcard/${subdeck.sd_id}`}> */}
                          <button className="start-review-btn">
                            Start Review
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DamsDeck;
