import React, { useEffect, useState } from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../component/lazyLoadImage/Img';
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper'


const HeroBanner = () => {
  const { data, loading } = useFetch("/movie/upcoming");
  const [background, setBackground] = useState("")

  // select Redux Store data
  const { url } = useSelector((state) => state.home)

  // selecting random backdrop image path 
  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg)
  }, [data])

  const [query, setQuery] = useState("")
  const navigate = useNavigate();


  const searchQueryHandle = (event) => {
    if (event.key == "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    } else if (event.type === "click" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }


  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper >
        <div className="heroBannerContent">
          <span className="title">Lights, camera, action</span>
          <span className="subTitle">
            Millions of movie, Tv shows and people to discover, Explore now
          </span>
          <div className="searchInput">
            <input type="text" name="qu" id="qu"
              placeholder='Search Movie or Shows ...'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandle} />
            <button onClick={searchQueryHandle}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner