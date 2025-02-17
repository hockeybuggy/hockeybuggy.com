export type Post = {
  postFilename: string;
  slug: string;
  delisted: boolean;
  isoDate: string;
  isoEditDate?: string;
  year: string;
  month: string;
  day: string;
  title: string;
  content: string;
  categories: string[];
  tags: string[];
};
