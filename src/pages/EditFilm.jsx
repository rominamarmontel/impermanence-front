import { useEffect, useState } from 'react'
import myApi from '../service/service'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
// import PDFViewer from '../components/PDFViewer';
import ScrollToTop from '../components/ScrollToTop';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';
import './Admin.css'

const EditFilm = () => {
  const { id } = useParams()
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
  const [setTelechargementUrl] = useState(null)
  const [images, setImages] = useState([]);
  const videoALaDemandeUrls = videoALaDemande.split('\n');
  const [showConfettiExplosion, setShowConfettiExplosion] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  useEffect(() => {
    myApi.get(`/films/${id}`).then((response) => {
      setCategorie(response.data.getFilm.categorie || '-1')
      setTitre(response.data.getFilm.titre || '')
      setTitreOriginal(response.data.getFilm.titreOriginal || '')
      setDroitsDauteur(response.data.getFilm.droitsDauteur || '')
      setRealisePar(response.data.getFilm.realisePar || '')
      setProduitPar(response.data.getFilm.produitPar || '')
      setAuteur(response.data.getFilm.auteur || '')
      setFormat(response.data.getFilm.format || '')
      setDuree(response.data.getFilm.duree || '')
      setSynopsis(response.data.getFilm.synopsis || '')
      setPartenaire(response.data.getFilm.partenaire || '')
      setAnneeDeCreation(response.data.getFilm.anneeDeCreation || '')
      setFestivalsEtRecompenses(response.data.getFilm.festivalsEtRecompenses || '')
      setDistribution(response.data.getFilm.distribution || '')
      setVentesInternationales(response.data.getFilm.ventesInternationales || '')
      setEtapeDeProduction(response.data.getFilm.etapeDeProduction || '')
      setGenre(response.data.getFilm.genre || '-1')
      setVideoALaDemande(response.data.getFilm.videoALaDemande || '')
      setTelechargement(response.data.getFilm.telechargement || null)
      setImages(response.data.getFilm.images || [])
    })
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
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
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image.file);
      })
    } else {
      formData.delete('images')
    }

    if (telechargement && telechargement.size > 0) {
      formData.append('telechargement', telechargement);
    } else {
      formData.delete('telechargement');
    }

    try {
      const updatedToFilm = await myApi.patch(`/films/edit/${id}`, formData)
      if (updatedToFilm.status === 202) {
        setCategorie('-1')
        setTitre('')
        setTitreOriginal('')
        setDroitsDauteur('')
        setRealisePar('')
        setProduitPar('')
        setAuteur('')
        setFormat('')
        setDuree('')
        setSynopsis('')
        setPartenaire('')
        setAnneeDeCreation('')
        setFestivalsEtRecompenses('')
        setDistribution('')
        setVentesInternationales('')
        setEtapeDeProduction('')
        setGenre('-1')
        setVideoALaDemande('')
        setEquipe('')
        setTelechargement('')
        setImages('')
        setShowConfettiExplosion(true)
        setTimeout(() => {
          setShowConfettiExplosion(false)
          navigate('/admin/top')
        }, 3000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDownloadChange = (e) => {
    const file = e.target.files[0];
    setTelechargement(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTelechargementUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
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
        // localStorage.setItem('updatedImages', JSON.stringify(newImages));
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  };

  // const handleDownloadChange = (e) => {
  //   const file = e.target.files[0];
  //   setTelechargement(file)
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setTelechargementUrl(reader.result)
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setTelechargementUrl(null)
  //   }
  // };

  const hadleDelete = () => {
    myApi.delete(`/films/edit/${id}`).then(() => {
      navigate('/admin/top')
    })
  }


  return (
    <section>
      <div className='EditFilm' style={{ width: '100vw', display: 'flex', justifyContent: 'center', paddingTop: 130 }}>
        <div style={{ width: '80%' }}>
          <Link to='/admin/top' style={{ display: "flex", alignItems: "center", color: 'black' }}>
            <AiOutlineLeft /> Retour
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>

            <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <img src='https://cdn.icon-icons.com/icons2/266/PNG/512/France_29740.png' alt='France' width={72} height={54} />
                <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', padding: 30 }}>MODIFIER UN FILM</h3>
              </div>
            </div>


            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', paddingBottom: '2rem', fontFamily: 'Helvetica Neue', color: 'var(--color-gray7)', fontSize: '14px'
            }}>
              <div style={{ display: 'flex' }} className='form-style'>
                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>

                  <label htmlFor='categorie' style={{ paddingBottom: 5 }}>CATEGORIE</label>
                  <select value={categorie} name='' id='' onChange={(e) => setCategorie(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Sélectionnez une catégorie
                    </option>
                    <option value="travail-en-cours">Travail-en-cours</option>
                    <option value="production">Production</option>
                    <option value="distribution">Distribution</option>
                    <option value="programmation">Programmation</option>
                  </select>

                  <label htmlFor='titre' className='label' style={{ paddingBottom: 5 }}>TITRE</label>
                  <input type='text' name='title' value={titre || ''} onChange={(e) => setTitre(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='titleOriginal' style={{ paddingBottom: 5 }}>TITRE ORIGINAL</label>
                  <input type='text' name='titreOriginal' value={titreOriginal || ''} onChange={(e) => setTitreOriginal(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='droitsDauteur' style={{ paddingBottom: 5 }}>DROITS D’AUTEUR</label>
                  <input type='text' name='droitsDauteur' value={droitsDauteur || ''} onChange={(e) => setDroitsDauteur(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='realisePar' style={{ paddingBottom: 5 }}>RÉALISÉ PAR</label>
                  <textarea type='text' name='realisePar' value={realisePar || ''} onChange={(e) => setRealisePar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='produitPar' style={{ paddingBottom: 5 }}>PRODUIT PAR</label>
                  <textarea type='text' name='produitPar' value={produitPar || ''} onChange={(e) => setProduitPar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='auteur' style={{ paddingBottom: 5 }}>AUTEUR(S)</label>
                  <textarea type='text' name='auteur' value={auteur || ''} onChange={(e) => setAuteur(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='format' style={{ paddingBottom: 5 }}>FORMAT</label>
                  <input type='text' name='format' value={format || ''} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='duree' style={{ paddingBottom: 5 }}>DURÉE</label>
                  <input type='text' name='duree' value={duree || ''} onChange={(e) => setDuree(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='synopsis' style={{ paddingBottom: 5 }}>SYNOPSIS</label>
                  <textarea type='text' name='synopsis' value={synopsis || ''} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>
                  <label htmlFor='partenaire' style={{ paddingBottom: 5 }}>PARTENAIRE(S)</label>
                  <textarea type='text' name='partenaire' value={partenaire || ''} onChange={(e) => setPartenaire(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='anneeDeCreation' style={{ paddingBottom: 5 }}>ANÉE DE CRÉATION</label>
                  <input type='text' name='anneeDeCreation' value={anneeDeCreation || ''} onChange={(e) => setAnneeDeCreation(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='festivalsEtRecompense' style={{ paddingBottom: 5 }}>FESTIVALS & RÉCOMPENSES</label>
                  <textarea type='text' name='festivalsEtRecompenses' value={festivalsEtRecompenses || ''} onChange={(e) => setFestivalsEtRecompenses(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='distribution' style={{ paddingBottom: 5 }}>DISTRIBUTION</label>
                  <input type='text' name='distribution' value={distribution || ''} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='ventesInternationales' style={{ paddingBottom: 5 }}>VENTES INTERNATIONALES</label>
                  <input type='text' name='ventesInternationales' value={ventesInternationales || ''} onChange={(e) => setVentesInternationales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='etapeDeProduction' style={{ paddingBottom: 5 }}>ÉTAPE DE PRODUCTION</label>
                  <input type='text' name='etapeDeProduction' value={etapeDeProduction || ''} onChange={(e) => setEtapeDeProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='genre' style={{ paddingBottom: 5 }}>GENRE</label>
                  <select value={genre || 'Science-fiction'} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Sélectionnez une genre
                    </option>
                    <option value="science-fiction">Science-Fiction</option>
                    <option value="drame">Drama</option>
                    <option value="documentaire">Documentary</option>
                    <option value="comedie">Comedy</option>
                  </select>

                  <label htmlFor='videoALaDemande' style={{ paddingBottom: 5 }}>VIDÉO À LA DEMANDE</label>
                  <textarea type='text' name='videoALaDemande' value={videoALaDemande || ''} onChange={(e) => setVideoALaDemande(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='equipe' style={{ paddingBottom: 5 }}>ÉQUIPE</label>
                  <textarea type='text' name='equipe' value={equipe || ''} onChange={(e) => setEquipe(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='telechargement'>TÉLÉCHARGEMENT</label>
                  {/* {telechargementUrl && (
                  <PDFViewer pdfUrl={telechargementUrl} />
                )} */}
                  <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />

                  <label htmlFor='image'>IMAGE</label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    Vous ne pouvez pas modifier ou ajouter d’images aux images existantes.<br />En cas d’ajout ou de modification, les images existantes seront réinitialisées. <br />Maximum 3 images and 1 image = 1MB max. </small>
                  <input type='file' name='images' onChange={handleImageChange} style={{ marginBottom: 15 }} />
                  {images &&
                    <img src={images} alt='' style={{ width: '200px', height: 'auto' }} />
                  }
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                <button type='submit' style={{ borderRadius: '3px', backgroundColor: 'var(--color-blue)' }}>MODIFIER</button>
                {showConfettiExplosion && <ConfettiExplosion />}
                <button onClick={hadleDelete} style={{ borderRadius: '3px', backgroundColor: 'var(--color-gray8)' }}>SUPPRIMER</button>
                <Link to='/admin/top' style={{ borderRadius: '3px', color: 'red', textDecoration: 'underline' }}>Annuler</Link>
              </div>
            </form>
            <ScrollToTop />
          </div>
        </div>
      </div>

    </section>
  )
}
EditFilm.propTypes = {
  imageUrl: PropTypes.string,
  onRemove: PropTypes.func
};
export default EditFilm