import React, { useEffect } from "react";
import "./style.css";
import { FaLanguage, FaPhoneAlt, FaRegClock, FaWhatsapp } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
const DamsCare = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="damsCare">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="CareSection">
              <div class="six">
                <h2>Together, We Care</h2>
              </div>

              <div className="topSection">
                <h3>Dear Students,</h3>
                <p>
                  Your well-being matters.
                  <br />
                  As part of our ongoing efforts to support your mental health,
                  we are sharing a list of &nbsp;
                  <span>
                    Mental Health Support & Suicide Prevention Helpline Numbers.
                  </span>
                </p>
                <p>
                  If you're feeling overwhelmed, anxious, or just need someone
                  to talk to —<span> please don’t hesitate to reach out.</span>
                  You are not alone, and there is help available, anytime you
                  need it.
                </p>
                <p>
                  In our commitment to supporting your mental health and
                  emotional well-being, the following helpline numbers are
                  available 24x7 or during specified hours, offering free,
                  confidential support:
                </p>
              </div>
              <div className="Heading">
                <h4>Helpline Numbers to Remember & Share</h4>
              </div>
              <div className="HelpLine">
                <div className="helpPart">
                  <h5>
                    <span>Tele-MANAS</span> (Govt. of India Mental Health
                    Support)
                  </h5>
                  <p>
                    <FaPhoneAlt /> 14416 or 1800-891-4416 (Toll-Free)
                  </p>
                  <p>
                    <FaRegClock /> 24x7
                  </p>
                  <p>
                    <FaLanguage /> 20 Indian languages
                  </p>
                </div>
                <div className="helpPart">
                  <h5>
                    <span>KIRAN Mental Health Helpline</span>
                  </h5>
                  <p>
                    <FaPhoneAlt /> 1800-599-0019 (Toll-Free)
                  </p>
                  <p>
                    <FaRegClock /> 24x7
                  </p>
                  <p>
                    <FaLanguage /> 13 Indian languages
                  </p>
                </div>
                <div className="helpPart">
                  <h5>
                    <span>AASRA</span> (Suicide Prevention NGO)
                  </h5>
                  <p>
                    <FaPhoneAlt /> +91 98204 66726
                  </p>
                  <p>
                    <FaRegClock /> 24x7
                  </p>
                </div>
                <div className="helpPart">
                  <h5>
                    <span>iCALL by TISS</span> (Confidential Psychosocial
                    Helpline)
                  </h5>
                  <p>
                    <FaPhoneAlt /> +91 9152987821
                  </p>
                  <p>
                    <FaRegClock /> Mon–Sat, 10 AM – 8 PM
                  </p>
                </div>
                <div className="helpPart">
                  <h5>
                    <span>Vandrevala Foundation Mental Health Helpline</span>
                  </h5>
                  <p>
                    <FaPhoneAlt /> +91 99996 66555
                  </p>
                  <p>
                    <FaRegClock /> 24x7
                  </p>
                  <p>
                    <FaWhatsapp />
                    Also available on WhatsApp
                  </p>
                </div>
              </div>
              <p>
                Let’s look out for ourselves and each other. <br />
                <span>It’s okay to ask for help. It’s brave to speak up.</span>
              </p>
              <p className="stay">Stay strong, stay connected.</p>
              <p>
                Warm regards, <br />
                <span className="team">Team DAMS</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamsCare;
