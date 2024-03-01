import "./App.css";
import { useEffect, useState } from "react";

function App() {
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
      <div style={{ display: "flex", flexFlow: "column", height: "100vh" }}>
        <section style={{ padding: "35px 0" }}>
          <div className="credit-card-wrap">
            <div className="mk-icon-world-map"></div>
            <div className="credit-card-inner">
              <header className="header">
                <div className="credit-logo">
                  <div>
                    <span className="txt">
                      <img src="/icon.png" alt="" width={40} height={40} />
                    </span>
                    <span className="text">GO.HELP</span>
                  </div>
                </div>
              </header>
              <br />
              <br />
              <br />
              <br />
              <div className="credit-font credit-card-number">4716 6109 5211 3010</div>
              <footer className="footer">
                <div className="clearfix">
                  <div className="pull-left">
                    <div className="credit-card-date"></div>
                    <div className="credit-font credit-author">FULANO ONORIO SOUZA</div>
                  </div>
                  <div className="pull-right">
                    <div className="mk-icon-visa"></div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
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
      </div>
    </>
  );
}

export default App;
