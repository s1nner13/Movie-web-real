"use client";
import { Footer } from "@/app/_components/Footer";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import { MoreMap } from "@/app/_components/Morelikethismap";
type Movie = {
  adult: boolean;
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: string;
  release_date: string;
};
type params = {
  id: string;
};
type Crew = {
  name: string;
  job: string;
};
type Response = {
  cast: Casting[];
  crew: Crew[];
};
type Casting = {
  name: string;
};
export type Trailer = {
  key: string;
};
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgxODUwMTFjZDUyNTJiNGViY2I4ZjA4OWJkMWRlOSIsIm5iZiI6MTc0MzQwMzI2OS43NjYsInN1YiI6IjY3ZWEzOTA1YTk4ZGM4MTNiMGY3MDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1XLqvV8qnfJkxisJJn-f7LvyMPNnPkMeUkdvzEL3mU";
const stars = [
  {
    star: "/carousel/StarMovie.png",
  },
];
export default function Home() {
  const [movies, setMovies] = useState<Movie | null>(null);
  const [director, setDirector] = useState<Crew | null>(null);
  const [writers, setWriters] = useState<Crew[]>([]);
  const [casting, setCasting] = useState<Casting[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);

  const { id } = useParams<params>();
  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,

        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN} `,
          },
        }
      );

      setMovies(data);
    };
    getMovie();
  }, [id]);

  useEffect(() => {
    const getCrew = async () => {
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      const director = data.crew.find(
        (member: Crew) => member.job === "Director"
      );
      const writers = data.crew.filter(
        (member: Crew) => member.job === "Writer"
      );
      const casting = data.cast;
      setDirector(director || null);
      setWriters(writers);
      setCasting(casting);
      console.log("DIrector:", data);
    };
    getCrew();
  }, [id]);

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const trailerData = data.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailerData) {
          setTrailer(trailerData.key);
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    if (id) {
      fetchMovieTrailer();
    }
  }, [id]);

  return (
    <div className=" w-full flex  flex-col items-center">
      <div className="w-[335px] lg:w-[1440px] lg:flex lg:flex-col lg:gap-8 lg:px-20 "></div>
      <div className="lg:w-[1080px] w-[375px]">
        <div className="flex justify-between mt-[52px] items-center">
          <div>
            <p className="lg:text-black text-black text-[36px] font-bold dark:text-white">
              {movies?.title}
            </p>
            <p>{movies?.release_date}</p>
          </div>
          <div className="w-[83px] h-[64px]">
            <p className="lg:text-black text-[12px] font-medium">Rating</p>
            <div className="flex gap-1">
              <img src="/carousel/StarMovie.png"></img>
              <div>
                <p className="lg:text-black text-black dark:text-white">
                  6.9/10
                </p>
                <p className="text-[#71717A]">37k</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[24px] lg:flex lg:gap-8 ">
          <img
            className="hidden lg:flex w-[290px] h-[428px]"
            src={"https://image.tmdb.org/t/p/original" + movies?.poster_path}
          ></img>
          <div className="relative">
            <img
              className="relative w-[760px] h-[428px]"
              src={"https://image.tmdb.org/t/p/original" + movies?.poster_path}
            ></img>
            <div className="w-[40px] h-[40px] lg:bg-white rounded-[9999px] flex gap-2 items-center px-4 bg-black text-white lg:text-black absolute lg:top-[85%] lg:left-[24px] top-[75%] left-[10%]">
              <Dialog>
                <div className="flex gap-4">
                  <DialogTrigger> &#9655; </DialogTrigger>
                  <p className="lg:text-white w-[80px]">Play trailer</p>
                  <p className="lg:text-white">2:35</p>
                </div>
                <DialogContent>
                  {trailer && (
                    <iframe
                      className="lg:w-[997px] lg:h-[561px] lg:absolute lg:left-[-250px] lg:top-[-320px] w-[300px] h-[200px]"
                      src={`https://www.youtube.com/embed/${trailer}`}
                      title="Movie Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:gap-5 lg:mt-[32px] hidden">
          <div className="lg:flex  lg:gap-3">
            {movies?.genres.map((genre, index) => (
              <Badge key={index} variant="outline">
                {genre.name}
              </Badge>
            ))}
          </div>
          <div>{movies?.overview}</div>
          <div>
            <div className="lg:flex lg:gap-[53px]">
              <p className="text-[16px] font-bold">Director</p>
              <p>{director?.name || "Not Available"} </p>
            </div>
            <Separator className="my-4" />
            <div className="lg:flex lg:gap-[53px]">
              <p className="text-[16px] font-bold">Writers</p>
              <p>
                {writers.length > 0
                  ? writers.map((writer, index) => (
                      <span key={index}>
                        {writer.name}
                        {index < writers.length - 1 ? " · " : "  "}
                      </span>
                    ))
                  : "Not Available"}
              </p>
            </div>
            <Separator className="my-4" />
            <div className="lg:flex lg:gap-[53px]">
              <p className="text-[16px] font-bold">Stars</p>
              <p>
                {casting.length > 0
                  ? casting.map((cast, index) => (
                      <span key={index}>
                        {cast.name}
                        {index < casting.length - 1 ? " · " : ""}
                      </span>
                    ))
                  : "Not Available"}
              </p>
            </div>
            <Separator className="my-4" />
          </div>
        </div>
        <div className="lg:hidden w-[375px] flex gap-[34px] mt-[32px] px-5">
          <div>
            <img
              className="lg:hidden w-[100px] h-[148px]"
              src={"https://image.tmdb.org/t/p/original" + movies?.poster_path}
            ></img>
          </div>
          <div className="flex flex-col gap-5 w-[200px]">
            <div className="grid grid-cols-2 gap-3 ">
              {movies?.genres.map((genre, index) => (
                <Badge key={index} variant="outline">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div>{movies?.overview}</div>
          </div>
        </div>
        <div className="px-5 lg:hidden">
          <div className="lg:flex lg:gap-[53px]">
            <p className="text-[16px] font-bold">Director</p>
            <p>{director?.name || "Not Available"} </p>
          </div>
          <Separator className="my-4" />
          <div className="lg:flex lg:gap-[53px]">
            <p className="text-[16px] font-bold">Writers</p>
            <p>
              {writers.length > 0
                ? writers.map((writer, index) => (
                    <span key={index}>
                      {writer.name}
                      {index < writers.length - 1 ? " · " : ""}
                    </span>
                  ))
                : "Not Available"}
            </p>
          </div>
          <Separator className="my-4" />
          <div className="lg:flex lg:gap-[53px]">
            <p className="text-[16px] font-bold">Stars</p>
            <p>
              {casting.length > 0
                ? casting.map((cast, index) => (
                    <span key={index}>
                      {cast.name}
                      {index < casting.length - 1 ? " · " : ""}
                    </span>
                  ))
                : "Not Available"}
            </p>
          </div>
          <Separator className="my-4" />
        </div>
        <div className="lg:flex lg:flex-col lg:gap-8">
          <div className="flex justify-between items-center">
            <p className="text-[24px] font-semibold">More like this</p>
            <Link
              href={`/morelikethis/${movies?.id}`}
              className="w-[120px] h-[36px] flex gap-2 px-4  "
            >
              See more &#8594;
            </Link>
          </div>
        </div>
        <MoreMap />
      </div>
      <Footer />
    </div>
  );
}
