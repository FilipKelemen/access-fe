import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import {Database} from '../models/supabase'

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient<Database>;
  _session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseURL,
      environment.supabaseKey
    );
  }

  async get(tableName: string) {
    const { data, error } = await this.supabase.from(tableName).select();
    return { data, error };
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  async getLoggedUser() {
    const { data, error } = await this.supabase
      .from('Employee')
      .select()
      .eq('CNP', JSON.parse(localStorage.getItem('user')!).CNP);
    if (error) return error;
    return data;
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
