import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { getPageBySlug } from '@/lib/data';

export const metadata = {
  title: 'Terms & Conditions | VN Vidhyapeeth',
  description: 'Terms and institutional guidelines for website usage, course applications, and donations at VN Vidhyapeeth.'
};


export default function TermsPage() {
  const page = getPageBySlug('terms-and-conditions');

  return (
    <div>
      <PageHeader
        badge="Legal & Terms"
        title="Terms & Conditions"
        subtitle="Institutional regulations, admission criteria, and website terms of use."
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose max-w-none text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
            {page ? page.content : `
              Welcome to the official website of VN Vidhyapeeth, operated by a registered educational trust under the Indian Trust Act 1882.

              1. Institutional Status: VN Vidhyapeeth offers autonomous skill-development, paramedical, and vocational diploma programs aimed at direct employability and self-employment.

              2. Code of Conduct: Students and website visitors must provide truthful academic and identification information.

              3. Donations: Voluntary donations made in support of student scholarships and non-profit educational initiatives are non-refundable.

              4. Intellectual Property: All logos, content, and materials published on this portal belong to VN Vidhyapeeth.
            `}
          </div>
        </div>
      </section>
    </div>
  );
}
