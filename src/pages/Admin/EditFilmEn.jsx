import { useEffect, useState } from 'react'
import myApi from '../../service/service'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
import PDFViewer from '../../components/PDFViewer';
import ScrollToTop from '../../components/ScrollToTop';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';
import './Admin.css'

const EditFilm = () => {
  const { frenchId } = useParams()
  const [category, setCategory] = useState('-1')
  const [title, setTitle] = useState('')
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
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [images, setImages] = useState([]);
  const videoOnDemandUrls = videoOnDemand.split('\n');
  const [showConfettiExplosion, setShowConfettiExplosion] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  useEffect(() => {
    myApi.get(`/films/${frenchId}/en`).then((response) => {
      setCategory(response.data.category || '-1')
      setTitle(response.data.title || '')
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
      setImages(response.data.images || [])
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
    if (images.length === 0) {
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
    images.forEach(image => {
      if (images && images.length > 0) {
        formData.append('images', image.file);
      } else {
        formData.delete('images')
      }
    });

    if (download && download.size > 0) {
      formData.append('download', download);
    } else {
      formData.delete('download');
    }
    try {
      const updatedToFilm = await myApi.patch(`/films/edit/${frenchId}/en`, formData)
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
    setDownload(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDownloadUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setDownloadUrl(null);
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

  return (
    <section>
      <div className='EditFilm' style={{ width: '100vw', display: 'flex', justifyContent: 'center', paddingTop: 130 }}>
        <div style={{ width: '80%' }}>
          <Link to={`/admin/films/edit/${frenchId}`} style={{ display: "flex", alignItems: "center", color: 'black' }}>
            <AiOutlineLeft /> Back
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>

            <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src='https://cdn.icon-icons.com/icons2/3665/PNG/512/gb_flag_great_britain_england_union_jack_english_icon_228674.png' alt='England' width={72} height={54} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                  <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', paddingLeft: 30, paddingTop: 30 }}>EDIT THE FILM</h3>
                  <h4 style={{ fontFamily: 'Source Sans Pro', fontWeight: 600, paddingBottom: 30 }}>{title}</h4>
                </div>
              </div>
            </div>



            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', paddingBottom: '2rem', fontFamily: 'Helvetica Neue', color: 'var(--color-gray7)', fontSize: '14px'
            }}>
              <div style={{ display: 'flex' }} className='form-style'>
                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>

                  <label htmlFor='category' style={{ paddingBottom: 5 }}>CATEGORY</label>
                  <select value={category} name='' id='' onChange={(e) => setCategory(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Select a category
                    </option>
                    <option value="inprogress">in progress</option>
                    <option value="production">production</option>
                    <option value="distribution">distribution</option>
                    <option value="programmation">programmation</option>
                  </select>

                  <label htmlFor='title' className='label' style={{ paddingBottom: 5 }}>TITLE</label>
                  <input type='text' name='title' value={title || ''} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='originalTitle' style={{ paddingBottom: 5 }}>ORIGINAL TITLE</label>
                  <input type='text' name='originalTitle' value={originalTitle || ''} onChange={(e) => setOriginalTitle(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='copyright' style={{ paddingBottom: 5 }}>COPYRIGHT</label>
                  <input type='text' name='copyright' value={copyright || ''} onChange={(e) => setCopyright(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='directedBy' style={{ paddingBottom: 5 }}>DIRECTED BY</label>
                  <textarea type='text' name='directedBy' value={directedBy || ''} onChange={(e) => setDirectedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='producedBy' style={{ paddingBottom: 5 }}>PRODUCED BY</label>
                  <textarea type='text' name='producedBy' value={producedBy || ''} onChange={(e) => setProducedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='author' style={{ paddingBottom: 5 }}>AUTHOR(S)</label>
                  <textarea type='text' name='author' value={author || ''} onChange={(e) => setAuthor(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='format' style={{ paddingBottom: 5 }}>FORMAT</label>
                  <input type='text' name='format' value={format || ''} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='duration' style={{ paddingBottom: 5 }}>DURATION</label>
                  <input type='text' name='duration' value={duration || ''} onChange={(e) => setDuration(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='synopsis' style={{ paddingBottom: 5 }}>SYNOPSIS</label>
                  <textarea type='text' name='synopsis' value={synopsis || ''} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>
                  <label htmlFor='partner' style={{ paddingBottom: 5 }}>PARTNER(S)</label>
                  <textarea type='text' name='partner' value={partner || ''} onChange={(e) => setPartner(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='createdYear' style={{ paddingBottom: 5 }}>CREATED YEAR</label>
                  <input type='text' name='createdYear' value={createdYear || ''} onChange={(e) => setCreatedYear(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='festivalsAndAwards' style={{ paddingBottom: 5 }}>FESTIVALS & AWARDS</label>
                  <textarea type='text' name='festivalsAndAwards' value={festivalsAndAwards || ''} onChange={(e) => setFestivalsAndAwards(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='distribution' style={{ paddingBottom: 5 }}>DISTRIBUTION</label>
                  <input type='text' name='distribution' value={distribution || ''} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='internationalSales' style={{ paddingBottom: 5 }}>INTERNATIONAL SALES</label>
                  <input type='text' name='internationalSales' value={internationalSales || ''} onChange={(e) => setInternationalSales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='stageOfProduction' style={{ paddingBottom: 5 }}>STAGE OF PRODUCTION</label>
                  <input type='text' name='stageOfProduction' value={stageOfProduction || ''} onChange={(e) => setStageOfProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='genre' style={{ paddingBottom: 5 }}>GENRE</label>
                  <select value={genre || 'Science-fiction'} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Select a genre
                    </option>
                    <option value="science-fiction">science-fiction</option>
                    <option value="drama">drama</option>
                    <option value="documentary">documentary</option>
                    <option value="comedy">comedy</option>
                  </select>

                  <label htmlFor='videoOnDemand' style={{ paddingBottom: 5 }}>VIDEO ON DEMAND</label>
                  <textarea type='text' name='videoOnDemand' value={videoOnDemand || ''} onChange={(e) => setVideoOnDemand(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='crew' style={{ paddingBottom: 5 }}>CREW</label>
                  <textarea type='text' name='crew' value={crew || ''} onChange={(e) => setCrew(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='download'>DOWNLOAD</label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    1 document ONLY = 1MB max.</small>
                  {downloadUrl && (
                    <PDFViewer pdfUrl={downloadUrl} style={{ width: '100%', height: '500px' }} />
                  )}
                  <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />

                  <label htmlFor='image' style={{ marginBottom: 5 }}>IMAGE</label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    You cannot change or add images to the existing images.<br />In case of addition or modification, the existing images will be reset. 3 images MAX and 1 image = 100KB max.(1536x864px)</small>
                  <input type='file' name='images' onChange={handleImageChange} style={{ marginBottom: 15 }} id="image-input" />
                  {images &&
                    <img src={images} alt='' style={{ width: '200px', height: 'auto' }} />
                  }
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                <button type='submit' style={{ borderRadius: '3px', backgroundColor: 'var(--color-blue)' }}>EDIT</button>
                {showConfettiExplosion && <ConfettiExplosion />}
                <Link to='/admin/top' style={{ borderRadius: '3px', color: 'red', textDecoration: 'underline' }}>Cancel</Link>
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