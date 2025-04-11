"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
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
};
type params = {
  id: string;
};
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgxODUwMTFjZDUyNTJiNGViY2I4ZjA4OWJkMWRlOSIsIm5iZiI6MTc0MzQwMzI2OS43NjYsInN1YiI6IjY3ZWEzOTA1YTk4ZGM4MTNiMGY3MDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1XLqvV8qnfJkxisJJn-f7LvyMPNnPkMeUkdvzEL3mU";

const stars = [
  {
    star: "/carousel/StarMovie.png",
  },
];
export const MoreMap = () => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const { id } = useParams<params>();

  useEffect(() => {
    const getSimilarMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setSimilarMovies(data.results);
    };
    getSimilarMovies();
  }, [id]);
  return (
    <>
      <div className="grid grid-cols-2 gap-5 mt-[40px] lg:grid lg:grid-cols-5 lg:gap-8 lg:mb-[112px]">
        {similarMovies.slice(15).map((moreMovie) => (
          <Link
            key={moreMovie.id}
            href={`/movieDetails/${moreMovie.id}`}
            className="bg-[#f4f4f5] p-4 rounded-md flex flex-col gap-2 dark:bg-[#555556]"
          >
            <div className=" transition-all duration-300 hover:scale-110">
              <img
                src={`https://image.tmdb.org/t/p/original${moreMovie.poster_path}`}
                width={200}
                height={300}
              />
            </div>
            <div className="h-[23px] flex  ">
              {stars.map((star, index) => (
                <img key={index} src={star.star} width={16} height={16} />
              ))}
              <p>{moreMovie.vote_average.toString().slice(0, 3)}/10</p>
            </div>
            <p>{moreMovie.title}</p>
          </Link>
        ))}
      </div>
    </>
  );
};
