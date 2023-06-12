import { Document, Page } from 'react-pdf';
import PropTypes from 'prop-types';
import { pdfjs } from 'react-pdf';

const PDFViewer = ({ pdfUrl }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const workerSrc = `${BACKEND_URL}/pdf.worker.entry.js`;

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  return (
    <div>
      <Document file={pdfUrl} workerSrc={workerSrc}>
        <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} width={100} height={100} />
      </Document>
    </div>
  );
};

PDFViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default PDFViewer;