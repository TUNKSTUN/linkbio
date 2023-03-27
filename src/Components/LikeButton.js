import React, { useState, useEffect } from 'react';
import heartIcon from '../Assets/heart.png';
import './LikeButton.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, increment } from 'firebase/database';

const firebaseConfig = {
apiKey: "AIzaSyCmacK5JzeuolOM_3GYtvZ7hWvWRIH2QI0",
authDomain: "linkbio-instagram-101.firebaseapp.com",
databaseURL: "https://linkbio-instagram-101-default-rtdb.firebaseio.com",
projectId: "linkbio-instagram-101",
storageBucket: "linkbio-instagram-101.appspot.com",
messagingSenderId: "271104241538",
appId: "1:271104241538:web:7b6095d9b8a76d980ae99b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, 'likes');
const likesRef = ref(db, 'likes');
const viewsRef = ref(db, 'views');

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
    <div className='flex p-1 mt-3 justify-between items-center w-full text-blue-900 text-xs'>
      <button
      unselectable='on'
        className={liked ? 'p-0 m-0 liked text-xs flex  select-none flex-col justify-center items-center text-center text-blue-900 drop-shadow-md' : 'm-0 p-0 like text-xs flex gap-1 text-blue-900 drop-shadow-md select-none flex-col justify-center items-center text-center'}
        onClick={!animating && !liked ? handleLike : null}
      >
        <img src={heartIcon} alt="Heart Icon" className="heart flex" />
        <p>{count} likes</p>
      </button>
      <div className="views select-none font-bold rounded-full p-1 bottom-0 right-0 relative flex-col flex drop-shadow-md" unselectable='on'><span>👀</span> {views} views </div>
    </div>
  );
}

export default LikeButton;