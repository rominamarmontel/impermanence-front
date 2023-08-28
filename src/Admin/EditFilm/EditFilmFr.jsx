import { useEffect, useState } from 'react'
import myApi from '../../service/service'
import { useNavigate, useParams, Link } from 'react-router-dom'
// import PDFViewer from '../../components/PDFViewer';
import ScrollToTop from '../../components/ScrollToTop';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';

const EditFilmFr = () => {
  const { frenchId } = useParams()
  const [film, setFilm] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('-1')
  const [originalTitle, setOriginalTitle] = useState('')
  const [copyright, setCopyright] = useState('')
  const [directedBy, setDirectedBy] = useState('')
  const [producedBy, setProducedBy] = useState('')
  const [author, setAuthor] = useState('')
  const [format, setFormat] = useState('')
  const [duration, setDuration] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [partner, setPartner] = useState('')
  const [createdYear, setCreatedYear] = useState('')
  const [festivalsAndAwards, setFestivalsAndAwards] = useState('')
  const [distribution, setDistribution] = useState('')
  const [internationalSales, setInternationalSales] = useState('')
  const [stageOfProduction, setStageOfProduction] = useState('')
  const [genre, setGenre] = useState('-1')
  const [videoOnDemand, setVideoOnDemand] = useState('')
  const [crew, setCrew] = useState('')
  const [download, setDownload] = useState(null)
  // const [downloadUrl, setDownloadUrl] = useState(null)
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [detailImages, setDetailImages] = useState([]);
  const videoOnDemandUrls = videoOnDemand.split('\n');
  const [showConfettiExplosion, setShowConfettiExplosion] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  useEffect(() => {
    myApi.get(`/films/${frenchId}`).then((response) => {
      console.log(response)
      setFilm(response.data)
      setTitle(response.data.title || '')
      setCategory(response.data.category || '')
      setOriginalTitle(response.data.originalTitle || '')
      setCopyright(response.data.copyright || '')
      setDirectedBy(response.data.directedBy || '')
      setProducedBy(response.data.producedBy || '')
      setAuthor(response.data.author || '')
      setFormat(response.data.format || '')
      setDuration(response.data.duration || '')
      setSynopsis(response.data.synopsis || '')
      setPartner(response.data.partner || '')
      setCreatedYear(response.data.createdYear || '')
      setFestivalsAndAwards(response.data.festivalsAndAwards || '')
      setDistribution(response.data.distribution || '')
      setInternationalSales(response.data.internationalSales || '')
      setStageOfProduction(response.data.stageOfProduction || '')
      setGenre(response.data.genre || '-1')
      setVideoOnDemand(response.data.videoOnDemand || '')
      setDownload(response.data.download || null)
      setThumbnailImages(response.data.thumbnailImages || [])
      setDetailImages(response.data.detailImages || [])
    })
  }, [frenchId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    let errorMessage = '';
    if (!category || category === '-1') {
      errorMessage += 'Category is required.\n';
    }
    if (!title) {
      errorMessage += 'Title is required.\n';
    }
    if (!genre || genre === '-1') {
      errorMessage += 'Genre is required.\n';
    }
    if (thumbnailImages.length === 0 || detailImages.length === 0) {
      errorMessage += 'At least one image is required.\n';
    }
    if (errorMessage !== '') {
      alert(errorMessage);
      return;
    }
    const formData = new FormData()
    formData.append('category', category)
    formData.append('title', title)
    formData.append('copyright', copyright)
    formData.append('originalTitle', originalTitle)
    formData.append('directedBy', directedBy)
    formData.append('producedBy', producedBy)
    formData.append('author', author)
    formData.append('format', format)
    formData.append('duration', duration)
    formData.append('synopsis', synopsis)
    formData.append('partner', partner)
    formData.append('createdYear', createdYear)
    formData.append('festivalsAndAwards', festivalsAndAwards)
    formData.append('distribution', distribution)
    formData.append('internationalSales', internationalSales)
    formData.append('stageOfProduction', stageOfProduction)
    formData.append('genre', genre)
    formData.append('videoOnDemand', videoOnDemand)
    formData.append('videoOnDemandUrls', JSON.stringify(videoOnDemandUrls));
    formData.append('crew', crew)
    if (thumbnailImages && thumbnailImages.length > 0) {
      thumbnailImages.forEach(image => {
        formData.append('thumbnailImages', image.file);
      })
    } else {
      formData.delete('thumbnailImages')
    }
    if (detailImages && detailImages.length > 0) {
      detailImages.forEach(image => {
        formData.append('detailImages', image.file);
      })
    } else {
      formData.delete('detailImages')
    }


    if (download && download.size > 0) {
      formData.append('download', download);
    } else {
      formData.delete('download');
    }

    try {
      const updatedToFilm = await myApi.patch(`/films/edit/${frenchId}`, formData)
      if (updatedToFilm.status === 202) {
        setCategory('-1')
        setTitle('')
        setOriginalTitle('')
        setCopyright('')
        setDirectedBy('')
        setProducedBy('')
        setAuthor('')
        setFormat('')
        setDuration('')
        setSynopsis('')
        setPartner('')
        setCreatedYear('')
        setFestivalsAndAwards('')
        setDistribution('')
        setInternationalSales('')
        setStageOfProduction('')
        setGenre('-1')
        setVideoOnDemand('')
        setCrew('')
        setDownload('')
        setThumbnailImages('')
        setDetailImages('')
        setShowConfettiExplosion(true)
        setTimeout(() => {
          setShowConfettiExplosion(false)
          navigate(`/admin/films/edit/${frenchId}/en`)
        }, 3000)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDownloadChange = (e) => {
    const file = e.target.files[0];
    setDownload(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setDownloadUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // setDownloadUrl(null);
    }
  };

  const handleThumbnailImageChange = (e) => {
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
        setThumbnailImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  };

  const handleDetailImageChange = (e) => {
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
        setDetailImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  };

  return (
    <section>
      <div className='EditFilm' >
        <div >
          <div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Nunito', paddingTop: 15, paddingLeft: 30, paddingBottom: 15 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src='https://cdn.icon-icons.com/icons2/266/PNG/512/France_29740.png' alt='France' width={72} height={54} style={{ paddingRight: 20 }} />
                  <h3 style={{ color: 'lightgray', fontSize: '20px' }}>MODIFIER UN FILM</h3>
                  <h4 style={{ paddingLeft: 165 }}>{film.title}</h4>
                </div>
                <Link to={`/admin/films/edit/${frenchId}/en`} >
                  <div style={{ display: 'flex', alignItems: 'center', padding: '5px', color: 'green', fontSize: '16px', fontWeight: 400, border: '1px solid green', borderRadius: '5px', marginRight: 30 }}>
                    <img src='https://cdn.icon-icons.com/icons2/3665/PNG/512/gb_flag_great_britain_england_union_jack_english_icon_228674.png' alt='England' width={24} height={24} />
                    <p style={{ fontFamily: 'Nunito', fontWeight: 600, marginLeft: 10 }}>MODIFIER</p>
                  </div>
                </Link>
              </div>
            </div>


            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', paddingBottom: '3rem', fontFamily: 'Helvetica Neue', color: 'var(--color-gray7)', fontSize: '14px', overflowY: "scroll", width: '100%', height: '70vh', borderTop: '0.5px solid rgb(231, 228, 228)', borderBottom: '0.5px solid rgb(231, 228, 228)', backgroundColor: 'rgb(231, 228, 228)'
            }}>
              <div style={{ display: 'flex' }} className='form-style'>
                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>

                  <label htmlFor='category' style={{ paddingBottom: 5 }}>CATEGORIE</label>
                  <select value={category} name='' id='' onChange={(e) => setCategory(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Sélectionnez une catégorie
                    </option>
                    <option value="encours">en cours</option>
                    <option value="production">production</option>
                    <option value="distribution">distribution</option>
                    <option value="programmation">programmation</option>
                  </select>

                  <label htmlFor='title' className='label' style={{ paddingBottom: 5 }}>TITRE</label>
                  <input type='text' name='title' value={title || ''} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='originalTitle' style={{ paddingBottom: 5 }}>TITRE ORIGINAL</label>
                  <input type='text' name='originalTitle' value={originalTitle || ''} onChange={(e) => setOriginalTitle(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='copyright' style={{ paddingBottom: 5 }}>DROITS D’AUTEUR</label>
                  <input type='text' name='copyright' value={copyright || ''} onChange={(e) => setCopyright(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='directedBy' style={{ paddingBottom: 5 }}>RÉALISÉ PAR</label>
                  <textarea type='text' name='directedBy' value={directedBy || ''} onChange={(e) => setDirectedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='producedBy' style={{ paddingBottom: 5 }}>PRODUIT PAR</label>
                  <textarea type='text' name='producedBy' value={producedBy || ''} onChange={(e) => setProducedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='author' style={{ paddingBottom: 5 }}>AUTEUR(S)</label>
                  <textarea type='text' name='author' value={author || ''} onChange={(e) => setAuthor(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='format' style={{ paddingBottom: 5 }}>FORMAT</label>
                  <input type='text' name='format' value={format || ''} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='duration' style={{ paddingBottom: 5 }}>DURÉE</label>
                  <input type='text' name='duration' value={duration || ''} onChange={(e) => setDuration(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='synopsis' style={{ paddingBottom: 5 }}>SYNOPSIS</label>
                  <textarea type='text' name='synopsis' value={synopsis || ''} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>
                  <label htmlFor='partner' style={{ paddingBottom: 5 }}>PARTENAIRE(S)</label>
                  <textarea type='text' name='partner' value={partner || ''} onChange={(e) => setPartner(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='createdYear' style={{ paddingBottom: 5 }}>ANÉE DE CRÉATION</label>
                  <input type='text' name='createdYear' value={createdYear || ''} onChange={(e) => setCreatedYear(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='festivalsEtRecompense' style={{ paddingBottom: 5 }}>FESTIVALS & RÉCOMPENSES</label>
                  <textarea type='text' name='festivalsAndAwards' value={festivalsAndAwards || ''} onChange={(e) => setFestivalsAndAwards(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='distribution' style={{ paddingBottom: 5 }}>DISTRIBUTION</label>
                  <input type='text' name='distribution' value={distribution || ''} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='internationalSales' style={{ paddingBottom: 5 }}>VENTES INTERNATIONALES</label>
                  <input type='text' name='internationalSales' value={internationalSales || ''} onChange={(e) => setInternationalSales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='stageOfProduction' style={{ paddingBottom: 5 }}>ÉTAPE DE PRODUCTION</label>
                  <input type='text' name='stageOfProduction' value={stageOfProduction || ''} onChange={(e) => setStageOfProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='genre' style={{ paddingBottom: 5 }}>GENRE</label>
                  <select value={genre || 'Science-fiction'} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Sélectionnez une genre
                    </option>
                    <option value="science-fiction">science-Fiction</option>
                    <option value="drame">drama</option>
                    <option value="documentaire">documentary</option>
                    <option value="comedie">comedy</option>
                  </select>

                  <label htmlFor='videoOnDemand' style={{ paddingBottom: 5 }}>VIDÉO À LA DEMANDE</label>
                  <textarea type='text' name='videoOnDemand' value={videoOnDemand || ''} onChange={(e) => setVideoOnDemand(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='crew' style={{ paddingBottom: 5 }}>ÉQUIPE</label>
                  <textarea type='text' name='crew' value={crew || ''} onChange={(e) => setCrew(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />
                  <label htmlFor='download'>TÉLÉCHARGEMENT</label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    1 document ONLY = 1MB max.</small>

                  {/* {downloadUrl && (
                    <PDFViewer pdfUrl={downloadUrl} style={{ width: '100%', height: '500px' }} />
                  )} */}
                  <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />

                  <label htmlFor='thumbnailImages'>SMALL IMAGE<span style={{ color: 'red' }}>*</span></label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    You can select up to 1 image.<br />The first image selected will be displayed on the top screen.<br />1 image = 100KB max.(942x530px)</small>
                  <input
                    type='file'
                    name='thumbnailImages'
                    onChange={handleThumbnailImageChange}
                    style={{ marginBottom: 15 }}
                    id="thumbnail-image-input"
                    multiple
                  />
                  {thumbnailImages &&
                    <img src={thumbnailImages} alt='' style={{ width: '200px', height: 'auto' }} />
                  }

                  <label htmlFor='detailImages'>LARGE IMAGE<span style={{ color: 'red' }}>*</span></label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    You can select up to three images.<br />The first image selected will be displayed on the top screen.<br />1 image = 1MB max.(1920x1080px)</small>
                  <input
                    type='file'
                    name='detailImages'
                    onChange={handleDetailImageChange}
                    style={{ marginBottom: 15 }}
                    id="detail-image-input"
                    multiple
                  />
                  {detailImages &&
                    <img src={detailImages} alt='' style={{ width: '200px', height: 'auto' }} />
                  }
                </div>
              </div>
              <button type='submit' >MODIFIER</button>
              {showConfettiExplosion && <ConfettiExplosion />}
            </form>
            <ScrollToTop />
          </div>
        </div>
      </div >

    </section >
  )
}
EditFilmFr.propTypes = {
  imageUrl: PropTypes.string,
  onRemove: PropTypes.func
};
export default EditFilmFr