import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} </p>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <p>Star Wars Shop</p>
          </Link>
      <h5 style={{ color: 'yellow' }}>May The Force Always Be With You</h5>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem',
  
};

export default Footer;
