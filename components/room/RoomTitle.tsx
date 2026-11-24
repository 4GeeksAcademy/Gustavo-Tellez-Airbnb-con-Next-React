interface RoomTitleProps {
  title: string;
}

const RoomTitle = ({ title }: RoomTitleProps) => {
  return <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">{title}</h1>;
}

export default RoomTitle;
