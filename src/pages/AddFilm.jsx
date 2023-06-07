import { useState, useEffect } from 'react'
import myApi from '../service/service'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLeft, AiOutlineClose } from 'react-icons/ai'
import PDFViewer from '../components/PDFViewer';
import ScrollToTop from '../components/ScrollToTop';

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

  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categorie || !titre || images.length === 0) {
      alert('Please fill in all the required fields: category, title, and image.');
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

      const response = await myApi.post(`/films/create`, formData)
      console.log(response)
      navigate('/films')
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
      newImages.splice(index, 1);
      return newImages;
    });
  };
  // const ImagePreview = ({ imageUrl }) => {
  //   return <img src={imageUrl} alt="Preview" style={{ width: '200px', height: 'auto' }} />;
  // };


  return (
    <section className='AddFilm' style={{ paddingTop: '5rem', paddingBottom: '5rem', width: '100vw', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <div style={{ width: '80%' }}>
        <Link to='/admin/top' style={{ display: "flex", alignItems: "center", color: 'var(--color-pink)' }}><AiOutlineLeft /> Retour</Link>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>
          <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src='https://flagpedia.net/data/flags/icon/72x54/fr.png' alt='England' width={72} height={54} style={{ marginTop: 30, paddingRight: 20 }} />
              <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', paddingTop: 30 }}>CREE UN NOUVEAU FILM</h3>
            </div>
            <p style={{ textAlign: 'right', color: 'var(--color-gray3)', paddingRight: 20 }}><span style={{ color: 'red' }}>*</span>est obligatoire</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>

            <label htmlFor='category' style={{ paddingBottom: 10 }}>Categorie<span style={{ color: 'red' }}>*</span></label>
            <select value={categorie} name='' id='' onChange={(e) => setCategorie(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: 18, color: 'skyblue' }}>
              <option disabled value="-1">
                Sélectionnez une catégorie
              </option>
              <option value="travail-en-cours">TRAVAIL-EN-COURS</option>
              <option value="production">Production</option>
              <option value="distribution">Distribution</option>
              <option value="programmation">Programmation</option>
            </select>

            <label htmlFor='titre' style={{ paddingBottom: 10 }}>Titre<span style={{ color: 'red' }}>*</span></label>
            <input type='text' name='titre' value={titre} id='titre' onChange={(e) => setTitre(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='titreOriginal' style={{ paddingBottom: 10 }}>Titre original</label>
            <input type='text' name='titreOriginal' value={titreOriginal} onChange={(e) => setTitreOriginal(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='droitsDauteur' style={{ paddingBottom: 10 }}>Droits d’auteur</label>
            <input type='text' name='droitsDauteur' value={droitsDauteur} onChange={(e) => setDroitsDauteur(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='realisePar' style={{ paddingBottom: 10 }}>Réalisé par</label>
            <textarea type='text' name='realisePar' value={realisePar} onChange={(e) => setRealisePar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='produitPar' style={{ paddingBottom: 10 }}>Produit par</label>
            <textarea type='text' name='produitPar' value={produitPar} onChange={(e) => setProduitPar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='author' style={{ paddingBottom: 10 }}>Auteur</label>
            <textarea type='text' name='auteur' value={auteur} onChange={(e) => setAuteur(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='format' style={{ paddingBottom: 10 }}>Format</label>
            <input type='text' name='format' value={format} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='duree' style={{ paddingBottom: 10 }}>Durée</label>
            <input type='text' name='duree' value={duree} onChange={(e) => setDuree(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='synopsis' style={{ paddingBottom: 10 }}>Synopsis</label>
            <textarea type='text' name='synopsis' value={synopsis} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='partenaire' style={{ paddingBottom: 10 }}>Partenaire</label>
            <textarea type='text' name='partenaire' value={partenaire} onChange={(e) => setPartenaire(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='anneeDeCreation' style={{ paddingBottom: 10 }}>Année de création</label>
            <input type='text' name='anneeDeCreation' value={anneeDeCreation} onChange={(e) => setAnneeDeCreation(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='festivalsEtRecompenses' style={{ paddingBottom: 3 }}>Festivals & Récompenses</label>
            <textarea type='text' name='festivalsEtRecompenses' value={festivalsEtRecompenses} onChange={(e) => setFestivalsEtRecompenses(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='distribution' style={{ paddingBottom: 10 }}>Distribution</label>
            <input type='text' name='distribution' value={distribution} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='ventesInternationales' style={{ paddingBottom: 10 }}>Ventes internationales</label>
            <input type='text' name='ventesInternationales' value={ventesInternationales} onChange={(e) => setVentesInternationales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='etapeDeProduction' style={{ paddingBottom: 10 }}>Etape de production</label>
            <input type='text' name='etapeDeProduction' value={etapeDeProduction} onChange={(e) => setEtapeDeProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='genre' style={{ paddingBottom: 10 }}>Genre<span style={{ color: 'red' }}>*</span></label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: 18, color: 'skyblue' }} >
              <option disabled value="-1">
                Sélectionnez une genre
              </option>
              <option value="science-fiction">Science-Fiction</option>
              <option value="drame">Drame</option>
              <option value="documentaire">Documentaire</option>
              <option value="comedie">Comedie</option>
            </select>

            <label htmlFor='videoALaDemande' style={{ paddingBottom: 10 }}>Vidéo à la demande</label>
            <textarea type='text' name='videoALaDemande' value={videoALaDemande} onChange={(e) => setVideoALaDemande(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='equipe' style={{ paddingBottom: 10 }}>Equipe</label>
            <textarea type='text' name='equipe' value={equipe} onChange={(e) => setEquipe(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='telechargement'>Téléchargement</label>
            {telechargementUrl && (
              <PDFViewer pdfUrl={telechargementUrl} />
            )}
            <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />




            <label htmlFor='images'>Image<span style={{ color: 'red' }}>*</span></label>
            <p style={{ color: 'red' }}>
              Vous pouvez sélectionner jusqu’à trois images. La première image sélectionnée sera affichée en haut de l’écran.</p>
            <input type='file' name='images' onChange={handleImageChange} style={{ marginBottom: 15 }} />

            <div>
              {images && images.map((image, index) =>
              (
                <div key={index}>
                  <img src={image.imageUrl} alt={image.index} style={{ width: 300, height: 150 }} />
                  <AiOutlineClose onRemove={() => handleImageRemove(index)} style={{ backgroundColor: 'red' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type='submit'>CREER</button>
            </div>
          </div>
        </form>
        <ScrollToTop />
      </div>
    </section >
  )
}

export default AddFilm