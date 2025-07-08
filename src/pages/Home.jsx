import React, { useMemo } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import ItemCard from '../components/ItemCard';
import '../style/HomeStyle.css';

const categoryOrderFixed = ["card", "etb", "loose_pack", "display"];

export default function Home({ search }) {
  const {
    items,
    sortField,
    sortOrder,
    compareMessage
  } = useGlobalContext();

  // Filtraggio per titolo basato sulla ricerca debounced (ricevuta come prop)
  const filteredItems = useMemo(() => {
    if (!search) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // Raggruppamento e ordinamento
  const groupedItems = useMemo(() => {
    const groups = {};

    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    if (sortField === 'title') {
      for (const cat in groups) {
        groups[cat].sort((a, b) =>
          sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
      }
      return categoryOrderFixed
        .filter(cat => groups[cat])
        .map(cat => ({ category: cat, items: groups[cat] }));
    }

    if (sortField === 'category') {
      const catsSorted = Object.keys(groups).sort((a, b) =>
        sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
      );
      return catsSorted.map(cat => ({
        category: cat,
        items: groups[cat]
      }));
    }

    return [];
  }, [filteredItems, sortField, sortOrder]);

  return (
    <div>
      {compareMessage && (
        <div className="compare-message-banner">{compareMessage}</div>
      )}

      <h1>Lista prodotti</h1>

      {groupedItems.length === 0 && (
        <p>Nessun prodotto trovato.</p>
      )}

      {groupedItems.map(group =>
        group.items.length > 0 && (
          <div key={group.category}>
            <h2>{group.category}</h2>
            <div className="carousel-wrapper">
              <button
                className="carousel-button left"
                onClick={() => {
                  const container = document.getElementById(`cat-${group.category}`);
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
              >
                ◀
              </button>
              <div id={`cat-${group.category}`} className="category-section">
                {group.items.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
              <button
                className="carousel-button right"
                onClick={() => {
                  const container = document.getElementById(`cat-${group.category}`);
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
              >
                ▶
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
