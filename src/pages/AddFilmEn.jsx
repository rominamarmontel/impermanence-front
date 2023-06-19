import React, { useState, useEffect } from 'react'
import myApi from '../service/service'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
import PDFViewer from '../components/PDFViewer';
import ScrollToTop from '../components/ScrollToTop';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';
import './Admin.css'
import ImagePreview from '../components/ImagePreview';
import { AiOutlineClose } from 'react-icons/ai'

const AddFilmEn = () => {
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
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [images, setImages] = useState([]);
  const videoOnDemandUrls = videoOnDemand.split('\n');
  const [showConfettiExplosion, setShowConfettiExplosion] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
    myApi.get(`/films/${frenchId}`).then((res) => {
      setFilm(res.data)
      console.log(res.data)
    })
  }, [frenchId])

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
      const formData = new FormData()
      formData.append('frenchId', frenchId)
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
        formData.append('images', image.file);
      });
      if (download && download.size > 0) {
        formData.append('download', download);
      } else {
        formData.delete('download');
      }
      const response = await myApi.post(`/films/create/en`, formData)
      if (response.status === 201) {
        setShowConfettiExplosion(true)
        setTimeout(() => {
          setShowConfettiExplosion(false)
          navigate(`/admin/top`)
        }, 3000)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDownload(null);
      // setDownloadUrl(null);
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
    setDownload(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDownloadUrl(reader.result)
      };
      reader.readAsDataURL(file);
    } else {
      setDownloadUrl(null)
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
    <section >
      <div className='AddFilm' style={{ width: '100vw', display: 'flex', justifyContent: 'center', paddingTop: 130 }}>
        <div style={{ width: '80%' }}>
          <Link to='/admin/top' style={{ display: "flex", alignItems: "center", color: 'black' }}><AiOutlineLeft /> Back</Link>

          <div style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>

            <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <img src='https://cdn.icon-icons.com/icons2/3665/PNG/512/gb_flag_great_britain_england_union_jack_english_icon_228674.png' alt='England' width={72} height={54} style={{ marginTop: 30, paddingRight: 20 }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                  <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', paddingTop: 30 }}>CREATE A NEW FILM</h3>
                  <h4 style={{ fontFamily: 'Source Sans Pro', fontWeight: 600 }}>{film.title}</h4>
                </div>
              </div>
              <p style={{ textAlign: 'right', color: 'black', paddingRight: 20 }}><span style={{ color: 'red' }}>*</span>champ is required</p>
            </div>

            <form onSubmit={handleSubmit} style={{
              display: 'flex', flexDirection: 'column', paddingBottom: '2rem', fontFamily: 'Helvetica Neue'
              , color: 'var(--color-gray7)', fontSize: '14px'
            }}>
              <div style={{ display: 'flex' }} className='form-style'>
                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>

                  <label htmlFor='category' style={{ paddingBottom: 5 }}>CATEGORY<span style={{ color: 'red' }}>*</span></label>
                  <select value={category} name='' id='' onChange={(e) => setCategory(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: '16px', color: 'var(--color-gray8)' }}>
                    <option disabled value="-1">
                      Select a category
                    </option>
                    <option value="work-in-progress">Work-in-progress</option>
                    <option value="production">Production</option>
                    <option value="distribution">Distribution</option>
                    <option value="programmation">Programmation</option>
                  </select>

                  <label htmlFor='title' style={{ paddingBottom: 5 }}>TITLE<span style={{ color: 'red' }}>*</span></label>
                  <input type='text' name='title' value={title} id='title' onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='originalTitle' style={{ paddingBottom: 5 }}>ORIGINAL TITLE</label>
                  <input type='text' name='originalTitle' value={originalTitle} onChange={(e) => setOriginalTitle(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='copyright' style={{ paddingBottom: 5 }}>COPYRIGHT</label>
                  <input type='text' name='copyright' value={copyright} onChange={(e) => setCopyright(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='directedBy' style={{ paddingBottom: 5 }}>DIRECTED BY</label>
                  <textarea type='text' name='directedBy' value={directedBy} onChange={(e) => setDirectedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='producedBy' style={{ paddingBottom: 5 }}>PRODUCED BY</label>
                  <textarea type='text' name='producedBy' value={producedBy} onChange={(e) => setProducedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='author' style={{ paddingBottom: 5 }}>AUTHOR</label>
                  <textarea type='text' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='format' style={{ paddingBottom: 5 }}>FORMAT</label>
                  <input type='text' name='format' value={format} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='duration' style={{ paddingBottom: 5 }}>DURATION</label>
                  <input type='text' name='duration' value={duration} onChange={(e) => setDuration(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='synopsis' style={{ paddingBottom: 5 }}>SYNOPSIS</label>
                  <textarea type='text' name='synopsis' value={synopsis} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />
                </div>


                <div style={{ display: 'flex', flexDirection: 'column', padding: 30, flex: 1 }}>
                  <label htmlFor='partner' style={{ paddingBottom: 5 }}>PARTNER</label>
                  <textarea type='text' name='partner' value={partner} onChange={(e) => setPartner(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='createdYear' style={{ paddingBottom: 5 }}>CREATED YEAR</label>
                  <input type='text' name='createdYear' value={createdYear} onChange={(e) => setCreatedYear(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='festivalsAndAwards' style={{ paddingBottom: 5 }}>FESTIVALS & AWARDS</label>
                  <textarea type='text' name='festivalsAndAwards' value={festivalsAndAwards} onChange={(e) => setFestivalsAndAwards(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='distribution' style={{ paddingBottom: 5 }}>DISTRIBUTION</label>
                  <input type='text' name='distribution' value={distribution} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='internationalSales' style={{ paddingBottom: 5 }}>INTERNATIONAL SALES</label>
                  <input type='text' name='internationalSales' value={internationalSales} onChange={(e) => setInternationalSales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='stageOfProduction' style={{ paddingBottom: 5 }}>STAGE OF PRODUCTION</label>
                  <input type='text' name='stageOfProduction' value={stageOfProduction} onChange={(e) => setStageOfProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

                  <label htmlFor='genre' style={{ paddingBottom: 5 }}>GENRE<span style={{ color: 'red' }}>*</span></label>
                  <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: '16px', color: 'var(--color-gray8)' }} >
                    <option disabled value="-1">
                      Select a genre
                    </option>
                    <option value="science-fiction">Sscience-fiction</option>
                    <option value="drama">drama</option>
                    <option value="documentary">documentary</option>
                    <option value="comedy">comedy</option>
                  </select>

                  <label htmlFor='videoOnDemand' style={{ paddingBottom: 5 }}>VIDEO ON DEMAND</label>
                  <textarea type='text' name='videoOnDemand' value={videoOnDemand} onChange={(e) => setVideoOnDemand(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='crew' style={{ paddingBottom: 5 }}>CREW</label>
                  <textarea type='text' name='crew' value={crew} onChange={(e) => setCrew(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

                  <label htmlFor='download'>DOWNLOAD</label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    1 document only = 1.5MB max.
                  </small>
                  {downloadUrl && (
                    <PDFViewer pdfUrl={downloadUrl} />
                  )}
                  <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />

                  <label htmlFor='images'>IMAGE<span style={{ color: 'red' }}>*</span></label>
                  <small style={{ color: 'red', lineHeight: '1rem' }}>
                    You can select up to three images.<br />The first image selected will be displayed on the top screen.<br />1 image = 1MB max.</small>
                  <input
                    type='file'
                    name='images'
                    onChange={handleImageChange}
                    style={{ marginBottom: 15 }}
                    id="image-input" />
                  {images && images.map((image, index) => (
                    <React.Fragment key={index}>
                      <div style={{ position: 'relative' }} key={index}>
                        <ImagePreview
                          imageUrl={image.imageUrl}
                        />
                        <AiOutlineClose
                          onClick={() => handleImageRemove(index)}
                          style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'white' }}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                <button type='submit' style={{ borderRadius: '3px', backgroundColor: 'var(--color-blue)' }}>SUBMIT</button>
                {showConfettiExplosion && <ConfettiExplosion />}
                <Link to='/admin/en/top' style={{ borderRadius: '3px', color: 'red', textDecoration: 'underline' }}>Cancel</Link>
              </div>

            </form>
            <ScrollToTop />
          </div>
        </div>
      </div >

    </section >
  )
}
AddFilmEn.propTypes = {
  imageUrl: PropTypes.string,
  onRemove: PropTypes.func
};
export default AddFilmEn