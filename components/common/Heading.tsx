import { cn } from "@/lib/utils";

interface HeadingProps {
  text: string;
  center?: boolean;
  lg?: boolean;
  md?: boolean;
}

const Heading = ({ text, center, lg, md }: HeadingProps) => {
  return (
    <div className={cn(center && "text-center")}>
      {lg && <h1 className="font-bold text-4xl my-2">{text}</h1>}
      {md && <h2 className="font-bold text-3xl my-2">{text}</h2>}
      {!lg && !md && <h3 className="font-bold text-2xl my-2">{text}</h3>}
    </div>
  );
};

export default Heading;
