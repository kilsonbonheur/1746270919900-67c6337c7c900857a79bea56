import React from "react";

function Team() {
  const teamMember = {
    name: "Kilson Team",
    role: "Visa Processing Specialist",
    description:
      "Our dedicated team brings years of experience in UAE immigration services, ensuring your visa application is handled with expertise and care.",
    image:
      "https://content-studio.biela.dev/cover/800x800/i/content-studio/67c6337c7c900857a79bea56/1746270919900-67c6337c7c900857a79bea56/1774378624622-64275794.jpeg/kilson-team-photo-800x800.webp",
  };

  return (
    <section id="home_team" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="heading-2 text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg font-extralight text-gray-600">
            Expert visa consultants dedicated to making your Dubai journey
            seamless.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="card text-center">
            <img
              src={teamMember.image}
              alt={teamMember.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {teamMember.name}
            </h3>
            <p className="text-lg font-extralight text-primary-600 mb-4">
              {teamMember.role}
            </p>
            <p className="text-lg font-extralight text-gray-600">
              {teamMember.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
