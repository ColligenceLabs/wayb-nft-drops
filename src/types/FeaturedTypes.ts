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
  links: [];
  updatedAt: Date | null;
  createdAt: Date | null;
  eventBanner: string | null;
  eventUrl: string | null;
  newWindow: boolean;
};
