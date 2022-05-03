export type UmbrellaNecessaryState =
  | 'NECESSARY'
  | 'MAYBE'
  | 'UNNECESSARY'
  | 'UNKNOWN';

export type UmbrellaNecessary = {
  date: string;
  label: UmbrellaNecessaryState;
};

export type Forecast = {
  date: string;
  position: string;
  title: string;
  dateLabel: string;
  telop: string;
  detail: {weather: string; wind: string};
  temperature: {min: string | null; max: string | null};
  chanceOfRainBy6Hours: Array<number | null>;
  imageUrl: string;
};

export type ForecastsState = {
  startForecasts: Forecast[];
  goalForecasts: Forecast[];
  umbrellaNecessaryStates: UmbrellaNecessary[];
  error: string | null | undefined;
};
export type Position = 'start' | 'goal';
