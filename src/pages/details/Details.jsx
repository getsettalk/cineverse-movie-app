import React from 'react'
import "./style.scss"
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './VideoSection/VideoSection'
import Recommendation from './carousels/Recommendation'
import Similar from './carousels/Similar'
import ContentWrapper from '../../component/contentWrapper/ContentWrapper'


const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <ContentWrapper>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Recommendation  mediaType={mediaType} id={id} />
      <Similar mediaType={mediaType} id={id} />
    </ContentWrapper>
  )
}

export default Details