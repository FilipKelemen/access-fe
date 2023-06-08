import {DBSchema} from 'idb'
import {StoreNames} from 'idb/build/entry'

export interface AccessDB extends DBSchema {
  Access: {
    key: string;
    value: {
      id: number
      created_at: string | null
      IMEI: string | null
      type: boolean | null
    }
  },
  Employee: {
    key: string;
    value: {
      access: boolean | null
      accessInterval: string | null
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
  },
  Role: {
    key: string;
    value: {
      id: number
      name: string | null
    }
  }
}

//Needs to be populated with every key, it's used to dynamically add stores
export const ACCESS_DB_STORE_NAMES: StoreNames<AccessDB>[] = ['Access','Employee','Role']

