export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
  max_value?: number;
}

export interface NFTMetadata {
  id: number;
  name: string;
  description: string;
  image: string;
  external_url?: string;
  background_color?: string;
  animation_url?: string;
  attributes?: NFTAttribute[];
}
