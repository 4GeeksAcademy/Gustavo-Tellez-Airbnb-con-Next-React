interface ResultsCounterProps {
  current: number;
  total: number;
}

const ResultsCounter = ({ current, total }: ResultsCounterProps) => {
  return (
    <p className="text-xs text-gray-400">
      Mostrando {current} de {total} resultados
    </p>
  );
}

export default ResultsCounter;
