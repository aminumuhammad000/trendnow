-- ============================================
-- STEP 3: ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all application tables
alter table public.trends enable row level security;
alter table public.trend_snapshots enable row level security;
alter table public.research enable row level security;
alter table public.sources enable row level security;
alter table public.claims enable row level security;
alter table public.articles enable row level security;
alter table public.videos enable row level security;
alter table public.images enable row level security;
alter table public.content_jobs enable row level security;
alter table public.social_posts enable row level security;
alter table public.publishing_records enable row level security;
alter table public.analytics enable row level security;


-- ============================================
-- PUBLIC ACCESS
-- ============================================

-- Public users can only read published articles
create policy "Public can read published articles"
on public.articles
for select
to anon, authenticated
using (
    status = 'published'
);


-- Public users can only read published videos
create policy "Public can read published videos"
on public.videos
for select
to anon, authenticated
using (
    status = 'published'
);


-- Public users can read images belonging to published articles
create policy "Public can read published article images"
on public.images
for select
to anon, authenticated
using (
    article_id is not null
    and exists (
        select 1
        from public.articles
        where public.articles.id = public.images.article_id
        and public.articles.status = 'published'
    )
);


-- Public users can read images belonging to published videos
create policy "Public can read published video images"
on public.images
for select
to anon, authenticated
using (
    video_id is not null
    and exists (
        select 1
        from public.videos
        where public.videos.id = public.images.video_id
        and public.videos.status = 'published'
    )
);


-- ============================================
-- NO PUBLIC INSERT / UPDATE / DELETE
-- ============================================
--
-- We intentionally create no INSERT, UPDATE,
-- or DELETE policies for the anon role.
--
-- Therefore public visitors cannot modify data.
-- ============================================


-- ============================================
-- AUTHENTICATED USER RESTRICTIONS
-- ============================================
--
-- Do not give ordinary authenticated users
-- access to internal automation/research tables.
--
-- Admin/automation access will happen through
-- the Supabase service-role key on the server.
-- ============================================


-- ============================================
-- OPTIONAL: PREVENT PUBLIC ACCESS TO INTERNAL DATA
-- ============================================

-- No SELECT policies are created for:
--
-- trends
-- trend_snapshots
-- research
-- sources
-- claims
-- content_jobs
-- social_posts
-- publishing_records
-- analytics
--
-- These remain private.


-- ============================================
-- SECURITY CHECK
-- ============================================

-- Show RLS status for all application tables
select
    schemaname,
    tablename,
    rowsecurity
from pg_tables
where schemaname = 'public'
and tablename in (
    'trends',
    'trend_snapshots',
    'research',
    'sources',
    'claims',
    'articles',
    'videos',
    'images',
    'content_jobs',
    'social_posts',
    'publishing_records',
    'analytics'
)
order by tablename;
