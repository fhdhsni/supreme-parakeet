import { Story, Meta } from "@storybook/react/types-6-0";
import { Carousel } from "@fhdhsni/carousel";

export default {
  title: "Components/Carousel",
  component: Carousel,
} as Meta;

export const Basic: Story<object> = () => {
  const items: number[] = Array.from({ length: 20 }, (_, idx) => idx);

  return (
    <div>
      <Carousel className="border">
        {items.map((x) => {
          return (
            <div
              className="flex items-center justify-center flex-shrink-0 shadow h-64 w-64 m-1"
              key={x}
            >
              {x}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
