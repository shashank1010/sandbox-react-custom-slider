import { useAppDispatch, useAppSelector } from "../../app/store"
import { useSliderContext } from "./SliderContext";
import { getSlides, goToNext, goToSlide, goToPrevious, getCurrentIndex, getPlayingStatus, SliderStatus, toggle } from "./sliderSlice";


import navigationStyles from "./navigation.module.css";
import cn from "classnames";
import { useState } from "react";


const Thumb: React.FC<{ active: boolean; index: number; onClick: (index: number) => void}> = ({ onClick, index, active }) => {
    const handleClick = () => {
        onClick(index);
    }
    
    return <span className={cn(navigationStyles.thumb, active && navigationStyles.activeThumb)} onClick={handleClick}></span>
}

const Navigation: React.FC = () => {
    const { loop, showThumbnails, showNavigation, toggle, onAdd, toggleLoop } = useSliderContext();
    const dispatch = useAppDispatch();
    const slides = useAppSelector(getSlides);
    const currentIndex = useAppSelector(getCurrentIndex);
    const isPlaying = useAppSelector(getPlayingStatus) === SliderStatus.PLAYING;

    const goNext = () => {
        dispatch(goToNext({ loop }))
    }

    const onPrev = () => {
        dispatch(goToPrevious({ loop }))
    }

    const handleGoToIndex = (toIndex: number) => {
        dispatch(goToSlide({ toIndex }))
    }

    if (!showNavigation) { return null; }


    const renderThumbs = () => {
        if (!showThumbnails) {return null }

        return slides.map((_, index) => <Thumb key={index} index={index} active={currentIndex === index} onClick={handleGoToIndex} />);
    }

    
    return (
        <div className={navigationStyles.navigationContainer}>
            <button title="Previous" className={navigationStyles.button} key="prev" onClick={onPrev}>{"👈"}</button>
            {renderThumbs()}
            <button title="Next" className={navigationStyles.button} key="next" onClick={goNext}>{"👉"}</button>
            <span className={navigationStyles.divider}></span>
            <button title={isPlaying ? "Pause" : "Play"} className={cn(navigationStyles.button, navigationStyles.buttonPause)} key="pause" onClick={toggle}>{isPlaying ? "⏸" : "▶️"}</button>
            <button title={loop ? "Once" : "Repeat"} className={cn(navigationStyles.button, navigationStyles.loop)} key="loop" onClick={toggleLoop}>{loop ? "🔂" : "🔁"}</button>
            <button title="Add Slide" className={cn(navigationStyles.button, navigationStyles.buttonAdd)} key="add" onClick={onAdd}>{"➕"}</button>
        </div>
    )
}

export default Navigation;