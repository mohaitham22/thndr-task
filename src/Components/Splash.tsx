

import React from 'react';
import Image from 'next/image';
import { Spin } from 'antd';
import type { CSSProperties } from 'react';

export default function Splash() {
  return (
    <div style={containerStyle}>
      <Image
        src="/image 1.png" 
        alt="Loading"
        width={527.86} 
        height={150} 
        style={imageStyle}
      />
      <Spin size="large" style={spinnerStyle} />
      <p style={textStyle}>By Mohamed Haitham</p> 
    </div>
  );
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#001F3F', 
  color: '#fff',
  padding: '0 1rem', // Add padding for small screens
  textAlign: 'center', // Center align text for small screens
};

const imageStyle: CSSProperties = {
  marginBottom: '2rem', // Add a bit more space for larger screens
  maxWidth: '90%', // Make image responsive
  height: 'auto', // Maintain aspect ratio
};

const spinnerStyle: CSSProperties = {
  marginBottom: '2rem',
};

const textStyle: CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '0 1rem', // Add some margin to prevent text from touching edges
  lineHeight: '1.4',
};

// Add media queries for responsiveness
const responsiveStyles = `
  @media (max-width: 600px) {
    .splash-container p {
      font-size: 1.2rem;
    }
    
    .splash-container img {
      max-width: 80%;
    }
  }
  
  @media (max-width: 400px) {
    .splash-container p {
      font-size: 1rem;
    }
    
    .splash-container img {
      max-width: 70%;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);
