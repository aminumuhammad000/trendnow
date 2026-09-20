import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { handleSupabaseError, AppError } from './errorHandler';

// Explicitly select columns needed by the public UI
const PUBLIC_ARTICLE_COLUMNS = `
  id,
  title,
  slug,
  excerpt,
  content,
  category,
  status,
  published_at,
  created_at
`;

/**
 * Fetch all published articles with pagination.
 */
export async function getPublishedArticles({ limit = 10, offset = 0 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED'), count: 0 };
  }

  try {
    const { data, error, count } = await supabase
      .from('articles')
      .select(PUBLIC_ARTICLE_COLUMNS, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data || [], error: null, count: count || 0 };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getPublishedArticles'), count: 0 };
  }
}

/**
 * Fetch a single published article by its slug.
 */
export async function getPublishedArticleBySlug(slug) {
  if (!isSupabaseConfigured) {
    return { data: null, error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  if (!slug) {
    return { data: null, error: new AppError('Article slug is required.', 'INVALID_ARGUMENT') };
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(PUBLIC_ARTICLE_COLUMNS)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: handleSupabaseError(err, 'getPublishedArticleBySlug') };
  }
}

/**
 * Fetch featured published articles.
 */
export async function getFeaturedArticles({ limit = 1 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(PUBLIC_ARTICLE_COLUMNS)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getFeaturedArticles') };
  }
}

/**
 * Fetch latest published articles, sorted by published_at descending.
 */
export async function getLatestArticles({ limit = 6 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED') };
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(PUBLIC_ARTICLE_COLUMNS)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getLatestArticles') };
  }
}

/**
 * Fetch published articles filtered by category.
 */
export async function getArticlesByCategory(category, { limit = 10, offset = 0 } = {}) {
  if (!isSupabaseConfigured) {
    return { data: [], error: new AppError('Supabase is not configured.', 'NOT_CONFIGURED'), count: 0 };
  }

  try {
    const { data, error, count } = await supabase
      .from('articles')
      .select(PUBLIC_ARTICLE_COLUMNS, { count: 'exact' })
      .eq('status', 'published')
      .ilike('category', category)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return { data: data || [], error: null, count: count || 0 };
  } catch (err) {
    return { data: [], error: handleSupabaseError(err, 'getArticlesByCategory'), count: 0 };
  }
}
