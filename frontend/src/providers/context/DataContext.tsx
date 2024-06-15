// Third party
import { createContext, useContext, useMemo, useState } from "react";
// Assets
import { icon_category_movie, icon_category_tv } from "@/assets/images/icons";
import rawData from "../../../data.json";

type Thumbnail = {
  small: string;
  medium?: string;
  large: string;
};

export type Data = {
  title: string;
  thumbnail: {
    trending?: Thumbnail;
    regular: Thumbnail;
  };
  year: number;
  category: string;
  rating: string;
  isTrending: boolean;
  isBookmarked?: boolean;
};

export type DataContext = {
  data: Data[];
  categoryMap: Record<string, string>;
};

export type DataDispatchContext = {
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
};

const DataContext = createContext<DataContext | null>(null);
const DataDispatchContext = createContext<DataDispatchContext | null>(null);

export const useDataContext = () => {
  const currentContext = useContext(DataContext);

  if (!currentContext) {
    throw new Error("DataContext is null");
  }

  return currentContext;
};

export const useDataDispatchContext = () => {
  const currentContext = useContext(DataDispatchContext);

  if (!currentContext) {
    throw new Error("DataDispatchContext is null");
  }

  return currentContext;
};

export function DataContextProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<Data[]>(rawData);

  const contextValue = useMemo(() => {
    const categoryMap: Record<string, string> = {
      Movie: icon_category_movie,
      ["TV Series"]: icon_category_tv,
    };

    return { categoryMap, data };
  }, [data]);

  const api = useMemo(() => {
    return { setData };
  }, []);

  return (
    <DataDispatchContext.Provider value={api}>
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    </DataDispatchContext.Provider>
  );
}
