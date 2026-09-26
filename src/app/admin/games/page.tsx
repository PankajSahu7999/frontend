'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, ExternalLink, Gamepad2, Eye, Sparkles, RefreshCw } from 'lucide-react';

export default function AdminGamesPage() {
  const router = useRouter();
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/admin/games`);
      if (res.ok) {
        const data = await res.json();
        setGames(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch games:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunSeeder = async () => {
    if (!confirm('Run Casino Games seeder on the server? This will seed or update the 25 official casino games.')) return;

    setSeeding(true);
    try {
      const res = await fetch(`${apiUrl}/admin/games/seed`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message || 'Successfully seeded casino games on the server!');
        await fetchGames();
      } else {
        alert(data.error || 'Failed to seed games');
      }
    } catch (err) {
      console.error('Error running seeder:', err);
      alert('An error occurred while contacting the server seeder endpoint.');
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`${apiUrl}/admin/games/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setGames((prev) => prev.filter((g) => g.id !== id));
      } else {
        alert('Failed to delete game');
      }
    } catch (err) {
      console.error('Error deleting game:', err);
      alert('An error occurred');
    }
  };

  const categories = ['All', 'Table Games', 'Card Games', 'Dice Games', 'Slots', 'Lottery'];

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title?.toLowerCase().includes(search.toLowerCase()) ||
      game.provider?.toLowerCase().includes(search.toLowerCase()) ||
      game.game_type?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      (game.category && game.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Gamepad2 className="w-7 h-7 text-indigo-600" />
            Casino Games Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage casino game listings, RTP specs, free demo frames, and affiliate destinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRunSeeder}
            disabled={seeding}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-sm shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'Seeding Database...' : 'Run Games Seeder'}</span>
          </button>

          <Link
            href="/admin/games/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-600/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Game</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search game, provider, or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            Loading casino games...
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="py-16 text-center">
            <Gamepad2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No games found</p>
            <p className="text-xs text-slate-400 mt-1">Try changing your search or add a new game.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Game</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">RTP</th>
                  <th className="py-3 px-4">Limits</th>
                  <th className="py-3 px-4">Flags</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGames.map((game) => (
                  <tr key={game.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {game.thumbnail ? (
                          <img
                            src={game.thumbnail}
                            alt={game.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                            {game.title?.charAt(0) || 'G'}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-900">{game.title}</div>
                          <div className="text-xs text-slate-400">{game.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {game.category || game.game_type || 'Table Game'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {game.provider || '—'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      {game.rtp || '97.0%'}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      ${game.min_bet ?? '0.10'} – ${game.max_bet ?? '1,000'}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {game.is_recommended && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                            Recommended
                          </span>
                        )}
                        {game.is_sponsored && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200">
                            Sponsored
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/games/${game.slug}`}
                          target="_blank"
                          title="View on site"
                          className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => router.push(`/admin/games/edit/${game.id}`)}
                          title="Edit"
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(game.id, game.title)}
                          title="Delete"
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
