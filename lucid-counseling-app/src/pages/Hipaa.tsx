import LegalLayout from '../components/LegalLayout';

export default function Hipaa() {
  return (
    <LegalLayout
      eyebrow="Your rights"
      title="HIPAA Notice of Privacy Practices"
      intro="This notice describes how medical information about you may be used and disclosed, and how you can get access to this information. Please review it carefully."
      sections={[
        {
          h: 'Our commitment to your privacy',
          p: [
            'Lucid Counseling Center is committed to protecting the privacy of your protected health information (PHI). We are required by law to maintain the privacy of your PHI, to provide you with this notice of our legal duties and privacy practices, and to follow the terms of the notice currently in effect.',
          ],
        },
        {
          h: 'How we may use and disclose your information',
          p: [
            'We may use and disclose your health information for treatment, payment, and health care operations — for example, to coordinate your care, to bill your insurance, or to manage and improve our services.',
            'Other uses and disclosures will be made only with your written authorization, which you may revoke at any time in writing.',
          ],
        },
        {
          h: 'Your rights',
          p: [
            'You have the right to request access to and a copy of your records, to request corrections, to request restrictions on certain uses and disclosures, to request confidential communications, and to receive an accounting of certain disclosures.',
            'You also have the right to receive a paper copy of this notice upon request.',
          ],
        },
        {
          h: 'Telehealth and secure scheduling',
          p: [
            'Telehealth sessions are provided over a secure, HIPAA-compliant platform. Appointment scheduling is handled by our HIPAA-compliant scheduling provider.',
          ],
        },
        {
          h: 'Questions or complaints',
          p: [
            'If you have questions about this notice or believe your privacy rights have been violated, you may contact us at info@lucidcounselingcenter.com or 352-988-3300. You will not be retaliated against for filing a complaint.',
          ],
        },
      ]}
    />
  );
}
