import React, { useState, useEffect, useRef } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom'; // Import useHistory for navigation
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import './BottomNav.css';

// Custom SVG Icons
const CustomHomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="curved-icon">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

const CustomLeadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="curved-icon">
    <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
    <path d="M12 3v9" />
    <path d="M4 21h16" />
    <path d="M4 10l8 5 8-5" />
  </svg>
);

const CustomProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="curved-icon">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
    <path d="M12 12v9" />
    <path d="M15 21h-6a5 5 0 0 0-5 5" />
  </svg>
);

export default function CurvedBottomNav() {
  const [value, setValue] = useState(0);
  const location = useLocation()
  const blobRef = useRef(null);
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    const positions = ['0%', '33%', '66%'];
    const blob = blobRef.current;

    if(location.pathname=='/leads'){
        setValue(1)
    }else if(location.pathname == '/employehome'){
        setValue(0)
    }else if(location.pathname == '/profile'){
        setValue(2)
    }
    // Move the water blob to the selected tab with smooth transition
    blob.style.transform = `translateX(${positions[value]})`;
    blob.classList.add('water-transition');

    // Remove the animation class after the animation ends
    setTimeout(() => {
      blob.classList.remove('water-transition');
    }, 600); // Time to match the animation duration
  }, [value]);

  const handleChange = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/employehome')
        break;
      case 1:
        navigate('/leads')
        break;
      case 2:
        navigate('/profile')
        break;
      default:
        break;
    }
  };

  return (
    <div className=' bottom-nav' style={{ position: 'relative', height: '80px'}}>
      {/* Water Blob */}
      <div
        ref={blobRef}
        className="water-blob"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '33%', // Width of one tab
          height: '80px', // Height of the blob
          zIndex: -1, // Behind the navigation buttons
        }}
      />

      {/* Curved Bottom Navigation */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => handleChange(newValue)} // Update handleChange
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background for the navbar
          borderRadius: '20px 20px 0 0', // Curved effect on the top
          padding: '10px 0',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.5)',
          height: '80px',
          backdropFilter: 'blur(10px)', // Blurred effect
          borderTopLeftRadius: '40px', // Higher curve on the left side
          borderTopRightRadius: '40px', // Higher curve on the right side
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<CustomHomeIcon />} // Custom home icon
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'dodgerblue' },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '12px',
              fontWeight: 'bold',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '40px', // Maintain icon size
            },
          }}
        />
        <BottomNavigationAction
          label="Leads"
          icon={<CustomLeadIcon />} // Custom lead icon
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'dodgerblue' },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '12px',
              fontWeight: 'bold',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '40px', // Maintain icon size
            },
          }}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<CustomProfileIcon />} // Custom profile icon
          sx={{
            color: 'white',
            '&.Mui-selected': { color: 'dodgerblue' },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '12px',
              fontWeight: 'bold',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '40px', // Maintain icon size
            },
          }}
        />
      </BottomNavigation>
    </div>
  );
}
