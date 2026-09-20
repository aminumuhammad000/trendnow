import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { handleSupabaseError, AppError } from './errorHandler';

const PUBLIC_TREND_COLUMNS = `
  id,
  topic,
  category,
  status,
  created_at
`;

/**
 * Retrieve publicly accessible trends (subject to RLS policies).
 */
export async function getPublishedTrends({ limit = 10, offset = 0 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  try {
    const { data, error } = await supabase
      .from('trends')
      .select(PUBLIC_TREND_COLUMNS)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getPublishedTrends') };
  }
}

/**
 * Retrieve a single trend by ID (subject to RLS).
 */
export async function getTrendById(id) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!id) {
    return { data: null, error: new AppError('Trend ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('trends')
      .select(PUBLIC_TREND_COLUMNS)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: handleSupabaseError(err, 'getTrendById') };
  }
}

/**
 * Retrieve recent trends (subject to RLS).
 */
export async function getRecentTrends({ limit = 6 } = {}) {
  return getPublishedTrends({ limit });
}

/**
 * Retrieve trends by category (subject to RLS).
 */
export async function getTrendsByCategory(category, { limit = 10 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  try {
    const { data, error } = await supabase
      .from('trends')
      .select(PUBLIC_TREND_COLUMNS)
      .ilike('category', category)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getTrendsByCategory') };
  }
}

/**
 * Retrieve trend snapshots for a specific trend (subject to RLS).
 */
export async function getTrendSnapshots(trendId, { limit = 10 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!trendId) {
    return { data: [], error: new AppError('Trend ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('trend_snapshots')
      .select('id, trend_id, volume, sentiment, recorded_at')
      .eq('trend_id', trendId)
      .order('recorded_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getTrendSnapshots') };
  }
}
