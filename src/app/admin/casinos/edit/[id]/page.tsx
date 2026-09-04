'use client';
import React, { useState, useEffect, use } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input, Textarea, Select, Toggle, Button } from '../../../../../components/admin/FormElements';
import MediaUpload from '../../../../../components/admin/MediaUpload';
import { ArrowLeft, Save, Plus, Trash } from 'lucide-react';
import ChipSelector from '../../../../../components/admin/ChipSelector';
import CasinoReviews from '../../../../../components/admin/CasinoReviews';
import CasinoAffiliateLinks from '../../../../../components/admin/CasinoAffiliateLinks';
import MultiLicenseInput from '../../../../../components/admin/MultiLicenseInput';
import CasinoAcceptanceInput from '../../../../../components/admin/CasinoAcceptanceInput';
export default function EditCasinoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allTags, setAllTags] = useState<any[]>([]);
  const [allCountries, setAllCountries] = useState<any[]>([]);
  const [allGameTypes, setAllGameTypes] = useState<any[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedGameTypes, setSelectedGameTypes] = useState<string[]>([]);

  // Keyboard shortcuts for faster navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const tabs = ['general', 'details', 'relations', 'flags', 'bonuses', 'faqs', 'media', 'seo', 'reviews'];
        const num = parseInt(e.key);
        if (num >= 1 && num <= 9) {
          e.preventDefault();
          setActiveTab(tabs[num - 1]);
        }
      }
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const form = document.querySelector('form');
        if (form) form.requestSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes, countryRes, gameTypeRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tags`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/countries`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/game-types`)
        ]);
        if (catRes.ok) setAllCategories(await catRes.json());
        if (tagRes.ok) setAllTags(await tagRes.json());
        if (countryRes.ok) setAllCountries(await countryRes.json());
        if (gameTypeRes.ok) setAllGameTypes(await gameTypeRes.json());
      } catch (err) {
        console.error("Error fetching dynamic lists", err);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    featured_image: '',
    website_url: '',
    affiliate_url: '',
    default_affiliate_url: '',
    affiliate_program_name: '',
    affiliate_program_link: '',
    short_description: '',
    overview: '',
    editor_view: '',
    editor_name: '',
    editor_position: '',
    editor_experience_years: '',
    rating: '4.5',
    visits: '0',
    established_year: new Date().getFullYear().toString(),
    company_name: '',
    license_authority: '',
    minimum_deposit: '10',
    withdrawal_time: '24-48 Hours',
    support_methods: 'Live Chat 24/7, Email Support',
    status: 'active',
    featured: false,
    hot_casino: false,
    recommended_by_experts: false,
    certified_casino: false,
    mobile_friendly: true,
    crypto_supported: false,
    live_casino: true,
    sports_betting: false,
    responsible_gaming: true,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',

    languages: 'English',
    features: '',
    pros: '',
    cons: '',
    payment_methods: 'Visa, MasterCard',
    currencies: 'USD, EUR',
    game_providers: ''
  });

  const [bonuses, setBonuses] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [galleryVideos, setGalleryVideos] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchCasinoDetails();
    }
  }, [id]);

  const fetchCasinoDetails = async () => {
    setIsFetching(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/${id}`);
      if (!res.ok) {
        console.error('Failed to fetch casino:', res.status, res.statusText);
        setIsFetching(false);
        return;
      }
      const data = await res.json();
      console.log('Casino data:', data);
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        logo: data.logo || '',
        featured_image: data.featured_image || '',
        website_url: data.website_url || '',
        affiliate_url: data.affiliate_url || '',
        default_affiliate_url: data.default_affiliate_url || '',
        affiliate_program_name: data.affiliate_program_name || '',
        affiliate_program_link: data.affiliate_program_link || '',
        short_description: data.short_description || '',
        overview: data.overview || '',
        editor_view: data.editor_view || '',
        editor_name: data.editor_name || '',
        editor_position: data.editor_position || '',
        editor_experience_years: data.editor_experience_years !== null ? String(data.editor_experience_years) : '',
        rating: data.rating !== null ? String(data.rating) : '',
        visits: data.visits !== null ? String(data.visits) : '0',
        established_year: data.established_year !== null ? String(data.established_year) : '',
        company_name: data.company_name || '',
        license_authority: data.license_authority || '',
        minimum_deposit: data.minimum_deposit !== null ? String(data.minimum_deposit) : '',
        withdrawal_time: data.withdrawal_time || '',
        status: data.status || 'active',
        featured: !!data.featured,
        hot_casino: !!data.hot_casino,
        recommended_by_experts: !!data.recommended_by_experts,
        certified_casino: !!data.certified_casino,
        mobile_friendly: !!data.mobile_friendly,
        crypto_supported: !!data.crypto_supported,
        live_casino: !!data.live_casino,
        sports_betting: !!data.sports_betting,
        responsible_gaming: !!data.responsible_gaming,
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        meta_keywords: Array.isArray(data.meta_keywords) ? data.meta_keywords.join(', ') : '',

        support_methods: Array.isArray(data.support_methods) ? data.support_methods.join(', ') : '',
        languages: Array.isArray(data.languages) ? data.languages.map((l: any) => l.language).join(', ') : '',
        features: Array.isArray(data.features) ? data.features.map((f: any) => f.feature).join('\n') : '',
        pros: Array.isArray(data.pros) ? data.pros.map((p: any) => p.content).join('\n') : '',
        cons: Array.isArray(data.cons) ? data.cons.map((c: any) => c.content).join('\n') : '',
        payment_methods: Array.isArray(data.payment_methods) ? data.payment_methods.map((pm: any) => pm.method_name).join(', ') : '',
        currencies: Array.isArray(data.currencies) ? data.currencies.map((cur: any) => cur.currency_code).join(', ') : '',
        game_providers: Array.isArray(data.game_providers) ? data.game_providers.map((gp: any) => gp.provider_name).join(', ') : '',
      });

      if (data.bonuses) setBonuses(data.bonuses);
      if (data.faqs) setFaqs(data.faqs);
      if (data.screenshots) setScreenshots(data.screenshots);
      if (data.gallery_videos) setGalleryVideos(data.gallery_videos);
      
      if (data.categories) setSelectedCategories(data.categories.map((c: any) => c.category_id || c.category?.id));
      if (data.tags) setSelectedTags(data.tags.map((t: any) => t.tag_id || t.tag?.id));
      if (data.available_countries) setSelectedCountries(data.available_countries.map((c: any) => c.country_id || c.country?.id));
      if (data.game_types) setSelectedGameTypes(data.game_types.map((gt: any) => gt.game_type_id || gt.game_type?.id));
    } catch (err) {
      console.error("Error fetching casino details", err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddBonus = () => {
    setBonuses([...bonuses, { title: '100% Welcome Bonus', type: 'Welcome Bonus', amount: '$1000', bonus_code: '', wagering_requirement: '35x', sort_order: bonuses.length }]);
  };

  const handleRemoveBonus = (index: number) => {
    setBonuses(bonuses.filter((_, i) => i !== index));
  };

  const handleBonusChange = (index: number, field: string, value: any) => {
    const updated = [...bonuses];
    updated[index][field] = value;
    setBonuses(updated);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: 'What is the minimum deposit?', answer: 'The minimum deposit is $10.', sort_order: faqs.length }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index: number, field: string, value: any) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleAddScreenshot = () => {
    setScreenshots([...screenshots, { image_url: '', sort_order: screenshots.length }]);
  };

  const handleRemoveScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  const handleScreenshotChange = (index: number, field: string, value: any) => {
    const updated = [...screenshots];
    updated[index][field] = value;
    setScreenshots(updated);
  };

  const handleAddVideo = () => {
    setGalleryVideos([...galleryVideos, { video_url: '', title: '', sort_order: galleryVideos.length }]);
  };

  const handleRemoveVideo = (index: number) => {
    setGalleryVideos(galleryVideos.filter((_, i) => i !== index));
  };

  const handleVideoChange = (index: number, field: string, value: any) => {
    const updated = [...galleryVideos];
    updated[index][field] = value;
    setGalleryVideos(updated);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({ ...formData, name: newName, slug: generateSlug(newName) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...formData,
      categories: selectedCategories,
      tags: selectedTags,
      available_countries: selectedCountries,
      game_types: selectedGameTypes,
      bonuses,
      faqs,
      screenshots,
      gallery_videos: galleryVideos
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casinos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        router.push('/admin/casinos');
      } else {
        alert('Failed to update casino');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating casino');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'General Information' },
    { id: 'details', name: 'Details & Spec' },
    { id: 'relations', name: 'Relationships' },
    { id: 'flags', name: 'Flags & Status' },
    { id: 'bonuses', name: 'Bonuses' },
    { id: 'faqs', name: 'FAQs' },
    { id: 'media', name: 'Screenshots & Gallery' },
    { id: 'seo', name: 'SEO Metadata' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'affiliate', name: 'Affiliate Links' }
  ];

  if (isFetching) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-150 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <button 
        onClick={() => router.push('/admin/casinos')} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
      >
        <ArrowLeft size={16} />
        Back to Directory
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Edit Casino: {formData.name}</h1>
            <p className="text-sm text-slate-500 mt-1">Populate general information, relational attributes, media assets, and SEO parameters.</p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-100 px-3 py-2 rounded-lg">
            <span className="font-semibold">Shortcuts:</span> Ctrl+1-8 (Tabs) • Ctrl+S (Save)
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 overflow-x-auto bg-slate-50/20 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600 bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Casino Name" 
                  value={formData.name} 
                  onChange={handleNameChange} 
                  placeholder="e.g. Jackpot City"
                  required 
                />
                <Input 
                  label="URL Slug (Auto-generated)" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  placeholder="e.g. jackpot-city"
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Logo Image</label>
                  <MediaUpload
                    value={formData.logo}
                    onChange={(value) => setFormData({...formData, logo: value})}
                    accept="image"
                    folder="casinos/logos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Featured Banner Image</label>
                  <MediaUpload
                    value={formData.featured_image}
                    onChange={(value) => setFormData({...formData, featured_image: value})}
                    accept="image"
                    folder="casinos/featured"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Website Direct URL" 
                  value={formData.website_url} 
                  onChange={(e) => setFormData({...formData, website_url: e.target.value})} 
                  placeholder="https://jackpotcity.com"
                />
                <Input
                  label="Affiliate Hop URL"
                  value={formData.affiliate_url}
                  onChange={(e) => setFormData({...formData, affiliate_url: e.target.value})}
                  placeholder="https://affiliate.link/click?id=123"
                />
                <Input
                  label="Default Affiliate URL"
                  value={formData.default_affiliate_url}
                  onChange={(e) => setFormData({...formData, default_affiliate_url: e.target.value})}
                  placeholder="https://default-affiliate.link"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Affiliate Program Name" 
                  value={formData.affiliate_program_name} 
                  onChange={(e) => setFormData({...formData, affiliate_program_name: e.target.value})} 
                  placeholder="e.g. Buffalo Partners"
                />
                <Input 
                  label="Affiliate Program Portal Link" 
                  value={formData.affiliate_program_link} 
                  onChange={(e) => setFormData({...formData, affiliate_program_link: e.target.value})} 
                  placeholder="https://buffalopartners.com"
                />
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <Textarea 
                label="Short Description (1-2 sentences)" 
                value={formData.short_description} 
                onChange={(e) => setFormData({...formData, short_description: e.target.value})} 
                placeholder="A brief snippet showing in directories..."
                rows={2}
              />
              <Textarea 
                label="General Overview" 
                value={formData.overview} 
                onChange={(e) => setFormData({...formData, overview: e.target.value})} 
                placeholder="Introductory review overview of the casino brand..."
                rows={4}
              />
              <Textarea
                label="Editor Verdict / View"
                value={formData.editor_view}
                onChange={(e) => setFormData({...formData, editor_view: e.target.value})}
                placeholder="What our experts think about the casino..."
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="Editor Name"
                  value={formData.editor_name}
                  onChange={(e) => setFormData({...formData, editor_name: e.target.value})}
                  placeholder="John Smith"
                />
                <Input
                  label="Editor Position"
                  value={formData.editor_position}
                  onChange={(e) => setFormData({...formData, editor_position: e.target.value})}
                  placeholder="Senior Casino Reviewer"
                />
                <Input
                  label="Editor Experience (Years)"
                  type="number"
                  value={formData.editor_experience_years}
                  onChange={(e) => setFormData({...formData, editor_experience_years: e.target.value})}
                  placeholder="5"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input 
                  label="Rating (0.0 - 5.0)" 
                  type="number"
                  step="0.1"
                  min="0" max="5"
                  value={formData.rating} 
                  onChange={(e) => setFormData({...formData, rating: e.target.value})} 
                  placeholder="4.7"
                />
                <Input 
                  label="Established Year" 
                  type="number"
                  value={formData.established_year} 
                  onChange={(e) => setFormData({...formData, established_year: e.target.value})} 
                  placeholder="2012"
                />
                <Input 
                  label="Minimum Deposit Amount" 
                  type="number"
                  step="0.01"
                  value={formData.minimum_deposit} 
                  onChange={(e) => setFormData({...formData, minimum_deposit: e.target.value})} 
                  placeholder="10.00"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Company Name" 
                  value={formData.company_name} 
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})} 
                  placeholder="e.g. Bayton Ltd"
                />
                <Input 
                  label="Withdrawal Processing Time" 
                  value={formData.withdrawal_time} 
                  onChange={(e) => setFormData({...formData, withdrawal_time: e.target.value})} 
                  placeholder="e.g. 24-48 Hours"
                />
              </div>

              {/* Multi-License Jurisdiction Authority */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <MultiLicenseInput
                  value={formData.license_authority}
                  onChange={(val) => setFormData({...formData, license_authority: val})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Visits (Counter Seed)" 
                  type="number"
                  value={formData.visits} 
                  onChange={(e) => setFormData({...formData, visits: e.target.value})} 
                  placeholder="120"
                />
              </div>
            </div>
          )}

       {activeTab === 'relations' && (
  <div className="space-y-8">

    {/* Casino Types */}
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <ChipSelector
        label="Casino Types (Categories)"
        items={allCategories}
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />
    </div>

    {/* Tags */}
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <ChipSelector
        label="Tags"
        items={allTags}
        selected={selectedTags}
        onChange={setSelectedTags}
      />
    </div>

    {/* Available Countries */}
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <ChipSelector
        label="Available Countries"
        items={allCountries.map(country => ({
          id: country.id,
          name: `${country.name} (${country.code})`,
        }))}
        selected={selectedCountries}
        onChange={setSelectedCountries}
        
      />
    </div>

    {/* Game Types */}
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <ChipSelector
        label="Game Types"
        items={allGameTypes}
        selected={selectedGameTypes}
        onChange={setSelectedGameTypes}
      />
    </div>

    {/* Languages & Currency */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
      <Input
        label="Supported Languages (Comma separated)"
        value={formData.languages}
        onChange={(e) =>
          setFormData({ ...formData, languages: e.target.value })
        }
        placeholder="English, French, German, Spanish"
      />

      <Input
        label="Supported Currencies (Comma separated)"
        value={formData.currencies}
        onChange={(e) =>
          setFormData({ ...formData, currencies: e.target.value })
        }
        placeholder="USD, EUR, CAD, INR, BTC"
      />
    </div>

    {/* Support */}
    <Input
      label="Support Contact Methods (Comma separated)"
      value={formData.support_methods}
      onChange={(e) =>
        setFormData({
          ...formData,
          support_methods: e.target.value,
        })
      }
      placeholder="Live Chat 24/7, Email Support, Phone"
    />

    {/* Pros / Cons */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Textarea
        label="Pros List (One item per line)"
        value={formData.pros}
        onChange={(e) =>
          setFormData({ ...formData, pros: e.target.value })
        }
        placeholder="Fast payouts&#10;Huge welcome bonus&#10;Excellent support"
        rows={5}
      />

      <Textarea
        label="Cons List (One item per line)"
        value={formData.cons}
        onChange={(e) =>
          setFormData({ ...formData, cons: e.target.value })
        }
        placeholder="Restricted in USA&#10;High wagering requirements"
        rows={5}
      />
    </div>

    {/* Casino Acceptance & Verification (KYC, UPI, Crypto, etc.) */}
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <CasinoAcceptanceInput
        value={formData.features}
        onChange={(val) => setFormData({ ...formData, features: val })}
      />
    </div>

    {/* Payment / Providers */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Input
        label="Payment Methods (Comma separated)"
        value={formData.payment_methods}
        onChange={(e) =>
          setFormData({
            ...formData,
            payment_methods: e.target.value,
          })
        }
        placeholder="Visa, MasterCard, Skrill, Neteller, Bitcoin"
      />

      <Input
        label="Game Providers (Comma separated)"
        value={formData.game_providers}
        onChange={(e) =>
          setFormData({
            ...formData,
            game_providers: e.target.value,
          })
        }
        placeholder="Pragmatic Play, Evolution Gaming, NetEnt"
      />
    </div>

  </div>
)}

          {activeTab === 'flags' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select 
                  label="Status" 
                  options={[{value: 'active', label: 'Active'}, {value: 'inactive', label: 'Inactive'}]}
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                <Toggle 
                  label="Featured Brand" 
                  checked={formData.featured} 
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})} 
                />
                <Toggle 
                  label="Hot Casino" 
                  checked={formData.hot_casino} 
                  onChange={(e) => setFormData({...formData, hot_casino: e.target.checked})} 
                />
                <Toggle 
                  label="Recommended by Experts" 
                  checked={formData.recommended_by_experts} 
                  onChange={(e) => setFormData({...formData, recommended_by_experts: e.target.checked})} 
                />
                <Toggle 
                  label="Certified Casino Seal" 
                  checked={formData.certified_casino} 
                  onChange={(e) => setFormData({...formData, certified_casino: e.target.checked})} 
                />
                <Toggle 
                  label="Mobile Friendly" 
                  checked={formData.mobile_friendly} 
                  onChange={(e) => setFormData({...formData, mobile_friendly: e.target.checked})} 
                />
                <Toggle 
                  label="Crypto Supported" 
                  checked={formData.crypto_supported} 
                  onChange={(e) => setFormData({...formData, crypto_supported: e.target.checked})} 
                />
                <Toggle 
                  label="Live Casino Dealer Games" 
                  checked={formData.live_casino} 
                  onChange={(e) => setFormData({...formData, live_casino: e.target.checked})} 
                />
                <Toggle 
                  label="Sports Betting Available" 
                  checked={formData.sports_betting} 
                  onChange={(e) => setFormData({...formData, sports_betting: e.target.checked})} 
                />
                <Toggle 
                  label="Responsible Gaming Section" 
                  checked={formData.responsible_gaming} 
                  onChange={(e) => setFormData({...formData, responsible_gaming: e.target.checked})} 
                />
              </div>
            </div>
          )}

          {activeTab === 'bonuses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Bonus Offers</h3>
                <Button type="button" variant="secondary" onClick={handleAddBonus} className="gap-1.5 py-1.5 px-3">
                  <Plus size={16} /> Add Bonus
                </Button>
              </div>

              {bonuses.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">
                  No bonuses configured. Click "Add Bonus" above to include welcome or cashback promos.
                </div>
              ) : (
                <div className="space-y-4">
                  {bonuses.map((bonus, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4 relative">
                      <button 
                        type="button" 
                        onClick={() => handleRemoveBonus(index)} 
                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-700"
                      >
                        <Trash size={16} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                        <Input 
                          label="Bonus Title" 
                          value={bonus.title} 
                          onChange={(e) => handleBonusChange(index, 'title', e.target.value)} 
                          placeholder="e.g. 100% up to $1000"
                          required
                        />
                        <Select 
                          label="Type" 
                          options={[
                            {value: 'Welcome Bonus', label: 'Welcome Bonus'},
                            {value: 'Free Spins Bonus', label: 'Free Spins Bonus'},
                            {value: 'Cashback Bonus', label: 'Cashback Bonus'},
                            {value: 'No Deposit Bonus', label: 'No Deposit Bonus'},
                            {value: 'VIP Bonus', label: 'VIP Bonus'},
                            {value: 'Exclusive Bonus', label: 'Exclusive Bonus'}
                          ]}
                          value={bonus.type}
                          onChange={(e) => handleBonusChange(index, 'type', e.target.value)}
                        />
                        <Input 
                          label="Amount / Value" 
                          value={bonus.amount} 
                          onChange={(e) => handleBonusChange(index, 'amount', e.target.value)} 
                          placeholder="e.g. $1,000"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input 
                          label="Bonus Promo Code" 
                          value={bonus.bonus_code} 
                          onChange={(e) => handleBonusChange(index, 'bonus_code', e.target.value)} 
                          placeholder="e.g. SPIN100"
                        />
                        <Input 
                          label="Wagering Requirements" 
                          value={bonus.wagering_requirement} 
                          onChange={(e) => handleBonusChange(index, 'wagering_requirement', e.target.value)} 
                          placeholder="e.g. 35x"
                        />
                        <Input 
                          label="Sort Order" 
                          type="number"
                          value={bonus.sort_order} 
                          onChange={(e) => handleBonusChange(index, 'sort_order', e.target.value)} 
                          placeholder="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">Frequently Asked Questions</h3>
                <Button type="button" variant="secondary" onClick={handleAddFaq} className="gap-1.5 py-1.5 px-3">
                  <Plus size={16} /> Add FAQ
                </Button>
              </div>

              {faqs.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">
                  No FAQs configured. Click "Add FAQ" above to add casino-specific Q&As.
                </div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4 relative">
                      <button 
                        type="button" 
                        onClick={() => handleRemoveFaq(index)} 
                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-700"
                      >
                        <Trash size={16} />
                      </button>
                      <div className="pr-8">
                        <Input 
                          label="Question" 
                          value={faq.question} 
                          onChange={(e) => handleFaqChange(index, 'question', e.target.value)} 
                          placeholder="e.g. What is the withdrawal time?"
                          required
                        />
                        <Textarea 
                          label="Answer" 
                          value={faq.answer} 
                          onChange={(e) => handleFaqChange(index, 'answer', e.target.value)} 
                          placeholder="e.g. Withdrawals are processed in 24 hours."
                          rows={2}
                          required
                        />
                        <div className="w-1/3 mt-2">
                          <Input 
                            label="Sort Order" 
                            type="number"
                            value={faq.sort_order} 
                            onChange={(e) => handleFaqChange(index, 'sort_order', e.target.value)} 
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Screenshots (Review Gallery)</h3>
                  <Button type="button" variant="secondary" onClick={handleAddScreenshot} className="gap-1.5 py-1.5 px-3">
                    <Plus size={16} /> Add Image
                  </Button>
                </div>
                {screenshots.length === 0 ? (
                  <p className="text-sm text-slate-400">No review screenshots added.</p>
                ) : (
                  <div className="space-y-3">
                    {screenshots.map((screen, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-xl border border-slate-100 relative pr-10 space-y-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Screenshot Image</label>
                          <MediaUpload
                            value={screen.image_url}
                            onChange={(value) => handleScreenshotChange(index, 'image_url', value)}
                            accept="image"
                            folder="casinos/screenshots"
                          />
                        </div>
                        <div className="w-24">
                          <Input 
                            label="Sort Order" 
                            type="number" 
                            value={screen.sort_order} 
                            onChange={(e) => handleScreenshotChange(index, 'sort_order', e.target.value)} 
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveScreenshot(index)} 
                          className="text-rose-500 hover:text-rose-700 absolute top-4 right-3"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Gallery Videos</h3>
                  <Button type="button" variant="secondary" onClick={handleAddVideo} className="gap-1.5 py-1.5 px-3">
                    <Plus size={16} /> Add Video
                  </Button>
                </div>
                {galleryVideos.length === 0 ? (
                  <p className="text-sm text-slate-400">No review videos added.</p>
                ) : (
                  <div className="space-y-3">
                    {galleryVideos.map((vid, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-xl border border-slate-100 relative pr-10 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Video File or URL</label>
                            <MediaUpload
                              value={vid.video_url}
                              onChange={(value) => handleVideoChange(index, 'video_url', value)}
                              accept="video"
                              folder="casinos/videos"
                            />
                          </div>
                          <Input 
                            label="Video Title" 
                            value={vid.title} 
                            onChange={(e) => handleVideoChange(index, 'title', e.target.value)} 
                            placeholder="e.g. Buffalo Slots Gameplay Video Review"
                          />
                        </div>
                        <div className="w-24">
                          <Input 
                            label="Sort Order" 
                            type="number" 
                            value={vid.sort_order} 
                            onChange={(e) => handleVideoChange(index, 'sort_order', e.target.value)} 
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveVideo(index)} 
                          className="text-rose-500 hover:text-rose-700 absolute top-4 right-3"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <Input 
                label="Meta SEO Title" 
                value={formData.meta_title} 
                onChange={(e) => setFormData({...formData, meta_title: e.target.value})} 
                placeholder="Jackpot City Casino Review - Expert Ratings & Bonuses"
              />
              <Textarea 
                label="Meta SEO Description" 
                value={formData.meta_description} 
                onChange={(e) => setFormData({...formData, meta_description: e.target.value})} 
                placeholder="Read our comprehensive expert review on Jackpot City. Get details on deposit limits, payout speeds, licenses..."
                rows={3}
              />
              <Input
                label="Meta SEO Keywords (Comma separated)"
                value={formData.meta_keywords}
                onChange={(e) => setFormData({...formData, meta_keywords: e.target.value})}
                placeholder="Jackpot City, Online Casino Review, Casino Bonus, MGA Casino"
              />
            </div>
          )}

          {activeTab === 'reviews' && (
            <CasinoReviews casinoId={id} />
          )}

          {activeTab === 'affiliate' && (
            <CasinoAffiliateLinks casinoId={id} />
          )}

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={() => router.push('/admin/casinos')}>Cancel</Button>
            <Button type="submit" isLoading={isLoading} className="gap-2">
              <Save size={16} />
              Update Casino Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
