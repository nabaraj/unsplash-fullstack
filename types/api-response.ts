import {
  CollectionType,
  CurrentUserCollection,
  UrlsType
} from "./collection-type";

export interface GenericUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: string;
  portfolio_url?: string;
  bio?: string;
  location?: string;
  links: Record<string, string>;
  profile_image: Record<"small" | "medium" | "large", string>;
  social: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
}

// export type UrlsType = {
//   raw: string;
//   full: string;
//   regular: string;
//   small: string;
//   thumb: string;
//   small_s3: string;
// };
export type CollectionResultType = {
  id: string;
  total_photos: number;
  title: string;
  cover_photo: {
    urls: UrlsType;
    [key: string]: string | Record<string, string> | UrlsType; // Allows other properties if needed
  };
  updated_at: string;
  haveCurrentImage?: boolean;
};
// export type CollectionType = {
//   total: number;
//   type: string;
//   results: CollectionResultType[];
// };\

export type ImageLinksType = {
  self: string;
  html: string;
  download: string;
  download_location: string;
};

export interface GenericImage {
  id: string;
  slug: string;
  alternative_slugs: Record<string, string>;
  created_at: string;
  updated_at: string;
  promoted_at?: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: string;
  alt_description?: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: ImageLinksType;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: CurrentUserCollection[];
  sponsorship?: string | null;
  topic_submissions: string;
  asset_type: string;
  user: GenericUser;
  related_collections: CollectionType;
}

export interface GenericResponse {
  images: {
    total: number;
    total_pages: number;
    results: GenericImage[];
  };
}
