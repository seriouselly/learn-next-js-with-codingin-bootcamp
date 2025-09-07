export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  total: number;
}
export interface StarwarsCharacters {
  _id: number;
  name: string;
  description: string;
  image: string;
}
export interface StarwarData {
  info: Info;
  data: StarwarsCharacters[];
}
