"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment-timezone";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

const languages = [
  { code: "en", name: "English", timezone: "America/New_York" },
  { code: "zh", name: "Chinese", timezone: "Asia/Shanghai" },
  { code: "ru", name: "Russian", timezone: "Europe/Moscow" },
];

export default function Home() {
  const [showMore, setShowMore] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [background, setBackground] = useState(
    "bg-gradient-to-tl from-black via-zinc-600/20 to-black"
  );
  const [currentTime, setCurrentTime] = useState(""); // To store the current time

  useEffect(() => {
    const updateBackground = () => {
      const language = languages.find((lang) => lang.code === selectedLanguage);
      if (!language) return;

      // Get the current hour in the selected language's timezone
      const currentTimeInZone = moment.tz(language.timezone).format("HH:mm");
      setCurrentTime(currentTimeInZone); // Update current time

      // Set background based on the time of day
      const currentHour = moment.tz(language.timezone).hour();
      console.log(currentHour);
      if (currentHour >= 4 && currentHour < 8) {
        setBackground("bg-gradient-to-tl from-blue-200 to-blue-900"); // Morning (Light Blue)
      } else if (currentHour >= 8 && currentHour < 12) {
        setBackground("bg-gradient-to-tl from-blue-300 to-blue-100"); // Morning (Light Blue)
      } else if (currentHour >= 12 && currentHour < 15) {
        setBackground("bg-gradient-to-tl from-blue-600 to-orange-500"); // Noon (Blue)
      } else if (currentHour >= 15 && currentHour < 18) {
        setBackground("bg-gradient-to-tl from-blue-400 to-orange-400"); // Afternoon (Orange)
      } else {
        setBackground("bg-gradient-to-tl from-black via-zinc-600/20 to-black"); // Night (Black)
      }
    };

    updateBackground(); // Update the background and time
  }, [selectedLanguage]); // Trigger whenever the language changes

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-screen overflow-hidden ${background}`}
    >
      {/* Language Selection */}
      <div className="my-4 text-center">
        <div className="flex gap-4 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`text-sm duration-500 ${
                selectedLanguage === lang.code
                  ? "text-zinc-500"
                  : "text-zinc-300"
              } hover:text-zinc-500`}
            >
              {lang.name}
            </button>
          ))}
        </div>
        {/* Show current time */}
        <div className="text-zinc-300 mt-2">
          <p>
            Current time in{" "}
            {languages.find((lang) => lang.code === selectedLanguage)?.name}:
          </p>
          <p className="text-lg font-semibold">{currentTime}</p>
        </div>
      </div>

      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-5xl sm:text-6xl md:text-9xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display whitespace-nowrap bg-clip-text">
        erenonal
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-4 text-center animate-fade-in">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm text-zinc-500 hover:text-zinc-400 duration-500"
        >
          {showMore ? "See Less" : "See More About Me"}
        </button>
        <div
          className={`transition-all duration-1000 ${
            showMore
              ? "max-h-screen opacity-100 "
              : "max-h-0 opacity-0 duration-500"
          } overflow-hidden`}
        >
          <h2 className="text-sm text-zinc-500 mx-4 sm:mx-8 md:mx-40 duration-500">
            Experienced software developer with four years in start-up
            environments, specializing in crafting visually appealing and
            user-friendly interfaces. Skilled in fast-paced development,
            creativity, and delivering seamless user experiences. Passionate
            about continuous learning, staying updated with the latest
            technologies, and contributing to project success.
          </h2>
        </div>
      </div>
    </div>
  );
}
