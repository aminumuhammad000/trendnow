# TrendzNow Automation Architecture & n8n Integration

This document defines the system architecture, roles, credential management, and workflow standards for TrendzNow.

---

## 1. System Roles & Responsibilities

| Component | Role | Security / Access Scope |
| :--- | :--- | :--- |
| **Netlify** | Hosts and serves the React/Vite frontend single-page application. | Client-side only. Uses public/anon key (`VITE_SUPABASE_PUBLISHABLE_KEY`). Subject to Row Level Security (RLS). |
| **Supabase** | PostgreSQL database, storage, and API layer. | Enforces Row Level Security (RLS) across all application tables (`trends`, `articles`, `research`, `claims`, etc.). |
| **n8n** | Automation & orchestration engine. | Trusted server-side layer. Connects directly to Supabase via server-side credentials. Executes background pipelines. |
| **AI Services** | LLMs and research APIs for analysis and content drafting. | Invoked server-side by n8n workflows; never accessed directly from the browser. |
| **Publishing APIs** | External social platforms and video distribution (YouTube, etc.). | Managed server-side through n8n publishing workflows. |

---

## 2. How n8n Connects to Supabase

n8n connects to Supabase entirely on the server side using one of two secure methods:

1. **PostgreSQL Connection (Recommended for complex data operations)**:
   - Uses the Supabase Connection Pooler (`aws-0-*.pooler.supabase.com`) or direct PostgreSQL connection string.
   - Configured via n8n's native **Postgres** node credential.
   - Enables transactional updates across multiple tables (`trends`, `research`, `articles`, `content_jobs`).

2. **Supabase API (REST / HTTPS)**:
   - Uses the Supabase REST endpoint (`https://<project-ref>.supabase.co`) with the server-side Service Role key.
   - Configured via n8n's **Supabase** or **HTTP Request** credential store.
   - Bypasses RLS strictly for administrative automation tasks while keeping the database private from public users.

> **Security Rule**: Database passwords, connection strings, and service-role keys are strictly server-side and must **never** be exposed in client code, environment variables prefixed with `VITE_`, or Git repositories.

---

## 3. Credential Storage

- All credentials in n8n are managed through **n8n Credential Management**:
  - Encrypted at rest using n8n's encryption key.
  - Referenced in workflows by credential ID, never hardcoded into workflow node JSON.
  - Never exposed in webhook responses or error payloads.
- No secrets are stored in Git. Local environment files (`.env`) are excluded via `.gitignore`.

---

## 4. Workflow Naming Convention

All workflows in the TrendzNow workspace follow a strict naming convention:

```
TRZ — [Purpose / Capability]
```

### Workflow Catalog:
- `TRZ — Database Connection Test` *(Initial diagnostic & connectivity verification)*
- `TRZ — Trend Detection` *(Multi-source signal monitoring)*
- `TRZ — Trend Scoring` *(Velocity & relevance scoring)*
- `TRZ — Research` *(Dossier assembly & source discovery)*
- `TRZ — Verification` *(Claim checking & uncertainty identification)*
- `TRZ — Article Generation` *(Structured draft creation)*
- `TRZ — Video Generation` *(Script & media asset generation)*
- `TRZ — Publishing` *(Cross-platform distribution & status tracking)*
- `TRZ — Analytics` *(Performance feedback & trend loop updates)*

---

## 5. Environment Separation

Workflows and credentials are organized conceptually across environments:
- **Development**: Local or sandbox n8n instance reading/writing to a dev database or isolated test records.
- **Staging**: Pre-production validation of automated triggers and pipelines.
- **Production**: Live scheduled automation writing to production Supabase tables.
