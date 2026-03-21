import { Icon as IconifyIcon } from "@iconify/react";

export function Iconify({
  icon,
  width = 24,
  height = 24,
  className = "",
}: {
  icon: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <IconifyIcon
      icon={icon}
      width={width}
      height={height}
      className={className}
    />
  );
}
