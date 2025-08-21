import React, { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import "../PrivacyPolicy/style.css";

const Privacypolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <div className="Privacypolicy">
      <div className="container">
        <div className="privacyPage">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {/* <h2 className="text-center">Privacy Policy</h2> */}

              <div className="textbackg">
                <div class="six">
                  <h2>Privacy Policy</h2>
                </div>
                <div className="textGroup">
                  <h3>You certainly understand and concur that :-</h3>
                  <p>
                    {" "}
                    Delhi Academy of Medical Sciences Pvt. Ltd.
                    <span> www.damsdelhi.com</span> has created this privacy
                    policy in order to demonstrate own organization commitment
                    to privacy. Throughout the cyberspace we want to contribute
                    towards providing a safe and secure environment, safe
                    information gathering and dissemination practices for all
                    our sites. This policy applies only to{" "}
                    <span> www.damsdelhi.com</span> which carries the Delhi
                    Academy of Medical Sciences Pvt. Ltd. brand and not to other
                    companies or organizations' websites to which we link.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Registration / Information :</h3>
                  <p>
                    When you sign up for <span> www.damsdelhi.com</span> we ask
                    you for personal information. We may combine the information
                    you submit under your account with information from other
                    services / third parties in order to provide you with a
                    better experience and to improve the quality of our
                    services. For certain services, we may give you the
                    opportunity to opt out of combining such information. You
                    may provide us with certain information such as your Name,
                    E-mail address, Correspondence address when registering for
                    certain services such as Online Registration / Submit
                    Resume, Contests. This information will primarily be used
                    for the purpose of providing personalization and
                    verification.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Cookies :</h3>
                  <p>
                    {" "}
                    A cookie is a small data file that certain websites write to
                    your hard drive when you visit them. A cookie file can
                    contain information such as a user ID that the site uses to
                    track the pages you have visited. A cookie can contain
                    information you supply yourself. A cookie can't read data of
                    your hard disk or read cookie files created by other sites.{" "}
                    <span> www.damsdelhi.com</span> uses cookies to track user
                    traffic patterns and for the personalization feature.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>User communications :</h3>
                  <p>
                    When you send email or other communications to{" "}
                    <span> www.damsdelhi.com</span>, we may retain those
                    communications in order to process your inquiries, respond
                    to your requests and improve our services. When you send and
                    receive SMS messages to or from one of our services that
                    provides SMS functionality, we may collect and maintain
                    information associated with those messages, such as the
                    phone number, the content of the message, and the date and
                    time of the transaction. We may use your email address to
                    communicate with you about our services.
                  </p>
                  <span className="splFont">
                    When you voluntarily send us electronic mail, we will keep a
                    record of this information so that we can respond to you. We
                    only collect information from you when you register on our
                    site or fill out a form. Also, when filling out a form on
                    our site, you may be asked to enter your: name, e-mail
                    address or phone number. You may, however, visit our site
                    anonymously. In case you have submitted your personal
                    information and contact details, we reserve the rights to
                    Call, SMS, Email or WhatsApp about our products and offers,
                    even if your number has DND activated on it.
                  </span>
                </div>
                <div className="textGroup">
                  <h3>Log information :</h3>
                  <p>
                    {" "}
                    When you access <span> www.damsdelhi.com</span> services via
                    a browser, application or other client our servers
                    automatically record certain information. These server logs
                    may include information such as your web request, your
                    interaction with a service, Internet Protocol address,
                    browser type, browser language, the date and time of your
                    request and one or more cookies that may uniquely identify
                    your browser or your account.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Electronic Newsletter/E-mail :</h3>
                  <p>
                    {" "}
                    <span> www.damsdelhi.com</span> offers a free electronic
                    newsletter to its users. We gather the e-mail addresses of
                    users who voluntarily subscribe. Users may remove themselves
                    from this mailing list by using the link provided in every
                    newsletter.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Confidential :</h3>
                  <p>
                    {" "}
                    DAMS Privacy Policy applies to{" "}
                    <span> www.damsdelhi.com</span> services only. We do not
                    exercise control over the sites displayed as search results,
                    sites that include other applications, products or services,
                    or links from within our various services. Personal
                    information that you provide to other sites may be sent to{" "}
                    <span> www.damsdelhi.com</span> in order to deliver the
                    service. We process such information under this Privacy
                    Policy.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Feedback :</h3>
                  <p>
                    {" "}
                    Our site's Feedback Form requires contact information of
                    users like their name and e-mail address and demographic
                    information like their zip code, age etc. for better
                    services.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Further Improvement :</h3>
                  <p>
                    Apart from the above, we may use the information to provide,
                    maintain, protect and improve our services and develop new
                    services.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Queries regarding the Website :</h3>
                  <p>
                    {" "}
                    If you have any questions about the practices of this site
                    or your dealings with this website, regarding DAMS Privacy
                    Policy, contact DAMS Corporate office{" "}
                    <span>www.damsdelhi.com</span>.
                  </p>
                </div>
                <div className="textGroup">
                  <h3>Electronic Newsletter/Email :</h3>
                  <p>
                    {" "}
                    <span> www.damsdelhi.com</span> offers a free electronic
                    newsletter to its users. We gather the e-mail addresses of
                    users who voluntarily subscribe. Users may remove themselves
                    from this mailing list by using the link provided in every
                    newsletter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Privacypolicy;
