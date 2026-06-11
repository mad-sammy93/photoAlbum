export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      albums: {
        Row: {
          cover_photo_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          is_published: boolean | null;
          slug: string;
          sort_order: number | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          cover_photo_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_published?: boolean | null;
          slug: string;
          sort_order?: number | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          cover_photo_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_published?: boolean | null;
          slug?: string;
          sort_order?: number | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      photos: {
        Row: {
          album_id: string | null;
          created_at: string | null;
          description: string | null;
          file_size: number | null;
          height: number | null;
          id: string;
          original_path: string;
          sort_order: number | null;
          taken_at: string | null;
          thumbnail_path: string;
          title: string | null;
          width: number | null;
        };
        Insert: {
          album_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          file_size?: number | null;
          height?: number | null;
          id?: string;
          original_path: string;
          sort_order?: number | null;
          taken_at?: string | null;
          thumbnail_path: string;
          title?: string | null;
          width?: number | null;
        };
        Update: {
          album_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          file_size?: number | null;
          height?: number | null;
          id?: string;
          original_path?: string;
          sort_order?: number | null;
          taken_at?: string | null;
          thumbnail_path?: string;
          title?: string | null;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "photos_album_id_fkey";
            columns: ["album_id"];
            isOneToOne: false;
            referencedRelation: "albums";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;

// My types
export interface Album {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_photo_id: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Photo {
  id: string;
  album_id: string;
  title: string | null;
  thumbnail_path: string;
  original_path: string;
  width: number;
  height: number;
  sort_order: number;
  created_at: string;
}

export interface PhotoWithUrls extends Photo {
  thumbnail_url: string;
  original_url: string;
  orientation?: "portrait" | "landscape" | "square";

  featured?: boolean;
}

export interface AlbumWithPhotos extends Album {
  photos?: Photo[];
  photoCount?: number;
  coverUrl?: string;
}
// interface AlbumWithPhotos {
//   id: string;
//   title: string;
//   slug: string;
//   description: string | null;
//   cover_photo_id: string | null;
//   sort_order: number;
//   is_published: boolean;
//   created_at: string;
//   photos?: Photo[];
//   photoCount: number;
//   coverUrl: string | undefined;
// }

export interface AdminAlbumForm {
  title: string;
  slug: string;
  description: string;
  is_published: boolean;
}

export interface PhotoUploadAlbum {
  id: string;
  title: string;
}
