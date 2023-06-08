import './AboutPage.css'
import { useEffect } from 'react';
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
          <h2 className='AboutPage-title'>about imparmanence</h2>
        </div>
        <div className='AboutPage-container'>
          <div className='AboutPage-container-sub'>
            <div className='AboutPage-content' >
              <p>Based in Paris since 2011, Impermanence Films works for the production and distribution and programming of documentary cinema, favoring human perspective and films produced in a context of formal freedom.Essential support for independent works, Impermanence Films pools and provides production and distribution tools.</p>
              <br />
            </div>
          </div>
          <Contact className='ContactPage-form' />
        </div>
        <ScrollToTop />
      </section >
    </>
  )
}

export default AboutPageEn