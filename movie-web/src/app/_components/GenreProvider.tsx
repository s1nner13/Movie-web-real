"use client";
import {
  useEffect,
  useState,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";
import axios from "axios";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzgxODUwMTFjZDUyNTJiNGViY2I4ZjA4OWJkMWRlOSIsIm5iZiI6MTc0MzQwMzI2OS43NjYsInN1YiI6IjY3ZWEzOTA1YTk4ZGM4MTNiMGY3MDQxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1XLqvV8qnfJkxisJJn-f7LvyMPNnPkMeUkdvzEL3mU";
type Genre = {
  id: number;
  name: string;
};
type GenreContextType = {
  genres: Genre[];
};

const GenreContext = createContext<GenreContextType>({ genres: [] });

export const GenreProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setGenres(data.genres);
    };
    getGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
};
export const useGenres = () => useContext(GenreContext);
