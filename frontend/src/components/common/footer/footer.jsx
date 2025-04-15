import React from "react";
import { Facebook, Twitter, Instagram, Globe, Youtube } from "lucide-react";
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
        <a href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#about">About</a>
        <a href="#contact">Contact Us</a>
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
