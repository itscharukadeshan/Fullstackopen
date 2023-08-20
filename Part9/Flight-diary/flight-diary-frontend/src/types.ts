/** @format */

// types.ts

export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "snowy";

export type Visibility = "great" | "good" | "ok" | "poor";

export interface Entry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface DiaryEntryProps {
  entries: Entry[];
}
