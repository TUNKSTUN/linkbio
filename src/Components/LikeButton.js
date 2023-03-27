import React, { useState, useEffect } from "react";
import heartIcon from "../Assets/heart.png";
import "./LikeButton.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, increment } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCmacK5JzeuolOM_3GYtvZ7hWvWRIH2QI0",
  authDomain: "linkbio-instagram-101.firebaseapp.com",
  databaseURL: "https://linkbio-instagram-101-default-rtdb.firebaseio.com",
  projectId: "linkbio-instagram-101",
  storageBucket: "linkbio-instagram-101.appspot.com",
  messagingSenderId: "271104241538",
  appId: "1:271104241538:web:7b6095d9b8a76d980ae99b",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, "likes");
const likesRef = ref(db, "likes");
const viewsRef = ref(db, "views");

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [count, setCount] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Increment the view count on page visit
    set(viewsRef, increment(1));

    // Get the current likes count
    onValue(likesRef, (snapshot) => {
      const likes = snapshot.val();
      if (likes !== null) {
        setCount(likes);
      }
    });

    // Get the current views count
    onValue(viewsRef, (snapshot) => {
      const views = snapshot.val();
      if (views !== null) {
        setViews(views);
      }
    });
  }, []);

  const handleLike = () => {
    setAnimating(true);
    setTimeout(() => {
      if (liked) {
        setCount((prevCount) => {
          if (prevCount === 0) {
            setLiked(false);
            return 0;
          }
          set(dbRef, prevCount - 1);
          return prevCount - 1;
        });
      } else {
        setCount((prevCount) => {
          setLiked(true);
          set(dbRef, prevCount + 1);
          return prevCount + 1;
        });
      }
      setAnimating(false);
    }, 1000);
  };

  return (
    <div className="flex mt-5 justify-between items-center text-blue-900 text-xs w-full h-full">
      <button
        unselectable="on"
        className={
          liked
            ? "p-0  rounded-full liked text-xs flex  select-none flex-col justify-center items-center text-center b text-blue-900 drop-shadow-md"
            : "p-0 like text-xs flex rounded-full  text-blue-900 drop-shadow-md select-none flex-col justify-center  items-center text-center"
        }
        onClick={!animating && !liked ? handleLike : null}
      >
        <div className="heart select-none font-bold text-xs rounded-full top-0 right-0 flex-col flex drop-shadow-md p-0 m-0 justify-center items-center">
          <p className="text-base  drop-shadow-sm">❤️</p>
        </div>
          <p>{count} likes</p>
      </button>
      <div
        className="views select-none font-bold rounded-full top-0 right-0 flex-col flex drop-shadow-md p-0 m-0 justify-center items-center"
        unselectable="on"
      >
        <p className="text-base">👀</p>
        <p>{views} views</p>
      </div>
    </div>
  );
}

export default LikeButton;
