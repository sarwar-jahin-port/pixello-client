import founder from "../assets/profile.jpg"
const AboutUs = () => {
  const visionCards = [
    {
      icon: (
        <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Professional Networking",
      description: "Connect with like-minded professionals across industries and build meaningful relationships that drive success."
    },
    {
      icon: (
        <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      ),
      title: "Deal Making",
      description: "Transform connections into opportunities. Our platform facilitates seamless deal-making and collaboration."
    },
    {
      icon: (
        <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Business Growth",
      description: "Accelerate your professional journey with tools designed to help you expand your network and close deals."
    },
    {
      icon: (
        <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      title: "Success-Driven",
      description: "Every feature is built with one goal in mind: helping professionals achieve their business objectives."
    }
  ];

  return (
    <div className="bg-white">
      <style jsx>{`
        .text-primary {
          color: #202157;
        }
        .bg-primary {
          background-color: #202157;
        }
        .border-primary {
          border-color: #202157;
        }
        .text-main {
          color: #212121;
        }
        .hero-gradient {
          background: linear-gradient(135deg, #202157 0%, #2a2a6e 100%);
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(32, 33, 87, 0.15);
        }
        .founder-card {
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        }
        .icon-bg {
          background: linear-gradient(135deg, rgba(32, 33, 87, 0.1) 0%, rgba(32, 33, 87, 0.05) 100%);
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Pixello</h1>
          <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto opacity-90 leading-relaxed">
            Where Professional Connections Transform Into Business Success
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Our Vision</h2>
            <p className="text-lg md:text-xl text-main max-w-5xl mx-auto leading-relaxed">
              To create the world's most powerful platform where professionals don't just connect—they collaborate, 
              innovate, and close deals that shape the future of business. We believe that the right connections 
              at the right time can transform careers, companies, and entire industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {visionCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 card-hover border border-gray-100">
                <div className="icon-bg w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4 text-center">{card.title}</h3>
                <p className="text-main text-center text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-primary h-1"></div>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Meet the Founder</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="founder-card rounded-2xl shadow-2xl overflow-hidden p-8 md:p-12">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                <div className="md:col-span-2 text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full border-4 border-primary shadow-xl overflow-hidden">
                    <img 
                      src={founder} 
                      alt="Founder" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">Your Name</h3>
                  <p className="text-main text-lg font-medium opacity-80">Founder & CEO</p>
                </div>

                <div className="md:col-span-3">
                  <h4 className="text-xl font-semibold text-primary mb-4">
                    Building the Future of Professional Networking
                  </h4>
                  <p className="text-main text-lg leading-relaxed mb-6">
                    As an entrepreneur passionate about the power of human connections, I founded Pixello with a 
                    simple yet ambitious mission: to revolutionize how professionals network and conduct business 
                    in the digital age.
                  </p>
                  <p className="text-main text-lg leading-relaxed mb-6">
                    Having witnessed firsthand how the right connections can transform careers and businesses, 
                    I envisioned a platform that goes beyond traditional networking. Pixello is designed to be 
                    the bridge between meeting the right people and closing the right deals.
                  </p>
                  <blockquote className="text-main text-lg italic font-medium border-l-4 border-primary pl-6">
                    "Success in business isn't just about what you know—it's about who you know and how 
                    effectively you can turn those relationships into opportunities."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Transform Your Network?</h2>
          <p className="text-lg md:text-xl opacity-90 font-light max-w-3xl mx-auto">
            Join thousands of professionals who are already making meaningful connections and closing deals on Pixello.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;