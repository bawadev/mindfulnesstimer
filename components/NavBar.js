"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBook, faCogs, faBars, faDownload } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const hostPrefix = "";

const NavigationBar = () => {
  const path = usePathname();
  const [isWhite, setIsWhite] = useState(true);
  const popupRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  // Detect path for styling
  useEffect(() => {
    if (path.startsWith("/stat") || path.startsWith("/resources") || path.startsWith("/settings")) {
      setIsWhite(false);
    } else {
      setIsWhite(true);
    }
  }, [path]);

  // Handle click outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Capture the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setInstallPromptEvent(event); // Save the event for triggering later
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Trigger the install prompt
  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt(); // Show the install prompt
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        setInstallPromptEvent(null); // Clear the event after use
      });
    } else {
      alert("The app cannot be installed on this browser.");
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className={`text-3xl font-bold rounded-font ${isWhite ? "text-white" : "text-black"} md:ml-20`}>
          <Link href={`${hostPrefix}/`}>Mindfulness Timer</Link>
        </div>

        <div className="relative">
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`${isWhite ? "text-white" : "text-black"} focus:outline-none`}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </button>
          </div>

          {/* Popup Menu */}
          {showMenu && (
            <div ref={popupRef} className={`absolute top-12 right-0 mt-2 ${isWhite ? "bg-black" : "bg-white"} p-4 rounded-lg shadow-lg bg-opacity-80`}>
              <ul className="text-center">
                <li className="py-2">
                  <Link href={`${hostPrefix}/stats`} className={`text-lg ${isWhite ? "text-white" : "text-black"} hover:text-gray-800 underline`}>
                    <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                    Statistics
                  </Link>
                </li>
                <li className="py-2">
                  <Link href={`${hostPrefix}/resources`} className={`text-lg ${isWhite ? "text-white" : "text-black"} hover:text-gray-800 underline`}>
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    Resources
                  </Link>
                </li>
                <li className="py-2">
                  <Link href={`${hostPrefix}/settings`} className={`text-lg ${isWhite ? "text-white" : "text-black"} hover:text-gray-800 underline`}>
                    <FontAwesomeIcon icon={faCogs} className="mr-2" />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Desktop Menu */}
          <div className={`md:flex ${showMenu ? "block" : "hidden"} md:items-center space-x-6 mt-4 md:mt-0`}>
            <Link href={`${hostPrefix}/stats`} className={`${!isWhite ? "text-black" : "text-white"} hover:text-gray-800`}>
              <FontAwesomeIcon icon={faChartLine} size="2x" className={`m-5 ${!isWhite ? "text-black" : "text-white"}`} />
            </Link>
            <Link href={`${hostPrefix}/resources`} className={`${!isWhite ? "text-black" : "text-white"} hover:text-gray-800`}>
              <FontAwesomeIcon icon={faBook} size="2x" className={`m-5 ${!isWhite ? "text-black" : "text-white"}`} />
            </Link>
            <button onClick={handleInstallClick} className={`${!isWhite ? "text-black" : "text-white"} hover:text-gray-800`}>
              <FontAwesomeIcon icon={faDownload} size="2x" className={`m-5 ${!isWhite ? "text-black" : "text-white"}`} />
            </button>
            <Link href={`${hostPrefix}/settings`} className={`${!isWhite ? "text-black" : "text-white"} hover:text-gray-800`}>
              <FontAwesomeIcon icon={faCogs} size="2x" className={`m-5 ${!isWhite ? "text-black" : "text-white"}`} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
