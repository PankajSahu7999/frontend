'use client';

import React, { useState, useEffect } from 'react';

interface ContentSection {
  id?: string;
  title: string;
  content: string;
  sort_order?: number;
}

interface CategoryContentGuideProps {
  contentSections: ContentSection[];
  categoryName: string;
}

export default function CategoryContentGuide({ contentSections, categoryName }: CategoryContentGuideProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    if (contentSections && contentSections.length > 0) {
      setActiveSectionId(`guide-section-${contentSections[0].id || 0}`);
    }

    const handleScroll = () => {
      const sectionElements = contentSections.map((sec, idx) => {
        const id = `guide-section-${sec.id || idx}`;
        return { id, el: document.getElementById(id) };
      });

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSectionId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentSections]);

  if (!contentSections || contentSections.length === 0) {
    return null;
  }

  const scrollToSection = (id: string) => {
    setActiveSectionId(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Contents Navigation */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-28 bg-transparent">
              <h3 className="text-slate-900 font-bold text-lg mb-4 tracking-tight">
                Contents
              </h3>
              
              <nav className="flex flex-col space-y-2.5">
                {contentSections.map((section, index) => {
                  const sectionId = `guide-section-${section.id || index}`;
                  const isActive = activeSectionId === sectionId;

                  return (
                    <button
                      key={section.id || index}
                      type="button"
                      onClick={() => scrollToSection(sectionId)}
                      className={`text-left transition-colors duration-150 text-sm leading-snug py-0.5 ${
                        isActive
                          ? 'text-blue-600 font-semibold'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {section.title || `Section ${index + 1}`}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Right Column: Guide Content Sections */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-10">
            {/* Main Header */}
            <div>
              <h2 className="text-slate-900 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                {categoryName}: Complete Guide
              </h2>
            </div>

            {/* Content Sections List */}
            {contentSections.map((section, index) => {
              const sectionId = `guide-section-${section.id || index}`;

              return (
                <div key={section.id || index} id={sectionId} className="scroll-mt-28 space-y-3 pt-2">
                  <h3 className="text-slate-900 text-xl sm:text-2xl font-bold tracking-tight">
                    {section.title}
                  </h3>
                  
                  <div 
                    className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 font-normal"
                    dangerouslySetInnerHTML={{ 
                      __html: (section.content || '')
                        .replace(/\n\n/g, '<br /><br />')
                        .replace(/\n/g, '<br />')
                    }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
