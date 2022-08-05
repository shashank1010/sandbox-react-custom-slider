import cn from "classnames";
import { memo, PropsWithChildren, useLayoutEffect, useRef } from "react";
import { useAppSelector } from "../../app/store";

import slideStyles from "./slide.module.css";
import { useSliderContext } from "./SliderContext";
import { getCurrentIndex } from "./sliderSlice";

interface SlideProps {
    active?: boolean;
    index: number;
}


const Slide: React.FC<PropsWithChildren<SlideProps>> = memo(({ index, children, active }) => {
    const elRef = useRef<HTMLDivElement | null>(null);
    const activeIndex = useAppSelector(getCurrentIndex);
    const {effect = "fade"} = useSliderContext();
    const goLeft = activeIndex > index;

    
    useLayoutEffect(() => {
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
    
    return <div ref={elRef} data-effect={effect} className={
        cn(slideStyles.slide, {
            [slideStyles.activeSlide]: active,
            [slideStyles.willDeactivatePrev]: goLeft,
            [slideStyles.willDeactivateNext]: !goLeft,
            [slideStyles.willActivatePrev]: goLeft,
            [slideStyles.willActivateNext]: !goLeft,
        })
    }>{children}</div>
})

export default Slide;