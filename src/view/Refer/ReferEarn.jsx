import React, { useEffect, useState } from "react";
import axiosInstance from "../../API/axiosConfig";
import { Input, Form, Button, Select, Collapse, Spin, message } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Refer/style.css";

const { Option } = Select;

const ReferEarn = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("id");
  const [allDataGet, setAllDataGet] = useState({});
  const [catList, setCatList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [course, setCourse] = useState("");
  const [dynamicLink, setDynamicLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const createDynamicLink = async () => {
    const selectedCourse = catList.find((itm) => itm.id === course);
    if (!selectedCourse) return;

    const { availability_course, plan_type, category, category_id, id } =
      selectedCourse;

    // Create the long URL with properly encoded parameters
    const baseUrl = "http://emedicoz.com/";
    const params = new URLSearchParams();
    params.append("refer_id", id);
    params.append("referralType", "1");
    params.append("plan_type", plan_type);
    params.append("category", encodeURIComponent(category));
    params.append("category_id", category_id);
    params.append("availability_course", availability_course);

    const longDynamicLink = `${baseUrl}?${params.toString()}`;
    const domainUriPrefix = "https://wn2d8.app.goo.gl";
    const apiKey = "AIzaSyBhFb-c_iSjCZQgjtNu6XvIxhdkTxF-kDU";

    const requestPayload = {
      dynamicLinkInfo: {
        domainUriPrefix,
        link: longDynamicLink,
        androidInfo: {
          androidPackageName: "com.emedicoz.app", // Update with your actual package name   com.emedicoz.app
          androidFallbackLink: longDynamicLink,
        },
        iosInfo: {
          iosBundleId: "com.damsdelhi", // Update with your actual bundle ID
          iosFallbackLink: longDynamicLink,
        },
        navigationInfo: {
          enableForcedRedirect: true,
        },
      },
      suffix: {
        option: "SHORT",
      },
    };

    try {
      const response = await fetch(
        `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to create dynamic link"
        );
      }

      const data = await response.json();
      setDynamicLink(data.shortLink);
      return data.shortLink;
    } catch (error) {
      console.error("Dynamic Link Error:", error);
      // Fallback to long URL if dynamic link fails
      setDynamicLink(longDynamicLink);
      toast.warning("Dynamic link creation failed. Using long URL instead.");
      return longDynamicLink;
    }
  };

  const getDetailApiCalled = async () => {
    try {
      const [res, resp] = await Promise.all([
        axiosInstance.post(
          "/v1_data_model/user/referral_earn_content/referral_earn_content_list",
          { user_id: userId }
        ),
        axiosInstance.post(
          "/v1_data_model/user/referral_earn_content/referral_earn_course_list",
          { user_id: userId }
        ),
      ]);
      setAllDataGet(res?.data?.data || {});
      setCatList(resp?.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load referral data");
    }
  };

  const onFinish = async (values) => {
    if (!course) {
      toast.error("Please select a course");
      return;
    }

    try {
      setLoading(true);

      // Create dynamic link first
      const link = await createDynamicLink();

      const selectedCourse = catList.find((itm) => itm.id === course);
      if (!selectedCourse) {
        toast.error("Selected course not found");
        return;
      }

      const { data } = await axiosInstance.post(
        "/v1_data_model/user/referral_earn_content/send_referral_earn_user_detail",
        {
          user_id: userId,
          name: values.name,
          phone: values.mobile,
          course_id: course,
          email: values.email,
          link: link,
          plan_type: selectedCourse.plan_type,
        }
      );

      if (data.status === true) {
        toast.success(data.message);
        navigate("/refer-earn-successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit referral");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (course) {
      createDynamicLink();
    }
  }, [course]);

  useEffect(() => {
    getDetailApiCalled();
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="ReferEarnBG">
      <div className="container">
        <div className="ReferEarn">
          <div className="referImg">
            {/* <img
            src={allDataGet?.referral_banner}
            width="30%"
            loading="lazy"
            alt="Referral Banner"
          /> */}
            <img
              src="/web/refer-earn/referbnr.png"
              loading="lazy"
              alt="Referral Banner"
            />
          </div>
          <div className="referText">
            {/* <h5>{allDataGet?.refer_now_title}</h5> */}
            <h5>Refer now & earn 1 month extra validity on course</h5>
            <h6>{allDataGet?.referral_link_title}</h6>
            <h3>{allDataGet?.name_title}</h3>
            <div className="formbg">
              <Form
                form={form}
                name="referral-form"
                onFinish={onFinish}
                initialValues={{ name: "", email: "", mobile: "" }}
                layout="vertical"
              >
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6">
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[
                        { required: true, message: "Please enter your name!" },
                        {
                          pattern: /^[a-zA-Z\s]+$/,
                          message: "Name must be letters only!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please enter your email!" },
                        {
                          type: "email",
                          message: "Please enter a valid email!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <Form.Item
                      name="mobile"
                      label="Mobile"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your mobile number!",
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: "Mobile number must be 10 digits!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter mobile number"
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6">
                    <Form.Item
                      name="course"
                      label="Course"
                      rules={[
                        { required: true, message: "Please select a course!" },
                      ]}
                    >
                      <Select
                        placeholder="Select a course"
                        onChange={(value) => setCourse(value)}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {catList?.map((val) => (
                          <Option value={val?.id} key={val?.id}>
                            {val?.course}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-12 col-lg-12">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        style={{ width: "100%" }}
                      >
                        {loading ? <Spin size="small" /> : "Share Referral"}
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
            {/* {dynamicLink && (
            <div className="generated-link">
              <p>Referral Link:</p>
              <a href={dynamicLink} target="_blank" rel="noopener noreferrer">
                {dynamicLink}
              </a>
            </div>
          )} */}
            <div className="howitWork">
              <h6>{allDataGet?.how_it_work_title}</h6>
              <div
                dangerouslySetInnerHTML={{
                  __html: allDataGet?.how_it_works_content,
                }}
              />
            </div>
            <div className="terms">
              <Collapse
                defaultActiveKey={["1"]}
                items={[
                  {
                    key: "1",
                    label: "Terms & Conditions",
                    children: (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: allDataGet?.terms_condition,
                        }}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;
