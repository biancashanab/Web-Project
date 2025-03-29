import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Cat, FileText, Home } from "lucide-react"; 
import Footer from "../../components/common/footer/footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

import "./start.css";

function HomePage() {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">PET ADOPT</h1>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop/about">About</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link to="/shop/home" className="btn-orange see-pets-btn">
              See Pets
            </Link>
          </li>
        </ul>
      </nav>

      {/* Secțiunea Principală */}
      <div className="main-section">
        <div className="main-text">
          <h1 className="text-4xl font-bold">Find your fur-ever friend!</h1>
          <p className="text-gray-600 mt-3">
            Help the animals find a loving and warm home! Choose your perfect companion and give it a better life.
          </p>
          <Button asChild className="btn-adopt">
            <Link to="/auth">Adopt Now →</Link>
          </Button>
        </div>

        <div className="image-container">
          <div className="shape-background"></div>
          <img src="/img/start.svg" alt="Adoptă un animal" className="main-image" />
        </div>
      </div>

      {/* Secțiunea How It Works */}
      <section className="bg-gray-100 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-gray-600 mt-2 max-w-lg mx-auto">
            Our process is very simple! Follow this steps to adopt a new pet.
          </p>
        </div>

        <div className="flex justify-center gap-6 flex-wrap">
          {/* Card 1 */}
          <Card className="w-80 text-center">
            <CardHeader>
              <Cat size={40} color="orange" className="mx-auto" />
              <CardTitle className="text-lg mt-4">Choose an animal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Explore our galery and find the pet that steals your heart!
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="w-80 text-center">
            <CardHeader>
              <FileText color="orange" className="mx-auto w-10 h-10" />
              <CardTitle className="text-lg mt-4">Complete the form</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Complete the form to help us learn something about you.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="w-80 text-center">
            <CardHeader>
              <Home color="orange" className="mx-auto w-10 h-10" />
              <CardTitle className="text-lg mt-4">Receive approval</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our team will check your application and you will be able to adopt!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
     
    </div>
  );
}

export default HomePage;
