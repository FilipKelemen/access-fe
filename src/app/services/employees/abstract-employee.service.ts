import {Database} from '../../models/supabase'

export abstract class AbstractEmployeeService {
  abstract getEmployees(): Promise<Database['public']['Tables']['Employee']['Row'][] | null>;
}
