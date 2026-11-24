interface ResultsCounterProps {
  current: number;
  total: number;
}

export default function ResultsCounter({ current, total }: ResultsCounterProps) {
  return (
    <p className="text-xs text-gray-400">
      Mostrando {current} de {total} resultados
    </p>
  );
}