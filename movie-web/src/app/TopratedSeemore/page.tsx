"use client";
import { Footer } from "../_components/Footer";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagg } from "../_components/Pagination";

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
  total_pages: number;
};
const stars = [
  {
    star: "/carousel/StarMovie.png",
  },
];
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
      settotalPages(data.total_pages);
    };
    getMoviesByAxios();
  }, [page]);
  return (
    <div className=" w-full flex  flex-col items-center">
      <div className="w-[335px] lg:w-[1440px] lg:flex lg:flex-col lg:gap-8 lg:px-20 ">
        <div className="flex justify-between items-center">
          <p className="text-[24px] font-semibold">Top Rated</p>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-[40px] lg:grid lg:grid-cols-5 lg:gap-8 ">
          {movies.map((movie, index) => (
            <Link
              key={movie.id}
              href={`/movieDetails/${movie.id}`}
              className="bg-[#f4f4f5] p-4 rounded-md flex flex-col gap-2 dark:bg-[#555556]"
            >
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  width={200}
                  height={300}
                />
              </div>
              <div className="h-[23px] flex items-center">
                {stars.map((star, index) => (
                  <img key={index} src={star.star} width={16} height={16} />
                ))}
                <p>{movie.vote_average.toString().slice(0, 3)}/10</p>
              </div>
              <p>{movie.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <Pagg page={page} setPage={setPage} totalPages={totalPages} />
      <Footer />
    </div>
  );
}
