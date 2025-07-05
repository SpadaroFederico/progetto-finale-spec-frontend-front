import React, { useState, useMemo, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import ItemCard from '../components/ItemCard';
import '../style/HomeStyle.css';

// Ordine fisso delle categorie
const categoryOrderFixed = ["card", "etb", "loose_pack", "display"];

export default function Home() {
  // Recupera stato globale dal context
  const {
    items,
    search,
    setSearch,
    sortField,
    sortOrder,
  } = useGlobalContext();

  // Recupera la funzione per confrontare i messaggi
  const { compareMessage } = useGlobalContext();

  // Stato locale per input di ricerca (debounce)
  const [searchInput, setSearchInput] = useState(search);

  // Effetto debounce per la ricerca
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput, setSearch]);

  // Filtra gli items in base alla ricerca (solo sul titolo)
  const filteredItems = useMemo(() => {
    if (!search) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // Raggruppa e ordina gli items per categoria e titolo
  const groupedItems = useMemo(() => {
    const groups = {};

    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    // Ordinamento per titolo
    if (sortField === 'title') {
      for (const cat in groups) {
        groups[cat].sort((a, b) =>
          sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
      }
      // Restituisce le categorie nell'ordine fisso
      return categoryOrderFixed
        .filter(cat => groups[cat])
        .map(cat => ({ category: cat, items: groups[cat] }));
    }

    // Ordinamento per categoria
    if (sortField === 'category') {
      const catsSorted = Object.keys(groups).sort((a, b) =>
        sortOrder === 'asc'
          ? a.localeCompare(b)
          : b.localeCompare(a)
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

      {/* Messaggio se nessun prodotto trovato */}
      {groupedItems.length === 0 && (
        <p>Nessun prodotto trovato.</p>
      )}

      {/* Visualizza i gruppi di prodotti per categoria */}
      {groupedItems.map(group =>
        group.items.length > 0 && (
          <div key={group.category}>
            <h2>{group.category}</h2>
            <div className="carousel-wrapper">
              {/* Pulsante per scorrere a sinistra */}
              <button
                className="carousel-button left"
                onClick={() => {
                  const container = document.getElementById(`cat-${group.category}`);
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
              >
                ◀
              </button>
              {/* Lista prodotti della categoria */}
              <div
                id={`cat-${group.category}`}
                className="category-section"
              >
                {group.items.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
              {/* Pulsante per scorrere a destra */}
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
