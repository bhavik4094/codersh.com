import { Link, useLocation } from "react-router-dom";

function Mega_Menu2() {
  const location = useLocation();

  const isActive = (slug) =>
    location.pathname === `/services/${slug}` ? "active-link" : "";

  return (
    <div className="mega-menu2">
      <div className="row m-3 ">
        {/* Ecommerce Development */}
        <div className="col-3 ">
          <p className="mega-menu-title">Ecommerce Development</p>
          <ul>
            <li className="mega-menu-item">
              <Link
                to="/services/woo-commerce-development"
                className={isActive("woo-commerce-development")}
              >
                <span className="menu-item-text">WooCommerce Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/shift4shop-development"
                className={isActive("shift4shop-development")}
              >
                <span className="menu-item-text">Shift4Shop Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/prestashop-development"
                className={isActive("prestashop-development")}
              >
                <span className="menu-item-text">PrestaShop Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/bigcommerce-development"
                className={isActive("bigcommerce-development")}
              >
                <span className="menu-item-text">BigCommerce Development</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Web Development */}
        <div className="col-3 ">
          <p className="mega-menu-title">Web Development</p>
          <ul>
            <li className="mega-menu-item">
              <Link
                to="/services/wordpress-development"
                className={isActive("wordpress-development")}
              >
                <span className="menu-item-text">WordPress Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/php-development"
                className={isActive("php-development")}
              >
                <span className="menu-item-text">PHP Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/laravel-development"
                className={isActive("laravel-development")}
              >
                <span className="menu-item-text">Laravel Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/reactjs-development"
                className={isActive("reactjs-development")}
              >
                <span className="menu-item-text">ReactJs Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/angular-js-development"
                className={isActive("angular-js-development")}
              >
                <span className="menu-item-text">Angular Js Development</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile App Development */}
        <div className="col-3 ">
          <p className="mega-menu-title">Mobile App Development</p>
          <ul>
            <li className="mega-menu-item">
              <Link
                to="/services/android-app-development"
                className={isActive("android-app-development")}
              >
                <span className="menu-item-text">Android App Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/ios-app-development"
                className={isActive("ios-app-development")}
              >
                <span className="menu-item-text">IOS App Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/hybrid-app-development"
                className={isActive("hybrid-app-development")}
              >
                <span className="menu-item-text">Hybrid App Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/flutter-development"
                className={isActive("flutter-development")}
              >
                <span className="menu-item-text">Flutter Development</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/react-native-development"
                className={isActive("react-native-development")}
              >
                <span className="menu-item-text">React Native Development</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* UI/UX Design */}
        <div className="col-3 ">
          <p className="mega-menu-title">UIUX Design</p>
          <ul>
            <li className="mega-menu-item">
              <Link
                to="/services/wireframe-design"
                className={isActive("wireframe-design")}
              >
                <span className="menu-item-text">Wireframe Design</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/website-redesign-service"
                className={isActive("website-redesign-service")}
              >
                <span className="menu-item-text">Website Redesign Service</span>
              </Link>
            </li>
            <li className="mega-menu-item">
              <Link
                to="/services/mobile-app-design"
                className={isActive("mobile-app-design")}
              >
                <span className="menu-item-text">Mobile App Design</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Mega_Menu2;
