interface DropdownWithSelectProps {
  items: { label: string; value: string }[];
  onSelect?: (value: string) => void;
  onClose: () => void;
}

export default function DropdownWithSelect({
  items,
  onSelect,
  onClose,
}: DropdownWithSelectProps) {
  return (
    <div className="w-full">
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className="w-full px-4 py-2 cursor-pointer hover:bg-purple-10 hover:text-purple-100 rounded-[10px] transition"
            onClick={() => {
              if (onSelect) onSelect(item.value);
              onClose();
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
