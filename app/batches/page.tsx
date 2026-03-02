import BootcampClient from "./BootcampClient";

export const metadata = {
  title: "3-Day Manifestation & Meditation Bootcamp | Dream Homes Bihar",
  description:
    "Join our 3-Day Manifestation & Meditation Bootcamp covering manifestation, mindset clarity and meditation. Live beginner-friendly sessions at ₹199.",
};

export default function BootcampPage() {
  return (
    <>
      <BootcampClient />

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who is this bootcamp best suited for?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "This bootcamp is designed for professionals, entrepreneurs and individuals who want clarity, emotional discipline and conscious mindset growth.",
                },
              },
              {
                "@type": "Question",
                name: "Is this bootcamp practical or theoretical?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "It is completely practice-driven with guided meditations, awareness exercises and real-life application.",
                },
              },
              {
                "@type": "Question",
                name: "How much time is required daily?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Each session is about 60 minutes with optional 10–15 minutes of self-practice.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}