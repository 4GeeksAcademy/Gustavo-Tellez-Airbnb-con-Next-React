interface SortingControlProps {
  sortOrder: "none" | "price-asc" | "price-desc" | "rating";
  onChange: (order: "none" | "price-asc" | "price-desc" | "rating") => void;
}

export default function SortingControl({ sortOrder, onChange }: SortingControlProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-gray-500">
        Ordenar:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(event) =>
          onChange(
            event.target.value as
              | "none"
              | "price-asc"
              | "price-desc"
              | "rating",
          )
        }
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900 outline-none transition focus:border-gray-300"
      >
        <option value="none">Relevancia</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="rating">Valoración</option>
      </select>
    </div>
  );
}