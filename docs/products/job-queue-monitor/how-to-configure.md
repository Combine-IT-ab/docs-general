# How to Configure and Activate Job Queue Monitor

## Prerequisites

Before the monitor can run, the Background Job Queue Monitor extension must be installed in your Business Central environment.

## Starting the Monitor

1. Open **Background Monitor Setup**
2. Verify that the license is active
3. Configure **General** settings and **Table Monitor Entries** — see [Background Monitor Setup](background-monitor-setup.md) for field details
4. Set **Enabled = true**
5. Select **Start/Update Job Queue Monitor Schedule**

The monitor will now run continuously according to the configured rules.

## Enabling Monitoring on Individual Jobs

To monitor a specific job:

1. Go to **Job Queue Entries**
2. Open the job you want to monitor
3. Enable the relevant options:
   - **Monitor Active** — the job is monitored by the Background Job Queue Monitor
   - **Set to Ready** — the job is automatically restarted if it enters Error state

Only jobs with **Monitor Active** enabled are handled by the monitor.

## Related

- [Background Monitor Setup](background-monitor-setup.md)
- [Background Monitor Log](background-monitor-log.md)
