export type FeaturedTypes = {
  id: string | null;
  companyId: string;
  company: {
    image: string;
    name: {
      ko: string;
      en: string;
    };
  };
  name: { ko: string; en: string };
  image: string;
  banner: string;
  description: { ko: string; en: string };
  manager: string | null;
  link: [];
  updatedAt: Date | null;
  createdAt: Date | null;
};
