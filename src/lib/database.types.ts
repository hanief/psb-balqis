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
      admins: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: never
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: never
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      proofs: {
        Row: {
          filename: string | null
          id: number
          registration_id: number | null
          registree_id: number | null
        }
        Insert: {
          filename?: string | null
          id?: never
          registration_id?: number | null
          registree_id?: number | null
        }
        Update: {
          filename?: string | null
          id?: never
          registration_id?: number | null
          registree_id?: number | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          alamat: string | null
          asal_sekolah: string | null
          created_at: string | null
          desa: string | null
          id: number
          jalur_beasiswa: string | null
          jalur_beasiswa_khusus: string | null
          jalur_beasiswa_prestasi: string | null
          jalur_pendaftaran: string | null
          jenis_elamin: string | null
          kabupaten: string | null
          kecamatan: string | null
          kodepos: string | null
          nama_ayah: string | null
          nama_ibu: string | null
          nama_lengkap: string | null
          nama_wali: string | null
          nomor_handphone: string | null
          nomor_hp_ayah: string | null
          nomor_hp_ibu: string | null
          nomor_hp_wali: string | null
          provinsi: string | null
          registree_id: number | null
          tanggal_lahir: string | null
          tempat_lahir: string | null
          updated_at: string | null
        }
        Insert: {
          alamat?: string | null
          asal_sekolah?: string | null
          created_at?: string | null
          desa?: string | null
          id?: never
          jalur_beasiswa?: string | null
          jalur_beasiswa_khusus?: string | null
          jalur_beasiswa_prestasi?: string | null
          jalur_pendaftaran?: string | null
          jenis_elamin?: string | null
          kabupaten?: string | null
          kecamatan?: string | null
          kodepos?: string | null
          nama_ayah?: string | null
          nama_ibu?: string | null
          nama_lengkap?: string | null
          nama_wali?: string | null
          nomor_handphone?: string | null
          nomor_hp_ayah?: string | null
          nomor_hp_ibu?: string | null
          nomor_hp_wali?: string | null
          provinsi?: string | null
          registree_id?: number | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          updated_at?: string | null
        }
        Update: {
          alamat?: string | null
          asal_sekolah?: string | null
          created_at?: string | null
          desa?: string | null
          id?: never
          jalur_beasiswa?: string | null
          jalur_beasiswa_khusus?: string | null
          jalur_beasiswa_prestasi?: string | null
          jalur_pendaftaran?: string | null
          jenis_elamin?: string | null
          kabupaten?: string | null
          kecamatan?: string | null
          kodepos?: string | null
          nama_ayah?: string | null
          nama_ibu?: string | null
          nama_lengkap?: string | null
          nama_wali?: string | null
          nomor_handphone?: string | null
          nomor_hp_ayah?: string | null
          nomor_hp_ibu?: string | null
          nomor_hp_wali?: string | null
          provinsi?: string | null
          registree_id?: number | null
          tanggal_lahir?: string | null
          tempat_lahir?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      registrees: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: never
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: never
          name?: string | null
          phone?: string | null
          updated_at?: string | null
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
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
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

