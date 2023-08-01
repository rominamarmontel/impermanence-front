// const spinner =
//   'https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-lists/spinner.gif'

// import { useState, CSSProperties } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import './Spinner.css'
import { ColorRing } from 'react-loader-spinner'

function Spinner() {

  return (
    <div className='Spinner'>
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  )
}

export default Spinner