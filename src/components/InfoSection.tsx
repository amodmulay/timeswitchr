'use client';

import styles from './InfoSection.module.css';

export default function InfoSection() {
    return (
        <section className={styles.infoSection}>
            <div className={styles.contentBlock}>
                <h2>Why Use TimeSwitchr?</h2>
                <p>
                    In today's global economy, working across time zones is a daily reality.
                    TimeSwitchr was built to solve the frustration of complex, cluttered timezone converters.
                    This minimalist interface provides zero-click conversions, making it the fastest way
                    to schedule international meetings, sync with remote teams, or simply check the time for a friend abroad.
                </p>
            </div>

            <div className={styles.features}>
                <div className={styles.featureItem}>
                    <h3>🚀 Instant Conversion</h3>
                    <p>No more clicking 'Submit' or refreshing pages. Time updates instantly as you type or scroll.</p>
                </div>
                <div className={styles.featureItem}>
                    <h3>📱 Mobile First</h3>
                    <p>Optimized for on-the-go checks. Our premium rolling wheels make time selection a breeze on touch screens.</p>
                </div>
                <div className={styles.featureItem}>
                    <h3>💾 Smart Presets</h3>
                    <p>Your most used conversions are saved automatically. Access them in one click from your personalized dashboard.</p>
                </div>
                <div className={styles.featureItem}>
                    <h3>🌍 Global Coverage</h3>
                    <p>Powered by the latest IANA database, supporting every official timezone and city worldwide.</p>
                </div>
            </div>

            <div className={styles.faq}>
                <h2>Frequently Asked Questions</h2>
                <div className={styles.faqItem}>
                    <h4>What is UTC and why is it important?</h4>
                    <p>
                        Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks and time.
                        It does not change for Daylight Saving Time, making it the perfect 'reference point' for global coordination.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h4>How does TimeSwitchr handle Daylight Saving Time (DST)?</h4>
                    <p>
                        My system automatically accounts for DST changes based on the city and date selected.
                        I use real-time IANA data to ensure your conversions are always accurate, regardless of seasonal shifts.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h4>Is my data private?</h4>
                    <p>
                        Yes. Unlike many other tools, TimeSwitchr stores your presets locally in your browser.
                        I do not track your specific conversions or store your preferences on my servers.
                    </p>
                </div>
            </div>

            <div className={styles.tips}>
                <h2>Tips for Global Collaboration</h2>
                <ul>
                    <li><strong>Set a "Golden Hour":</strong> Find the overlap between your team's working hours. A 9 AM start in New York is 2 PM in London and 7:30 PM in Mumbai.</li>
                    <li><strong>Use UTC for Invites:</strong> When scheduling very large cross-continental meetings, including the UTC time can help avoid confusion.</li>
                    <li><strong>Check the "Day Shift":</strong> Always notice if a conversion results in the 'Next Day' or 'Previous Day' to avoid missing deadlines.</li>
                </ul>
            </div>
        </section>
    );
}
