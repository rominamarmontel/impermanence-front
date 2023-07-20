import './AboutPage.css'
import { useEffect } from 'react';
import Contact from '../../components/Contact/Contact';
import ScrollToTop from '../../components/ScrollToTop'
import FadeIn from '../../components/FadeIn/FadeIn';

const AboutPage = () => {

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  return (
    <>
      <FadeIn>
        <section className="AboutPage" id='AboutPage'>
          <div className='AboutPage-title-container'>
            <picture>
              <img src='https://res.cloudinary.com/dyu65fpse/image/upload/v1688059960/impermanenceDB/Elegy_blur_qvnyky.jpg' />
            </picture>
            <h2 className='AboutPage-title'>à propos d’impermanence films</h2>
          </div>
          <div className='AboutPage-container'>
            <div className='AboutPage-container-sub'>
              <div className='AboutPage-content' >

                <p>Basée à Paris depuis 2011, Impermanence Films est une structure œuvrant pour la production, la diffusion et la programmation du cinéma documentaire, privilégiant les regards à hauteur humaine et les films produits dans un contexte de liberté formelle. En soutien aux oeuvres indépendantes, Impermanence Films mutualise et met à disposition des outils de production et de diffusion.</p>

                <br />

                <p>
                  Impermanence Films soutient essentiellement des documentaires et des films essais, autoproductions, films d’artistes, oeuvres collectives… Son apport à la production permet à l’auteur de garder le plein contrôle éditorial, et son soutien à la distribution aide la visibilité du film grâce au réseau et aux plateformes d’Impermanence.

                  Les oeuvres accompagnées par Impermanence Films, tant à la production qu’à la distribution, ont été diffusées et primées dans les festivals internationaux, diffusées en salle et à la télévision. En 2022-2023, les activités de production ont pris de l’essor et la distribution continue. Dans chaque domaine, le soutien proposé s’adapte aux besoins de chaque film.
                </p>

                <br />

                <p>
                  À l’origine du projet Impermanence, Les Rencontres Siréales ont réuni annuellement entre 2005 et 2008, des plasticiennes et réalisatrices autour des créations collectives et de la diffusion de leur travail, avec un esprit revendicateur pour plus de place des femmes dans la création visuelle et pour la production indépendante. Dans la continuité des Rencontres Siréales, un travail associatif de programmation -le premier projet d’Impermanence- a été accueilli en résidence dans une friche culturelle de la région parisienne, Anis Gras le lieu de l’autre. De nombreux collectifs se sont associés au projet, pour des propositions mêlant art contemporain et cinéma.
                </p>
                <br />
                <p>
                  Aujourd’hui, l’esprit de collectif et d’entraide perdure parmi les auteur.rices-réalisateur.rices gravitant autour d’Impermanence Films. Des projets collaboratifs autour d’artistes sont actuellement en production et une reprise des Rencontres Siréales est prévue pour 2024.
                </p>
              </div>
            </div>
            <Contact className='ContactPage-form' />
          </div>
          <ScrollToTop />
        </section >
      </FadeIn>
    </>
  )
}

export default AboutPage