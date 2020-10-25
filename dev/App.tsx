import { Carousel } from "@fhdhsni/carousel";
import "@fhdhsni/css/lib/index.css";

export function App() {
  const items: number[] = Array.from({ length: 20 }, (_, idx) => idx);

  return (
    <div>
      <Carousel className="border">
        {items.map((x) => {
          return (
            <div className="flex items-center justify-center flex-shrink-0 shadow h-64 w-64 m-1" key={x}>
              {x}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
