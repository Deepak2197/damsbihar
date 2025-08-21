import { Button, Col, Divider, Modal, Row } from "antd";
import React from "react";

const Location = ({
  setIsLocationModalOpen,
  isLocationModalOpen,
  setIsAllLocationModalOpen,
  popularCity,
  setSelectLoc,
  //   isAllLocationModalOpen,
}) => {
  const colStyle = {};
  const styles = {
    background: "#f5f5f5",
    padding: "8px 0",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "1px solid #f5f5f5",
  };

  const open = () => {
    setIsAllLocationModalOpen(true);
    setIsLocationModalOpen(false);
  };

  const locationFun = (data) => {
    setSelectLoc(data);
    localStorage.setItem("location", data);
    setIsLocationModalOpen(false);
  };
  return (
    <Modal
      className="locateModalSet"
      title="Choose From Popular Cities Location"
      open={isLocationModalOpen}
      onCancel={() => setIsLocationModalOpen(false)}
      okText="Close Location"
      footer={null}
      maskClosable={false}
    >
      <Row gutter={10}>
        {popularCity?.map((val) => (
          <Col
            className="gutter-row"
            span={8}
            style={colStyle}
            key={val.id}
            onClick={() => locationFun(val.city_name)}
          >
            <div
              style={{ ...styles, flexDirection: "column", marginTop: "10px" }}
            >
              <img className="loactionImg" src={val.image_url} style={{}} />
              <p className="citiesfonttextP">{val.city_name}</p>
            </div>
          </Col>
        ))}

        <Divider />
        <Col span={24}>
          <Button className="locationbtn" style={{}} onClick={open}>
            All Locations
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default Location;
