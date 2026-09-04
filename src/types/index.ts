export interface Casino {
  id: string;
  name: string;
  rating: number;
  bonus: string;
  features: string[];
  logo: string;
  url: string;
}

export interface Review {
  id: string;
  casinoId: string;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
