'use client';

import styles from './InfoSection.module.css';

export default function InfoSection() {
    return (
        <section className={styles.infoSection}>
            <div className={styles.contentBlock}>
                <h2 id="why">Why Use TimeSwitchr?</h2>
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
                <h2 id="faq">Frequently Asked Questions</h2>
                <div className={styles.faqItem}>
                    <h4>How do I convert time between two specific cities?</h4>
                    <p>
                        TimeSwitchr uses the IANA database, which links major cities to their respective time zones. Simply start typing the city name in the "From" or "To" search box. The tool will instantly resolve the city to its correct time zone (e.g., "Paris" to "Central European Time"). Once selected, use the rolling wheels or keyboard input to see the live conversion.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h4>Does this tool account for Daylight Saving Time (DST) automatically?</h4>
                    <p>
                        Yes. Precision is a core principle of TimeSwitchr. The conversion engine calculates the exact offset for the specific date and time you enter. Because different regions shift clocks on different weeks, the tool verifies the historical and planned DST transitions for both the origin and destination zones. This ensures that your meeting times remain accurate during the chaotic transition weeks in March and October.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h4>What is the difference between UTC and GMT?</h4>
                    <p>
                        While often used interchangeably, there is a technical distinction. Coordinated Universal Time (UTC) is a high-precision atomic time standard and is the primary reference for all civil time. Greenwich Mean Time (GMT) is a time zone used in parts of Europe and Africa. Since UTC does not observe Daylight Saving Time, it serves as the stable anchor that all other global zones are measured against.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h4>How can I schedule a meeting across three or more time zones?</h4>
                    <p>
                        Managing "three-way" conversions is best handled by using the World Clock feature on the homepage. By selecting your primary "From" zone, you can see how that time translates across multiple "To" zones simultaneously. This allows you to find the "Golden Hour"—the narrow window where participants in New York, London, and Tokyo might all be awake and available for a synchronous call.
                    </p>
                </div>
                <div className={styles.faqItem}>
                    <h4>Is the converted time always accurate for future dates?</h4>
                    <p>
                        The tool is as accurate as the current IANA Time Zone Database rules. For the vast majority of dates, the conversion is perfectly reliable. However, governments occasionally change their time zone laws (like shifting DST start dates) with very short notice. TimeSwitchr stays updated with the latest database releases (Zoneinfo) to reflect these legislative changes as soon as they are technically available and standardized.
                    </p>
                </div>
            </div>

            <div className={styles.tips}>
                <h2 id="tips">Tips for Global Collaboration</h2>
                <ul>
                    <li><strong>Set a "Golden Hour":</strong> Find the overlap between your team's working hours. A 9 AM start in New York is 2 PM in London and 7:30 PM in Mumbai.</li>
                    <li><strong>Use UTC for Invites:</strong> When scheduling very large cross-continental meetings, including the UTC time can help avoid confusion.</li>
                    <li><strong>Check the "Day Shift":</strong> Always notice if a conversion results in the 'Next Day' or 'Previous Day' to avoid missing deadlines.</li>
                </ul>
            </div>
        </section>
    );
}
