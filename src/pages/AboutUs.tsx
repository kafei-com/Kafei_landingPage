import { Navbar, Footer } from "@/components/layout";
import { ArrowRight, Users, Target, Lightbulb, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TestimonialsEditorial from "@/components/ui/TestimonialsEditorial";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 w-full z-50 h-20 bg-black-700/80 backdrop-blur-md">
        <Navbar />
      </header>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              About KAFEI
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Building the future of AI-powered solutions, one innovation at a
              time
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-400 mb-6">
                At KAFEI, we're revolutionizing the way businesses interact with
                AI technology. Our mission is to make advanced AI accessible,
                intuitive, and powerful for everyone.
              </p>
              <p className="text-lg text-gray-400">
                We believe in creating tools that empower developers,
                businesses, and innovators to build the future without
                limitations.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">
                      100+
                    </div>
                    <div className="text-sm text-gray-400">
                      Projects Delivered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">
                      50K+
                    </div>
                    <div className="text-sm text-gray-400">API Calls Daily</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-400 mb-2">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-400 mb-2">
                      24/7
                    </div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <h2 className="text-5xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Innovation",
                description:
                  "Pushing boundaries and exploring new possibilities in AI technology",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Collaboration",
                description:
                  "Building together with our community and partners",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Excellence",
                description:
                  "Delivering quality and reliability in everything we create",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Passion",
                description:
                  "Driven by our love for technology and making an impact",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6">Our Founders</h2>
            {/* <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              jhdjhdjjh
            </p> */}
          </div>

          {/* <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 border border-white/10 rounded-3xl p-16 text-center">
            <p className="text-2xl text-gray-300 mb-8">
              We're a distributed team of developers, designers, and AI
              enthusiasts working remotely across the globe.
            </p>
            <p className="text-lg text-gray-400">
              Interested in joining us? We're always looking for talented
              people.
            </p>
            <button
              onClick={() => navigate("/wishlist")}
              className="mt-8 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </button>
          </div> */}
          <div className="w-full">
            <TestimonialsEditorial />
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-16 text-center">
              <h2 className="text-5xl font-bold mb-6">
                Ready to Start Building?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of developers already using KAFEI to power their
                AI applications
              </p>
              <button
                onClick={() => navigate("/wishlist")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
