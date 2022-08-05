import { useCallback } from 'react';
import './App.css';
import { Slide, Slider } from './features/slider';
import { SlideType } from './features/slider/sliderSlice';

const slides = [
  {text: "Slide 1"},
  {text: "Slide 2"},
  {text: "Slide 3"}
]

function App() {
  const onAdd = useCallback(() => {
    slides.push({ text: `Slide ${slides.length + 1}`})
  }, []);

  return (
    <main className="App">
      <Slider loop onAdd={onAdd}>
        {
          useCallback((slide: SlideType, index: number, {currentIndex}) => {
            return (
              <Slide key={slide as string} index={index} active={currentIndex === index}>
                <h1>{ slides[index].text }</h1>

                
              </Slide>
            )
          }, [])
        }
      </Slider>
    </main>
  );
}

export default App;
