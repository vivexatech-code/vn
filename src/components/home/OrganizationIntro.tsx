import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export default function OrganizationIntro() {
  return (
    <section className="py-20 sm:py-24 bg-white" aria-label="About VN Vidhyapeeth">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Human Photograph with Proper Aspect Ratio */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
                <ImageWithFallback
                  src="/images/ngo/hero-children-study.jpg"
                  fallbackSrc="/images/placeholder-general.svg"
                  alt="Children studying at VN Vidhyapeeth community learning center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3 text-xs text-slate-500 italic text-center sm:text-left">
                Every child deserves an opportunity to learn and grow in a safe, caring environment.
              </div>
            </div>
          </div>

          {/* Right Column: Emotional, Simple, Human Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#D52D2D] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#D52D2D]" />
              <span>Who We Are</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#102C63] tracking-tight leading-snug">
              Every child deserves a chance to learn. Every family deserves a meal.
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              <strong>VN Vidhyapeeth</strong> is a registered educational and social welfare trust dedicated to breaking the cycle of poverty through grassroots action. We work on the ground to ensure that poverty never stops a child from holding a pencil, attending class, or having food on their plate.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From distributing free notebooks and backpacks in rural schools to delivering monthly dry ration food kits to daily-wage families, our work is driven by one belief: that small, consistent acts of human compassion can transform an entire generation.
            </p>

            {/* Clean, Non-Carded Core Truths */}
            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#183F91] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-snug">
                  <strong>Free Education Support:</strong> Ensuring children from poor families stay in school with tuition aid and remedial centers.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D52D2D] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-snug">
                  <strong>Hunger Relief & Rations:</strong> Distributing wholesome meals and dry grocery kits directly to impoverished homes.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-snug">
                  <strong>Free Stationery Kits:</strong> Putting notebooks, pens, and school supplies directly into children's hands.
                </p>
              </div>
            </div>

            {/* Quiet Link */}
            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#183F91] hover:text-[#102C63] font-semibold text-sm transition-colors group"
              >
                <span>Read our full founding story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-500">Registered Trust (Indian Trusts Act 1882)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
