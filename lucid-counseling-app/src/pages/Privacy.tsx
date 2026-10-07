import LegalLayout from '../components/LegalLayout';

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Your privacy"
      title="Privacy Policy"
      intro="Lucid Counseling Center respects your privacy. This policy explains how we collect, use, and protect the information you share with us."
      sections={[
        {
          h: 'Information we collect',
          p: [
            'When you contact us, book an appointment, or request services, we may collect information such as your name, phone number, email address, and the details you choose to share about why you are reaching out.',
            'Our website may also collect limited, non-identifying technical information (such as general analytics) to help us understand how visitors use the site and to improve it.',
          ],
        },
        {
          h: 'How we use your information',
          p: [
            'We use the information you provide to respond to your inquiry, schedule appointments, coordinate care, and communicate with you about your services. We do not sell your personal information.',
          ],
        },
        {
          h: 'Scheduling and protected health information',
          p: [
            'Appointment scheduling is handled through our secure, HIPAA-compliant scheduling provider. Protected health information related to your care is governed by our HIPAA Notice of Privacy Practices.',
          ],
        },
        {
          h: 'How we protect your information',
          p: [
            'We use reasonable administrative, technical, and physical safeguards designed to protect your information. Telehealth sessions are conducted over a secure, HIPAA-compliant platform.',
          ],
        },
        {
          h: 'Contact us',
          p: [
            'If you have questions about this Privacy Policy or how your information is handled, contact us at info@lucidcounselingcenter.com or 352-988-3300.',
          ],
        },
      ]}
    />
  );
}
