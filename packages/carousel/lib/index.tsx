type CarouselProps = {
  className?: string;
};

export const Carousel: React.FC<CarouselProps> = function Carousel(props) {
  return (
    <div
      className={(props.className ? props.className : "") + "py-10 bg-white"}
    >
      {props.children}
    </div>
  );
};
