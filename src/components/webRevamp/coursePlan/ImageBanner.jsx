import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const ImageBanner = ({ banData }) => {
  const slideStyle = { textAlign: "center" };
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      style={{
        slideStyle,
        width: "100%",
        borderRadius: "12px",
        marginTop: "10px",
      }}
    >
      {banData
        ?.filter((banner) => banner.web_image_link?.trim() !== "")
        .map((banner, index) => (
          <SwiperSlide key={index} style={{ height: "370px" }}>
            <Link to={banner.web_link}>
              <img
                src={banner.web_image_link}
                alt={banner.text}
                style={{
                  width: "100%",
                  height: "100%",
                  userSelect: "none",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/600x300?text=Image+Not+Found";
                }}
              />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ImageBanner;
