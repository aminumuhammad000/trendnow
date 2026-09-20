import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { handleSupabaseError, AppError } from './errorHandler';

const PUBLIC_VIDEO_COLUMNS = `
  id,
  title,
  description,
  video_url,
  thumbnail_url,
  duration_seconds,
  status,
  published_at,
  created_at
`;

/**
 * Fetch all published videos.
 */
export async function getPublishedVideos({ limit = 6, offset = 0 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  try {
    const { data, error } = await supabase
      .from('videos')
      .select(PUBLIC_VIDEO_COLUMNS)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getPublishedVideos') };
  }
}

/**
 * Fetch a single published video by ID.
 */
export async function getPublishedVideoById(id) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!id) {
    return { data: null, error: new AppError('Video ID is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('videos')
      .select(PUBLIC_VIDEO_COLUMNS)
      .eq('id', id)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: handleSupabaseError(err, 'getPublishedVideoById') };
  }
}
