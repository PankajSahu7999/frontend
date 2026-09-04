'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Select, Button } from '../../../../../components/admin/FormElements';
import MediaUpload from '../../../../../components/admin/MediaUpload';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    featured_image: '',
    excerpt: '',
    content: '',
    meta_title: '',
    meta_description: '',
    status: 'draft'
  });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs/${id}`);
      if (!res.ok) {
        console.error('Failed to fetch blog:', res.status, res.statusText);
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      console.log('Blog data:', data);
      setFormData(data);
    } catch (err) {
      console.error("Failed to fetch blog", err);
    }
    setIsLoading(false);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData({ ...formData, title: newTitle, slug: generateSlug(newTitle) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push('/admin/blogs');
      } else {
        alert('Failed to update blog');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating blog');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/blogs')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Blogs
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h1 className="text-2xl font-bold text-slate-800">Edit Blog Post</h1>
          <p className="text-sm text-slate-500 mt-1">Update your blog content.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Title" 
              value={formData.title} 
              onChange={handleTitleChange} 
              placeholder="Blog post title"
              required 
            />
            <Input 
              label="Slug" 
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value})} 
              placeholder="blog-post-slug"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Featured Image</label>
            <MediaUpload
              value={formData.featured_image}
              onChange={(value) => setFormData({...formData, featured_image: value})}
              accept="image"
              folder="blogs"
            />
          </div>

          <Textarea 
            label="Excerpt" 
            value={formData.excerpt} 
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
            placeholder="Brief summary of the blog post..."
            rows={2}
          />

          <Textarea 
            label="Content" 
            value={formData.content} 
            onChange={(e) => setFormData({...formData, content: e.target.value})} 
            placeholder="Main blog content..."
            rows={12}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Meta Title" 
              value={formData.meta_title} 
              onChange={(e) => setFormData({...formData, meta_title: e.target.value})} 
              placeholder="SEO meta title"
            />
            <Input 
              label="Meta Description" 
              value={formData.meta_description} 
              onChange={(e) => setFormData({...formData, meta_description: e.target.value})} 
              placeholder="SEO meta description"
            />
          </div>

          <Select 
            label="Status" 
            options={[
              {value: 'draft', label: 'Draft'},
              {value: 'published', label: 'Published'}
            ]}
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          />

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/blogs')}>Cancel</Button>
            <Button type="submit" isLoading={isSaving} className="gap-2">
              <Save size={16} />
              Update Blog Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
