import { useState, useEffect } from 'react'
import myApi from '../service/service'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLeft } from 'react-icons/ai'
// import PDFViewer from '../components/PDFViewer';
import ScrollToTop from '../components/ScrollToTop';
import PropTypes from 'prop-types';

const AddFilm = () => {
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
  const [setDownloadUrl] = useState(null)
  const [images, setImages] = useState([]);
  const videoOnDemandUrls = videoOnDemand.split('\n');

  const navigate = useNavigate()

  useEffect(() => {
    scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !title || images.length === 0) {
      alert('Please fill in all the required fields: category, title, and image.');
      return;
    }
    try {
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
        formData.append('images', image.file);
      });
      console.log("images", images)
      if (download && download.size > 0) {
        formData.append('download', download);
      } else {
        formData.delete('download');
      }

      const response = await myApi.post(`/en/films/create`, formData)
      navigate('/en/films')
      console.log(response)
    } catch (error) {
      console.error(error);
    } finally {
      setDownload(null);
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
  console.log(images);


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
      newImages.splice(index, 1);
      return newImages;
    });
  };
  const ImagePreview = ({ imageUrl, onRemove }) => {
    return (
      <div>
        <img src={imageUrl} alt="Preview" style={{ width: '200px', height: 'auto' }} />
        <button onClick={onRemove}>Remove</button>
      </div>
    );
  };

  return (
    <section className='AddFilm' style={{ paddingTop: '5rem', paddingBottom: '5rem', width: '100vw', display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <div style={{ width: '80%' }}>
        <Link to='/admin/en/top' style={{ display: "flex", alignItems: "center", color: 'var(--color-pink)' }}><AiOutlineLeft /> Back</Link>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--color-gray3)', borderRadius: '10px', backgroundColor: 'var(--color-gray3)' }}>
          <div style={{ backgroundColor: 'var(--color-gray8)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src='https://flagpedia.net/data/flags/icon/72x54/gb.png' alt='England' width={72} height={54} style={{ marginTop: 30, paddingRight: 20 }} />
              <h3 style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Source Sans Pro', fontWeight: 600, fontSize: 30, color: 'white', paddingTop: 30 }}>CREATE A NEW FILM</h3>
            </div>
            <p style={{ textAlign: 'right', color: 'var(--color-gray3)', paddingRight: 20 }}><span style={{ color: 'red' }}>*</span>champ is required</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 30 }}>

            <label htmlFor='category' style={{ paddingBottom: 10 }}>Category<span style={{ color: 'red' }}>*</span></label>
            <select value={category} name='' id='' onChange={(e) => setCategory(e.target.value)} style={{ height: 40, marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: 18, color: 'skyblue' }}>
              <option disabled value="-1">
                Select a category
              </option>
              <option value="work-in-progress">Work-in-progress</option>
              <option value="production">Production</option>
              <option value="distribution">Distribution</option>
              <option value="programmation">Programmation</option>
            </select>

            <label htmlFor='title' style={{ paddingBottom: 10 }}>Title<span style={{ color: 'red' }}>*</span></label>
            <input type='text' name='title' value={title} id='title' onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='originalTitle' style={{ paddingBottom: 10 }}>Original Title</label>
            <input type='text' name='originalTitle' value={originalTitle} onChange={(e) => setOriginalTitle(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='copyright' style={{ paddingBottom: 10 }}>Copyright</label>
            <input type='text' name='copyright' value={copyright} onChange={(e) => setCopyright(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='directedBy' style={{ paddingBottom: 10 }}>Directed By</label>
            <textarea type='text' name='directedBy' value={directedBy} onChange={(e) => setDirectedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='producedBy' style={{ paddingBottom: 10 }}>Produced By</label>
            <textarea type='text' name='producedBy' value={producedBy} onChange={(e) => setProducedBy(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='author' style={{ paddingBottom: 10 }}>Author</label>
            <textarea type='text' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='format' style={{ paddingBottom: 10 }}>Format</label>
            <input type='text' name='format' value={format} onChange={(e) => setFormat(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='duration' style={{ paddingBottom: 10 }}>Duration</label>
            <input type='text' name='duration' value={duration} onChange={(e) => setDuration(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='synopsis' style={{ paddingBottom: 10 }}>Synopsis</label>
            <textarea type='text' name='synopsis' value={synopsis} onChange={(e) => setSynopsis(e.target.value)} style={{ height: '300px', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='partner' style={{ paddingBottom: 10 }}>Partner</label>
            <textarea type='text' name='partner' value={partner} onChange={(e) => setPartner(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='createdYear' style={{ paddingBottom: 10 }}>Created Year</label>
            <input type='text' name='createdYear' value={createdYear} onChange={(e) => setCreatedYear(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='festivalsAndAwards' style={{ paddingBottom: 3 }}>Festivals & Awards</label>
            <textarea type='text' name='festivalsAndAwards' value={festivalsAndAwards} onChange={(e) => setFestivalsAndAwards(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='distribution' style={{ paddingBottom: 10 }}>Distribution</label>
            <input type='text' name='distribution' value={distribution} onChange={(e) => setDistribution(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='internationalSales' style={{ paddingBottom: 10 }}>International Sales</label>
            <input type='text' name='internationalSales' value={internationalSales} onChange={(e) => setInternationalSales(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='stageOfProduction' style={{ paddingBottom: 10 }}>Stage of Production</label>
            <input type='text' name='stageOfProduction' value={stageOfProduction} onChange={(e) => setStageOfProduction(e.target.value)} style={{ marginBottom: 15, border: '1px solid var(--color-gray8)', borderRadius: 4, height: 40 }} />

            <label htmlFor='genre' style={{ paddingBottom: 10 }}>Genre</label>
            <select value={genre} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 15, height: 40, border: '1px solid var(--color-gray8)', borderRadius: 4, fontSize: 18, color: 'skyblue' }} >
              <option disabled value="-1">
                Select a category
              </option>
              <option value="Science-fiction">Science-Fiction</option>
              <option value="Drama">Drama</option>
              <option value="Documentary">Documentary</option>
              <option value="Comedy">Comedy</option>
            </select>

            <label htmlFor='videoOnDemand' style={{ paddingBottom: 10 }}>Video On Demand</label>
            <textarea type='text' name='videoOnDemand' value={videoOnDemand} onChange={(e) => setVideoOnDemand(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='crew' style={{ paddingBottom: 10 }}>Crew</label>
            <textarea type='text' name='crew' value={crew} onChange={(e) => setCrew(e.target.value)} style={{ height: '10rem', marginBottom: 15, fontSize: '1rem', border: '1px solid var(--color-gray8)', borderRadius: 4 }} />

            <label htmlFor='download'>Download</label>
            {/* {downloadUrl && (
              <PDFViewer pdfUrl={downloadUrl} />
            )} */}
            <input type="file" onChange={handleDownloadChange} style={{ marginBottom: 40 }} />

            <label htmlFor='images'>Image<span style={{ color: 'red' }}>*</span></label>
            <p style={{ color: 'red' }}>
              You can select up to three images. The first image selected will be displayed on the top screen.</p>
            <input type='file' name='images' onChange={handleImageChange} style={{ marginBottom: 15 }} />

            {images && images.map((image, index) => (
              <ImagePreview
                key={index}
                imageUrl={image.imageUrl}
                onRemove={() => handleImageRemove(index)}
              />
            ))}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type='submit'>SUBMIT</button>
            </div>
          </div>
        </form>
        <ScrollToTop />
      </div>
    </section >
  )
}
AddFilm.propTypes = {
  imageUrl: PropTypes.string,
  onRemove: PropTypes.func
};
export default AddFilm