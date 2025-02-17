interface DropdownWithLinksProps {
  items: { label: string; href: string; onClick?: () => void }[];
}

export default function DropdownWithLinks({ items }: DropdownWithLinksProps) {
  return (
    <div className="w-full text-center">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="block w-full px-2 md:px-4 py-2 text-gray-800 hover:bg-purple-10 hover:text-purple-100 rounded-[12px] transition"
          onClick={item.onClick}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
