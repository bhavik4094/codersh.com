import { useState, useEffect } from "react";

const BRAND_API_URL =
  "https://codersh.com/wp-json/wp/v2/service?_embed&per_page=20";

function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const decodeHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent;
  };

  useEffect(() => {
    fetch(BRAND_API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Format data to match the existing layout style
        const formattedServices = data.map((service) => ({
          id: service.id,
          title: decodeHTML(service.title.rendered),
          img:
            service._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/placeholder.webp",
          link: `/service/${service.slug}`,
        }));
        setServices(formattedServices);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching brands:", error);
        setLoading(false);
      });
  }, []);
  return { services, loading, setLoading };
}

export default Service;
