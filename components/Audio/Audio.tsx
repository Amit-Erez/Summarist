"use client";
import styles from "./Audio.module.css";
import type { Book } from "@/types/book";
import { RiReplay10Line, RiForward10Line } from "react-icons/ri";
import { RiPlayLargeFill } from "react-icons/ri";
import { GiPauseButton } from "react-icons/gi";
import { useRef, useState, useEffect } from "react";

export default function Audio({ book }: { book: Book }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime += seconds;
  }

  function formatTime(seconds: number) {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  function handleProgressChange(value: String) {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(value);
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  }

  return (
    <>
      <div className={styles.audio__wrapper}>
        <div className={styles["audio__track--wrapper"]}>
          <figure className={styles["audio__track--image-mask"]}>
            <figure className={styles["book__image--wrapper"]}>
              <img
                className={styles.book__image}
                src={book.imageLink}
                alt="book"
              />
            </figure>
          </figure>
          <div className={styles["audio__track--details-wrapper"]}>
            <div className={styles["audio__track--title"]}>{book.title}</div>
            <div className={styles["audio__track--author"]}>{book.author}</div>
          </div>
        </div>
        <div className={styles["audio__controls--wrapper"]}>
          <div className={styles.audio__controls}>
            <button
              className={styles["audio__controls--btn"]}
              onClick={() => skip(-10)}
            >
              <RiReplay10Line />
            </button>
            <button
              className={`${styles["audio__controls--btn"]} ${styles["audio__controls--btn-play"]}`}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <GiPauseButton />
              ) : (
                <RiPlayLargeFill />
              )}
            </button>
            <button
              className={styles["audio__controls--btn"]}
              onClick={() => skip(10)}
            >
              <RiForward10Line />
            </button>
          </div>
        </div>
        <div className={styles["audio__progress--wrapper"]}>
          <div className={styles.audio__time}>{formatTime(currentTime)}</div>
          <input
            type="range"
            className={styles["audio__progress--bar"]}
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => handleProgressChange(e.target.value)}
            style={
              {
                "--range-progress": `${(currentTime / duration) * 100 || 0}%`,
              } as React.CSSProperties
            }
          />
          <div className={styles.audio__time}>{formatTime(duration)}</div>
        </div>
      </div>
      <audio ref={audioRef} src={book.audioLink} preload="metadata" />
    </>
  );
}
