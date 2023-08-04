import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../component/genres/Genres";
import CircleRating from "../../../component/circleRating/CircleRating";
import Img from "../../../component/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./PlayIcon"
import VideoPopup from "../../../component/videoPopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {
    console.log("first V", video)
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);
    const _genres = data?.genres.map((g) => g?.id)

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "writer");

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <ContentWrapper>


                                <div className="backdrop-img">
                                    <Img src={url.backdrop + data.backdrop_path} />
                                </div>
                                <div className="opacity-layer"></div>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className="posterImg"
                                                src={url.backdrop + data.poster_path} />
                                        ) : (<Img className={posterImg}
                                            src={PosterFallback} />)}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title}  (${dayjs(data.release_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />
                                        <div className="row">
                                            <CircleRating
                                                rating={data.vote_average.toFixed(1)}
                                            />
                                            {video && (
                                                <div className="playbtn" onClick={() => {
                                                    setShow(true)
                                                    setVideoId(video?.key)
                                                }}>
                                                    <PlayIcon />
                                                    <span>Watch Trailer </span>
                                                </div>
                                            )}

                                        </div>
                                        <div className="overview">
                                            <h5 className="heading">Overview</h5>
                                            <div className="discription">
                                                {data.overview}
                                            </div>
                                        </div>
                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status : {""}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {mediaType && (
                                                <div className="infoItem mediatype">
                                                    <span className="text bold">
                                                        Type : {""}
                                                    </span>
                                                    <span className="text">
                                                        {mediaType == "tv" ? "Tv Show" : "Movie"}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date: {""}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Duration: {""}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director: {" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => {
                                                        return (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director.length - 1 !== i && ", "}
                                                            </span>
                                                        )
                                                    })}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer: {" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => {
                                                        return (
                                                            <span key={i}>
                                                                {d.name}
                                                                {writer.length - 1 !== i && ", "}
                                                            </span>
                                                        )
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator: {" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => {
                                                        return (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data?.created_by?.length - 1 !== i && ", "}
                                                            </span>
                                                        )
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}

                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;