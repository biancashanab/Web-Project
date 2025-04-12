import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import fallbackImage from "../../assets/adopt.jpg";

function ShoppingAbout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const slideInterval = useRef(null);
  const reviewInterval = useRef(null);
  
  const petCards = [
    {
      id: 1,
      type: "Dogs",
      icon: "🐕",
      bgColor: "bg-blue-100",
      iconBgColor: "bg-blue-600",
      items: [
        "Daily exercise and play",
        "Regular veterinary check-ups",
        "Training and socialization",
        "High-quality food appropriate for age/size",
        "Lifespan: 10-15 years on average"
      ]
    },
    {
      id: 2,
      type: "Cats",
      icon: "🐈",
      bgColor: "bg-orange-100",
      iconBgColor: "bg-orange-600",
      items: [
        "Clean litter box management",
        "Scratching posts and climbing spaces",
        "Interactive play to prevent boredom",
        "Quality diet (wet and/or dry food)",
        "Lifespan: 12-18 years on average"
      ]
    },
    {
      id: 3,
      type: "Birds",
      icon: "🐦",
      bgColor: "bg-green-100",
      iconBgColor: "bg-green-600",
      items: [
        "Appropriate cage size and perches",
        "Toys for mental stimulation",
        "Species-specific diet",
        "Daily out-of-cage time",
        "Lifespan: varies widely by species"
      ]
    },
    {
      id: 4,
      type: "Reptiles",
      icon: "🦎",
      bgColor: "bg-yellow-100",
      iconBgColor: "bg-yellow-600",
      items: [
        "Proper temperature gradient enclosure",
        "UVB lighting for most species",
        "Appropriate substrate and hiding spots",
        "Species-specific diet (insects, plants)",
        "Lifespan: 10-50+ years depending on species"
      ]
    },
    {
      id: 5,
      type: "Small Mammals",
      icon: "🐹",
      bgColor: "bg-purple-100",
      iconBgColor: "bg-purple-600",
      items: [
        "Secure and spacious housing",
        "Chew toys for dental health",
        "Fresh hay, pellets, and vegetables",
        "Regular cage cleaning",
        "Lifespan: 2-8 years depending on species"
      ]
    },
    {
      id: 6,
      type: "Fish",
      icon: "🐠",
      bgColor: "bg-sky-100",
      iconBgColor: "bg-sky-600",
      items: [
        "Proper tank size and filtration",
        "Regular water testing and changes",
        "Compatible tank mates",
        "Appropriate water temperature",
        "Lifespan: 1-20+ years depending on species"
      ]
    }
  ];

  const userReviews = [
    {
      id: 1,
      name: "Maria Popescu",
      rating: 5,
      date: "May 10, 2023",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "Adopting my dog Rex through Pet Adopt was the best decision I've made. The process was smooth and the staff was incredibly helpful throughout."
    },
    {
      id: 2,
      name: "Alexandru Ionescu",
      rating: 5,
      date: "February 3, 2023",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "I found my perfect companion through Pet Adopt. Their matching process really works - they understood exactly what kind of pet would fit my lifestyle."
    },
    {
      id: 3,
      name: "Elena Dumitrescu",
      rating: 4,
      date: "March 15, 2025",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      text: "The adoption event I attended was well-organized and the volunteers were knowledgeable. My cat has been a wonderful addition to our family."
    },
    {
      id: 4,
      name: "Mihai Popa",
      rating: 5,
      date: "April 22, 2024",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      text: "I was nervous about the adoption process but Pet Adopt made it easy. They followed up several times to make sure my new pet was adjusting well."
    },
    {
      id: 5,
      name: "Ioana Cristea",
      rating: 5,
      date: "January 7, 2023",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      text: "The education resources provided were invaluable for a first-time pet owner like me. My parrot is thriving thanks to their guidance!"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === petCards.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? petCards.length - 3 : prevIndex - 1
    );
  };

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === userReviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? userReviews.length - 1 : prevIndex - 1
    );
  };

  const startSlideShow = () => {
    stopSlideShow();
    slideInterval.current = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);
  };

  const stopSlideShow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const startReviewSlideShow = () => {
    stopReviewSlideShow();
    reviewInterval.current = setInterval(() => {
      if (!isReviewPaused) {
        nextReview();
      }
    }, 6000);
  };

  const stopReviewSlideShow = () => {
    if (reviewInterval.current) {
      clearInterval(reviewInterval.current);
    }
  };

  useEffect(() => {
    startSlideShow();
    startReviewSlideShow();
    return () => {
      stopSlideShow();
      stopReviewSlideShow();
    };
  }, [isPaused, isReviewPaused]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with split design */}
      <div className="flex flex-col md:flex-row">
        <div className="bg-orange-200 w-full md:w-1/2 p-8 md:p-16 flex items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Pet Adopt</h1>
            <p className="text-xl text-white">
              A safe space and platform to help animals find loving forever homes and support responsible pet ownership.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-cover bg-center h-60 md:h-[500px]">
          <img 
            src={fallbackImage}
            alt="Pet adoption"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* About Us Section with vertical text */}
      <div className="flex flex-col md:flex-row">
        <div className="bg-yellow-200 w-full md:w-1/4 p-6 relative">
          <div className="transform -rotate-90 origin-left absolute top-1/2 left-16 md:left-24 whitespace-nowrap">
            <h2 className="text-5xl font-bold text-gray-800">About us</h2>
          </div>
        </div>
        <div className="bg-white w-full md:w-3/4 p-8 md:p-16">
          <p className="mb-4">
            Since 2010, Pet Adopt has been helping animals find the loves they need to live through mental, physical, medical challenges, and more with support and empowering them to follow their dreams.
          </p>
          <p className="mb-4">
            We help them embark on a journey of finding their true families by organizing events that educate potential owners about animal welfare. These resources and events are a mix of gift-in-kind and free. There are also signature events that happen every year such as #WoofWeek, Home Class for a Cure, and #TreatsYourself!
          </p>
          <p>
            These signature events are led by expert speakers who share tips and stories about adoption success and speak about fair animal treatment followed by hands-on games, activities, and panel conversations. And, of course, there's wine and delicious appetizers.
          </p>
        </div>
      </div>

      {/* Mission Section with color block */}
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 p-8 md:p-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="mb-4">
            Founded in 2010, Pet Adopt is dedicated to finding loving homes for abandoned, 
            neglected, and rescued animals. Our organization works tirelessly to rescue pets 
            from shelters with high euthanasia rates, abusive situations, and other 
            dangerous environments.
          </p>
          <p>
            We believe that every animal deserves a chance at a happy, healthy life with 
            a family who loves them. Through our network of volunteers, foster homes, and 
            veterinary partners, we've helped over 5,000 animals find their forever homes.
          </p>
        </div>
        <div className="bg-pink-200 w-full md:w-1/4">
          {/* Empty colored block */}
        </div>
      </div>

      {/* Blue section with text */}
      <div className="bg-rose-200 text-white p-8 md:p-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Goal</h2>
          <p className="text-lg">
            Our goal is to encourage and motivate the everyday human by giving all the tools to overcome everyday challenges and reach their true potential in having their own furry friend. By helping one another, humans can transform not only our pets but the world.
          </p>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="p-8 md:p-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What We Do</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Animal Rescue</h3>
            <p>
              We work with local shelters, animal control agencies, and individuals to rescue 
              animals in need. Each animal receives necessary veterinary care, proper nutrition, 
              and behavioral assessment before being placed for adoption.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Adoption Services</h3>
            <p>
              Our thorough adoption process ensures that each animal is matched with the right family. 
              We consider lifestyle, living situation, and experience to make successful matches.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Education</h3>
            <p>
              We educate the public about responsible pet ownership, spaying/neutering, 
              and the importance of adoption versus purchasing from breeders or pet stores.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Community Outreach</h3>
            <p>
              Through events, social media, and partnerships with local businesses, 
              we raise awareness about animal welfare issues and promote adoption.
            </p>
          </div>
        </div>
      </div>

      {/* Species Section - Carousel */}
      <div className="bg-gray-100 p-8 md:p-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Pet Care Guides</h2>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {petCards.map((pet) => (
                <div 
                  key={pet.id} 
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 p-3"
                >
                  <div className={`${pet.bgColor} rounded-lg p-6 shadow-md h-full`}>
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <span className={`${pet.iconBgColor} text-white rounded-full w-8 h-8 flex items-center justify-center mr-2`}>
                        {pet.icon}
                      </span>
                      {pet.type}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {pet.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: petCards.length - 2 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 w-2 rounded-full ${currentIndex === i ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-orange-50 p-8 md:p-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Adoption Success Stories</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="transition-opacity duration-300"
              onMouseEnter={() => setIsReviewPaused(true)}
              onMouseLeave={() => setIsReviewPaused(false)}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <img 
                    src={userReviews[currentReviewIndex].image} 
                    alt={userReviews[currentReviewIndex].name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-lg">{userReviews[currentReviewIndex].name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < userReviews[currentReviewIndex].rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">{userReviews[currentReviewIndex].date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{userReviews[currentReviewIndex].text}"</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {userReviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentReviewIndex(i)}
                className={`h-2 w-2 rounded-full ${currentReviewIndex === i ? 'bg-orange-600' : 'bg-gray-300'}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="p-8 md:p-16 text-center">
        <blockquote className="text-2xl font-light italic max-w-3xl mx-auto">
          "The greatness of a nation and its moral progress can be judged by the way its animals are treated."
          <footer className="mt-4 text-gray-600">— Mahatma Gandhi</footer>
        </blockquote>
      </div>
    </div>
  );
}

export default ShoppingAbout;