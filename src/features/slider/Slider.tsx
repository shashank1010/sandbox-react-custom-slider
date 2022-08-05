import React, { memo } from "react";
import { useAppSelector } from "../../app/store";
import Navigation from "./Navigation";
import { SliderProvider, useSliderContext } from "./SliderContext";

import { SlideType, SliderStatus } from "./sliderSlice";

import sliderStyles from "./slider.module.css"
import cn from "classnames";

interface SliderStatusParam {
    currentIndex: number;
    status: SliderStatus;
}

export type RenderFunctionType = (slide: SlideType, index: number, status: SliderStatusParam) => JSX.Element


interface SliderProps extends Partial<typeof defaultProps> {
    children: RenderFunctionType,
}


const defaultProps = {
    loop: false,
    autoPlay: true as boolean | number,
    showNavigation: true,
    showThumbnails: true,
    onAdd: () => {},
    changeEffect: () => {},
}


const SliderWithContext: React.FC<Pick<SliderProps, "children">> = memo(({ children }) => {
    const { autoPlay, loop } = useSliderContext(),
        {slides, currentIndex, status } = useAppSelector(({ slider }) => slider),
        getSliderClassName = () => cn(sliderStyles.slider, {
            [sliderStyles.autoPlay]: autoPlay,
            [sliderStyles.loop]: loop,
        });



    return (
        <div className={getSliderClassName()}>
            <div className={sliderStyles.sliderInner}>
                { slides.map((slide, index) => children(slide, index, { currentIndex, status })) }
            </div>
            <Navigation />
        </div>
    );
})



const Slider: React.FC<SliderProps> = memo(({children, ...props}) => {
    return <SliderProvider {...props as Required<typeof defaultProps>}><SliderWithContext children={children} /></SliderProvider>
}) 


Slider.defaultProps = defaultProps;


export default Slider;