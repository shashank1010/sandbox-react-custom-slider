import cn from "classnames";
import { FC, forwardRef, memo, } from "react";

import slideStyles from "../slide.module.css";
import { EffectProps } from "./EffectTypes";
import fadeEffectStyles from "./fadeEffect.module.css";

const FadeEffect: FC<EffectProps> = memo(forwardRef<HTMLDivElement, EffectProps>(({ children, activeIndex, index }, ref) => {
    const className = cn(slideStyles.slide, fadeEffectStyles.fadeEffect, {
        [slideStyles.activeSlide]: activeIndex === index,
        [fadeEffectStyles.activeFadeEffect]: activeIndex === index,
    });

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}))

export default FadeEffect;