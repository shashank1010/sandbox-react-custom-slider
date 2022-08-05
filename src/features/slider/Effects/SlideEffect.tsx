import cn from "classnames";
import { FC, forwardRef, memo, } from "react";

import slideStyles from "../slide.module.css";
import { EffectProps } from "./EffectTypes";
import slideEffectStyles from "./slideEffect.module.css";


const SlideEffect: FC<EffectProps> = memo(forwardRef<HTMLDivElement, EffectProps>(({ children, activeIndex, index }, ref) => {
    const goLeft = activeIndex > index;
    
    return (
        <div ref={ref} data-effect="slide" className={
            cn(slideStyles.slide, slideEffectStyles.slideEffect, {
                [slideStyles.activeSlide]: activeIndex === index,
                [slideEffectStyles.slideActive]: activeIndex === index,
                [slideEffectStyles.slideWillDeactivePrev]: goLeft,
                [slideEffectStyles.slideWillDeactiveNext]: !goLeft,
                [slideEffectStyles.slidePrev]: goLeft,
                [slideEffectStyles.slideNext]: !goLeft,
            })
        }>{children}</div>
    );
}))

export default SlideEffect;