"use client";
import axios from "axios";
import Link from "next/link";
import { useGenres } from "../_components/GenreProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Footer } from "../_components/Footer";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgxODUwMTFjZDUyNTJiNGViY2I4ZjA4OWJkMWRlOSIsIm5iZiI6MTc0MzQwMzI2OS43NjYsInN1YiI6IjY3ZWEzOTA1YTk4ZGM4MTNiMGY3MDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1XLqvV8qnfJkxisJJn-f7LvyMPNnPkMeUkdvzEL3mU";
export type Movie = {
  title: string;
  id: number;
  name: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
  genre_ids: number[];
};
const stars = [
  {
    star: "/carousel/StarMovie.png",
  },
];
export default function Home() {
  const searchParamas = useSearchParams();
  const searchValue = searchParamas.get("searchValue");
  const genre = searchParamas.get("genre");
  const { genres } = useGenres();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.genres);
    };
    getMovies();
  }, [genres]);

  useEffect(() => {
    const searchMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setSearchResults(data.results);
      console.log("kghjhvkg", data);
    };
    searchMovies();
  }, [searchValue]);

  return (
    <div className=" w-full flex  flex-col items-center">
      <div className="w-[335px] lg:w-[1440px] lg:flex lg:flex-col lg:gap-8 lg:px-20 ">
        <div className="flex flex-col gap-[28px] ">
          <p className="text-[30px] font-semibold">Search results</p>
          <p>results for "{searchValue}"</p>
        </div>
        <div className="lg:flex lg:gap-[28px]">
          <div className="lg:-w-[804px] lg:h-[826px] ">
            {searchValue.length > 0 && (
              <div className="grid grid-cols-2 gap-5 mt-[40px] lg:grid lg:grid-cols-5 lg:gap-8">
                {searchResults.slice(10).map((movie) => {
                  return (
                    <div key={movie.id}>
                      <Link
                        href={`/movieDetails/${movie.id}`}
                        key={movie.id}
                        className="bg-[#f4f4f5] lg:w-[165px] lg:h-[330px] p-4 rounded-md flex flex-col gap-2 dark:bg-[#555556]"
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
                            <img
                              key={index}
                              src={star.star}
                              width={16}
                              height={16}
                            />
                          ))}
                          <p>{movie.vote_average.toString().slice(0, 3)}/10</p>
                        </div>
                        <p className=" text-3">{movie.title}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[24px] font-semibold">Genres</p>
              <p>See lists of movies by genre</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:w-[387px] ">
              {genres.map(({ id, name }) => (
                <Link key={id} href={`/GenreFilter?genre=${id}`}>
                  <Badge
                    variant={genre === id.toString() ? "default" : "outline"}
                  >
                    {name} &gt;
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
