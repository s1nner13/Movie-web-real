"use client";
import { Footer } from "../../_components/Footer";
import { Pagg } from "../../_components/Pagination";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
export default function Home() {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const { id } = useParams<params>();
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);

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
    <div className=" w-full flex  flex-col items-center">
      <div className="w-[335px] lg:w-[1440px] lg:flex lg:flex-col lg:gap-8 lg:px-20 ">
        <div className="flex justify-between items-center">
          <p className="text-[24px] font-semibold">More like this </p>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-[40px] lg:grid lg:grid-cols-5 lg:gap-8 lg:mb-[112px]">
          {similarMovies.map((moreMovie) => (
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
      </div>
      <div className="lg:w-[1280px] lg:h-[40px] mt-[20px] mb-[20px] flex justify-end w-[350px]">
        <div className="lg:h-[40px]">
          <Pagg page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
