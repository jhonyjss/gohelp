import "./App.css";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Auth from "./components/Auth";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { Download } from "lucide-react";

function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [isShadow, setShadow] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

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
        <img src="/logo.webp" className="max-w-[15rem] mb-10" alt="" />
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

      {
        <div className="btm-nav">
          <Button className="border-4 border-green-400 flex" onClick={handleInstallClick}>
            Baixe o app no seu celular <Download />
          </Button>
        </div>
      }

      {isIOS && !isInstalled && (
        <div className="bottom mobile">
          <section className="section-container">
            Para obter a carteirinha do Go.Help no seu iPhone: clique em{" "}
            <img src="/apple-icon.png" width="24" alt="" className="relative top-1" /> e adicione à sua tela inicial
          </section>
        </div>
      )}
    </section>
  );
}

export default App;
