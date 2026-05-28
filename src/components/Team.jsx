import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { t } from "../translations";

function Team() {
  const { language } = useLanguage();
  const teamImage = "https://content-studio.biela.dev/cover/800x800/i/content-studio/67c6337c7c900857a79bea56/1746270919900-67c6337c7c900857a79bea56/1774378624622-64275794.jpeg/kilson-team-photo-800x800.webp";

  return (
    <section id="home_team" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 text-gray-900 mb-4">{t(language, "team.title")}</h2>
          <p className="text-lg font-extralight text-gray-600">
            {t(language, "team.subtitle")}
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="card text-center">
            <img
              src={teamImage}
              alt={t(language, "team.name")}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {t(language, "team.name")}
            </h3>
            <p className="text-lg font-extralight text-primary-600 mb-4">
              {t(language, "team.role")}
            </p>
            <p className="text-lg font-extralight text-gray-600">
              {t(language, "team.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
