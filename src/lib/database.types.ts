export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contents: {
        Row: {
          content: string | null
          created_at: string | null
          deleted_at: string | null
          id: number
          slug: string | null
          title: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: never
          slug?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: never
          slug?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          alamat: string | null
          asal_sekolah: string | null
          bukti_dhuafa: string | null
          bukti_pembayaran: string | null
          bukti_prestasi: string | null
          bukti_yatim: string | null
          catatan_internal: string | null
          created_at: string | null
          deleted_at: string | null
          desa: string | null
          id: number
          jalur_beasiswa: string | null
          jalur_beasiswa_khusus: string | null
          jalur_beasiswa_prestasi: string | null
          jalur_pendaftaran: string | null
          jenis_kelamin: string | null
          jenjang: string | null
          kabupaten: string | null
          kecamatan: string | null
          kodepos: string | null
          nama_ayah: string | null
          nama_ibu: string | null
          nama_lengkap: string | null
          nama_prestasi: string | null
          nik: string | null
          nilai_akademik: string | null
          nilai_pesantren: string | null
          nilai_tahsin: string | null
          nomor_hp_ayah: string | null
          nomor_hp_ibu: string | null
          pembayaran_diterima: boolean | null
          program_jenjang: string | null
          progress_status: string | null
          provinsi: string | null
          status_pendaftaran: string | null
          status_terdaftar_text: string | null
          syarat_penerimaan: string | null
          tahun_prestasi: string | null
          tanggal_lahir: string | null
          tempat_lahir: string | null
          tingkat_prestasi: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alamat?: string | null
          asal_sekolah?: string | null
          bukti_dhuafa?: string | null
          bukti_pembayaran?: string | null
          bukti_prestasi?: string | null
          bukti_yatim?: string | null
          catatan_internal?: string | null
          created_at?: string | null
          deleted_at?: string | null
          desa?: string | null
          id?: never
          jalur_beasiswa?: string | null
          jalur_beasiswa_khusus?: string | null
          jalur_beasiswa_prestasi?: string | null
          jalur_pendaftaran?: string | null
          jenis_kelamin?: string | null
          jenjang?: string | null
          kabupaten?: string | null
          kecamatan?: string | null
          kodepos?: string | null
          nama_ayah?: string | null
          nama_ibu?: string | null
          nama_lengkap?: string | null
          nama_prestasi?: string | null
          nik?: string | null
          nilai_akademik?: string | null
          nilai_pesantren?: string | null
          nilai_tahsin?: string | null
          nomor_hp_ayah?: string | null
          nomor_hp_ibu?: string | null
          pembayaran_diterima?: boolean | null
          program_jenjang?: string | null
          progress_status?: string | null
          provinsi?: string | null
          status_pendaftaran?: string | null
          status_terdaftar_text?: string | null
          syarat_penerimaan?: string | null
          tahun_prestasi?: string | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          tingkat_prestasi?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alamat?: string | null
          asal_sekolah?: string | null
          bukti_dhuafa?: string | null
          bukti_pembayaran?: string | null
          bukti_prestasi?: string | null
          bukti_yatim?: string | null
          catatan_internal?: string | null
          created_at?: string | null
          deleted_at?: string | null
          desa?: string | null
          id?: never
          jalur_beasiswa?: string | null
          jalur_beasiswa_khusus?: string | null
          jalur_beasiswa_prestasi?: string | null
          jalur_pendaftaran?: string | null
          jenis_kelamin?: string | null
          jenjang?: string | null
          kabupaten?: string | null
          kecamatan?: string | null
          kodepos?: string | null
          nama_ayah?: string | null
          nama_ibu?: string | null
          nama_lengkap?: string | null
          nama_prestasi?: string | null
          nik?: string | null
          nilai_akademik?: string | null
          nilai_pesantren?: string | null
          nilai_tahsin?: string | null
          nomor_hp_ayah?: string | null
          nomor_hp_ibu?: string | null
          pembayaran_diterima?: boolean | null
          program_jenjang?: string | null
          progress_status?: string | null
          provinsi?: string | null
          status_pendaftaran?: string | null
          status_terdaftar_text?: string | null
          syarat_penerimaan?: string | null
          tahun_prestasi?: string | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          tingkat_prestasi?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          created_at: string | null
          id: number
          type: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          type?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          type?: string | null
          value?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never