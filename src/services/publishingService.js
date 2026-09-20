import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { handleSupabaseError, AppError } from './errorHandler';

/**
 * Service for querying publishing and distribution status.
 * Note: Publishing tables are protected under RLS.
 */

export async function getPublishingStatusByJobId(jobId) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!jobId) {
    return { data: [], error: new AppError('Job ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('publishing_records')
      .select('id, job_id, platform, status, published_url, published_at')
      .eq('job_id', jobId);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getPublishingStatusByJobId') };
  }
}
