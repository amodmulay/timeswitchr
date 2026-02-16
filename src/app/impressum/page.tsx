import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata({
    title: 'Impressum (Legal Notice)',
    description: 'Legal information about the website owner of TimeSwitchr.',
});

import BackButton from "@/components/BackButton";

export default function ImpressumPage() {
    return (
        <main className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
            <BackButton />
            <h1 className="text-center">Impressum</h1>

            <section className="mt-8">
                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                    Amod Mulay<br />
                    Leinweberweg 45<br />
                    81249 München<br />
                    Germany
                </p>

                <h2 className="mt-8">Kontakt</h2>
                <p>
                    E-Mail: themvpletter@gmail.com
                </p>

                <h2 className="mt-8">Redaktionell verantwortlich</h2>
                <p>
                    Amod Mulay<br />
                    Leinweberweg 45, 81249 München
                </p>

                <h2 className="mt-8">EU-Streitschlichtung</h2>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                    <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-muted" style={{ textDecoration: 'underline', marginLeft: '0.5rem' }}>
                        https://ec.europa.eu/consumers/odr/
                    </a>.
                    Meine E-Mail-Adresse finden Sie oben im Impressum.
                </p>

                <h2 className="mt-8">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
                <p>
                    Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </section>
        </main>
    );
}
