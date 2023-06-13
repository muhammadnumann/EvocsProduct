import { classNames } from 'src/utils/utils';

export const columnStart = (d: Date): number => d.getDay() + 1;
export const rowStart = (d: Date): number =>
  Math.round((d.getHours() + d.getMinutes() / 60) * 12 + 2);
export const rowSpanLength = (start: Date, end: Date): number => {
  const diff = Math.abs(start.getTime() - end.getTime());
  const minutes = Math.floor(diff / 1000 / 60);
  const rem = minutes % 5;

  if (rem > 5 / 2) {
    return Math.ceil(minutes / 5.0);
  }
  return Math.floor(minutes / 5.0);
};

export const idStringHash = (id: string): number => {
  let h = 9;
  for (let i = 0; i < id.length; ) {
    h = Math.imul(h ^ id.charCodeAt(i++), 9 ** 9);
  }
  const originalReturn = h ^ (h >>> 9);

  // drop last digit since it seems to end in 5 frequently/always
  return (originalReturn / 10) ^ 0;
};

export const bgClass = (idRem: number, showHover?: boolean): string => {
  const hover = showHover == null ? true : showHover;

  switch (idRem) {
    case 1:
      return classNames('bg-blue-50', hover && 'hover:bg-blue-100');
    case 2:
      return classNames('bg-gray-100', hover && 'hover:bg-gray-200');
    case 3:
      return classNames('bg-emerald-50', hover && 'hover:bg-emerald-100');
    case 4:
      return classNames('bg-purple-50', hover && 'hover:bg-purple-100');
    default:
      return classNames('bg-pink-50', hover && 'hover:bg-pink-100');
  }
};

export const titleClass = (idRem: number): string => {
  switch (idRem) {
    case 1:
      return 'text-blue-700';
    case 2:
      return 'text-gray-700';
    case 3:
      return 'text-emerald-700';
    case 4:
      return 'text-purple-700';
    default:
      return 'text-pink-700';
  }
};

export const timeClass = (idRem: number, showHover?: boolean): string => {
  const hover = showHover == null ? true : showHover;
  switch (idRem) {
    case 1:
      return classNames('text-blue-500', hover && 'group-hover:text-blue-700');
    case 2:
      return classNames('text-gray-500', hover && 'group-hover:text-gray-700');
    case 3:
      return classNames(
        'text-emerald-500',
        hover && 'group-hover:text-emerald-700'
      );
    case 4:
      return classNames(
        'text-purple-500',
        hover && 'group-hover:text-purple-700'
      );
    default:
      return classNames('text-pink-500', hover && 'group-hover:text-pink-700');
  }
};
