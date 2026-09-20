#!/usr/bin/env bash
# Script to start local n8n instance for TrendzNow automation

PORT=${N8N_PORT:-5678}

echo "Starting n8n for TrendzNow on http://localhost:${PORT}..."
export N8N_PORT=${PORT}
export N8N_METRICS=false
export N8N_DIAGNOSTICS_ENABLED=false

n8n start
