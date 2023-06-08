import { useEffect, useState } from 'react'
import myApi from '../service/service'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
// import PDFViewer from '../components/PDFViewer';
import ScrollToTop from '../components/ScrollToTop';

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
      console.log(updatedToFilm)
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
        navigate('/admin/top')
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
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  };

  const hadleDelete = () => {
    myApi.delete(`/films/edit/${id}`).then(() => {
      navigate('/admin/top')
    })
  }

  return (
    <section className='EditFilm' style={{ paddingTop: '5rem', paddingBottom: '5rem', width: '100vw', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <div style={{ width: '80%' }}>
        <Link to='/admin/top' style={{ display: "flex", alignItems: "center", color: 'var(--color-pink)' }}>
          <AiOutlineLeft /> Retour
        </Link>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>
          <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src='https://flagpedia.net/data/flags/icon/72x54/fr.png' alt='England' width={72} height={54} />
              <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', padding: 30 }}>MODIFIER UN FILM</h3>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <label htmlFor='categorie' style={{ paddingBottom: 10 }}>Categorie</label>
            <select value={categorie} name='' id='' onChange={(e) => setCategorie(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: 18, color: 'skyblue' }}>
              <option disabled value="-1">
                Sélectionnez une catégorie
              </option>
              <option value="travail-en-cours">TRAVAIL-EN-COURS</option>
              <option value="production">Production</option>
              <option value="distribution">Distribution</option>
              <option value="programmation">Programmation</option>
            </select>

            <label htmlFor='titre' className='label' style={{ paddingBottom: 10 }}>Titre</label>
            <input type='text' name='title' value={titre || ''} onChange={(e) => setTitre(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='titleOriginal' style={{ paddingBottom: 10 }}>Titre Original</label>
            <input type='text' name='titreOriginal' value={titreOriginal || ''} onChange={(e) => setTitreOriginal(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='droitsDauteur' style={{ paddingBottom: 10 }}>DroitsDauteur</label>
            <input type='text' name='droitsDauteur' value={droitsDauteur || ''} onChange={(e) => setDroitsDauteur(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='realisePar' style={{ paddingBottom: 10 }}>Realise par</label>
            <textarea type='text' name='realisePar' value={realisePar || ''} onChange={(e) => setRealisePar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='produitPar' style={{ paddingBottom: 10 }}>Produit par</label>
            <textarea type='text' name='produitPar' value={produitPar || ''} onChange={(e) => setProduitPar(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='auteur' style={{ paddingBottom: 10 }}>Auteur(s)</label>
            <textarea type='text' name='auteur' value={auteur || ''} onChange={(e) => setAuteur(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='format' style={{ paddingBottom: 10 }}>Format</label>
            <input type='text' name='format' value={format || ''} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='duree' style={{ paddingBottom: 10 }}>Durée</label>
            <input type='text' name='duree' value={duree || ''} onChange={(e) => setDuree(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='synopsis' style={{ paddingBottom: 10 }}>Synopsis</label>
            <textarea type='text' name='synopsis' value={synopsis || ''} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='partenaire' style={{ paddingBottom: 10 }}>Partenaire(s)</label>
            <textarea type='text' name='partenaire' value={partenaire || ''} onChange={(e) => setPartenaire(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='anneeDeCreation' style={{ paddingBottom: 10 }}>Année de création</label>
            <input type='text' name='anneeDeCreation' value={anneeDeCreation || ''} onChange={(e) => setAnneeDeCreation(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='festivalsEtRecompense' style={{ paddingBottom: 10 }}>Festivals & Récompenses</label>
            <textarea type='text' name='festivalsEtRecompenses' value={festivalsEtRecompenses || ''} onChange={(e) => setFestivalsEtRecompenses(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='distribution' style={{ paddingBottom: 10 }}>Distribution</label>
            <input type='text' name='distribution' value={distribution || ''} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='ventesInternationales' style={{ paddingBottom: 10 }}>Ventes internationales</label>
            <input type='text' name='ventesInternationales' value={ventesInternationales || ''} onChange={(e) => setVentesInternationales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='etapeDeProduction' style={{ paddingBottom: 10 }}>Etape de production</label>
            <input type='text' name='etapeDeProduction' value={etapeDeProduction || ''} onChange={(e) => setEtapeDeProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='genre' style={{ paddingBottom: 10 }}>Genre</label>
            <select value={genre || 'Science-fiction'} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40, fontSize: 18, color: 'skyblue' }}>
              <option disabled value="-1">
                Sélectionnez une genre
              </option>
              <option value="science-fiction">Science-Fiction</option>
              <option value="drame">Drama</option>
              <option value="documentaire">Documentary</option>
              <option value="comedie">Comedy</option>
            </select>

            <label htmlFor='videoALaDemande' style={{ paddingBottom: 10 }}>Vidéo à la demande</label>
            <textarea type='text' name='videoALaDemande' value={videoALaDemande || ''} onChange={(e) => setVideoALaDemande(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='equipe' style={{ paddingBottom: 10 }}>Equipe</label>
            <textarea type='text' name='equipe' value={equipe || ''} onChange={(e) => setEquipe(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='telechargement'>Téléchargement</label>
            {/* {telechargementUrl && (
              <PDFViewer pdfUrl={telechargementUrl} />
            )} */}
            <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />

            <label htmlFor='image' style={{ marginBottom: 10 }}>Image</label>
            <p style={{ color: 'red' }}>
              Vous ne pouvez pas modifier ou ajouter d’images aux images existantes. En cas d’ajout ou de modification, les images existantes seront réinitialisées. Maximum 3 images.</p>
            <input type='file' name='images' onChange={handleImageChange} style={{ marginBottom: 15 }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button type='submit'>MODIFIER</button>
              <button onClick={hadleDelete}>SUPPRIMER</button>
            </div>
          </div>
        </form>
        <ScrollToTop />
      </div>
    </section>
  )
}

export default EditFilm