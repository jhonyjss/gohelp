import "./App.css";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Auth from "./components/Auth";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { Download } from "lucide-react";
import AppleIcon from "./components/AppleIcon";

function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [isShadow, setShadow] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const isIOS = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    console.log(isIOS);

    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default browser install prompt
      event.preventDefault();

      // Stash the event so it can be triggered later
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the app is installed
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    // Trigger the deferredPrompt to show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }

        // Reset the deferredPrompt
      });
    }
  };

  const cardData = [
    { id: 1, frontImage: "/gobank_back.png", backImage: "/gobank_front.png" },
    { id: 2, frontImage: "/america_back.png", backImage: "/america_front.png" }
    // Add more card data as needed
  ];

  useEffect(() => {
    setShadow(false);
    const unlocked = localStorage.getItem("unlocked");

    setUnlock(unlocked);

    const timeoutId = setTimeout(() => {
      setShadow(true);
    }, 450);

    return () => clearTimeout(timeoutId);
  }, [isFlipped]);

  return (
    <section className="container mx-auto px-4 min-h-screen flex-center flex-col">
      <div className="flex items-center justify-center">
        <img src="/logo-mono.svg" className="w-[225px] mb-10" alt="" />
      </div>
      <div className="flex-center flex-col h-full">
        {!unlock ? (
          <Auth setUnlock={setUnlock} />
        ) : (
          <div className={`max-w-[320px] carousel rounded-box ${isShadow ? "shadow-custom transition" : ""}`}>
            {cardData.map((card) => (
              <div className="carousel-item w-full" key={`${card.id}-carousel`}>
                <ReactCardFlip key={card.id} isFlipped={isFlipped} flipDirection="horizontal">
                  {/* Front side */}
                  <div
                    className="flex justify-center bg-white min-h-[399px] w-full rounded-2xl overflow-hidden"
                    onClick={() => setFlipped(!isFlipped)}
                  >
                    <img src={card.backImage} className="w-full max-h-full object-cover" alt="" />
                  </div>

                  {/* Back side */}
                  <div
                    className="flex justify-center bg-white min-h-[399px] w-full rounded-2xl overflow-hidden"
                    onClick={() => setFlipped(!isFlipped)}
                  >
                    <img src={card.frontImage} className="w-full max-h-full object-cover" alt="" />
                  </div>
                </ReactCardFlip>
              </div>
            ))}
          </div>
        )}
      </div>

      {!unlock && !isIOS && !isInstalled && (
        <div className="btm-nav">
          <Button className="border-4 border-green-400 flex" onClick={handleInstallClick}>
            Baixe o app no seu celular <Download />
          </Button>
        </div>
      )}

      {!unlock ||
        (isIOS && !isInstalled && (
          <div className="bottom mobile my-4">
            <div
              role="alert"
              className="relative flex w-full px-4 py-4 text-base text-white bg-gray-900 rounded-lg font-regular"
            >
              <div className="shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col items-center ml-3 mr-12">
                <p>Adicione em sua tela inicial no iPhone clicando em</p>
                <p>
                  <img src="/apple-icon.png" className="w-5" />
                </p>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}

export default App;
