export interface PageItemProps {
  active?: boolean;
  disabled?: boolean;
  linkText: string;
  onClick: VoidFunction;
}

export function PageItem({
  active = false,
  disabled = false,
  linkText,
  onClick,
}: PageItemProps) {
  return (
    <li className={`page-item ${active && "active"} ${disabled && "disabled"}`}>
      <button disabled={disabled} className="page-link" onClick={onClick}>
        {linkText}
      </button>
    </li>
  );
}
