import { FC, useMemo, useEffect, useState } from 'react';

import { classNames, htmlTimeTag } from 'src/utils/utils';

import { CalendarView } from '../Calendar/Calendar';
import { columnStart, rowSpanLength, rowStart } from '../dayWeekEvent';

type NowBar = {
  start: Date;
  end: Date;
};

const nowBar = (): NowBar => {
  const start = new Date();
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 5);

  return {
    start,
    end,
  };
};

const memoNowBar = (_focus: boolean) => nowBar();

type Props = {
  view: CalendarView.DAY | CalendarView.WEEK;
  className?: string;
};
const CalendarNowBar: FC<Props> = ({ className, view }) => {
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    window.addEventListener('focus', () => setFocused((f) => !f));

    return () => {
      setFocused(false);
    };
  }, []);

  const now = useMemo(() => memoNowBar(focused), [focused]);

  return (
    <li
      className={classNames(
        'relative m-0 flex items-start justify-start',
        className
      )}
      style={{
        gridRow: `${rowStart(now.start)} / span ${rowSpanLength(
          now.start,
          now.end
        )}`,
        gridColumnStart:
          view === CalendarView.WEEK ? `${columnStart(now.start)}` : '1',
      }}
    >
      <div className="group inset-1 min-h-[1px] w-full overflow-y-auto rounded-lg border border-red-500 leading-5">
        <time dateTime={htmlTimeTag(now.start)}></time>
      </div>
    </li>
  );
};

export default CalendarNowBar;
