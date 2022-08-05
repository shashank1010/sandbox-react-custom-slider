import cn from "classnames";
import { lazy, memo, PropsWithChildren, Suspense, useEffect, useRef } from "react";
import { useAppSelector } from "../../app/store";

import { useSliderContext } from "./SliderContext";
import { getCurrentIndex } from "./sliderSlice";

import slideStyles from "./slide.module.css";

interface SlideProps {
    active?: boolean;
    index: number;
}

const delayedLazy = (func: Function): React.LazyExoticComponent<React.FC<any>>=> lazy(() => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            func().then(resolve)
        }, 2000)
    })
})

const FadeEffect = delayedLazy(() => import('./Effects/FadeEffect'))
const SlideEffect = delayedLazy(() => import('./Effects/SlideEffect'))

const getEffect = (effect: "fade" | "slide") => {
    const effects = {
        fade: FadeEffect,
        slide: SlideEffect,
    };


    if (!effects[effect]) {
        throw new Error("Effect not implemented");
    }
    
    return effects[effect];
}

const Slide: React.FC<PropsWithChildren<SlideProps>> = memo(({ index, children, active }) => {
    const elRef = useRef<HTMLDivElement | null>(null);
    const activeIndex = useAppSelector(getCurrentIndex);
    const {effect = "slide"} = useSliderContext();

    const Effect = getEffect(effect);
    
    useEffect(() => {
        if (!elRef.current) {
            return;
        }

        let className = active ? slideStyles.willActivate : slideStyles.willDeactivate;
        
        elRef.current.classList.add(className)

        setTimeout(() => {
            if (!elRef.current) { return; }
            elRef.current.classList.remove(className)
        }, 1000);
    }, [active])
    
    return (
        <Suspense fallback={<>loading</>}>
            <Effect index={index} activeIndex={activeIndex} ref={elRef}>{children}</Effect>
        </Suspense>
    )
})

export default Slide;