'use client';

interface Item {
  id: string;
  name: string;
}

interface ChipSelectorProps {
  label: string;
  items: Item[];
  selected: string[];
  onChange: (value: string[]) => void;
}

export default function ChipSelector({
  label,
  items,
  selected,
  onChange,
}: ChipSelectorProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {/* Available Items */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap gap-3">
          {items.map((item) => {
            const active = selected.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition
                ${
                  active
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Items */}
      {selected.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">
            Selected {label}
          </p>

          <div className="flex flex-wrap gap-2">
            {selected.map((id) => {
              const item = items.find((i) => i.id === id);

              return (
                <div
                  key={id}
                  className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-white text-sm"
                >
                  {item?.name}

                  <button
                    type="button"
                    onClick={() => toggle(id)}
                    className="text-red-300 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}