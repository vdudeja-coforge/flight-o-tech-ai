import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer>
            <div class="footer-container">
            <p>&copy; 2024 Hackathon - Team - <span style={{fontStyle:"italic", color:'#37B34A ', fontSize:"16px" }}>Technovators</span> </p>
            <p>Organized by Coforge</p>
            <div class="footer-links">
                <a href="https://www.coforge.com/" target="_blank">Official Website</a>
            </div>
        </div>
        </footer>
    );
};

export default Footer;
