import './AboutPage.css'
import { useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import Contact from '../../components/Contact/Contact';
import ScrollToTop from '../../components/ScrollToTop'

const AboutPageEn = () => {
  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="AboutPage" id='AboutPage'>
        <div className='AboutPage-title-container'>
          <picture>
            <img src='https://res.cloudinary.com/dyu65fpse/image/upload/v1686047547/impermanenceDB/kipcpglnmwlc9ebdjybl.jpg' alt='elegie' />
          </picture>
          <Fade left>
            <h2 className='AboutPage-title'>about imparmanence</h2>
          </Fade>
        </div>
        <div className='AboutPage-container'>
          <div className='AboutPage-container-sub'>
            <div className='AboutPage-content' >
              <Fade bottom>
                <p>Based in Paris since 2011, Impermanence Films works for the production and distribution and programming of documentary cinema, favoring human perspective and films produced in a context of formal freedom.Essential support for independent works, Impermanence Films pools and provides production and distribution tools.</p>
              </Fade>
              <br />
            </div>
          </div>
          <Fade bottom>
            <Contact className='ContactPage-form' />
          </Fade>
        </div>
        <ScrollToTop />
      </section >
    </>
  )
}

export default AboutPageEn