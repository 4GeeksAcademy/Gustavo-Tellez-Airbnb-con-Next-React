interface RoomRulesProps {
  rules: string[];
}

const RoomRules = ({ rules }: RoomRulesProps) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">Normas</h2>
      <ul className="space-y-1 text-sm text-gray-600">
        {rules.map((rule, i) => (
          <li key={i} className="flex items-center gap-2">
            <span>•</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomRules;
