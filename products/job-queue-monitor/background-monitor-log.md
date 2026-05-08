# Background Monitor Log

> **BC view name:** Background Monitor Log

## Overview

The Background Monitor Log records all actions performed by the Job Queue Monitor. Every time the monitor detects an issue — such as a job entering Error state or exceeding its maximum runtime — a log entry is created.

Use this view to track what happened, why it happened, and what the monitor did in response.

## What Is Logged

A log entry is created when:

- A Job Queue Entry enters Error
- A job exceeds the configured runtime threshold
- The monitor restarts or otherwise handles a job
- An alarm condition is triggered from Table Monitor Entries

## Fields

| Field | Description |
|-------|-------------|
| **Created DateTime** | Date and time when the log entry was created. |
| **Record ID Text** | The Record ID related to the monitored event. |
| **Job Name** | Name of the Job Queue Entry as defined in Job Queue Entries. |
| **Job Status** | Status of the job when the monitor was triggered (commonly Error). |
| **Error Message** | The error message reported by the job. |
| **Successful** | Indicates the action taken by the monitor (e.g. Action applied). |
| **Successful DateTime** | Date and time when the monitor action was completed. |

## How to Use This Page

- Confirm that the Job Queue Monitor is actively handling errors
- Verify that jobs are being restarted automatically
- Investigate recurring failures or unstable jobs
- Correlate email alerts with actual monitor actions

This page is read-only and intended for diagnostics and audit purposes.

## Related

- [Background Monitor Setup](background-monitor-setup.md)
- [How to Configure and Activate Job Queue Monitor](how-to-configure.md)
