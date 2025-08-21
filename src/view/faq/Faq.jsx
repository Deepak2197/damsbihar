import React, { useState, useEffect } from "react";
import "./style.css";
import { Checkbox } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

// FAQ Data with all 12 questions
const faqData = [
  {
    question:
      "What is DAMS and why is it considered a pioneer in post graduate medical exam preparation?",
    answer:
      "DAMS (Delhi Academy of Medical Sciences) is a doctor-led institute with over two decades of excellence in medical education (since 1999). We are pioneers in NEETPG and FMGE preparation, known for setting the gold standard in teaching and mentoring future doctors. Our students consistently achieve top ranks in NEETPG and high-value examinations like INICET. Also, DAMS holds the record for the highest pass rate in FMGE.",
  },
  {
    question: "Who runs DAMS?",
    answer:
      "DAMS is entirely run by a team of experienced and passionate doctors, making us uniquely positioned to understand the challenges, needs, and aspirations of medical students. We believe in teaching from doctors, for doctors. The key person behind the company is Dr. Sumer Sethi, widely considered a visionary who created this category of NEETPG preparation. Himself being a topper in all exams and a creative entrepreneur, his mission is to meaningfully impact the lives of medical students.",
  },
  {
    question:
      "What makes DAMS different from other medical coaching institutes?",
    answer: (
      <>
        DAMS stands apart because of our first-in-industry innovations and
        student-centered approach:
        <ul>
          <li>
            Largest footprint of face-to-face classes pan India with the most
            experienced faculty, known for crisp, concise teaching and maximum
            strike rate in competitive exams.
          </li>
          <li>
            DAMS classes are known to help both in competitive exams as well as
            university professional exams.
          </li>
          <li>
            <Checkbox checked disabled style={{ marginRight: 8 }} />
            First to launch LIVE two-way interactive classes via the DAMS
            dams App.
          </li>
          <li>
            <Checkbox checked disabled style={{ marginRight: 8 }} />
            First to integrate AI-based learning with our cutting-edge tool
            Cortex AI.
          </li>
          <li>
            <Checkbox checked disabled style={{ marginRight: 8 }} />
            DVT (DAMS Visual Treat) – the most effective revision course with
            the highest strike rate in NEETPG.
          </li>
          <li>
            <Checkbox checked disabled style={{ marginRight: 8 }} />
            Pioneers in organizing simulated national-level CBTs (Computer Based
            Tests) in real-time, designated centres for NEETPG, INICET, and
            FMGE.
          </li>
          <li>
            <Checkbox checked disabled style={{ marginRight: 8 }} />
            Only institute offering courses across healthcare disciplines,
            including:
            <ul>
              <li>NEETPG, INICET, FMGE (MBBS)</li>
              <li>NEETMDS (BDS)</li>
              <li>NORCET and other exams (Nursing and Paramedical)</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Is DAMS available both online and offline?",
    answer: (
      <>
        Absolutely! DAMS has a true omnichannel presence:
        <ul>
          <li>
            <span role="img" aria-label="location-pin">
              📍
            </span>{" "}
            Face-to-face classroom sessions in major cities across India.
          </li>
          <li>
            <span role="img" aria-label="mobile-phone">
              📱
            </span>{" "}
            On-the-go learning through the DAMS DAMS App, offering live,
            recorded, and AI-enhanced learning experiences.
          </li>
        </ul>
        You can choose what suits your learning style best – we bring quality
        education to your fingertips or doorstep.
      </>
    ),
  },
  {
    question: "What is DAMS DVT and how does it help in NEETPG preparation?",
    answer:
      "DAMS DVT (Visual Treat) is our signature high-yield, rapid revision course, designed exclusively for NEETPG aspirants. It condenses the vast syllabus into visual-rich, high-retention modules that ensure maximum recall. Most toppers credit their success to DAMS DVT.",
  },
  {
    question: "How does DAMS use Artificial Intelligence in teaching?",
    answer:
      "With the launch of Cortex AI, DAMS became the first medical institute in India to integrate AI into medical exam preparation. Cortex AI provides intelligent suggestions, performance tracking, adaptive learning, and personalized insights to maximize your study efficiency.",
  },
  {
    question: "Does DAMS offer courses for dental & nursing students?",
    answer: (
      <>
        Yes! DAMS is the only institute in India with dedicated courses for all
        healthcare fields, including:
        <ul>
          <li>
            <span role="img" aria-label="tooth">
              🦷
            </span>{" "}
            NEETMDS for dental graduates.
          </li>
          <li>
            <span role="img" aria-label="nurse">
              👩‍⚕️
            </span>{" "}
            NORCET and other nursing entrance exams.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What is the DAMS CBT and why is it important?",
    answer:
      "The DAMS CBT (Computer Based Test) is a national-level simulated exam conducted in real computer labs to mirror the actual NEETPG, INICET, and FMGE exam environments. It helps students assess their readiness, manage time, and overcome exam anxiety in real conditions.",
  },
  {
    question: "Does DAMS offer support for 1st and 2nd year MBBS students?",
    answer:
      "Yes! DAMS offers special online courses for 1st and 2nd-year MBBS students to help them build a strong base in anatomy, physiology, biochemistry, and pathology. These early-stage courses are designed to simplify concepts, enhance retention, and align with university exams while gently introducing clinical thinking.",
  },
  {
    question: "Are there any DAMS programs for MD/MS/DNB resident doctors?",
    answer:
      "Absolutely. DAMS offers special teaching and clinical enhancement courses for residents pursuing MD, MS, or DNB across various specialties. These are curated to help residents with academic presentations, theory exams, practicals, thesis preparation, and future competitive super-specialty exams.",
  },
  {
    question: "Does DAMS help with international exams like USMLE or PLAB?",
    answer:
      "Yes, DAMS provides dedicated mentorship and courses for international exams such as USMLE (USA), PLAB (UK), and Royal College Membership exams (MRCP, MRCS, MRCOG). These programs are structured with international guidelines, expert faculty, and exam-focused content to help Indian and international students achieve global success.",
  },
  {
    question: "How do I get started with DAMS?",
    answer: (
      <>
        You can join DAMS through any of the following ways:
        <ul>
          <li>Visit a DAMS classroom centre near you.</li>
          <li>
            Download the DAMS DAMS App (available on iOS and Android).
          </li>
          <li>
            You can subscribe to online courses directly from the app itself.
          </li>
          <li>
            Explore courses and book your spot on{" "}
            <a
              href="https://www.damsdelhi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.damsdelhi.com
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
];

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, []);
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleOpen}>
        <span>{question}</span>
        <span className="faq-toggle">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="faq-answer">
          {typeof answer === "string" ? answer : answer}
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <div className="faq-sec">
          <img src="https://d2enu63wt1sf3u.cloudfront.net/react_emed_web/frequently-ask.png"></img>
          <h1>Frequently asked questions(FAQ)</h1>
        </div>

        <div className="faq-content">
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleOpen(index)}
              />
            ))}
          </div>
          <div className="buttonSetSec">
            {/* Email Button */}
            {/* <button className="btn">
              <a
                href="mailto:helpdesk@damsdelhi.com"
                
                target="_blank"
                rel="noopener noreferrer"
              >
                <em className="fa fa-envelope-o"></em> helpdesk@damsdelhi.com
              </a>
            </button> */}

            {/* WhatsApp Button */}
            {/* <button className="btn whtsap">
              <a
                href="https://api.whatsapp.com/send?phone=919899664533&text=Hello,%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp Icon"
                  style={{ width: "20px", marginRight: "8px" }}
                />
                +91-9899664533
              </a>
            </button> */}
          </div>

          {/* <div className="contact-section">
            <h3>Do you have more questions?</h3>
            <p>
              We’re here to help! Reach out to our WhatsApp Number -{" "}
              <a
                href="https://wa.me/9899664533"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
              >
                <WhatsAppOutlined /> +91-9899664533
              </a>
            </p>
            <p
              className="contact-button"
              //onClick={() => window.open("https://wa.me/9899664533", "_blank")}
            >
              Shoot a Direct Mail: info@damsdelhi.com
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Faq;
