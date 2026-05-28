import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../translations";

function Footer() {
  const { language } = useLanguage();

  const whatsappUrl =
    "https://wa.me/971557968372?text=Hello%20Kilson%20Services%2C%20I%20need%20help%20with%20my%20Dubai%20visa%20application.";

  return (
    <footer id="app_footer" className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Kilson Visa Services</h3>
            <p className="text-lg font-extralight text-gray-300 mb-4">
              {t(language, "footer.companyDesc")}
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/kilson_service_tours?igsh=MTV6ZjJjd214d2owZQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-primary-600 p-2 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t(language, "footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-lg font-extralight text-gray-300 hover:text-white transition-colors"
                >
                  {t(language, "nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/visa-types"
                  className="text-lg font-extralight text-gray-300 hover:text-white transition-colors"
                >
                  {t(language, "nav.visaTypes")}
                </Link>
              </li>
              <li>
                <Link
                  to="/requirements"
                  className="text-lg font-extralight text-gray-300 hover:text-white transition-colors"
                >
                  {t(language, "nav.requirements")}
                </Link>
              </li>
              <li>
                <Link
                  to="/apply"
                  className="text-lg font-extralight text-gray-300 hover:text-white transition-colors"
                >
                  {t(language, "nav.applyNow")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-lg font-extralight text-gray-300 hover:text-white transition-colors"
                >
                  {t(language, "nav.contactUs")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t(language, "footer.contactInfo")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-lg font-extralight text-gray-300">
                  +971 55 796 8372
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-lg font-extralight text-gray-300">
                  info@kilsonservices.com
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-lg font-extralight text-gray-300">
                  P114 Sheikha Maryam Building, Baniyas Rd - Al Rigga - Deira -
                  Dubai
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t(language, "footer.whatsappSupport")}</h3>
            <p className="text-lg font-extralight text-gray-300 mb-4">
              {t(language, "footer.whatsappText")}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              <span className="text-lg font-extralight">{t(language, "footer.chatNow")}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg font-extralight text-gray-400">
              {new Date().getFullYear()} {t(language, "footer.allRights")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/terms"
                className="text-lg font-extralight text-gray-400 hover:text-white transition-colors"
              >
                {t(language, "footer.privacyPolicy")}
              </Link>
              <Link
                to="/terms"
                className="text-lg font-extralight text-gray-400 hover:text-white transition-colors"
              >
                {t(language, "footer.termsOfService")}
              </Link>
              <Link
                to="/terms"
                className="text-lg font-extralight text-gray-400 hover:text-white transition-colors"
              >
                {t(language, "footer.refundPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;