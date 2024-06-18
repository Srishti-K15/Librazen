import React from 'react'
import './Footer.css'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='footer-container'>
      <div className="footer-section left">
        <div className='logo'>
        <h1 style={{fontFamily:"cursive"}}>Librazen</h1>
        <img src={logo} alt="Librazen Logo" className='logo-icon' />
        </div>
        <div className="footer-copyright">
        <p>&copy; 2024 Librazen. All rights reserved.</p>
      </div>
      </div>
      
        <div className="footer-section social-media">
          <ul>
            <li><a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} alt="Facebook" /></a></li>
            <li><a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} alt="Twitter" /></a></li>
            <li><a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} alt="Instagram" /></a></li>
            <li><a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} alt="LinkedIn" /></a></li>
            <li><a href="https://youtube.com/in/yourchannel" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} alt="Youtube" /></a></li>
            </ul>
        </div>
        <div className="footer-section contact">
          <p>Contact us: 
          <a href="mailto:support@librazen.com">support@librazen.com</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer