import About from '../../models/about.js';

export const getAboutContent = async (req, res) => {
    try 
    {
        let aboutContent = await About.findOne();
        
        if (!aboutContent) {
            // Create default content if none exists
            aboutContent = await About.create({
                mission: "Founded in 2010, Pet Adopt is dedicated to finding loving homes for abandoned, neglected, and rescued animals. Our organization works tirelessly to rescue pets from shelters with high euthanasia rates, abusive situations, and other dangerous environments.",
                goal: "Our goal is to encourage and motivate the everyday human by giving all the tools to overcome everyday challenges and reach their true potential in having their own furry friend. By helping one another, humans can transform not only our pets but the world.",
                welcome: "Welcome to Pet Adopt! At Pet Adopt, we believe every animal deserves a loving home. Our platform connects caring individuals with wonderful pets waiting for their forever families. Whether you're looking to adopt, foster, or support our cause, you're in the right place. Join us in making a difference in the lives of these amazing animals - because every pet deserves a chance at happiness.",
                aboutUs: "Since 2010, Pet Adopt has been helping animals find the loves they need to live through mental, physical, medical challenges, and more with support and empowering them to follow their dreams. We help them embark on a journey of finding their true families by organizing events that educate potential owners about animal welfare. These resources and events are a mix of gift-in-kind and free. There are also signature events that happen every year such as #WoofWeek, Home Class for a Cure, and #TreatsYourself These signature events are led by expert speakers who share tips and stories about adoption success and speak about fair animal treatment followed by hands-on games, activities, and panel conversations. And, of course, there's wine and delicious appetizers.",
                whatWeDo: [
                    {
                        title: "Animal Rescue",
                        description: "We work with local shelters, animal control agencies, and individuals to rescue animals in need. Each animal receives necessary veterinary care, proper nutrition, and behavioral assessment before being placed for adoption."
                    },
                    {
                        title: "Adoption Services",
                        description: "Our thorough adoption process ensures that each animal is matched with the right family. We consider lifestyle, living situation, and experience to make successful matches."
                    },
                    {
                        title: "Education",
                        description: "We educate the public about responsible pet ownership, spaying/neutering, and the importance of adoption versus purchasing from breeders or pet stores."
                    },
                    {
                        title: "Community Outreach",
                        description: "Through events, social media, and partnerships with local businesses, we raise awareness about animal welfare issues and promote adoption."
                    }
                ],
                petCareGuides: [
                    {
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
                ],
                userReviews: [
                    {
                        name: "Maria Popescu",
                        rating: 5,
                        date: "May 10, 2023",
                        image: "https://randomuser.me/api/portraits/women/12.jpg",
                        text: "Adopting my dog Rex through Pet Adopt was the best decision I've made. The process was smooth and the staff was incredibly helpful throughout."
                    },
                    {
                        name: "Alexandru Ionescu",
                        rating: 5,
                        date: "February 3, 2023",
                        image: "https://randomuser.me/api/portraits/men/32.jpg",
                        text: "I found my perfect companion through Pet Adopt. Their matching process really works - they understood exactly what kind of pet would fit my lifestyle."
                    },
                    {
                        name: "Elena Dumitrescu",
                        rating: 4,
                        date: "March 15, 2025",
                        image: "https://randomuser.me/api/portraits/women/45.jpg",
                        text: "The adoption event I attended was well-organized and the volunteers were knowledgeable. My cat has been a wonderful addition to our family."
                    },
                    {
                        name: "Mihai Popa",
                        rating: 5,
                        date: "April 22, 2024",
                        image: "https://randomuser.me/api/portraits/men/67.jpg",
                        text: "I was nervous about the adoption process but Pet Adopt made it easy. They followed up several times to make sure my new pet was adjusting well."
                    },
                    {
                        name: "Ioana Cristea",
                        rating: 5,
                        date: "January 7, 2023",
                        image: "https://randomuser.me/api/portraits/women/28.jpg",
                        text: "The education resources provided were invaluable for a first-time pet owner like me. My parrot is thriving thanks to their guidance!"
                    }
                ],
                quote: {
                    text: "The greatness of a nation and its moral progress can be judged by the way its animals are treated.",
                    author: "Mahatma Gandhi"
                }
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "About content retrieved successfully",
            data: aboutContent
        });
    } catch (error) {
        console.error("Error fetching about content:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve about content",
            error: error.message
        });
    }
};

export const updateAboutContent = async (req, res) => {
    try {
        const { mission, goal, welcome, aboutUs, whatWeDo, petCareGuides, userReviews, quote } = req.body;
        
        let aboutContent = await About.findOne();
        
        if (!aboutContent) {
            aboutContent = new About({
                mission,
                goal,
                welcome,
                aboutUs,
                whatWeDo,
                petCareGuides,
                userReviews,
                quote
            });
        } else {
            aboutContent.mission = mission;
            aboutContent.goal = goal;
            aboutContent.welcome = welcome;
            aboutContent.aboutUs = aboutUs;
            aboutContent.whatWeDo = whatWeDo;
            aboutContent.petCareGuides = petCareGuides;
            aboutContent.userReviews = userReviews;
            aboutContent.quote = quote;
        }
        
        await aboutContent.save();
        
        return res.status(200).json({
            success: true,
            message: "About content updated successfully",
            data: aboutContent
        });
    } catch (error) {
        console.error("Error updating about content:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update about content",
            error: error.message
        });
    }
}; 