import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { getPageBySlug } from '@/lib/data';

export const metadata = {
  title: 'Privacy Policy | VN Vidhyapeeth',
  description: 'Official privacy policy of VN Vidhyapeeth educational trust.'
};


export default function PrivacyPolicyPage() {
  const page = getPageBySlug('privacy-policy');

  return (
    <div>
      <PageHeader
        badge="Legal & Transparency"
        title="Privacy Policy"
        subtitle="How VN Vidhyapeeth handles, protects, and respects your personal data."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose max-w-none text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {page ? page.content : `
              VN Vidhyapeeth ("Organization", "we", "us") is dedicated to safeguarding your privacy and ensuring the confidentiality of your personal data.

              1. Information Collection: We collect details provided during course enquiries, admission forms, donations, and volunteer registration, including names, contact numbers, email addresses, and educational qualifications.

              2. Use of Information: Your data is solely utilized to process applications, communicate institutional updates, issue donation receipts, and manage student records. We never sell, rent, or lease personal information to third parties.

              3. Security: We adopt robust administrative and technical protections to secure your data against unauthorized disclosure or tampering.

              4. Contact: For privacy questions, contact vnvidyapeeth@gmail.com.
            `}
          </div>
        </div>
      </section>
    </div>
  );
}
