export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Access: {
        Row: {
          created_at: string | null
          id: number
          IMEI: string | null
          type: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          IMEI?: string | null
          type?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: number
          IMEI?: string | null
          type?: boolean | null
        }
      }
      AuthorisedUser: {
        Row: {
          Email: string
          role: number | null
        }
        Insert: {
          Email: string
          role?: number | null
        }
        Update: {
          Email?: string
          role?: number | null
        }
      }
      Employee: {
        Row: {
          access: boolean | null
          accessInterval: string | null
          authorisedUser: string | null
          badge: string
          CNP: string
          createdByAuthorisedUser: string | null
          data: string
          division: string
          firstName: string
          IMEI: string
          lastName: string
          photo: string | null
          role: number | null
        }
        Insert: {
          access?: boolean | null
          accessInterval?: string | null
          authorisedUser?: string | null
          badge: string
          CNP: string
          createdByAuthorisedUser?: string | null
          data?: string
          division: string
          firstName: string
          IMEI: string
          lastName: string
          photo?: string | null
          role?: number | null
        }
        Update: {
          access?: boolean | null
          accessInterval?: string | null
          authorisedUser?: string | null
          badge?: string
          CNP?: string
          createdByAuthorisedUser?: string | null
          data?: string
          division?: string
          firstName?: string
          IMEI?: string
          lastName?: string
          photo?: string | null
          role?: number | null
        }
      }
      Role: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
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
}
