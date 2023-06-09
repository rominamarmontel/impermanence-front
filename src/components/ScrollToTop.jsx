import { useEffect, useState } from 'react'
import { CgChevronUp } from 'react-icons/cg'

const PAGE_Y_OFFSET = 200

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  const changeShow = () => {
    if (window.pageYOffset > PAGE_Y_OFFSET) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', changeShow)
    return () => window.removeEventListener('scroll', changeShow)
  }, [])

  if (show)
    return (
      <div className="fixed bottom-10 right-10 z-10" style={{ position: 'fixed', bottom: -10, right: 15, zIndex: 10 }}>
        <CgChevronUp onClick={onScrollTop} style={{ backgroundColor: 'black', color: 'white', fontSize: 44, }} />
      </div >
    )
  else return null
}

export default ScrollToTop