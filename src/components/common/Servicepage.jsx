import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/common/Breadcrumb";
import ServiceCard from "../../components/home-four/services/ServiceCard";
import BlogCard from "../../components/home-six/blogs/BlogCard";
import FadeInStagger from "../../components/animation/FadeInStagger";
import FadeInUp from "../../components/animation/FadeInUp";
import Clutch from "../../assets/images/images2/clutch.svg";
import StarImg from "../../assets/images/images2/star.webp";

function ServicePage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commonSection, setCommonSection] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isMounted = true;

    const mapImage = async (id) => {
      if (typeof id !== "number") return id;
      try {
        const res = await fetch(
          `https://codersh.com/wp-json/wp/v2/media/${id}`,
          { signal }
        );
        const media = await res.json();
        return media?.source_url || "/images/default-icon.webp";
      } catch {
        return "/images/default-icon.webp";
      }
    };

    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://codersh.com/wp-json/wp/v2/service?slug=${slug}&_embed`,
          { signal }
        );
        const json = await res.json();

        if (!Array.isArray(json) || json.length === 0) {
          if (isMounted) {
            setService(null);
            setLoading(false);
          }
          return;
        }

        const data = json[0];
        if (!data?.acf) {
          if (isMounted) {
            setService(null);
            setLoading(false);
          }
          return;
        }

        const initialService = {
          ...data,
          content: data.content?.rendered || "",
          acf: {
            ...data.acf,
            offer_type_repeater: [],
            follow_type_repeater: [],
            recent_card_repeater: [],
            service_head_logo: null,
            details_img_url: null,
            details_img_url_two: null,
          },
        };

        if (isMounted) setService(initialService);

        const [logo, offer, follow, recent, img1, img2] = await Promise.all([
          mapImage(data.acf.service_head_logo),
          Promise.all(
            (data.acf.offer_type_repeater || []).map(async (item) => ({
              ...item,
              service_type_imgs: await mapImage(item.service_type_imgs),
            }))
          ),
          Promise.all(
            (data.acf.follow_type_repeater || []).map(async (item) => ({
              ...item,
              iconImg: await mapImage(item.follow_img),
            }))
          ),
          Promise.all(
            (data.acf.recent_card_repeater || []).map(async (item) => ({
              ...item,
              recent_card_img: await mapImage(item.recent_card_img),
            }))
          ),
          mapImage(data.acf.details_img),
          mapImage(data.acf.details_img_two),
        ]);

        if (isMounted) {
          setService((prev) => ({
            ...prev,
            acf: {
              ...prev.acf,
              service_head_logo: logo,
              offer_type_repeater: offer,
              follow_type_repeater: follow,
              recent_card_repeater: recent,
              details_img_url: img1,
              details_img_url_two: img2,
            },
          }));
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching service data:", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchCommonSection = async () => {
      try {
        const res = await fetch(
          `https://codersh.com/wp-json/acf/v3/options/services_common`,
          { signal }
        );
        const data = await res.json();
        const acf = data.acf;

        const [follow, recent] = await Promise.all([
          Promise.all(
            (acf.follow_type_repeater || []).map(async (item) => ({
              ...item,
              iconImg: await mapImage(item.follow_img),
            }))
          ),
          Promise.all(
            (acf.recent_card_repeater || []).map(async (item) => ({
              ...item,
              recent_card_img: await mapImage(item.recent_card_img),
            }))
          ),
        ]);

        if (isMounted) {
          setCommonSection({
            ...data,
            acf: {
              ...acf,
              follow_type_repeater: follow,
              recent_card_repeater: recent,
            },
          });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching common section:", error);
        }
      }
    };

    fetchServiceData();
    fetchCommonSection();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!service) return <p>Service not found.</p>;

  const { acf } = service;

  return (
    <div>
      <BreadCrumb
        title={service.title.rendered}
        type="service"
        slug={slug}
        serviceContent={{
          logo: acf.service_head_logo,
          heading: service.title.rendered,
          description: service.content,
        }}
      />

      {/* Clutch Section */}
      <div className="top-rated">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="clutch-widget d-flex mb-4 mb-lg-0">
                <span className="me-2">
                  <p className="mb-0">Reviewed On</p>
                  <img src={Clutch} alt="Clutch" width={82} loading="lazy" />
                </span>
                <span className="d-flex flex-column justify-content-between">
                  <img src={StarImg} alt="Rating" width={90} loading="lazy" />
                  <p className="review-amount mb-0">16 Reviews</p>
                </span>
              </div>
            </div>
            <div className="col-lg-9 d-flex align-items-center">
              <p className="top-rated-text ms-lg-4">
                Top Rated 5.0 out of 5.0 by 120+ clients on 1200+ projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Section */}
      <div className="section aximo-section-padding3 position-relative">
        <div className="container">
          <div className="mb-5 text-center">
            <h3 className="mb-3">{acf.offer_section_title}</h3>
            <p>{acf.offer_section_description}</p>
          </div>
          <div className="row">
            {acf.offer_type_repeater.map((item, index) => (
              <FadeInStagger
                key={index}
                index={index}
                className="col-xl-4 col-md-6 col-lg-6"
              >
                <ServiceCard
                  service={{
                    title: item.service_type_title,
                    iconImg: item.service_type_imgs,
                    description: item.service_type_description,
                  }}
                />
              </FadeInStagger>
            ))}
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="section">
        <div className="">
          <div className="row p-lg-0 pb-5">
            <div className="col-lg-6 p-lg-0">
              <img src={acf.details_img_url} alt="Details" loading="lazy" />
            </div>
            <div className="col-lg-6 px-5 d-flex align-items-center">
              <div className="aximo-default-content2 mb-lg-3 ps-lg-4 libre-font m-left-gap-small">
                <h3 className="mb-4">{acf.details_title}</h3>
                <p className="fs-18 mb-4">{acf.details_description}</p>
                <ul className="mb-4">
                  {acf.details_key_repeater?.map((item, index) => (
                    <li key={index}>
                      <i
                        className="fa-solid fa-check"
                        style={{ marginRight: "20px" }}
                      />
                      {item.key_title}
                    </li>
                  ))}
                </ul>
                {acf.details_button_url && acf.details_button_title && (
                  <FadeInUp className="aximo-btn-wrap2">
                    <a href={acf.details_button_url} className="iwt-button">
                      {acf.details_button_title}
                    </a>
                  </FadeInUp>
                )}
              </div>
            </div>
          </div>

          <div className="row p-lg-0 pb-5">
            <div className="order-2 px-5 order-lg-1  col-lg-6 d-flex align-items-center">
              <div className="aximo-default-content2 pe-lg-4 libre-font m-left-gap-small">
                <h3 className="mb-4">{acf.details_title_two}</h3>
                <p className="fs-18 mb-4">{acf.details_description_two}</p>
                <ul className="mb-4">
                  {acf.details_key_repeater_two?.map((item, index) => (
                    <li key={index}>
                      <i
                        className="fa-solid fa-check"
                        style={{ marginRight: "20px" }}
                      />
                      {item.key_title_two}
                    </li>
                  ))}
                </ul>
                {acf.details_button_url_two && acf.details_button_title_two && (
                  <FadeInUp className="aximo-btn-wrap2">
                    <a href={acf.details_button_url_two} className="iwt-button">
                      {acf.details_button_title_two}
                    </a>
                  </FadeInUp>
                )}
              </div>
            </div>
            <div className="col-lg-6 p-lg-0 order-1 order-lg-2">
              <img src={acf.details_img_url_two} alt="Details" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      {commonSection && (
        <div className="section aximo-section-padding3">
          <div className="container">
            <div className="text-center mb-5">
              <h3 className="mb-3">{commonSection.acf.follow_title}</h3>
              <p>{commonSection.acf.follow_subtitle}</p>
            </div>
            <div className="row">
              {commonSection.acf.follow_type_repeater?.map((item, index) => (
                <FadeInStagger
                  key={index}
                  index={index}
                  className="col-xl-4 col-md-6 col-lg-6"
                >
                  <ServiceCard
                    service={{
                      title: item.follow_title,
                      iconImg: item.iconImg,
                    }}
                  />
                </FadeInStagger>
              ))}
            </div>
          </div>
        </div>
      )}

      {/*  Portfolio Sections */}
      {commonSection && (
        <div className="section aximo-section-padding32">
          <div className="container">
            <div className="text-center mb-5">
              <h3 className="mb-3">{commonSection.acf.recent_work_title}</h3>
              <p>{commonSection.acf.recent_work_description}</p>
            </div>
            <div className="row">
              {commonSection.acf.recent_card_repeater
                ?.slice(0, 3)
                .map((item, index) => (
                  <BlogCard
                    key={index}
                    blog={{
                      title: item.recent_card_title,
                      content: item.recent_card_content,
                      img: item.recent_card_img,
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicePage;
