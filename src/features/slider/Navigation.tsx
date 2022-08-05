import { useAppDispatch, useAppSelector } from "../../app/store"
import { useSliderContext } from "./SliderContext";
import { getSlides, goToNext, goToSlide, goToPrevious, getCurrentIndex, getPlayingStatus, SliderStatus, toggle } from "./sliderSlice";


import navigationStyles from "./navigation.module.css";
import cn from "classnames";
import { Children, PropsWithChildren, useEffect, useRef, useState } from "react";

type PaginationContainer = { activeIndex: number, parentRef: React.MutableRefObject<HTMLDivElement | null> }
const Paginated: React.FC<PropsWithChildren<PaginationContainer>> = ({ children, activeIndex }) => {
    const count = ([] as any[]).concat(Children.map(children, (child) => child)).length;

    useEffect(() => {
        
    }, [count, activeIndex]);
    
    return (
        <>{children}</>
    )
}


const Thumb: React.FC<{ active: boolean; index: number; onClick: (index: number) => void}> = ({ onClick, index, active }) => {
    const handleClick = () => {
        onClick(index);
    }
    
    return <span className={cn(navigationStyles.thumb, active && navigationStyles.activeThumb)} onClick={handleClick}></span>
}

const Navigation: React.FC = () => {
    const { loop, showThumbnails, showNavigation, toggle, onAdd, toggleLoop } = useSliderContext(),
        ref= useRef<HTMLDivElement | null>(null),
        dispatch = useAppDispatch(),
        slides = useAppSelector(getSlides),
        currentIndex = useAppSelector(getCurrentIndex),
        isPlaying = useAppSelector(getPlayingStatus) === SliderStatus.PLAYING;

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
        <div className={navigationStyles.navigationContainer} ref={ref}>
            <button title="Previous" className={navigationStyles.button} key="prev" onClick={onPrev}>{"👈"}</button>
            <Paginated parentRef={ref} activeIndex={currentIndex}>{renderThumbs()}</Paginated>
            <button title="Next" className={navigationStyles.button} key="next" onClick={goNext}>{"👉"}</button>
            <span className={navigationStyles.divider}></span>
            <button title={isPlaying ? "Pause" : "Play"} className={cn(navigationStyles.button, navigationStyles.buttonPause)} key="pause" onClick={toggle}>{isPlaying ? "⏸" : "▶️"}</button>
            <button title={loop ? "Once" : "Repeat"} className={cn(navigationStyles.button, navigationStyles.loop)} key="loop" onClick={toggleLoop}>{loop ? "🔂" : "🔁"}</button>
            <button title="Add Slide" className={cn(navigationStyles.button, navigationStyles.buttonAdd)} key="add" onClick={onAdd}>{"➕"}</button>
        </div>
    )
}

export default Navigation;