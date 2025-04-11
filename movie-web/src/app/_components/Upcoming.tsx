"use client";
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
const stars = [
  {
    star: "/carousel/StarMovie.png",
  },
];
export const Upcoming = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
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
    <div className="w-[335px] lg:w-[1440px] lg:flex lg:flex-col lg:gap-8 lg:px-20 lg:mt-[52px]">
      <div className="flex justify-between items-center">
        <div className="text-[24px] font-semibold">Upcoming</div>
        <Link
          href={"/UpcomingSeemore"}
          className="w-[120px] h-[36px] flex gap-2 px-4 "
        >
          See more &#8594;
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-[40px] lg:grid lg:grid-cols-5 lg:gap-8">
        {movies.slice(10).map((movie) => (
          <Link
            href={`/movieDetails/${movie.id}`}
            key={movie.id}
            className="bg-[#f4f4f5] p-4 rounded-md flex flex-col gap-2 dark:bg-[#555556] "
          >
            <div className=" transition-all duration-300 hover:scale-110">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                width={200}
                height={300}
              />
            </div>
            <div className="h-[23px] flex  ">
              {stars.map((star, index) => (
                <img key={index} src={star.star} width={16} height={16} />
              ))}
              <p>{movie.vote_average.toString().slice(0, 3)}/10</p>
            </div>
            <p className=" text-3">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
