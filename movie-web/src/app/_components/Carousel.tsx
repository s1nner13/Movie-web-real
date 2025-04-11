"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgxODUwMTFjZDUyNTJiNGViY2I4ZjA4OWJkMWRlOSIsIm5iZiI6MTc0MzQwMzI2OS43NjYsInN1YiI6IjY3ZWEzOTA1YTk4ZGM4MTNiMGY3MDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1XLqvV8qnfJkxisJJn-f7LvyMPNnPkMeUkdvzEL3mU";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: string;
};
type Response = {
  results: Movie[];
};
export const Carousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };
    getMoviesByAxios();
  });

  return (
    <div className="w-[375px] lg:w-[1440px] flex overflow-hidden relative">
      <div className="w-fit flex animate-wiggle relative">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[375px] lg:w-[1440px] relative">
            <Link href={`/movieDetails/${movie.id}`}>
              <img
                className="lg:w-[1440px] lg:h-[600px] w-[375px] h-[246px]"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              />
            </Link>
            <div className="w-[375px] lg:w-[404px] flex flex-col gap-4 lg:absolute lg:top-[178px] lg:left-[140px] p-5">
              <div className="w-[325px] lg:h-[112px] flex lg:flex-col">
                <div className="flex flex-col w-[252px]">
                  <p className="lg:text-white text-black dark:text-white">
                    Now Playing:
                  </p>
                  <p className="lg:text-white text-black text-[36px] font-bold dark:text-white ">
                    {movie.title}
                  </p>
                </div>
                <div className="flex items-center">
                  <img src="/carousel/StarMovie.png" alt="star" />
                  <p className="lg:text-white text-black dark:text-white">
                    {movie.vote_average}/10
                  </p>
                </div>
              </div>
              <p className="lg:text-white text-black dark:text-white">
                {movie.overview}
              </p>
              <div className="w-[145px] h-[40px] lg:bg-white rounded-[8px] flex gap-2 items-center px-4 bg-black text-white lg:text-black dark:bg-[#555556] dark:text-white hover:scale-110">
                <Dialog>
                  <DialogTrigger> &#9655; Watch Trailer</DialogTrigger>
                  <DialogContent>
                    <img src="/carousel/trailer.png" alt="trailer" />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
