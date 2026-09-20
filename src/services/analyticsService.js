import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { handleSupabaseError, AppError } from './errorHandler';

/**
 * Service for querying performance and engagement metrics.
 * Note: Analytics tables are protected under RLS and restricted to internal/authenticated usage.
 */

export async function getContentAnalytics(contentId) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!contentId) {
    return { data: null, error: new AppError('Content ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('id, content_id, views, clicks, engagement_rate, recorded_at')
      .eq('content_id', contentId)
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: handleSupabaseError(err, 'getContentAnalytics') };
  }
}
