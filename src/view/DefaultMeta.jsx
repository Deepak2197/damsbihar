import React from "react";
import { Helmet } from "react-helmet-async";

const DefaultMeta = () => {
  return (
    <Helmet>
    <title>Neet PG Preparation, Neet PG Coaching, FMGE, USMLE</title>
    <meta
      name="description"
      content="Prepare for NEET PG, FMGE, USMLE, NEET MDS, exams with DAMS' expert coaching. Access study materials, NEET PG Mock Tests, Neet PG Test series to Ace Neet PG Exam"
    />
    <meta
      name="keywords"
      content="Neet pg, neet pg online, neet pg live, NEET PG coaching classes, Best NEET PG coaching, NEET PG coaching institutes, NEET PG coaching online, NEET PG coaching centers, Top NEET PG coaching, NEET PG coaching near me, NEET PG coaching fees, NEET PG coaching in india, NEET PG coaching reviews, NEET PG coaching, NEET PG coaching faculty, NEET PG coaching programs, NEET PG coaching schedule, NEET PG coaching success rate, NEET PG coaching books, NEET PG coaching mock tests, NEET PG coaching video lectures, NEET PG coaching tips, NEET PG coaching online registration, fmge coaching, fmge classes, usmle coaching, usmle preparation, neet pg recorded, neet pg video, neet pg entrance"
    />

    {/* Open Graph Meta */}
    <meta property="og:title" content="DAMS | NEET PG, FMGE, USMLE Coaching & Preparation" />
    <meta property="og:description" content="Join India's top medical coaching institute DAMS for NEET PG, FMGE, and USMLE preparation. Expert faculty, mock tests, and video lectures to boost your rank." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.damsdelhi.com" />
    <meta property="og:image" content="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/login_logo.png" />
    <meta property="og:site_name" content="DAMS" />

    {/* Twitter Meta */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="DAMS | NEET PG, FMGE, USMLE Coaching & Preparation" />
    <meta name="twitter:description" content="Join DAMS for expert coaching in NEET PG, FMGE, and USMLE. Access mock tests, study materials, and recorded lectures." />
    <meta name="twitter:image" content="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/login_logo.png" />
  </Helmet>
  );
};

export default DefaultMeta;
