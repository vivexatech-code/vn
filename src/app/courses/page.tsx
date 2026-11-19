import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/common/PageHeader';
import { getCourses } from '@/lib/data';
import { Clock, GraduationCap, ArrowRight, Search, BookOpen, Filter } from 'lucide-react';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

export const metadata = {
  title: 'Education & Courses | VN Vidhyapeeth',
  description: 'Explore certified diploma and certificate courses in Paramedical Sciences, Computer Applications, and Vocational Trades.'
};


export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = typeof resolvedParams.category === 'string' ? resolvedParams.category : 'all';
  const searchQuery = typeof resolvedParams.q === 'string' ? resolvedParams.q.toLowerCase() : '';

  const allCourses = getCourses({ onlyActive: true });

  const filteredCourses = allCourses.filter((course) => {
    const matchesCat = currentCategory === 'all' || course.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesQuery = !searchQuery ||
      course.title.toLowerCase().includes(searchQuery) ||
      course.short_desc.toLowerCase().includes(searchQuery) ||
      (course.code && course.code.toLowerCase().includes(searchQuery));
    return matchesCat && matchesQuery;
  });

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'paramedical', label: 'Paramedical & Healthcare' },
    { id: 'computer', label: 'Computer & Digital Skills' },
    { id: 'vocational', label: 'Vocational & Industrial' }
  ];

  return (
    <div>
      <PageHeader
        badge="Academic Programs"
        title="Education & Vocational Courses"
        subtitle="Explore high-demand career diplomas designed for employment, healthcare excellence, and practical mastery."
        breadcrumbs={[{ label: 'Education & Courses' }]}
      />

      <section className="py-16 bg-[#F5F7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Controls Bar: Category Filter & Search Form */}
          <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((c) => {
                const isActive = currentCategory.toLowerCase() === c.id.toLowerCase();
                return (
                  <Link
                    key={c.id}
                    href={c.id === 'all' ? '/courses' : `/courses?category=${c.id}`}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? 'bg-[#183F91] text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </Link>
                );
              })}
            </div>

            {/* Search Input Box */}
            <form method="GET" action="/courses" className="w-full md:w-72 relative">
              {currentCategory !== 'all' && (
                <input type="hidden" name="category" value={currentCategory} />
              )}
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search courses or codes..."
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#183F91]/20 focus:border-[#183F91]"
              />
            </form>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredCourses.length}</strong> available programs
              {currentCategory !== 'all' && ` in ${currentCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(currentCategory !== 'all' || searchQuery) && (
              <Link href="/courses" className="text-[#183F91] font-semibold hover:underline">
                Reset filters
              </Link>
            )}
          </div>

          {/* Courses Grid */}
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-slate-700">No Courses Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No educational programs matched your criteria. Try adjusting your search query or selecting a different category.
              </p>
              <Link
                href="/courses"
                className="inline-block bg-[#183F91] text-white px-5 py-2 rounded-xl text-xs font-semibold mt-2"
              >
                View All Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-card shadow-card-hover border border-slate-100 flex flex-col justify-between group"
                >
                  <div>
                    {/* Course Image */}
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <ImageWithFallback
                        src={course.image_url || '/images/dmlt.jpg'}
                        fallbackSrc="/images/placeholder-course.svg"
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#183F91] shadow">
                        {course.category}
                      </div>

                      {course.code && (
                        <div className="absolute top-4 right-4 bg-[#102C63]/90 text-white px-2.5 py-1 rounded text-[11px] font-mono font-medium shadow">
                          {course.code}
                        </div>
                      )}
                    </div>

                    {/* Course Information */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-red-500" />
                          {course.duration}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1.5 font-medium text-slate-700 truncate" title={course.eligibility}>
                          <GraduationCap className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span className="truncate">{course.eligibility}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-[#102C63] group-hover:text-[#183F91] transition leading-snug line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                        {course.short_desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#F5F7FC] hover:bg-[#183F91] hover:text-white text-[#183F91] py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-200"
                    >
                      <span>Syllabus & Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/online-admission"
                      className="w-full flex items-center justify-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 py-1"
                    >
                      <span>Apply for Admission Online →</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
