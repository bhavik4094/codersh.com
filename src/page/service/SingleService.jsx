import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useServices from "../../hooks/useServices";

const SINGLE_BRAND_API_URL =
  "https://codersh.com/wp-json/wp/v2/service?_embed&slug=";
const MEDIA_API_URL = "https://codersh.com/wp-json/wp/v2/media/";

function SingleService() {
  const { services, loading } = useServices();
  const { slug } = useParams();
  const [service, setService] = useState(null);

  const processImageFields = async (serviceData) => {
    if (!serviceData || !serviceData.acf) return serviceData;
    const processedAcf = { ...serviceData.acf };
    const imageFields = ["main-image", "image2", "image3", "image4", "image5"];
  };

  return <div>SingleService</div>;
}

export default SingleService;
