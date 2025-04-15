import React from "react";
import { Facebook, Twitter, Instagram, Globe, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import "./footer.css";

function CustomFooter() 
{
  return (
    <footer className="custom-footer">
      {/* Secțiunea cu iconițele sociale */}
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={24} />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <Globe size={24} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <Youtube size={24} />
        </a>
      </div>

      {/* Secțiunea cu link-urile */}
      <div className="footer-links">
        <Link to="/shop/home#">Home</Link>
        <Link to="/shop/about#">About</Link>
        <Link to="/shop/contact#">Contact Us</Link>
        <a href="#news">News</a>
        <a href="#team">Our Team</a>
      </div>

      {/* Secțiunea cu copyright */}
      <div className="footer-copy">
        <p>Copyright © {new Date().getFullYear()} | Designed by BIANCA</p>
      </div>
    </footer>
  );
}

export default CustomFooter;
