import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Component.css";

function GitHubStarButton({ owner, repo }) {
  const [isStarred, setIsStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    async function checkIfStarred() {
        try {
          await axios.get(
            `https://api.github.com/user/starred/${owner}/${repo}`,
            {
              headers: {
                Authorization: `Bearer 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`,
              },
            }
          );
          setIsStarred(true);
        } catch (error) {
          setIsStarred(false);
        }
      }
      

    async function getStarCount() {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`,
          {
            headers: {
              Authorization: `Bearer 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`,
            },
          }
        );

        setStarCount(response.data.stargazers_count);
      } catch (error) {
        console.error(error);
      }
    }

    checkIfStarred();
    getStarCount();
  }, [owner, repo]);

  const handleStarClick = async () => {
    try {
      if (isStarred) {
        await axios.delete(
          `https://api.github.com/user/starred/${owner}/${repo}`,
          {
            headers: {
              Authorization: `Bearer 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`,
            },
          }
        );
        setIsStarred(false);
        setStarCount((prevCount) => prevCount - 1);
        console.log("Unstarred");
      } else {
        await axios.put(
          `https://api.github.com/user/starred/${owner}/${repo}`,
          null,
          {
            headers: {
              Authorization: `Bearer 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`,
            },
          }
        );
        setIsStarred(true);
        setStarCount((prevCount) => prevCount + 1);
        console.log("Starred");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center justify-center items-center flex flex-col">
      <button
        onClick={handleStarClick}
        className="github-star-button flex justify-center items-center text-center p-1 h-6 m-0 drop-shadow-lg"
      >
        {isStarred ? "⭐" : "⭐"}
      </button>
      <p className="text-xs font-bold drop-shadow-lg">{starCount} {starCount > 1 && starCount < 0 ? "stars":"star"}</p>
    </div>
  );
}

export default GitHubStarButton;
