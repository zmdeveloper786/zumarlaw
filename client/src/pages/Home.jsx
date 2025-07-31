import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Services from '../components/Services';

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const isTokenExpired = (token) => {
    try {
      const base64Payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      const currentTime = Math.floor(Date.now() / 1000); // seconds

      return decodedPayload.exp < currentTime;
    } catch (err) {
      console.error('Token parse error:', err);
      return true; // Treat as expired if it fails
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      const expired = isTokenExpired(token);
      if (expired) {
        console.log('Token expired — logging out');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      try {
        // Decode token first
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decodedToken);

        // Parse stored user data
        const parsedUser = JSON.parse(storedUser);
        console.log('Stored user:', parsedUser);

        // Use the data from the token as it's more reliable
        const userData = {
          ...decodedToken,
          firstName: decodedToken.firstName || parsedUser.firstName || '',
        };

        console.log('Final user data:', userData);
        
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(userData));
        setUserInfo(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }

      const verifyUser = async () => {
        try {
          const res = await fetch('http://194.238.16.80:5000/auth/verify-user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
          }
        } catch (error) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/login');
        }
      };

      verifyUser();
    }
  }, []);


  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4 text-center md:text-left">
          <div className="md:w-2/3">
            <h2 className="text-[#57123f] text-xl md:text-2xl font-bold mb-2">
              Hey {userInfo && userInfo.firstName ? userInfo.firstName : 'there'} 👋
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">Select your Services</p>
          </div>
          <button
            onClick={() => navigate('/services')}
            className="bg-[#57123f] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all text-sm border border-[#ecd4bc] w-full md:w-auto"
          >
            Go to Next Step →
          </button>
        </div>
      </div>
      <Services />
    </div>
  );
};

export default Home;
