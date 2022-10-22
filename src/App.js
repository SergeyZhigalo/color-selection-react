import './App.css';
import Column from "./components/Column";
import { useEffect } from "react";
import { useColors } from "./hooks/colors";

function App() {
  const {
    colors,
    firstRender,
    generateColor,
    lockColor,
    copyToClipboard,
  } = useColors();

  useEffect(() => {
    // на нажатие клавиши Space происходит генерация новых цветов
    document.addEventListener("keydown", (e) => {
      e.preventDefault()
      if (e.code.toLowerCase() === "space") {
        generateColor();
      }
    });
    // функция firstRender вызывается при первом рендере
    firstRender();
  }, []);

  return (
    <div className="App">
      {
        colors.map(( color, index ) => {
          return <Column
            color={ color.color }
            lock={ color.lock }
            lockColor={ lockColor }
            id={ index }
            key={ index }
            copyToClipboard={ copyToClipboard }
          />
        })
      }
    </div>
  );
}

export default App;