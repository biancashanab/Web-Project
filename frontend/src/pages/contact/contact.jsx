import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Footer from "../../components/common/footer/footer";
import { submitContactForm, resetForm } from "../../store/common/contact-slice";
import "./contact.css";

function ContactPage() 
{
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const dispatch = useDispatch();
  const { isSubmitting, submitSuccess, submitError } = useSelector((state) => state.contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(submitContactForm(formData));
    
    if (!result.error) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>

      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions about pet adoption? We're here to help!</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div>
                <h3>Email</h3>
                <p>info@petadopt.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div>
                <h3>Phone</h3>
                <p>+40 123 456 789</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <div>
                <h3>Address</h3>
                <p>123 Pet Street, Bucharest, Romania</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Clock size={24} />
              </div>
              <div>
                <h3>Working Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          
          {submitSuccess ? (
            <div className="success-message">
              <h3>Thank you for your message!</h3>
              <p>We've received your inquiry and will get back to you soon.</p>
              <Button onClick={handleReset}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Please provide details about your inquiry..."
                  rows={5}
                />
              </div>
              
              {submitError && <div className="error-message">{submitError}</div>}
              
              <Button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={16} className="ml-2" />}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <h2>Find Us</h2>
        <div className="map-container">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=26.0854%2C44.4268%2C26.1024%2C44.4348&layer=mapnik"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="map-overlay">
            <a
              href="https://www.openstreetmap.org/#map=16/44.4308/26.0939"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              View larger map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage; 