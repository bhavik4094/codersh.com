// components/common/Breadcrumb.jsx
import { Link } from "react-router-dom";
import BreadcrumbBG from "../../assets/images/images2/tinified/angularjs_1.webp";

function BreadCrumb({ title, type, serviceContent, slug }) {
  const isServicePage = type === "service";

  return (
    <div
      className={`aximo-breadcrumb ${isServicePage ? "service-style" : ""}`}
      style={{
        backgroundImage: `url(${BreadcrumbBG})`,
      }}
    >
      <div className="container">
        {!isServicePage && <h1 className="post__title">{title}</h1>}

        {/* Dynamic service content */}
        {isServicePage && serviceContent && (
          <>
            {serviceContent.logo && (
              <img
                className="service-head-logo"
                src={serviceContent.logo}
                alt={serviceContent.title || "Service Logo"}
              />
            )}
            {serviceContent.heading && (
              <h3 className="service-head-title">{serviceContent.heading}</h3>
            )}
            {serviceContent.description && (
              <div
                className="service-head-description"
                dangerouslySetInnerHTML={{ __html: serviceContent.description }}
              />
            )}
          </>
        )}

        <nav className="breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {title === "Blog Details" && (
              <li>
                <Link to="/ourblog">Blog</Link>
              </li>
            )}
            {title === "Case Study Details" && (
              <li>
                <Link to="/case-studies">Case Studies</Link>
              </li>
            )}
            {isServicePage && (
              <li>
                <Link to="">Services</Link>
              </li>
            )}

            <li aria-current="page">
              {isServicePage
                ? slug
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                : title}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BreadCrumb;
