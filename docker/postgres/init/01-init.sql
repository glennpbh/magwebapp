-- Initialize database for development
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create development user (optional)
-- CREATE USER magwebapp WITH PASSWORD 'magwebapp_dev';
-- GRANT ALL PRIVILEGES ON DATABASE magwebapp_dev TO magwebapp;

-- Create sample schema (if needed)
-- CREATE SCHEMA IF NOT EXISTS app_data;

-- Example: Create a simple jobs table for BullMQ metadata (optional)
-- You might want this for job analytics or custom job storage
CREATE TABLE IF NOT EXISTS job_logs (
    id SERIAL PRIMARY KEY,
    job_id VARCHAR(255) NOT NULL,
    queue_name VARCHAR(100) NOT NULL,
    job_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    failed_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    job_data JSONB,
    result_data JSONB
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_job_logs_queue_name ON job_logs(queue_name);
CREATE INDEX IF NOT EXISTS idx_job_logs_status ON job_logs(status);
CREATE INDEX IF NOT EXISTS idx_job_logs_created_at ON job_logs(created_at);

-- Insert sample data (optional)
-- INSERT INTO job_logs (job_id, queue_name, job_name, status, job_data) 
-- VALUES ('sample-job-1', 'email', 'send-welcome', 'pending', '{"email": "user@example.com"}');

COMMENT ON TABLE job_logs IS 'Optional table for tracking BullMQ job metadata and analytics';