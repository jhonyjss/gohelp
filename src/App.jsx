import "./App.css";

function App() {
  return (
    <>
      <div className="overlay">
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
      </div>
    </>
  );
}

export default App;
