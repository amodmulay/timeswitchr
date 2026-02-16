import { constructMetadata } from '@/lib/metadata';
import styles from './Knowledge.module.css';

export const metadata = constructMetadata({
    title: 'Time Zone Knowledge Base | Professional Guide',
    description: 'A deep dive into how time zones work, the mechanics of conversion, and why precise time management is critical for global remote teams.',
});

import BackButton from '@/components/BackButton';

export default function KnowledgePage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <BackButton />
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Time Zone Knowledge Base</h1>
            <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem' }}>
                Understanding the technical and human aspects of global time coordination.
            </p>

            <details className={styles.knowledgeContainer} open>
                <summary className={styles.knowledgeSummary}><h2>What is a Time Zone?</h2></summary>
                <div className={styles.content}>
                    <p>
                        A time zone is a geographic region in which the same standard time is used for legal, commercial, and social purposes. Historically, time was localized—every city set its own sun-based "noon." This became chaotic with the advent of the railroad and telegraph, leading to the creation of standardized time zones in the late 19th century.
                    </p>
                    <p>
                        Most time zones on land are offset from Coordinated Universal Time (UTC) by a whole number of hours (UTC−12 to UTC+14), though a few zones are offset by 30 or 45 minutes (such as in India, Nepal, and parts of Australia). These offsets are measured relative to the Prime Meridian in Greenwich, London.
                    </p>
                </div>
            </details>

            <details className={styles.knowledgeContainer}>
                <summary className={styles.knowledgeSummary}><h2>How Time Zone Conversion Works</h2></summary>
                <div className={styles.content}>
                    <p>
                        Conversion is mathematically simple but logistically complex. At its core, it involves taking the local time, subtracting its current offset to find the "Universal Time" (UTC), and then adding the target zone's offset.
                    </p>
                    <p>
                        The complexity arises because these offsets are not static. Governments frequently change their standard time or shift their observation of summer time. To manage this at scale, modern computers rely on the IANA Time Zone Database (often called the Zoneinfo or Olson database). This database tracks every historical and planned change in time laws across the globe, allowing tools like TimeSwitchr to provide precise results regardless of when or where the conversion is taking place.
                    </p>
                </div>
            </details>

            <details className={styles.knowledgeContainer}>
                <summary className={styles.knowledgeSummary}><h2>Why Remote Teams Need Precision</h2></summary>
                <div className={styles.content}>
                    <p>
                        For global remote teams, time zones are the "invisible infrastructure" that dictates the rhythm of collaboration. A simple 30-minute error in a meeting invite can derail a project or force a colleague to wake up at 4:00 AM.
                    </p>
                    <p>
                        Precise conversion tools help teams find the "Golden Hour"—that rare window where multiple time zones overlap during standard working hours. For example, a team spanning New York, London, and Berlin has several hours of overlap, but adding a team member in Singapore or Mumbai creates a scenario where synchronous work is nearly impossible without deliberate, precise scheduling. Reliability in conversion tools prevents the friction of missed connections and respects the boundaries of cross-continental colleagues.
                    </p>
                </div>
            </details>

            <details className={styles.knowledgeContainer}>
                <summary className={styles.knowledgeSummary}><h2>Understanding Daylight Saving Time (DST)</h2></summary>
                <div className={styles.content}>
                    <p>
                        Daylight Saving Time is the practice of advancing clocks during warmer months so that darkness falls at a later clock time. While common in North America and Europe, it is not observed globally. Paradoxically, even when two countries both observe DST, they often do so on different start and end dates.
                    </p>
                    <p>
                        This creates a "moving target" in time conversion. For example, the offset between London and New York is usually five hours. However, because their transition dates differ, there is a period in March and October where that difference shifts to four hours. Reliable time zone tools must account for these transitions automatically to ensure that recurring meetings remain consistent for all participants throughout the year.
                    </p>
                </div>
            </details>

        </main>
    );
}
