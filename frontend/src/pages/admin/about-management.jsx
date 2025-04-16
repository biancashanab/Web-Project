import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import axios from "axios";

function AboutManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutContent, setAboutContent] = useState({
    mission: "",
    goal: "",
    aboutUs: "",
    welcome: "",
    whatWeDo: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" }
    ],
    petCareGuides: [
      {
        type: "Dogs",
        icon: "🐕",
        bgColor: "bg-blue-100",
        iconBgColor: "bg-blue-600",
        items: ["Daily exercise and play", "Regular veterinary check-ups"]
      }
    ],
    userReviews: [
      {
        name: "",
        rating: 5,
        date: "",
        image: "",
        text: ""
      }
    ],
    quote: {
      text: "The greatness of a nation and its moral progress can be judged by the way its animals are treated.",
      author: "Mahatma Gandhi"
    }
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/admin/about/content');
      if (response.data.success) {
        // Ensure whatWeDo has all 4 items
        const content = response.data.data;
        const whatWeDo = content.whatWeDo || [];
        while (whatWeDo.length < 4) {
          whatWeDo.push({ title: "", description: "" });
        }
        
        // Ensure petCareGuides has at least one item
        const petCareGuides = content.petCareGuides || [];
        if (petCareGuides.length === 0) {
          petCareGuides.push({ 
            type: "Dogs", 
            icon: "🐕", 
            bgColor: "bg-blue-100", 
            iconBgColor: "bg-blue-600", 
            items: ["Daily exercise and play", "Regular veterinary check-ups"] 
          });
        }
        
        // Ensure userReviews has at least one item
        const userReviews = content.userReviews || [];
        if (userReviews.length === 0) {
          userReviews.push({ 
            name: "", 
            rating: 5, 
            date: "", 
            image: "", 
            text: "" 
          });
        }
        
        // Ensure quote exists
        const quote = content.quote || {
          text: "The greatness of a nation and its moral progress can be judged by the way its animals are treated.",
          author: "Mahatma Gandhi"
        };
        
        setAboutContent({
          ...content,
          whatWeDo: whatWeDo.slice(0, 4),
          petCareGuides,
          userReviews,
          quote
        });
      }
    } catch (error) {
      toast.error("Failed to fetch about content");
      console.error("Error fetching about content:", error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put('/api/admin/about/update', aboutContent);
      if (response.data.success) {
        toast.success("About page content updated successfully!");
        // Refresh content after successful update
        await fetchContent();
      }
    } catch (error) {
      toast.error("Failed to update about page content");
      console.error("Error saving about content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatWeDoChange = (index, field, value) => {
    const updatedWhatWeDo = [...aboutContent.whatWeDo];
    updatedWhatWeDo[index] = {
      ...updatedWhatWeDo[index],
      [field]: value
    };
    setAboutContent({
      ...aboutContent,
      whatWeDo: updatedWhatWeDo
    });
  };

  const handlePetCareGuideChange = (index, field, value) => {
    const updatedPetCareGuides = [...aboutContent.petCareGuides];
    updatedPetCareGuides[index] = {
      ...updatedPetCareGuides[index],
      [field]: value
    };
    setAboutContent({
      ...aboutContent,
      petCareGuides: updatedPetCareGuides
    });
  };

  const handlePetCareGuideItemChange = (guideIndex, itemIndex, value) => {
    const updatedPetCareGuides = [...aboutContent.petCareGuides];
    updatedPetCareGuides[guideIndex].items[itemIndex] = value;
    setAboutContent({
      ...aboutContent,
      petCareGuides: updatedPetCareGuides
    });
  };

  const addPetCareGuideItem = (guideIndex) => {
    const updatedPetCareGuides = [...aboutContent.petCareGuides];
    updatedPetCareGuides[guideIndex].items.push("");
    setAboutContent({
      ...aboutContent,
      petCareGuides: updatedPetCareGuides
    });
  };

  const removePetCareGuideItem = (guideIndex, itemIndex) => {
    const updatedPetCareGuides = [...aboutContent.petCareGuides];
    updatedPetCareGuides[guideIndex].items.splice(itemIndex, 1);
    setAboutContent({
      ...aboutContent,
      petCareGuides: updatedPetCareGuides
    });
  };

  const addPetCareGuide = () => {
    setAboutContent({
      ...aboutContent,
      petCareGuides: [
        ...aboutContent.petCareGuides,
        { 
          type: "", 
          icon: "🐾", 
          bgColor: "bg-gray-100", 
          iconBgColor: "bg-gray-600", 
          items: ["Item 1", "Item 2"] 
        }
      ]
    });
  };

  const removePetCareGuide = (index) => {
    const updatedPetCareGuides = [...aboutContent.petCareGuides];
    updatedPetCareGuides.splice(index, 1);
    setAboutContent({
      ...aboutContent,
      petCareGuides: updatedPetCareGuides
    });
  };

  const handleUserReviewChange = (index, field, value) => {
    const updatedUserReviews = [...aboutContent.userReviews];
    updatedUserReviews[index] = {
      ...updatedUserReviews[index],
      [field]: value
    };
    setAboutContent({
      ...aboutContent,
      userReviews: updatedUserReviews
    });
  };

  const addUserReview = () => {
    setAboutContent({
      ...aboutContent,
      userReviews: [
        ...aboutContent.userReviews,
        { 
          name: "", 
          rating: 5, 
          date: "", 
          image: "", 
          text: "" 
        }
      ]
    });
  };

  const removeUserReview = (index) => {
    const updatedUserReviews = [...aboutContent.userReviews];
    updatedUserReviews.splice(index, 1);
    setAboutContent({
      ...aboutContent,
      userReviews: updatedUserReviews
    });
  };

  const handleQuoteChange = (field, value) => {
    setAboutContent({
      ...aboutContent,
      quote: {
        ...aboutContent.quote,
        [field]: value
      }
    });
  };

  const handleWelcomeChange = (value) => {
    setAboutContent(prevContent => ({
      ...prevContent,
      welcome: value
    }));
  };

  const handleAboutUsChange = (value) => {
    setAboutContent(prevContent => ({
      ...prevContent,
      aboutUs: value
    }));
  };

  return (
    <div className="space-y-6 p-6 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">About Page Management</h1>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Welcome Section */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Message</CardTitle>
            <CardDescription>Welcome message displayed on the about page</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={aboutContent.welcome}
              onChange={(e) => handleWelcomeChange(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter welcome message..."
            />
          </CardContent>
        </Card>

        {/* About Us Section */}
        <Card>
          <CardHeader>
            <CardTitle>About Us</CardTitle>
            <CardDescription>Main description of your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={aboutContent.aboutUs}
              onChange={(e) => handleAboutUsChange(e.target.value)}
              className="min-h-[100px]"
              placeholder="Enter your organization's description..."
            />
          </CardContent>
        </Card>

        {/* Mission Section */}
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Your organization's mission statement</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={aboutContent.mission}
              onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
              className="min-h-[100px]"
              placeholder="Enter your organization's mission..."
            />
          </CardContent>
        </Card>

        {/* Goal Section */}
        <Card>
          <CardHeader>
            <CardTitle>Our Goal</CardTitle>
            <CardDescription>Your organization's goals and objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={aboutContent.goal}
              onChange={(e) => setAboutContent({ ...aboutContent, goal: e.target.value })}
              className="min-h-[100px]"
              placeholder="Enter your organization's goals..."
            />
          </CardContent>
        </Card>

        {/* What We Do Section */}
        <Card>
          <CardHeader>
            <CardTitle>What We Do</CardTitle>
            <CardDescription>Manage the services and activities your organization offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {aboutContent.whatWeDo.map((item, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => handleWhatWeDoChange(index, "title", e.target.value)}
                      placeholder="Enter service title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleWhatWeDoChange(index, "description", e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Enter service description..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pet Care Guides Section */}
        <Card>
          <CardHeader>
            <CardTitle>Pet Care Guides</CardTitle>
            <CardDescription>Manage the pet care guides for different animal types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {aboutContent.petCareGuides.map((guide, guideIndex) => (
                <div key={guideIndex} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Pet Type: {guide.type || "New Pet Type"}</h3>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removePetCareGuide(guideIndex)}
                      disabled={aboutContent.petCareGuides.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Input
                        value={guide.type}
                        onChange={(e) => handlePetCareGuideChange(guideIndex, "type", e.target.value)}
                        placeholder="Enter pet type (e.g., Dogs, Cats)..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Input
                        value={guide.icon}
                        onChange={(e) => handlePetCareGuideChange(guideIndex, "icon", e.target.value)}
                        placeholder="Enter emoji icon (e.g., 🐕, 🐈)..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <Input
                        value={guide.bgColor}
                        onChange={(e) => handlePetCareGuideChange(guideIndex, "bgColor", e.target.value)}
                        placeholder="Enter Tailwind class (e.g., bg-blue-100)..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon Background Color</Label>
                      <Input
                        value={guide.iconBgColor}
                        onChange={(e) => handlePetCareGuideChange(guideIndex, "iconBgColor", e.target.value)}
                        placeholder="Enter Tailwind class (e.g., bg-blue-600)..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Care Items</Label>
                      <Button 
                        size="sm" 
                        onClick={() => addPetCareGuideItem(guideIndex)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {guide.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-2">
                          <Input
                            value={item}
                            onChange={(e) => handlePetCareGuideItemChange(guideIndex, itemIndex, e.target.value)}
                            placeholder={`Enter care item ${itemIndex + 1}...`}
                          />
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => removePetCareGuideItem(guideIndex, itemIndex)}
                            disabled={guide.items.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button onClick={addPetCareGuide}>
                <Plus className="h-4 w-4 mr-1" /> Add Pet Care Guide
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle>Adoption Success Stories</CardTitle>
            <CardDescription>Manage user reviews and testimonials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {aboutContent.userReviews.map((review, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Review by: {review.name || "New Review"}</h3>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeUserReview(index)}
                      disabled={aboutContent.userReviews.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={review.name}
                        onChange={(e) => handleUserReviewChange(index, "name", e.target.value)}
                        placeholder="Enter reviewer name..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Rating (1-5)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="5"
                        value={review.rating}
                        onChange={(e) => handleUserReviewChange(index, "rating", parseInt(e.target.value))}
                        placeholder="Enter rating (1-5)..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        value={review.date}
                        onChange={(e) => handleUserReviewChange(index, "date", e.target.value)}
                        placeholder="Enter date (e.g., May 10, 2023)..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={review.image}
                        onChange={(e) => handleUserReviewChange(index, "image", e.target.value)}
                        placeholder="Enter image URL..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Review Text</Label>
                    <Textarea
                      value={review.text}
                      onChange={(e) => handleUserReviewChange(index, "text", e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Enter review text..."
                    />
                  </div>
                </div>
              ))}
              
              <Button onClick={addUserReview}>
                <Plus className="h-4 w-4 mr-1" /> Add User Review
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quote Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quote</CardTitle>
            <CardDescription>Manage the inspirational quote displayed on the about page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quote Text</Label>
                <Textarea
                  value={aboutContent.quote.text}
                  onChange={(e) => handleQuoteChange("text", e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Enter quote text..."
                />
              </div>
              <div className="space-y-2">
                <Label>Quote Author</Label>
                <Input
                  value={aboutContent.quote.author}
                  onChange={(e) => handleQuoteChange("author", e.target.value)}
                  placeholder="Enter quote author..."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AboutManagement; 