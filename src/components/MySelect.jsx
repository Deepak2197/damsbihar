import { Select, Spin } from "antd";
import React from "react";

const { Option } = Select;

const MySelect = ({
  title,
  fetching,
  onChangeHandler,
  searchHandler,
  abroad,
  type,
  yearArr,
  value,
}) => {
  return (
    <>
      {type === "1" ? (
        <div className="form-group position-relative">
          <label htmlFor="name">{title}</label>
          <Select
            size="large"
            allowClear={true}
            style={{ width: "100%" }}
            showSearch
            value={value}
            placeholder="Search..."
            onSearch={searchHandler}
            onChange={onChangeHandler}
            notFoundContent={
              fetching ? <Spin size="small" /> : "No results found"
            }
            filterOption={false}
          >
            {abroad?.map((option) => (
              <Option key={option.value} value={option.value==undefined ? option.value="other": option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
      ) : (
        <div className="form-group position-relative">
          <label htmlFor="name">{title}</label>
          <Select
            defaultValue="Select Year"
            size="large"
            options={yearArr}
            style={{ width: "100%" }}
            onChange={onChangeHandler} // Set selected year
          />
        </div>
      )}
    </>
  );
};

export default MySelect;
