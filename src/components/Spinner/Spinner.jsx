// const spinner =
//   'https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-lists/spinner.gif'

// import { useState, CSSProperties } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import './Spinner.css'
import { Audio } from 'react-loader-spinner'

function Spinner() {

  return (
    <div className='Spinner'>
      <Audio
        height="80"
        width="80"
        radius="9"
        color='gray'
        ariaLabel='three-dots-loading'
        wrapperStyle
        wrapperClass
      />
    </div>
  )
}

export default Spinner