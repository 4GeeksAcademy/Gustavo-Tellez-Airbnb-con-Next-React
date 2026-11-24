interface ResultsHeaderProps {
  total: number;
  query?: string;
}

const ResultsHeader = ({ total, query }: ResultsHeaderProps) => {
  return (
    <div className="mb-4">
      <h1 className="text-xl font-semibold text-gray-900">
        {query ? `Resultados para "${query}"` : "Todos los alojamientos"}
      </h1>
      <p className="text-sm text-gray-500">{total} alojamientos disponibles</p>
    </div>
  );
}

export default ResultsHeader;
