export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      providers: {
        Row: {
          id: string;
          slug: string;
          name: string;
          website_url: string | null;
          support_notes: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          website_url?: string | null;
          support_notes?: string | null;
          active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["providers"]["Insert"]>;
      };
      plans: {
        Row: {
          id: string;
          provider_id: string | null;
          slug: string;
          name: string;
          technology: string;
          transport_type: string;
          max_download_mbps: number;
          max_upload_mbps: number;
          estimated_monthly_price: number | null;
          estimated_latency_ms: number | null;
          contract_required: boolean;
          referral_url: string | null;
          availability_notes: string | null;
          source: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id?: string | null;
          slug: string;
          name: string;
          technology: string;
          transport_type?: string;
          max_download_mbps?: number;
          max_upload_mbps?: number;
          estimated_monthly_price?: number | null;
          estimated_latency_ms?: number | null;
          contract_required?: boolean;
          referral_url?: string | null;
          availability_notes?: string | null;
          source?: string;
          active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["plans"]["Insert"]>;
      };
      search_areas: {
        Row: {
          id: string;
          input: string;
          normalized_label: string | null;
          zip: string | null;
          city: string | null;
          state: string | null;
          lat: number | null;
          lng: number | null;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          input: string;
          normalized_label?: string | null;
          zip?: string | null;
          city?: string | null;
          state?: string | null;
          lat?: number | null;
          lng?: number | null;
          source?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["search_areas"]["Insert"]>;
      };
      recommendations: {
        Row: {
          id: string;
          search_area_id: string | null;
          priority: string;
          recommended_plan_id: string | null;
          ranked_plan_ids: string[] | null;
          explanation: string | null;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          search_area_id?: string | null;
          priority?: string;
          recommended_plan_id?: string | null;
          ranked_plan_ids?: string[] | null;
          explanation?: string | null;
          source?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["recommendations"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          email: string;
          location_hint: string | null;
          intent: string;
          consent: boolean;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          location_hint?: string | null;
          intent?: string;
          consent?: boolean;
          source?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      searches: {
        Row: {
          id: string;
          user_id: string | null;
          email: string | null;
          address_label: string;
          lat: number | null;
          lng: number | null;
          priority: string;
          raw_provider_count: number | null;
          data_source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email?: string | null;
          address_label: string;
          lat?: number | null;
          lng?: number | null;
          priority?: string;
          raw_provider_count?: number | null;
          data_source?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["searches"]["Insert"]>;
      };
    };
  };
};
