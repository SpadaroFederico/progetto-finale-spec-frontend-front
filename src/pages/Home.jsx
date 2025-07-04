import { useGlobalContext } from '../Context/GlobalContext';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const { items } = useGlobalContext();

  const cards = items.filter(item => item.category === "card").slice(0, 3);
  const etbs = items.filter(item => item.category === "etb").slice(0, 3);
  const loosePacks = items.filter(item => item.category === "loose_pack").slice(0, 3);
  const displays = items.filter(item => item.category === "display").slice(0, 3);

  return (
    <div>
      <h1>Lista prodotti</h1>

      <h2>Card</h2>
      <div className="category-section">
        {cards.map(item => <ItemCard key={item.id} item={item} />)}
      </div>

      <h2>ETB</h2>
      <div className="category-section">
        {etbs.map(item => <ItemCard key={item.id} item={item} />)}
      </div>

      <h2>Loose Packs</h2>
      <div className="category-section">
        {loosePacks.map(item => <ItemCard key={item.id} item={item} />)}
      </div>

      <h2>Displays</h2>
      <div className="category-section">
        {displays.map(item => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
