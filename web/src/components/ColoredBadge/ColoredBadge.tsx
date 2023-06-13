import { FC, HTMLAttributes } from 'react';

import { assertUnreachable } from 'src/utils/types';
import { classNames } from 'src/utils/utils';

export enum BadgeColor {
  'Red',
  'Yellow',
  'Green',
  'Blue',
  'Indigo',
  'Purple',
  'Pink',
}

export const badgeColorMax: number = Object.values(BadgeColor)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  .filter((c) => isNaN(c) === false)
  .reduce((acc, c) =>
    (c as number) > (acc as number) ? (c as BadgeColor) : (acc as BadgeColor)
  ) as BadgeColor;

const colorToCSS = (color: BadgeColor): string => {
  switch (color) {
    case BadgeColor.Red:
      return 'bg-red-100 text-red-800';
    case BadgeColor.Yellow:
      return 'bg-yellow-100 text-yellow-800';
    case BadgeColor.Green:
      return 'bg-green-100 text-green-800';
    case BadgeColor.Blue:
      return 'bg-blue-100 text-blue-800';
    case BadgeColor.Indigo:
      return 'bg-indigo-100 text-indigo-800';
    case BadgeColor.Purple:
      return 'bg-purple-100 text-purple-800';
    case BadgeColor.Pink:
      return 'bg-pink-100 text-pink-800';
    default:
      assertUnreachable(color);
  }
};

type Props = {
  color?: BadgeColor;
  text?: string;
} & HTMLAttributes<HTMLSpanElement>;
const ColoredBadge: FC<Props> = ({
  color = BadgeColor.Pink,
  text,
  className,
}) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium',
        colorToCSS(color),
        className
      )}
    >
      {text ?? <>&zwnj;</>}
    </span>
  );
};

export default ColoredBadge;
