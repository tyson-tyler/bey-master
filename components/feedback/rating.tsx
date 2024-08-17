// components/EmojiRating.tsx
"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import styles from "../../components/feedback/EmojiRating.module.css";

const emojis = {
  sad: "😢",
  neutral: "😐",
  happy: "😊",
  excited: "😁",
};

const EmojiRating: React.FC = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("neutral");

  useEffect(() => {
    if (selectedEmoji) {
      gsap.to(`.${styles.emoji}`, {
        rotateY: 360,
        ease: "power2.out",
        duration: 1,
      });
    }
  }, [selectedEmoji]);

  const handleClick = (
    emoji: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent any default behavior, such as page reload
    setSelectedEmoji(emoji);
    gsap.to(`.${styles.emoji}`, {
      scale: 1.2,
      ease: "bounce.out",
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl p-1 ${styles.emoji}`}
      >
        {emojis[selectedEmoji as keyof typeof emojis]}
      </div>
      <div className="flex space-x-2 sm:space-x-4 mt-4">
        {Object.keys(emojis).map((emoji) => (
          <button
            key={emoji}
            onClick={(event) => handleClick(emoji, event)}
            className="text-xl sm:text-2xl md:text-3xl p-1 sm:p-2 transition-transform transform hover:scale-110"
          >
            {emojis[emoji as keyof typeof emojis]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiRating;
