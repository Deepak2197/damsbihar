import React, { useState } from "react";
import { Col, Row, Modal } from "antd";

const SignAgreement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="page-content position-relative">
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href={"/"}>Home</a>
              </li>
              <li>Sign Agreement</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="signAgreement">
          <Row>
            <Col md={24}>
              {/* Sign Agreement*/}
              <div className="agreeMentPart">
                <img
                  src={`${window.IMG_BASE_URL}/emdpublic/podcast/agreement.png`}
                  alt="Sign Agreement"
                />
                <div className="btnGroup">
                  <button className="btn">
                    Author Signature
                    <span>
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/podcast/sign.png`}
                      />
                    </span>
                  </button>
                  <button className="btn">
                    DAMS Authorise Signatory
                    <span>
                      <img
                        src={`${window.IMG_BASE_URL}/emdpublic/podcast/sign.png`}
                      />
                    </span>
                  </button>
                </div>
                <button className="btn submit" onClick={showModal}>
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </section>
        <>
          <Modal
            className="receiptModal"
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={
              <div className="customModalFooter">
                <button className="btn sales">Home</button>
              </div>
            }
          >
            <img
              src={`${window.IMG_BASE_URL}/emdpublic/podcast/success.svg`}
              alt="Success"
            />

            <h4>Agreement Signed Successfully</h4>
            <p>
              You agreement has been signed Successfully, Your product available
              for sales in next few days on DAMS Platform, you can view your
              sales under My Product Sales.
            </p>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default SignAgreement;
