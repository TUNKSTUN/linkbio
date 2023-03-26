// App.js
import { useState, useEffect } from 'react';
import './App.css';
import profilePic1 from './Assets/profile-1.jpg';
import profilePic2 from './Assets/profile-2.jpg';
import profilePic3 from './Assets/profile-3.jpg';

function App() {
  const pageTitle = 'Yahya | Network Engineer';

  const links = [
    { name: 'GitHub', url: 'https://github.com/tunkstun' },
    { name: 'Portfolio', url: 'https://tunkstun.web.app' },
    { name: 'Contact', url: 'mailto:johnwick4learning@gmail.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yahya24' },
    { name: 'Blog', url: 'https://ethichax.web.app' },
  ];

  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const profilePics = [profilePic1, profilePic2, profilePic3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPicIndex((currentPicIndex + 1) % profilePics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentPicIndex, profilePics.length]);

  
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    function handleOrientation(event) {
      const x = event.gamma; // horizontal tilt
      const y = event.beta; // vertical tilt

      // calculate the new position of the background based on device orientation
      const newTranslateX = -x / 3; // divide by 3 for slower movement
      const newTranslateY = -y / 3;

      // update the transform property with the new position
      setTranslateX(newTranslateX);
      setTranslateY(newTranslateY);
    }

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    backgroundImage: "url('https://www.thisiscolossal.com/wp-content/uploads/2019/02/moon_crop.jpg')",
    backgroundSize: 'cover',
    transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
    transition: 'transform 0.1s ease-out',
  };

  return (
    <main className="bg-black text-white backdrop-blur-sm flex justify-center items-center min-h-screen top-0 left-0 ">
      <div style={backgroundStyle}/>
      <div className="max-w-2xl mx-auto text-center bg-gradient-to-tr from-stone-800 via-gray-900 to-black p-6 m-12 rounded-lg shadow-lg shadow-black  border z-10">
        <div className="flex justify-center items-center p-20">
          <img className={`w-32 h-32 rounded-full mr-4 transition-opacity duration-1000 absolute border-4 border-blue p-2 ${currentPicIndex === 0 ? 'opacity-0' : 'opacity-100'}`} 
               src={profilePics[currentPicIndex]} alt="Profile 1" />
          <img className={`w-32 h-32 rounded-full mr-4 transition-opacity duration-1000 absolute border-4 border-blue p-2 ${currentPicIndex === 1 ? 'opacity-0 ' : 'opacity-80'}`} 
               src={profilePics[(currentPicIndex + 1) % profilePics.length]} alt="Profile 2" />
          <img className={`w-32 h-32 rounded-full mr-4 transition-opacity duration-1000 absolute border-4 border-blue p-2${currentPicIndex === 2 ? 'opacity-0' : 'opacity-100'}`} 
               src={profilePics[(currentPicIndex + 2) % profilePics.length]} alt="Profile 3" />
        </div>
          <h1 className="text-2xl text-gray-100 font-bold">{pageTitle}</h1>
        <p className="text-gray-400 mt-2">@johnwick4learning</p>
        <h2 className="text-lg font-semibold mt-4">Links:</h2>
        <ul className="font-mono tracking-widest text-center p-2">
          {links.map((link, index) => (
            <li key={index}>
              <a className="text-gray-800 w-full bg-stone-300 flex justify-center text-center shadow-sm shadow-green-800 my-2 py-1 rounded border transition ease-in-out duration-500 hover:rotate-1 hover:bg-stone-800 hover:border-green-200 hover:shadow-lg hover:text-white " href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
