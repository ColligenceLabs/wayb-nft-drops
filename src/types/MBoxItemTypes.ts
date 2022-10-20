import { OptionsTypes } from './OptionsTypes';
import { PropertyTypes } from './PropertyTypes';

export interface MBoxItemTypes {
  no: number;
  id?: number | null;
  infoId: number;
  itemImage: any | null;
  name: string;
  rarity: string;
  issueAmount: number | null;
  probability: number | null;
  description: string;
  properties: PropertyTypes[] | null;
  levels: OptionsTypes[] | null;
  stats: OptionsTypes[] | null;
  remainingAmount?: number | null;
  originalImage: string;
}
