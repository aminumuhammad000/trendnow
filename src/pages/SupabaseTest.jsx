import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import Container from '../components/common/Container';
import PageHeader from '../components/common/PageHeader';
import { isSupabaseConfigured } from '../lib/supabase';
import { getPublishedArticles } from '../services/articleService';

export default function SupabaseTest() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('checking'); // 'connected' | 'error' | 'not_configured'
  const [articleCount, setArticleCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const checkConnection = async () => {
    setLoading(true);
    setErrorMessage(null);

    if (!isSupabaseConfigured) {
      setStatus('not_configured');
      setErrorMessage(
        'VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY are missing from the environment.'
      );
      setLoading(false);
      setLastChecked(new Date().toLocaleTimeString());
      return;
    }

    try {
      // Safe read against the public articles table with status = 'published'
      const { data, error, count } = await getPublishedArticles({ limit: 5 });

      if (error) {
        setStatus('error');
        setErrorMessage(error.message || 'Failed to communicate with Supabase.');
      } else {
        setStatus('connected');
        setArticleCount(count !== undefined ? count : data.length);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Unexpected connection error.');
    } finally {
      setLoading(false);
      setLastChecked(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="py-8">
      <Container>
        <PageHeader
          title="Supabase Connection Test"
          description="Development diagnostic page to verify frontend Supabase connectivity and RLS compliance."
          action={
            <button
              type="button"
              onClick={checkConnection}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Retry Test</span>
            </button>
          }
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Status Card */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Connection Status
            </h2>

            <div className="mt-4 flex items-center gap-3">
              {loading ? (
                <div className="flex items-center gap-2 text-neutral-600">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Testing connection...</span>
                </div>
              ) : status === 'connected' ? (
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg font-semibold">Connected to Supabase</span>
                </div>
              ) : status === 'not_configured' ? (
                <div className="flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="h-6 w-6" />
                  <span className="text-lg font-semibold">Environment Not Configured</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-700">
                  <XCircle className="h-6 w-6" />
                  <span className="text-lg font-semibold">Connection Failed</span>
                </div>
              )}
            </div>

            {lastChecked && (
              <p className="mt-3 text-xs text-neutral-400">
                Last checked: {lastChecked}
              </p>
            )}

            {errorMessage && (
              <div className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-4 text-xs font-mono text-neutral-700">
                <p className="font-semibold text-neutral-900">Diagnostic Details:</p>
                <p className="mt-1">{errorMessage}</p>
              </div>
            )}
          </div>

          {/* RLS & Data Card */}
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              RLS Query Check: `articles`
            </h2>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-neutral-900">
                  {status === 'connected' ? articleCount : '—'}
                </span>
                <span className="text-sm text-neutral-500">
                  published articles returned
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs text-neutral-600">
                <p className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span>RLS Filter: <code>status = 'published'</code></span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Client Role: Anonymous / Public</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Service-Role Key: Not present in client</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Variable Checklist */}
        <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            Environment Checklist
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <div className="flex items-center justify-between rounded border border-neutral-100 bg-neutral-50 p-3">
              <span className="font-mono text-xs text-neutral-800">VITE_SUPABASE_URL</span>
              <span className={`text-xs font-semibold ${import.meta.env.VITE_SUPABASE_URL ? 'text-emerald-700' : 'text-amber-700'}`}>
                {import.meta.env.VITE_SUPABASE_URL ? 'Configured' : 'Missing'}
              </span>
            </div>
            <div className="flex items-center justify-between rounded border border-neutral-100 bg-neutral-50 p-3">
              <span className="font-mono text-xs text-neutral-800">
                {import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? 'VITE_SUPABASE_PUBLISHABLE_KEY' : 'VITE_SUPABASE_ANON_KEY'}
              </span>
              <span className={`text-xs font-semibold ${
                (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
                  ? 'text-emerald-700'
                  : 'text-amber-700'
              }`}>
                {(import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
                  ? 'Configured'
                  : 'Missing'}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
