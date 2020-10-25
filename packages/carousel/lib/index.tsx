type CarouselProps = {
  className?: string;
};

export const Carousel: React.FC<CarouselProps> = function Carousel(props) {
  const className = `${
    props.className ?? ""
  } relative`;

  return (
    <div className={className}>
      <button className="border p-1 absolute left-0 f-top-50 transform -translate-y-1/2">left</button>
      <div className="flex overflow-x-auto scrolling-touch f-scrollbar-hide">{props.children}</div>
      <button className="border p-1 absolute right-0 f-top-50 transform -translate-y-1/2">right</button>
    </div>
  );
};
