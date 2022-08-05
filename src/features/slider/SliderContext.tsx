import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import sliderSlice, { addSlide, getCurrentIndex, getPlayingStatus, goToNext, pause, play, SliderStatus } from "./sliderSlice";

interface SliderContextInterface {
    loop?: boolean;
    autoPlay?: boolean | number;
    showNavigation?: boolean;
    showThumbnails?: boolean;
    toggle: () => void;
    onAdd: () => void;
    effect?: "slide" | "fade";
    toggleLoop?: () => void;
}


const SliderContext = createContext<SliderContextInterface>({ toggle: () => {}, onAdd: () => {} });

type ContextProps = Omit<SliderContextInterface, "toggle">
export const SliderProvider: React.FC<PropsWithChildren<ContextProps>> = ({ children, ...value }) => {
    const { autoPlay, loop, onAdd } = value,
        [shouldLoop, setShouldLoop ] = useState(loop),
        intervalRef = useRef<NodeJS.Timer | null>(null),
        dispatch = useAppDispatch(),
        isPlaying = useAppSelector(getPlayingStatus) === SliderStatus.PLAYING,
        currentIndex = useAppSelector(getCurrentIndex),
        handleOnAdd = useCallback(() => {
            onAdd();
            dispatch(addSlide())
        }, []),
        toggle = useCallback(() => {
            dispatch(isPlaying? pause() : play() )
        }, [isPlaying]),
        toggleLoop = useCallback(() => {
            setShouldLoop((val) => !val);
        }, [isPlaying]);



    useEffect(() => {
        dispatch(autoPlay? play() : pause() )
    }, [autoPlay])



    // on pause/play
    useEffect(() => {
        if (!isPlaying) { return; }

        const interval = isPlaying === true ? 3000 : isPlaying,
            clearInterval = () => {
                if (!intervalRef.current) return;
                clearTimeout(intervalRef.current)
            }

        intervalRef.current = setInterval(() => {
            dispatch(goToNext({ loop: shouldLoop }))
        }, interval);

        return clearInterval;
    }, [currentIndex, isPlaying, shouldLoop])

    
    return <SliderContext.Provider value={{...value, loop: shouldLoop, toggleLoop, toggle, onAdd: handleOnAdd }}>{children}</SliderContext.Provider>
}

export const useSliderContext = () => {
    return useContext(SliderContext);
}