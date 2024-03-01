import "./App.css";
function App() {
  let deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the default browser install prompt
    event.preventDefault();

    // Stash the event so it can be triggered later
    deferredPrompt = event;
  });

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
        deferredPrompt = null;
      });
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexFlow: "column" }}>
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
        <section>
          <button onClick={handleInstallClick} className="custom-install-button">
            Install App
          </button>
        </section>
      </div>
    </>
  );
}

export default App;
