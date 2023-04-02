// App.js
import { useState, useEffect } from "react";
import "./App.css";
import profilePic1 from "./Assets/profile-1.jpg";
import Heart from "./Components/LikeButton";
import { FaGithubSquare,FaSnapchatSquare, FaLinkedin } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";

function App() {
  const pageTitle = "Yahya Khan";

  const links = [
    {
      name: <FaGithubSquare />,
      url: "https://github.com/tunkstun",
      title: "Github",
    },
    {
      name: <FaLinkedin />,
      url: "https://linkedin.com/in/yahya24",
      title: "LinkedIn",
    },
    { name: <MdWork />, url: "https://tunkstun.web.app", title: "Portfolio" },
    { name: <BsFillPenFill />, url: "https://ethichax.web.app", title: "Blog" },
    {
      name: <AiFillMail />,
      url: "mailto:johnwick4learning@gmail.com",
      title: "Contact",
    },
    {
      name: <FaSnapchatSquare />,
      url: "https://www.snapchat.com/add/aladin0.0152?share_id=tdEOrv1KMXE&locale=en-IN",
      title: "Github",
    },
  ];

  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const profilePics = [profilePic1, profilePic1];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPicIndex((currentPicIndex + 1) % profilePics.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPicIndex, profilePics.length]);

  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    function handleOrientation(event) {
      const x = event.gamma; // horizontal tilt
      const y = event.beta; // vertical tilt

      // calculate the new position of the background based on device orientation
      const newTranslateX = -x / 4; // divide by 3 for slower movement
      const newTranslateY = -y / 4;

      // update the transform property with the new position
      setTranslateX(newTranslateX);
      setTranslateY(newTranslateY);
    }

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <main className=" text-white flex justify-center items-center min-h-screen top-0 left-0">
      <div className="flex flex-col justify-center items-center max-w-2xl mx-auto text-center bg-gradient-to-tr from-blue-400  via-gray-100 to-white animate-gradient p-4 m-12 rounded-lg shadow-lg shadow-black border border-blue-400 border-t-white border-r-white  z-10">
        <a
          href="https://instagram.com/solo_perfecto24"
          alt="alternate account"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex justify-center items-center p-16 w-28 rounded-full">
            <img
              className={`w-32 h-32 rounded-full absolute p-1  ${
                currentPicIndex === 0
                  ? "transition ease-in-out duration-700 opacity-100  bg-gradient-to-tl from-blue-900 via-cyan-900 to-sky-800 shadow-lg shadow-gray-500 border-blue-500 border" //transition-opacity duration-1000 bg-gradient-to-tl from-blue-700 to-blue-400 shadow-inner shadow-black
                  : "transition ease-in-out duration-300 opacity-100 bg-sky-100 shadow-lg shadow-blue-100 border"
              }`}
              src={profilePics[currentPicIndex]}
              alt="Profile 1"
            />
          </div>
        </a>
        <br />
        <h1 className="text-5xl text-blue-900 drop-shadow-lg" id="title">
          {pageTitle}
        </h1>
        <a
          href="https://www.instagram.com/johnwick4learning"
          target="_blank"
          rel="noreferrer"
          alt="Instagram"
        >
          <p className="text-white mt-4 bg-blue-900 w-full flex px-4 rounded-full py-1 transition ease-in-out duration-1000 select-none font-mono text-sm">@johnwick4learning</p>
        </a>
        
        <ul className="font-mono tracking-widest mt-6 text-center w-60 grid grid-cols-3 gap-3">
          {links.map((link, index) => (
            <li key={index}>
              <a
                title={link.title}
                className="text-blue-900 text-6xl flex-col w-auto p-1 items-center bg-white flex justify-center font-bold text-center shadow-md shadow-gray-500 rounded-xl transition ease-in-out duration-500 hover:scale-105 hover:bg-gradient-to-tr hover:from-blue-900 hover:via-cyan-900 hover:to-sky-800 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-600 hover:text-white "
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <Heart/>
      </div>
      <div></div>
    </main>
  );
}

export default App;
