"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

import { useState, useEffect, ChangeEventHandler } from "react";
import Link from "next/link";
import { useGenres } from "../_components/GenreProvider";
import { useSearchParams } from "next/navigation";
type MobileSearchType = {
  handleClick: () => void;
};
type SearchType = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};
export type Movie = {
  title: string;
  id: number;
  name: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
};
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgxODUwMTFjZDUyNTJiNGViY2I4ZjA4OWJkMWRlOSIsIm5iZiI6MTc0MzQwMzI2OS43NjYsInN1YiI6IjY3ZWEzOTA1YTk4ZGM4MTNiMGY3MDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1XLqvV8qnfJkxisJJn-f7LvyMPNnPkMeUkdvzEL3mU";
export const MobileSearch = ({ handleClick }: MobileSearchType) => {
  const searchParamas = useSearchParams();
  const genre = searchParamas.get("genre");
  const { genres } = useGenres();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

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
  }, [genre]);

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
      console.log(data);
    };
    searchMovies();
  }, [searchValue]);

  const inputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };
  const filtered = movies.filter((item) => {
    return item.name.includes(searchValue);
  });
  return (
    <div className="lg:hidden flex w-[229px] h-[44px] gap-5 justify-between items-center  ">
      <Popover>
        <PopoverTrigger>Genre</PopoverTrigger>
        <PopoverContent>
          <div className=" lg:w-[577px] lg:h-[333px] lg:p-5 rounded-[8px] bg-white lg:flex lg:flex-col lg:gap-[33px] w-[335px]  p-5 dark:bg-black dark:text-white">
            <div className="lg:w-[213px] lg:h-[60px]">
              <p className="text-[24px] font-semibold">Genres</p>
              <p>See lists of movies by genre</p>
            </div>
            <div className="flex flex-wrap gap-4 lg:w-[387px] ">
              {movies.map((item, index) => {
                return (
                  <Link key={item.id} href={`/GenreFilter?genre=${item.id}`}>
                    <Badge variant="outline">{item.name} &gt;</Badge>
                  </Link>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <div className="lg:flex lg:flex-col relative flex items-center">
        <input
          className="w-[200px] h-[44px]"
          placeholder="Search"
          value={searchValue}
          onChange={inputChange}
          type="text"
        ></input>
        {searchValue.length > 0 && (
          <div className="w-[375px] z-10 absolute top-[50px] left-[-140px] flex flex-col bg-white rounded-2xl">
            {searchResults.slice(0, 5).map((movie) => {
              return (
                <div key={movie.id}>
                  <Link href={`/movieDetails/${movie.id}`}>
                    <div className="border-t-2 p-2 flex gap-4  ">
                      <div className=" h-[100px] w-[67px] rounded-lg">
                        <img
                          className="rounded-lg w-[67px] h-[100px]"
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        ></img>
                      </div>
                      <div className="">
                        <p className="text-xl font-bold">{movie.title}</p>

                        <div className="flex items-center gap-1">
                          <p>{movie.vote_average}/10</p>
                        </div>
                        <div className=" w-75 flex justify-between ">
                          <p>{movie.release_date}</p>
                          <div className="flex items-center gap-2 justify-center">
                            <p>see more</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <button
          className="w-[36px] h-[36px] flex justify-center items-center"
          onClick={handleClick}
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};
