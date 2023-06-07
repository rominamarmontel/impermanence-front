import { useEffect, useState } from 'react'
import myApi from '../service/service'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
import PDFViewer from '../components/PDFViewer';
import ScrollToTop from '../components/ScrollToTop';

const EditFilm = () => {
  const { id } = useParams()
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

  const navigate = useNavigate()

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    scrollToTop();
  }, []);

  useEffect(() => {
    myApi.get(`/en/films/${id}`).then((response) => {
      console.log(response)
      setCategory(response.data.oneFilm.category || '-1')
      setTitle(response.data.oneFilm.title || '')
      setOriginalTitle(response.data.oneFilm.originalTitle || '')
      setCopyright(response.data.oneFilm.copyright || '')
      setDirectedBy(response.data.oneFilm.directedBy || '')
      setProducedBy(response.data.oneFilm.producedBy || '')
      setAuthor(response.data.oneFilm.author || '')
      setFormat(response.data.oneFilm.format || '')
      setDuration(response.data.oneFilm.duration || '')
      setSynopsis(response.data.oneFilm.synopsis || '')
      setPartner(response.data.oneFilm.partner || '')
      setCreatedYear(response.data.oneFilm.createdYear || '')
      setFestivalsAndAwards(response.data.oneFilm.festivalsAndAwards || '')
      setDistribution(response.data.oneFilm.distribution || '')
      setInternationalSales(response.data.oneFilm.internationalSales || '')
      setStageOfProduction(response.data.oneFilm.stageOfProduction || '')
      setGenre(response.data.oneFilm.genre || '-1')
      setVideoOnDemand(response.data.oneFilm.videoOnDemand || '')
      setDownload(response.data.oneFilm.download || null)
      setImages(response.data.oneFilm.images || [])
      // const storedImages = localStorage.getItem('updatedImages');
      // if (storedImages) {
      //   setImages(JSON.parse(storedImages));
      // }
    })
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
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
      const updatedToFilm = await myApi.patch(`/en/films/edit/${id}`, formData)
      console.log(updatedToFilm)
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
        navigate('/admin/en/top')
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
        // localStorage.setItem('updatedImages', JSON.stringify(newImages));
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  };

  // useEffect(() => {
  //   const storedImages = JSON.parse(localStorage.getItem('updatedImages'));
  //   if (storedImages && storedImages.length > 0) {
  //     setImages(storedImages.length - 1);
  //   }
  // }, []);

  const hadleDelete = () => {
    myApi.delete(`/films/edit/${id}`).then(() => {
      navigate('/admin/en/top')
    })
  }

  return (
    <section className='EditFilm' style={{ paddingTop: '5rem', paddingBottom: '5rem', width: '100vw', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <div style={{ width: '80%' }}>
        <Link to='/admin/en/top' style={{ display: "flex", alignItems: "center", color: 'var(--color-pink)' }}>
          <AiOutlineLeft /> Back
        </Link>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>
          <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src='https://flagpedia.net/data/flags/icon/72x54/gb.png' alt='England' width={72} height={54} />
              <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', padding: 30 }}>EDIT THE FILM</h3>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>
            <label htmlFor='category' style={{ paddingBottom: 10 }}>Category</label>
            <select value={category} name='' id='' onChange={(e) => setCategory(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: 18, color: 'skyblue' }}>
              <option disabled value="-1">
                Select a category
              </option>
              <option value="work-in-progress">Work-in-progress</option>
              <option value="production">Production</option>
              <option value="distribution">Distribution</option>
              <option value="programmation">Programmation</option>
            </select>

            <label htmlFor='title' className='label' style={{ paddingBottom: 10 }}>Title</label>
            <input type='text' name='title' value={title || ''} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='originalTitle' style={{ paddingBottom: 10 }}>Original title</label>
            <input type='text' name='originalTitle' value={originalTitle || ''} onChange={(e) => setOriginalTitle(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='copyright' style={{ paddingBottom: 10 }}>Copyright</label>
            <input type='text' name='copyright' value={copyright || ''} onChange={(e) => setCopyright(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='directedBy' style={{ paddingBottom: 10 }}>Directed by</label>
            <textarea type='text' name='directedBy' value={directedBy || ''} onChange={(e) => setDirectedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='producedBy' style={{ paddingBottom: 10 }}>Produced by</label>
            <textarea type='text' name='producedBy' value={producedBy || ''} onChange={(e) => setProducedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='author' style={{ paddingBottom: 10 }}>Author(s)</label>
            <textarea type='text' name='author' value={author || ''} onChange={(e) => setAuthor(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='format' style={{ paddingBottom: 10 }}>Format</label>
            <input type='text' name='format' value={format || ''} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='duration' style={{ paddingBottom: 10 }}>Duration</label>
            <input type='text' name='duration' value={duration || ''} onChange={(e) => setDuration(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='synopsis' style={{ paddingBottom: 10 }}>Synopsis</label>
            <textarea type='text' name='synopsis' value={synopsis || ''} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='partner' style={{ paddingBottom: 10 }}>Partner(s)</label>
            <textarea type='text' name='partner' value={partner || ''} onChange={(e) => setPartner(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='createdYear' style={{ paddingBottom: 10 }}>Created year</label>
            <input type='text' name='createdYear' value={createdYear || ''} onChange={(e) => setCreatedYear(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='festivalsAndAwards' style={{ paddingBottom: 10 }}>Festivals & Awards</label>
            <textarea type='text' name='festivalsAndAwards' value={festivalsAndAwards || ''} onChange={(e) => setFestivalsAndAwards(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='distribution' style={{ paddingBottom: 10 }}>Distribution</label>
            <input type='text' name='distribution' value={distribution || ''} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='internationalSales' style={{ paddingBottom: 10 }}>International sales</label>
            <input type='text' name='internationalSales' value={internationalSales || ''} onChange={(e) => setInternationalSales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='stageOfProduction' style={{ paddingBottom: 10 }}>Stage of production</label>
            <input type='text' name='stageOfProduction' value={stageOfProduction || ''} onChange={(e) => setStageOfProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='genre' style={{ paddingBottom: 10 }}>Genre</label>
            <select value={genre || 'Science-fiction'} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40, fontSize: 18, color: 'skyblue' }}>
              <option disabled value="-1">
                Select a category
              </option>
              <option value="Science-fiction">Science-Fiction</option>
              <option value="Drama">Drama</option>
              <option value="Documentary">Documentary</option>
              <option value="Comedy">Comedy</option>
            </select>

            <label htmlFor='videoOnDemand' style={{ paddingBottom: 10 }}>Video on demand</label>
            <textarea type='text' name='videoOnDemand' value={videoOnDemand || ''} onChange={(e) => setVideoOnDemand(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='crew' style={{ paddingBottom: 10 }}>Crew</label>
            <textarea type='text' name='crew' value={crew || ''} onChange={(e) => setCrew(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='download'>Download</label>
            {downloadUrl && (
              <PDFViewer pdfUrl={downloadUrl} />
            )}
            <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />

            <label htmlFor='image' style={{ marginBottom: 10 }}>Image</label>
            <p style={{ color: 'red', lineHeight: 1, marginBottom: 10 }}>
              You cannot change or add images to the existing images. In case of addition or modification, the existing images will be reset. 3 images MAX</p>
            <input type='file' name='images' onChange={handleImageChange} style={{ marginBottom: 15 }} />

            {/* <div style={{ display: 'flex', width: '300px', flexWrap: 'wrap' }}>
              {images && images.map((image, index) => (
                <div key={index}>
                  <img src={image.imageUrl} alt={image.index} width={100} height={50} />
                </div>
              ))}
            </div> */}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button type='submit'>EDIT</button>
              <button onClick={hadleDelete}>DELETE</button>
            </div>
          </div>
        </form>
        <ScrollToTop />
      </div>
    </section>
  )
}

export default EditFilm