// OPENAPIVERSE Images
export type Color = string;
export type Thumbs = {
  large: string;
  original: string;
  small: string;
};

export type ImageId = string;

export type Image = {
  id: ImageId;
  title: string;
  indexed_on: Date;
  foreign_landing_url: string;
  url: string;
  creator: string;
  creator_url: string;
  license: string;
  license_version: string;
  license_url: string;
  provider: string;
  source: string;
  category: string;
  filesize: number;
  filetype: string;
  tags: string[];
  attribution: string;
  mature: boolean;
  thumbnail: string;
  related_url: string;
};

export type ImageRecord = {
  id: ImageId;
  title: string;
  thumbnail: string;
  timestamp: number;
};

export type AspectRatio = "squate" | "tall" | "wide";

// OPENAPIVERSE Auth
export type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export type SearchConfig =
  | {
      q?: string; //query or the search string
      page?: number;
      page_size?: number;
      license?: string;
      license_version?: string;
      aspect_ratio?: AspectRatio;
    }
  | {
      tags?: string;
      page?: number;
      page_size?: number;
      license?: string;
      license_version?: string;
      aspect_ratio?: AspectRatio;
    }
  | { identifier: string };

// MONGODB

export type User = {
  name: string | null;
  _id?: string | null; // auto created by mongodb
  userId: string;
  history: ImageRecord[];
  favorites: ImageRecord[];
  accountLoading?: boolean;
  historyLoading?: boolean;
  favoritesLoading?: boolean;
};

// APP STATE

export type UpdateUser = { userId: string; accessToken: string };

export type UpdateFavorites = {
  userId: string;
  imageRecord: ImageRecord;
  accessToken: string;
};
