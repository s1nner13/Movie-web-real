import { Carousel } from "./_components/Carousel";
import { Upcoming } from "./_components/Upcoming";
import { Popular } from "./_components/Popular";
import { TopRated } from "./_components/TopRated";
import { Footer } from "./_components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <div className=" w-full flex  items-center justify-center">
      <div className=" w-[375px] lg:w-[1440px] flex flex-col items-center justify-center">
        <Carousel />
        <Upcoming />
        <Popular />
        <TopRated />
        <Footer />
      </div>
    </div>
  );
}
