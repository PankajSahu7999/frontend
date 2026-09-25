'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Gamepad2, Trash2 } from 'lucide-react';

export default function EditGamePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    category: 'Table Games',
    game_type: '',
    provider: '',
    thumbnail: '',
    hero_banner: '',
    demo_url: '',
    affiliate_url: '',
    rtp: '',
    volatility: 'Medium',
    min_bet: '',
    max_bet: '',
    release_date: '',
    autoplay: true,
    multiplier: true,
    in_game_interaction: false,
    player_customisation: true,
    rebet: true,
    side_bet: true,
    undo: true,
    game_history: true,
    bonus_features: true,
    rating: '4.8',
    overview: '',
    rtp_details: '',
    pros: '',
    cons: '',
    author_name: 'Bojan Jovanovic',
    is_recommended: false,
    is_sponsored: false,
    status: 'active',
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  useEffect(() => {
    if (!id) return;
    const fetchGame = async () => {
      try {
        const res = await fetch(`${apiUrl}/admin/games/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            ...data,
            min_bet: data.min_bet !== null ? String(data.min_bet) : '',
            max_bet: data.max_bet !== null ? String(data.max_bet) : '',
            release_date: data.release_date ? data.release_date.split('T')[0] : '',
            pros: Array.isArray(data.pros) ? data.pros.join('\n') : data.pros || '',
            cons: Array.isArray(data.cons) ? data.cons.join('\n') : data.cons || '',
          });
        } else {
          setError('Failed to load game');
        }
      } catch (err) {
        console.error(err);
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: any) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${apiUrl}/admin/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/games');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update game');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 text-sm">
        Loading game details...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/games"
          className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-indigo-600" />
            Edit Casino Game: {formData.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Update game metadata, specifications, and editorial reviews.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Game Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              >
                <option value="Table Games">Table Games</option>
                <option value="Card Games">Card Games</option>
                <option value="Dice Games">Dice Games</option>
                <option value="Slots">Slots</option>
                <option value="Lottery Games">Lottery Games</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Game Type (Sub-type)
              </label>
              <input
                type="text"
                name="game_type"
                value={formData.game_type}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Provider Name
              </label>
              <input
                type="text"
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Author / Expert Reviewer
              </label>
              <input
                type="text"
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <div className="flex gap-6 mt-4 pt-3 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_recommended"
                checked={formData.is_recommended}
                onChange={handleChange}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-semibold text-slate-700">Recommended This Month</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_sponsored"
                checked={formData.is_sponsored}
                onChange={handleChange}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-xs font-semibold text-slate-700">Sponsored Game</span>
            </label>
          </div>
        </div>

        {/* Media & Play URLs */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Media & Play Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Thumbnail Image URL
              </label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Hero Top Banner Image URL
              </label>
              <input
                type="text"
                name="hero_banner"
                value={formData.hero_banner || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Demo Play URL (Play for fun)
              </label>
              <input
                type="text"
                name="demo_url"
                value={formData.demo_url || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Affiliate Play URL (Play for real)
              </label>
              <input
                type="text"
                name="affiliate_url"
                value={formData.affiliate_url || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Specifications & Game Limits */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Specifications & Table Limits
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                RTP (%)
              </label>
              <input
                type="text"
                name="rtp"
                value={formData.rtp || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Volatility
              </label>
              <select
                name="volatility"
                value={formData.volatility || 'Medium'}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
                <option value="Adjustable">Adjustable</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Min Bet ($/€)
              </label>
              <input
                type="number"
                step="0.01"
                name="min_bet"
                value={formData.min_bet}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Max Bet ($/€)
              </label>
              <input
                type="number"
                step="0.01"
                name="max_bet"
                value={formData.max_bet}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            In-Game Features & Toggles
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { name: 'autoplay', label: 'Autoplay Option' },
              { name: 'multiplier', label: 'Multiplier' },
              { name: 'in_game_interaction', label: 'In-Game Interaction' },
              { name: 'player_customisation', label: 'Player Customisation' },
              { name: 'rebet', label: 'Rebet Option' },
              { name: 'side_bet', label: 'Side Bet' },
              { name: 'undo', label: 'Undo Option' },
              { name: 'game_history', label: 'Game History' },
              { name: 'bonus_features', label: 'Bonus Features' },
            ].map((f) => (
              <label key={f.name} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  name={f.name}
                  checked={(formData as any)[f.name]}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs font-medium text-slate-700">{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pros, Cons & Editorial Overview */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Pros, Cons & Editorial Review
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
                Pros (One per line)
              </label>
              <textarea
                name="pros"
                rows={4}
                value={formData.pros}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-rose-700 uppercase tracking-wider mb-1.5">
                Cons (One per line)
              </label>
              <textarea
                name="cons"
                rows={4}
                value={formData.cons}
                onChange={handleChange}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Game Overview & Detailed Review
            </label>
            <textarea
              name="overview"
              rows={6}
              value={formData.overview || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/games"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Updating...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
