export interface ResponseFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Record<string, unknown>;
  text: string;
  text_en: string;
  place_name: string;
  matching_text: string;
  matching_place_name: string;
  center: [number, number];
  address: string;
}
