// import page style
import "./landing.style.css";

// import hero avatar
import hero from "../../assets/img/hero.svg"; 

// social media component
import SocialMedia from "../../shared/socialMedia/SocialMedia";



const Landing = () => {
  return (
    <div className='background-container'>
      <div className="container landing-page-container">
        <div className="row align-items-center">
          <div className="col-md-12 col-lg-6">
            <div className="intro-container">
              <div className="intro--title">
                <h2>
                  Unleash the power of <br></br>
                  your personal <span className="primary-text"> information</span>
                </h2>
              </div>
              <div className="intro--description"><p>QSTN powers an ecosystem where users answer questions,
                earn credits and spend these rewards within our digital environment.</p></div>
              <div className="intro-buttons-container  d-flex flex-column flex-lg-row">
                <button className="btn btn-primary primary-button me-2 mt-5-sm">
                  Enter App
                </button>
                <button type="button" className="btn btn-light secondary-button">Learn more</button>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="d-flex justify-content-center justify-content-lg-end hero-container">
              <img src={hero} alt="hero" />
            </div>
          </div>
        </div>
        <SocialMedia/>
      </div>
    </div>

  );
};

export default Landing;
