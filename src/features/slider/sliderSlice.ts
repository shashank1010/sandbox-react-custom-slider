import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

type MaybeArray<T> = T | T[];


export enum SliderStatus {
    PLAYING = "playing",
    PAUSED = "paused",
}

export type SlideType = string


export interface SliderState {
    status: SliderStatus;
    currentIndex: number;
    slides: SlideType[];
}


const initialState: SliderState = {
    status: SliderStatus.PLAYING,
    currentIndex: 0,
    slides: ["1", "2", "3"],
}


const sliderSlice = createSlice({
    name: "slider",
    initialState: initialState,
    reducers: {
        goToNext(state, action: PayloadAction<{ loop?: boolean }>) {
            const max = state.slides.length,
                  next = state.currentIndex + 1,
                  nextWithMaybeLoop = action.payload.loop && max === next ? 0 : next;

            state.currentIndex = Math.min(max - 1, nextWithMaybeLoop);
        },
        goToPrevious(state, action: PayloadAction<{ loop?: boolean }>) {
            const max = state.slides.length - 1,
                  prev = state.currentIndex - 1,
                  prevWithMaybeLoop = action.payload.loop && prev < 0 ? max : prev;

            state.currentIndex = Math.max(0, prevWithMaybeLoop);
        },
        goToSlide(state, action: PayloadAction<{ toIndex: number }>) {
            state.currentIndex = Math.min(state.slides.length - 1, Math.max(action.payload.toIndex, 0));
        },
        toggle(state) {
            state.status = SliderStatus.PAUSED === state.status ? SliderStatus.PLAYING : SliderStatus.PAUSED;
        },
        pause(state) {
            state.status = SliderStatus.PAUSED;
        },
        play(state) {
            state.status = SliderStatus.PLAYING;
        },
        addSlide(state) {
            state.slides = state.slides.concat((state.slides.length + 1) + "");
        }
    }
})


export default sliderSlice.reducer;

export const { goToNext, goToPrevious, goToSlide, pause, play, toggle, addSlide } = sliderSlice.actions;


const takeSliderState = (state: Record<"slider", SliderState>) => state.slider

export const getSlides = createSelector(takeSliderState, ({slides}) => slides);
export const getCurrentIndex = createSelector(takeSliderState, ({ currentIndex }) => currentIndex);
export const getPlayingStatus = createSelector(takeSliderState, ({ status }) => status);
