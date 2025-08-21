import { Button, Col, Divider, Drawer, Input, Row, Space } from "antd";
import React from "react";
import "./style.css";

const AllLocation = ({
  isAllLocationModalOpen,
  setIsAllLocationModalOpen,
  allLoc,
  setSelectLoc,
  filterData,
  setFilterData,
  currentLocationFetch,
  fetchLocationToggle,
}) => {
  const selectLocFun = (data) => {
    setSelectLoc(data);
    localStorage.setItem("location", data);
    setIsAllLocationModalOpen(false);
  };

  const styleDiv = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #f5f5f5",
    borderRadius: "4px",
    background: "#f5f5f5",
  };

  const handlerFilter = (event) => {
    const inputValue = event.target.value;
    setSelectLoc(inputValue);
    filterDataFun(inputValue);
  };

  const filterDataFun = (inputValue) => {
    const filtered = allLoc.filter((item) =>
      item.city_name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilterData(filtered);
  };

  return (
    <Drawer
      //title="Basic Drawer"
      onClose={() => setIsAllLocationModalOpen(false)}
      open={isAllLocationModalOpen}
      style={{}}
      className="drawerWidth"
      // maskClosable={false}
      extra={
        <Space>
          <Button
            className="fetchcurtButoon"
            type="primary"
            onClick={currentLocationFetch}
            loading={fetchLocationToggle ? true : false}
          >
            Fetch Current Location
          </Button>
        </Space>
      }
    >
      <Row gutter={10}>
        <Col span={24}>
          <b>All Cities</b>
        </Col>
        <Col span={24}>
          <Input
            placeholder="Location search....."
            onChange={handlerFilter}
            style={{ padding: "10px 10px", margin: "10px 0px" }}
          />
        </Col>
        {/* <Divider /> */}

        {filterData?.map((val, i) => (
          <Col span={8} key={i} onClick={() => selectLocFun(val.city_name)}>
            <div
              className="logos"
              style={{
                ...styleDiv,
                padding: "10px",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "5px",
              }}
            >
              <img src={val.image_url} className="slidewidth" />
              <p className="allcitiesfont">{val.city_name}</p>
            </div>
          </Col>
        ))}
      </Row>
      {/* {allLoc?.map((val) => (
        <li onClick={() => selectLoction(val.city_name)}>{val.city_name}</li>
      ))}
    */}
      {/* <Button onClick={() => setIsAllLocationModalOpen(false)}>Close</Button>  */}
    </Drawer>
  );
};

export default AllLocation;
