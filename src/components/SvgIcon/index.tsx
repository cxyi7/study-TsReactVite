// SvgIcon/index.tsx
export interface SvgIconProps {
  name: string;
  prefix?: string;
  color?: string;
  [propName: string]: any;
}

export default function SvgIcon({
  name,
  prefix = 'icon',
  color = '#333',
  ...props
}: SvgIconProps) {
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg {...props} aria-hidden="true">
      <use href={symbolId} fill={color} />
    </svg>
  );
}
