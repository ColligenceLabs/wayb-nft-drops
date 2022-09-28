export type MBoxTypes = {
  id: number | null;
  title: { ko: string; en: string };
  symbol: string | null;
  introduction: { ko: string; en: string };
  bannerImage: string | null;
  price: number | null;
  quote: string | null;
  status: number | null;
  updatedAt: Date | null;
  createdAt: Date | null;
  itemAmount: any | null;
  isApproved: boolean | null;
  rarityLevel: any | null;
  packageImage: any | null;
  revealAnimation: any | null;
  releaseDatetime: any | null;
  afterRelease: any | null;
  keyContractAddress: any | null;
  boxContractAddress: any | null;
  deployStatus: any | null;
  creator: any | null;
  useSubscription: boolean;
  useRevealLockup: boolean;
  useWhitelistFiltering: boolean;
  whitelistNftId: number | null;
  subscriptionId: number | null;
  paymentAddress: string | null;
  totalAmount: number | null;
  usedAmount: number | null;
};
