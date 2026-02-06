import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
    title: 'Privacy Policy',
    description: 'Information about how TimeSwitchr handles your data.',
});

export default function PrivacyPage() {
    return (
        <main className="container">
            <h1 className="text-center">Privacy Policy</h1>

            <section className="mt-8">
                <h2>1. Data Protection at a Glance</h2>
                <p>
                    This website is a privately run hobby project. However, since it is monetized through advertisements,
                    we are committed to transparency regarding your data. The following information provides a simple
                    overview of what happens to your personal data when you visit this website.
                </p>

                <h2 className="mt-8">2. Cookie Consent</h2>
                <p>
                    When you first visit our website, we ask for your consent to use cookies for analytics and advertising
                    purposes. You can choose to "Accept" or "Decline" this.
                </p>
                <p className="mt-4">
                    If you "Decline", we will not load Google Analytics or Google AdSense scripts, and no tracking
                    cookies will be set. Technically necessary data (like your timezone preferences) will still be
                    stored in your browser's local storage.
                </p>

                <h2 className="mt-8">3. Data Collection on This Website</h2>
                <p>
                    <strong>Cookies:</strong> This website uses cookies to improve your experience and for advertising
                    purposes (Google AdSense). You can manage your cookie settings in your browser.
                </p>
                <p className="mt-4">
                    <strong>Local Storage:</strong> We use your browser's local storage to save your timezone preferences
                    (e.g., your last selected "From" and "To" zones) so they are available the next time you visit.
                    This data never leaves your device.
                </p>

                <h2 className="mt-8">3. Third Party Services</h2>
                <p>
                    <strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact
                    with the site. This service may collect data such as your IP address and browser type.
                </p>
                <p className="mt-4">
                    <strong>Google AdSense:</strong> We display advertisements via Google AdSense. Google uses cookies
                    to serve ads based on your previous visits to this and other websites.
                </p>

                <h2 className="mt-8">4. Font Hosting</h2>
                <p>
                    For the aesthetic design of our website, we use the "Inter" font.
                    This is provided via <strong>next/font</strong>, which means it is
                    <strong>self-hosted</strong> on our own server.
                </p>
                <p className="mt-4">
                    When you visit our site, your browser downloads this font directly from our server.
                    No connection is established to external servers (such as Google Fonts), and no
                    personal data (like your IP address) is transmitted to third-party font providers.
                </p>

                <h2 className="mt-8">5. Your Rights</h2>
                <p>
                    You have the right to receive information about the origin, recipient, and purpose of your
                    stored personal data at any time free of charge. You also have the right to request the
                    correction or deletion of this data.
                </p>

                <h2 className="mt-8">5. Contact</h2>
                <p>
                    For any privacy-related questions, please contact the website owner listed in our Impressum.
                </p>
            </section>
        </main>
    );
}
