import "./App.css";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

function App() {
  const [isFlipped, setFlipped] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
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

  return (
    <>
      <section className="container mx-auto px-4 h-screen flex-center flex-col">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <div className="flex items-end justify-center bg-white min-h-[399px] w-full rounded-lg shadow-lg overflow-hidden">
            <img src="/america_back.png" className="w-full max-h-full object-cover" alt="" />
          </div>

          <div className="flex items-end justify-center bg-white min-h-[399px] w-full rounded-lg shadow-lg overflow-hidden">
            <img src="/america_front.png" className="w-full max-h-full object-cover" alt="" />
          </div>
        </ReactCardFlip>
        <button className="bg-indigo-300 p-4" onClick={() => setFlipped(!isFlipped)}>
          FLIP
        </button>
      </section>
      {!isInstalled && !isIOS && (
        <section>
          <button onClick={handleInstallClick} className="custom-install-button">
            Instalar Go.help
          </button>
        </section>
      )}
      {isIOS && !isInstalled && (
        <div className="bottom mobile">
          <section className="section-container">
            Para obter a carteirinha do Go.Help no seu iPhone: clique em{" "}
            <img src="/apple-icon.png" width="24" alt="" style={{ position: "relative", top: "5px" }} /> e adicione à
            sua tela inicial
          </section>
        </div>
      )}
    </>
  );
}

export default App;
