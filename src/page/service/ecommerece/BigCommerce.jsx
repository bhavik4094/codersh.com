import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FadeInStagger from "../../../components/animation/FadeInStagger";
import FadeInLeft from "../../../components/animation/FadeInLeft";
import FadeInRight from "../../../components/animation/FadeInRight";
import FadeInUp from "../../../components/animation/FadeInUp";
import ServiceCard from "../../../components/home-four/services/ServiceCard";
import BlogCard from "../../../components/home-six/blogs/BlogCard";
import BreadCrumb from "../../../components/common/Breadcrumb";
import Clutch from "../../../assets/images/images2/clutch.svg";
import StarImg from "../../../assets/images/images2/star.webp";

import Thumb1Img from "../../../assets/images/images2/Bigcommerce-image-1.webp";

import ProcessImg1 from "../../../assets/images/images2/reauirement-gathering.webp";
import ProcessImg2 from "../../../assets/images/images2/uiux.webp";
import ProcessImg3 from "../../../assets/images/images2/prototype.webp";
import ProcessImg4 from "../../../assets/images/images2/dynamic-development.webp";
import ProcessImg5 from "../../../assets/images/images2/testing.webp";
import ProcessImg6 from "../../../assets/images/images2/live-development.webp";
import ProcessImg7 from "../../../assets/images/images2/question.webp";

import Workcard1 from "../../../assets/images/ourwork/New-Project-1-1024x1024.webp";
import Workcard2 from "../../../assets/images/ourwork/New-Project-3-1024x1024.webp";
import Workcard3 from "../../../assets/images/ourwork/New-Project-1024x1024.webp";

import wooLogo from "../../../assets/images/images2/woo-logo.webp";

const blogsData = [
  {
    id: crypto.randomUUID(),
    title: "Online Book Store",
    content: "Shift4shop | React | Styled Components",
    img: Workcard1,
  },
  {
    id: crypto.randomUUID(),
    title: "Texas Fowlers",
    content: "Shift4shop | Bootstrap | JavaScript",
    img: Workcard2,
  },
  {
    id: crypto.randomUUID(),
    title: "Redesign Hub",
    content: "Wordpress | Elementor Pro | Calendly",
    img: Workcard3,
  },
];

function BigCommerce() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://codersh.com/wp-json/wp/v2/service?_embed")
      .then((res) => res.json())
      .then(async (data) => {
        const updatedData = await Promise.all(
          data.map(async (service) => {
            if (!service.acf) {
              console.warn("Missing ACF for service ID:", service.id);
              return null; // Skip services without ACF
            }

            const updatedRepeater = await Promise.all(
              (service.acf.offer_type_repeater || []).map(async (item) => {
                let imageUrl = item.service_type_imgs;
                if (typeof imageUrl === "number") {
                  try {
                    const res = await fetch(
                      `https://codersh.com/wp-json/wp/v2/media/${imageUrl}`
                    );
                    const media = await res.json();
                    imageUrl = media?.source_url || "/images/default-icon.webp";
                  } catch {
                    imageUrl = "/images/default-icon.webp";
                  }
                }
                return {
                  ...item,
                  service_type_imgs: imageUrl,
                };
              })
            );

            const updatedFollowRepeater = await Promise.all(
              (service.acf.follow_type_repeater || []).map(async (item) => {
                let imageUrl = item.follow_img;
                if (typeof imageUrl === "number") {
                  try {
                    const res = await fetch(
                      `https://codersh.com/wp-json/wp/v2/media/${imageUrl}`
                    );
                    const media = await res.json();
                    imageUrl = media?.source_url || "/images/default-icon.webp";
                  } catch {
                    imageUrl = "/images/default-icon.webp";
                  }
                }
                return {
                  ...item,
                  iconImg: imageUrl,
                };
              })
            );

            let detailsImageUrl = Thumb1Img;
            if (typeof service.acf.details_img === "number") {
              try {
                const res = await fetch(
                  `https://codersh.com/wp-json/wp/v2/media/${service.acf.details_img}`
                );
                const media = await res.json();
                detailsImageUrl = media?.source_url || Thumb1Img;
              } catch {
                detailsImageUrl = Thumb1Img;
              }
            }

            return {
              ...service,
              acf: {
                ...service.acf,
                offer_type_repeater: updatedRepeater,
                follow_type_repeater: updatedFollowRepeater,
                details_img_url: detailsImageUrl,
              },
            };
          })
        );

        setServices(updatedData.filter(Boolean)); // remove null entries
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading services...</p>;

  return (
    <div>
      <BreadCrumb
        title="Big Commerce Development"
        type="service"
        serviceContent={bigCommerceBreadcrumbContent}
      />

      <div className="top-rated">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <Link
                to="/contact-us"
                className="clutch-widget d-flex mb-4 mb-lg-0"
              >
                <span className="me-2">
                  <p className="mb-0">Reviewed On</p>
                  <img src={Clutch} alt="Clutch" width={82} />
                </span>
                <span className="d-flex flex-column justify-content-between">
                  <img src={StarImg} alt="Rating" width={90} />
                  <p className="review-amount mb-0">16 Reviews</p>
                </span>
              </Link>
            </div>
            <div className="col-lg-9 d-flex align-items-center">
              <p className="top-rated-text ms-lg-4">
                Top Rated 5.0 out of 5.0 for Codersh by 120+ clients on more
                than 1200+ projects. <Link to="/ourwork2">View Work</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section aximo-section-padding3 position-relative">
        <div className="container">
          <div className="mb-5 text-center">
            <div className="row">
              <div className="col">
                {services.map((service) => (
                  <div key={service.id} className="service-item mb-4">
                    <h3 style={{ fontSize: "2.5rem" }} className="mb-3">
                      {service.acf?.["offer-section-title"]}
                    </h3>
                    <p>{service.acf?.["offer-section-description"]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            {services.map((service) =>
              service.acf?.offer_type_repeater?.map((offer, index) => (
                <FadeInStagger
                  key={`${service.id}-${index}`}
                  index={index}
                  className="col-xl-4 col-md-6 col-lg-6"
                >
                  <ServiceCard
                    service={{
                      title: offer.service_type_title,
                      iconImg:
                        offer.service_type_imgs || "/images/default-icon.webp",
                    }}
                  />
                </FadeInStagger>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="row pb-5">
            <div className="col-lg-6">
              <img src={services[0]?.acf?.details_img_url} alt="Details" />
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="aximo-default-content2 libre-font m-left-gap-small">
                {services.length > 0 && (
                  <>
                    <h3 className="mb-4">{services[0]?.acf?.details_title}</h3>
                    <p className="fs-18 mb-4">
                      {services[0]?.acf?.details_description}
                    </p>
                  </>
                )}
                <ul className="mb-4">
                  {services[0]?.acf?.details_key_repeater_?.map(
                    (item, index) => (
                      <li key={index}>
                        <i
                          className="fa-solid fa-check"
                          style={{ color: "#000000", marginRight: "20px" }}
                        />
                        {item.key_title}
                      </li>
                    )
                  )}
                </ul>
                {services[0]?.acf?.details_button_url &&
                  services[0]?.acf?.details_button_title && (
                    <FadeInUp className="aximo-btn-wrap2">
                      <Link
                        to={services[0].acf.details_button_url}
                        className="iwt-button"
                      >
                        {services[0].acf.details_button_title}
                      </Link>
                    </FadeInUp>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section aximo-section-padding3">
        <div className="container">
          <div className="aximo-section-title">
            <div className="row text-center">
              <div className="col">
                {services.map((service) => (
                  <div key={service.id} className="service-item mb-4">
                    <h3 style={{ fontSize: "2.5rem" }} className="mb-3">
                      {service.acf?.follow_title}
                    </h3>
                    <p className="follow-sub">{service.acf?.follow_subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            {services.map((service) =>
              service.acf?.follow_type_repeater?.map((offer, index) => (
                <FadeInStagger
                  key={`${service.id}-${index}`}
                  index={index}
                  className="col-xl-4 col-md-6 col-lg-6"
                >
                  <ServiceCard
                    service={{
                      title: offer.follow_title,
                      iconImg: offer.iconImg || "/images/default-icon.webp",
                    }}
                  />
                </FadeInStagger>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="section aximo-section-padding32">
        <div className="container">
          <div className="aximo-section-title playfair">
            <div className="row">
              <div className="col text-center">
                <h3 style={{ fontSize: "2.5rem" }}>Our Recent Work</h3>
                <p>
                  Our portfolio speaks loudly that we are giving best solutions
                  for every ideas.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {blogsData.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigCommerce;
