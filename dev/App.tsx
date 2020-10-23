import { Carousel } from "@fhdhsni/carousel";
import "@fhdhsni/css/lib/index.css";

export function App() {
  const items = ["brown", "cyan", "darkgrey", "green", "lightcoral"];

  return (
    <div>
      <Carousel>
        {items.map((x) => {
          return (
            <div key={x} style={{ background: x, width: "150px", height: "100px" }}>
              {x}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
