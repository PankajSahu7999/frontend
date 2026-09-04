'use client';

import { ArrowUpRight } from 'lucide-react';
import { useBlogs } from '@/hooks/useRedux';

export function BlogSection() {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
      <section className="w-full flex justify-center py-16">
        <div className="w-full max-w-[1184px]">
          <div className="text-center text-slate-500">Loading blogs...</div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  const displayBlogs = blogs.slice(0, 3);

  return (
    <section className="w-full flex justify-center py-16 bg-slate-50">
      <div className="w-full max-w-[1184px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Latest Blog Posts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBlogs.map((blog: any) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div
                className="w-full h-[200px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${blog.featured_image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'})`,
                }}
              />
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-2">
                  {blog.published_at
                    ? new Date(blog.published_at).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Recent'}
                </p>
                <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                </p>
                <a
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700"
                >
                  Read More
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
