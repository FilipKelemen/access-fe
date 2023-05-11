import { PostgrestError } from '@supabase/supabase-js';

export const isPostgressError = (
  errorOrObject: PostgrestError | { [key: string]: any } | null
): errorOrObject is PostgrestError => {
  if (!errorOrObject) return false;
  if (errorOrObject.hint && errorOrObject.code && errorOrObject.details)
    return true;
  return false;
};
