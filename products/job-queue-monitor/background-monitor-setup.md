# Background Monitor Setup

> **BC view name:** Background Monitor Setup

## Overview

Background Monitor Setup defines the global rules and behavior of the Job Queue Monitor. It does not select which jobs are monitored — that is done per Job Queue Entry.

## Prerequisites

Before the monitor can run:

- The Background Job Queue Monitor extension must be installed
- A valid license must be activated (found under **Licenses** in Background Monitor Setup)
- Background Monitor Setup must be configured
- The monitor must be enabled
- The monitor schedule must be started manually using **Start/Update Job Queue Monitor Schedule** (this cannot be triggered externally)

## General Settings

| Field | Description |
|-------|-------------|
| **Enabled** | Activates or deactivates the Background Job Queue Monitor. |
| **Job Queue Max Tries** | Maximum number of restart attempts per job. Set to 0 for unlimited retries. |
| **Job Queue General Runtime Max (min)** | Maximum allowed runtime before a job is considered not responding and restarted. 0 disables runtime monitoring. |
| **E-mail Recipient List** | Email addresses that receive error notifications. Multiple addresses separated by `;` or `,`. |
| **Email on Error** | Must be enabled to send error notifications. |
| **E-mail Re Occurrence (Minutes)** | How often error emails are resent while the issue persists. Default: 15 minutes. |
| **Daily E-mail Summary** | Sends a daily summary of monitor events. |
| **Daily E-mail Time** | Time of day when the daily summary email is sent. |

## Table Monitor Entries

Table Monitor Entries enable volume-based monitoring — detecting if too few or too many records are created within a time interval.

**Typical use cases:**

- Detect missing order inflow
- Detect unexpected data spikes
- Monitor integration throughput

### Fields

| Field | Description |
|-------|-------------|
| **Enabled** | Activates monitoring for this entry. |
| **Code** | Unique identifier for the monitor rule. |
| **Description** | Description of what is being monitored. |
| **Table No.** | Business Central table being monitored. |
| **Monitor Start Time** | Time when monitoring starts. |
| **Monitor End Time** | Time when monitoring ends. |
| **Last Alarm Type** | Type of the last triggered alarm. |
| **Last Alarm Count** | Number of alarms triggered. |
| **Last Alarm Date Time** | Date and time of the last alarm. |
| **Normal Minimum Count Entries during Interval** | Triggers an alarm if record count is below this value during the interval. 0 disables the check. |
| **Normal Maximum Count Entries during Interval** | Triggers an alarm if record count exceeds this value. Use a large number to disable max checks. |

## Related

- [Background Monitor Log](background-monitor-log.md)
- [How to Configure and Activate Job Queue Monitor](how-to-configure.md)
