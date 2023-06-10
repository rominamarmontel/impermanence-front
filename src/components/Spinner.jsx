// const spinner =
//   'https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-lists/spinner.gif'

// import ReactLoading from 'react-loading';

// import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './Spinner.css'

function Spinner() {
  return (
    <div className="Spinner">
      <ClipLoader type="spin" className='spin' color={'gray'} height={'1%'} width={'1%'}
        style={{ display: 'flex' }} />
    </div>
  )
}

export default Spinner