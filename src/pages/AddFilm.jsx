import { useState, useEffect } from 'react'
import myApi from '../service/service'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
import PDFViewer from '../components/PDFViewer';
import ScrollToTop from '../components/ScrollToTop';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';
import './Admin.css'
import ImagePreview from '../components/ImagePreview';
import { AiOutlineClose } from 'react-icons/ai'

const AddFilm = () => {
  const [titre, setTitre] = useState('')
  const [categorie, setCategorie] = useState('-1')
  const [titreOriginal, setTitreOriginal] = useState('')
  const [droitsDauteur, setDroitsDauteur] = useState('')
  const [realisePar, setRealisePar] = useState('')
  const [produitPar, setProduitPar] = useState('')
  const [auteur, setAuteur] = useState('')
  const [format, setFormat] = useState('')
  const [duree, setDuree] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [partenaire, setPartenaire] = useState('')
  const [anneeDeCreation, setAnneeDeCreation] = useState('')
  const [festivalsEtRecompenses, setFestivalsEtRecompenses] = useState('')
  const [distribution, setDistribution] = useState('')
  const [ventesInternationales, setVentesInternationales] = useState('')
  const [etapeDeProduction, setEtapeDeProduction] = useState('')
  const [genre, setGenre] = useState('-1')
  const [videoALaDemande, setVideoALaDemande] = useState('')
  const [equipe, setEquipe] = useState('')
  const [telechargement, setTelechargement] = useState(null)
  const [telechargementUrl, setTelechargementUrl] = useState(null)
  const [images, setImages] = useState([]);
  const videoALaDemandeUrls = videoALaDemande.split('\n');
  const [showConfettiExplosion, setShowConfettiExplosion] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMessage = '';
    if (!categorie || categorie === '-1') {
      errorMessage += 'Category is required.\n';
    }
    if (!titre) {
      errorMessage += 'Title is required.\n';
    }
    if (!genre || genre === '-1') {
      errorMessage += 'Genre is required.\n';
    }
    if (images.length === 0) {
      errorMessage += 'At least one image is required.\n';
    }
    if (errorMessage !== '') {
      alert(errorMessage);
      return;
    }
    try {
      const formData = new FormData()
      formData.append('categorie', categorie)
      formData.append('titre', titre)
      formData.append('droitsDauteur', droitsDauteur)
      formData.append('titreOriginal', titreOriginal)
      formData.append('realisePar', realisePar)
      formData.append('produitPar', produitPar)
      formData.append('auteur', auteur)
      formData.append('format', format)
      formData.append('duree', duree)
      formData.append('synopsis', synopsis)
      formData.append('partenaire', partenaire)
      formData.append('anneeDeCreation', anneeDeCreation)
      formData.append('festivalsEtRecompenses', festivalsEtRecompenses)
      formData.append('distribution', distribution)
      formData.append('ventesInternationales', ventesInternationales)
      formData.append('etapeDeProduction', etapeDeProduction)
      formData.append('genre', genre)
      formData.append('videoALaDemande', videoALaDemande)
      formData.append('videoALaDemandeUrls', JSON.stringify(videoALaDemandeUrls));
      formData.append('equipe', equipe)
      images.forEach(image => {
        formData.append('images', image.file);
      });
      if (telechargement && telechargement.size > 0) {
        formData.append('telechargement', telechargement);
      } else {
        formData.delete('telechargement');
      }
      if (!categorie || !titre || !genre || images.length === 0) {
        alert('Please fill in all the required fields: category, title, genre, and image.');
        return;
      }
      const response = await myApi.post(`/films/create`, formData)
      if (response.status === 201) {
        setShowConfettiExplosion(true)
        setTimeout(() => {
          setShowConfettiExplosion(false)
          navigate('/films')
        }, 3000)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTelechargement(null);
      setTelechargementUrl(null);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    const loadImage = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ file, imageUrl: reader.result });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    Promise.all(files.map(loadImage))
      .then((images) => {
        images.forEach((image) => {
          newImages.push(image);
        });
        setImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  };

  const handleDownloadChange = (e) => {
    const file = e.target.files[0];
    setTelechargement(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTelechargementUrl(reader.result)
      };
      reader.readAsDataURL(file);
    } else {
      setTelechargementUrl(null)
    }
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const removedImage = newImages.splice(index, 1)[0];
      URL.revokeObjectURL(removedImage.imageUrl);
      const inputElement = document.getElementById('image-input');
      inputElement.value = '';
      return newImages;
    });
  };

  return (
    <section>
      <div className='AddFilm' style={{ width: '100vw', display: 'flex', justifyContent: 'center', paddingTop: 130 }}>
        <div style={{ width: '80%' }}>
          <Link to='/admin/top' style={{ display: "flex", alignItems: "center", color: 'black' }}><AiOutlineLeft /> Retour</Link>

          <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>

            <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <img src='https://cdn.icon-icons.com/icons2/266/PNG/512/France_29740.png' alt='France' width={72} height={54} style={{ marginTop: 30, paddingRight: 20 }} />
                <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', paddingTop: 30 }}>CREE UN NOUVEAU FILM</h3>
              </div>
              <p style={{ textAlign: 'right', color: 'black', paddingRight: 20 }}><span style={{ color: 'red' }}>*</span>est obligatoire</p>
            </div>


            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', paddingBottom: '2rem', fontFamily: 'Helvetica Neue', color: 'var(--color-gray7)', fontSize: '14px'
            }}>
              <div style={{ display: 'flex' }} className='form-style'>
                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>

                  <label htmlFor='category' style={{ paddingBottom: 10 }}>CATEGORIE<span style={{ color: 'red' }}>*</span></label>
                  <select value={categorie} name='' id='' onChange={(e) => setCategorie(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Sélectionnez une catégorie
                    </option>
                    <option value="travail-en-cours">Travail-en-cours</option>
                    <option value="production">Production</option>
                    <option value="distribution">Distribution</option>
                    <option value="programmation">Programmation</option>
                  </select>

                  <label htmlFor='titre' style={{ paddingBottom: 5 }}>TITRE<span style={{ color: 'red' }}>*</span></label>
                  <input type='text' name='titre' value={titre} id='titre' onChange={(e) => setTitre(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='titreOriginal' style={{ paddingBottom: 5 }}>TITRE ORIGINAL</label>
                  <input type='text' name='titreOriginal' value={titreOriginal} onChange={(e) => setTitreOriginal(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='droitsDauteur' style={{ paddingBottom: 5 }}>DROITS D’AUTEUR</label>
                  <input type='text' name='droitsDauteur' value={droitsDauteur} onChange={(e) => setDroitsDauteur(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='realisePar' style={{ paddingBottom: 5 }}>RÉALISÉ PAR</label>
                  <textarea type='text' name='realisePar' value={realisePar} onChange={(e) => setRealisePar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='produitPar' style={{ paddingBottom: 5 }}>PRODUIT PAR</label>
                  <textarea type='text' name='produitPar' value={produitPar} onChange={(e) => setProduitPar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='author' style={{ paddingBottom: 5 }}>AUTEUR(S)</label>
                  <textarea type='text' name='auteur' value={auteur} onChange={(e) => setAuteur(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='format' style={{ paddingBottom: 5 }}>FORMAT</label>
                  <input type='text' name='format' value={format} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='duree' style={{ paddingBottom: 5 }}>DURÉE</label>
                  <input type='text' name='duree' value={duree} onChange={(e) => setDuree(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='synopsis' style={{ paddingBottom: 5 }}>SYNOPSIS</label>
                  <textarea type='text' name='synopsis' value={synopsis} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />
                </div>


                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>
                  <label htmlFor='partenaire' style={{ paddingBottom: 5 }}>PARTENAIRE(S)</label>
                  <textarea type='text' name='partenaire' value={partenaire} onChange={(e) => setPartenaire(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='anneeDeCreation' style={{ paddingBottom: 5 }}>ANÉE DE CRÉATION</label>
                  <input type='text' name='anneeDeCreation' value={anneeDeCreation} onChange={(e) => setAnneeDeCreation(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='festivalsEtRecompenses' style={{ paddingBottom: 5 }}>FESTIVALS & RÉCOMPENSES</label>
                  <textarea type='text' name='festivalsEtRecompenses' value={festivalsEtRecompenses} onChange={(e) => setFestivalsEtRecompenses(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='distribution' style={{ paddingBottom: 5 }}>DISTRIBUTION</label>
                  <input type='text' name='distribution' value={distribution} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='ventesInternationales' style={{ paddingBottom: 5 }}>VENTES INTERNATIONALES</label>
                  <input type='text' name='ventesInternationales' value={ventesInternationales} onChange={(e) => setVentesInternationales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='etapeDeProduction' style={{ paddingBottom: 5 }}>ÉTAPE DE PRODUCTION</label>
                  <input type='text' name='etapeDeProduction' value={etapeDeProduction} onChange={(e) => setEtapeDeProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='genre' style={{ paddingBottom: 5 }}>GENRE<span style={{ color: 'red' }}>*</span></label>
                  <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: '16px', color: 'var(--color-gray8)' }} >
                    <option disabled value="-1">
                      Sélectionnez une genre
                    </option>
                    <option value="science-fiction">Science-Fiction</option>
                    <option value="drame">Drame</option>
                    <option value="documentaire">Documentaire</option>
                    <option value="comedie">Comedie</option>
                  </select>

                  <label htmlFor='videoALaDemande' style={{ paddingBottom: 5 }}>VIDÉO À LA DEMANDE</label>
                  <textarea type='text' name='videoALaDemande' value={videoALaDemande} onChange={(e) => setVideoALaDemande(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='equipe' style={{ paddingBottom: 5 }}>ÉQUIPE</label>
                  <textarea type='text' name='equipe' value={equipe} onChange={(e) => setEquipe(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='telechargement'>TÉLÉCHARGEMENT</label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    1 document only = 1.5MB max.
                  </small>
                  {telechargementUrl && (
                    <PDFViewer pdfUrl={telechargementUrl} />
                  )}
                  <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />


                  <label htmlFor='images'>IMAGE<span style={{ color: 'red' }}>*</span></label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    Vous pouvez sélectionner jusqu’à trois images.<br />La première image sélectionnée sera affichée en haut de l’écran.<br />
                    1 image = 1MB max.
                  </small>
                  <input
                    type='file'
                    name='images'
                    onChange={handleImageChange}
                    style={{ marginBottom: 15 }}
                    id="image-input" />
                  {images && images.map((image, index) =>
                  (
                    <>
                      <div style={{ position: 'relative' }} key={index}>
                        <ImagePreview
                          key={index}
                          imageUrl={image.imageUrl}
                        />
                        <AiOutlineClose
                          onClick={() => handleImageRemove(index)}
                          style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'white' }}
                        />
                      </div>
                    </>
                  ))}
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                <button type='submit' style={{ borderRadius: '3px', backgroundColor: 'var(--color-blue)' }}>CREER</button>
                {showConfettiExplosion && <ConfettiExplosion />}
                <Link to='/admin/top' style={{ borderRadius: '3px', color: 'red', textDecoration: 'underline' }}>Cancel</Link>
              </div>
            </form>
            <ScrollToTop />
          </div>
        </div>
      </div >

    </section >
  )
}
AddFilm.propTypes = {
  imageUrl: PropTypes.string,
  onRemove: PropTypes.func
};
export default AddFilm