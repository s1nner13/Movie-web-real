"use client";
import { Moon } from "@/app/_components/Moonsvg";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState, useEffect, ChangeEventHandler } from "react";
import Link from "next/link";
import { MobileSearch } from "./MobileSearch";
import { useGenres } from "../_components/GenreProvider";
import { useSearchParams } from "next/navigation";
type SearchType = {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
};
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgxODUwMTFjZDUyNTJiNGViY2I4ZjA4OWJkMWRlOSIsIm5iZiI6MTc0MzQwMzI2OS43NjYsInN1YiI6IjY3ZWEzOTA1YTk4ZGM4MTNiMGY3MDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1XLqvV8qnfJkxisJJn-f7LvyMPNnPkMeUkdvzEL3mU";
export type Movie = {
  title: string;
  id: number;
  name: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
};
export const Searchbar = ({ isDark, setIsDark }: SearchType) => {
  const [search, setSearch] = useState(false);
  const searchParamas = useSearchParams();
  const genre = searchParamas.get("genre");
  const { genres } = useGenres();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleClick = () => {
    setSearch((prev) => !prev);
  };
  const darkmode = () => {
    setIsDark(!isDark);
  };

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

  return (
    <>
      {!search ? (
        <div className="w-full h-[59px] p-4 flex justify-between items-center  ">
          <Link href={"/"}>
            <img src="/movieZ.png"></img>
          </Link>
          <div className="lg:h-[36px] lg:flex lg:gap-3 lg:items-center hidden ">
            <Popover>
              <PopoverTrigger>Genre</PopoverTrigger>
              <PopoverContent>
                <div className=" lg:w-[577px] lg:h-[333px] lg:p-5 rounded-[8px] bg-white lg:flex lg:flex-col lg:gap-[33px] dark:bg-black dark:text-white">
                  <div className="lg:w-[213px] lg:h-[60px]">
                    <p className="lg:text-[24px] lg:font-semibold ">Genres</p>
                    <p>See lists of movies by genre</p>
                  </div>
                  <div className="flex flex-wrap gap-4 lg:w-[387px] ">
                    {movies.map((item) => {
                      return (
                        <Link
                          key={item.id}
                          href={`/GenreFilter?genre=${item.id}`}
                        >
                          <Badge variant="outline">{item.name} &gt;</Badge>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="lg:flex lg:flex-col relative">
              <div className="flex border border-gray-400 rounded-[8px]">
                <input
                  className="w-[379px] h-[36px] p-3   hidden lg:flex relative"
                  placeholder="Search..."
                  type="text"
                  value={searchValue}
                  onChange={inputChange}
                ></input>
                <button
                  className="w-[36px] h-[36px] flex justify-center items-center"
                  onClick={() => setSearchValue("")}
                >
                  &#10005;
                </button>
              </div>
              {searchValue.length > 0 && (
                <div className="w-[450px] z-50 absolute top-[50px] lg:left-[-50px] flex flex-col bg-white rounded-2xl">
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
                                <p>
                                  {movie.vote_average.toString().slice(0, 3)}/10
                                </p>
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
                  <Link
                    href={`/seeAllResult?searchValue=${searchValue}`}
                    className="lg:w-[212px] lg:h-[40px]"
                  >
                    See all results "{searchValue}"
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 ">
            <button
              className="w-[36px] h-[36px] border border-gray-400 rounded-[10px] flex justify-center items-center lg:hidden"
              onClick={handleClick}
            >
              <img className="dark:hidden" src="/MovieVector.png"></img>
              <img className="hidden dark:flex" src="/darksearch.png"></img>
            </button>
            <div
              className="w-[36px] h-[36px] border border-gray-400 rounded-[10px] flex justify-center items-center"
              onClick={darkmode}
            >
              <img className="hidden dark:flex" src="/darkmoon.png"></img>
              <Moon />
            </div>
          </div>
        </div>
      ) : (
        <MobileSearch handleClick={handleClick} />
      )}
    </>
  );
};
