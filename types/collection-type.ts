export type UrlsType = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
};

export type LinksType = {
  self: string;
  html: string;
  download: string;
  download_location: string;
};

export type AlternativeSlugsType = {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
};

export type TagType = {
  type: string;
  title: string;
};

export type CollectionLinksType = {
  self: string;
  html: string;
  photos: string;
  related: string;
};

export type ProfileImageType = {
  small: string;
  medium: string;
  large: string;
};

export type SocialType = {
  instagram_username: string | null;
  portfolio_url: string | null;
  twitter_username: string | null;
  paypal_email: string | null;
};

export type UserType = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string | null;
  bio: string | null;
  location: string | null;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
  profile_image: ProfileImageType;
  instagram_username: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: SocialType;
};

export type PhotoType = {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugsType;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  breadcrumbs: string[];
  urls: UrlsType;
  links: LinksType;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: CollectionType[];
  sponsorship: string | null;
  topic_submissions: Record<string, unknown>;
  asset_type: string;
  user: UserType;
};

export type CollectionType = {
  id: string;
  title: string;
  description: string | null;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: TagType[];
  links: CollectionLinksType;
  user: UserType;
  cover_photo: PhotoType;
  preview_photos: PhotoType[];
};

export type ApiResponse = {
  images: {
    photo: PhotoType;
    collection: CollectionType;
  };
};
export type CurrentUserCollection = {
  id: string;
  title: string;
  description: string | null;
  published_at: string;
  last_collected_at: string;
  updated_at: string;
  featured: boolean;
  total_photos: number;
  private: boolean;
  share_key: string;
  tags: TagType[];
  links: CollectionLinksType;
  haveCurrentImage?: boolean;
};
export type ThumbTypeRecord = Record<
  string,
  { id: string; title: string; thumbnail: string | null }
>;
