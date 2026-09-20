import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { handleSupabaseError, AppError } from './errorHandler';

/**
 * Service for managing research dossiers, sources, and factual claims.
 * Note: Research tables are protected under RLS and require internal / service authorization.
 */

export async function getResearchByTrendId(trendId) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!trendId) {
    return { data: null, error: new AppError('Trend ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('research')
      .select('id, trend_id, summary, status, created_at')
      .eq('trend_id', trendId)
      .maybeSingle();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: handleSupabaseError(err, 'getResearchByTrendId') };
  }
}

export async function getSourcesForResearch(researchId) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!researchId) {
    return { data: [], error: new AppError('Research ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('sources')
      .select('id, research_id, url, title, credibility_score, created_at')
      .eq('research_id', researchId);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getSourcesForResearch') };
  }
}

export async function getClaimsForResearch(researchId) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!researchId) {
    return { data: [], error: new AppError('Research ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('claims')
      .select('id, research_id, claim_text, verification_status, confidence_score')
      .eq('research_id', researchId);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getClaimsForResearch') };
  }
}
