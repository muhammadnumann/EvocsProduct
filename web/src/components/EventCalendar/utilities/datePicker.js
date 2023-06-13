const identifiers = {
  boxnumarr: {
    week: [
      'box-one',
      'box-two',
      'box-three',
      'box-four',
      'box-five',
      'box-six',
      'box-seven',
      'box-eight',
      'box-nine',
      'box-ten',
      'box-eleven',
      'box-twelve',
      'box-thirteen',
      'box-fourteen',
      'box-fifteen',
    ],
    day: [
      'dv-box-one',
      'dv-box-two',
      'dv-box-three',
      'dv-box-four',
      'dv-box-five',
      'dv-box-six',
      'dv-box-seven',
      'dv-box-eight',
      'dv-box-nine',
      'dv-box-ten',
      'dv-box-eleven',
      'dv-box-twelve',
      'dv-box-thirteen',
      'dv-box-fourteen',
      'dv-box-fifteen',
    ],
  },

  boxClasses: {
    week: {
      base: 'box',
      ontop: 'box-ontop',
      active: 'box-mv-dragactive',
      temporary: 'temporary-box',
      prepend: 'box-',
    },
    day: {
      base: 'dv-box',
      ontop: 'dv-box-ontop',
      active: 'dv-box-mv-dragactive',
      temporary: 'dv-temporary-box',
      prepend: 'dv-box-',
    },
  },

  boxAttributes: {
    week: {
      updatecoord: ['data-box-id', 'data-start-time', 'data-time-intervals'],
      dataIdx: 'box-idx',
      dataId: 'data-box-id',
      dataCol: 'data-box-col',
      prepend: 'data-',
      prepentwo: 'data-wv-',
    },
    day: {
      updatecoord: [
        'data-dv-box-id',
        'data-dv-start-time',
        'data-dv-time-intervals',
      ],
      dataIdx: 'data-dv-box-index',
      dataId: 'data-dv-box-id',
      prepend: 'data-dv-',
      prepentwo: 'data-dv-',
    },
  },

  styles: {
    newBox: {
      left: 'calc((100% - 0px) * 0 + 0px)',
      height: '11.6px',
      width: 'calc((100% - 4px) * 1)',
    },
  },
};

function handleOverlap(col, view, boxes) {
  const collisions =
    view === 'day' ? boxes.checkForCollision() : boxes.checkForCollision(col);

  const identifyBox = identifiers.boxnumarr[view];

  const [baseClass, classPrepend] = [
    identifiers.boxClasses[view],
    identifiers.boxClasses[view].prepend,
  ];

  const [boxIdxAttr, boxIdAttr] = [
    identifiers.boxAttributes[view].dataIdx,
    identifiers.boxAttributes[view].dataId,
  ];

  for (let i = 0; i < collisions.length; i++) {
    const box = document.querySelector(`[${boxIdAttr}="${collisions[i].id}"]`);
    let idx = i;
    if (i >= 15) {
      idx -= 12;
    }
    if (i === 0) {
      box.setAttribute('class', `${baseClass.base} ${identifyBox[idx]}`);
      box.setAttribute(boxIdxAttr, identifyBox[idx]);
    } else {
      box.setAttribute(
        'class',
        `${baseClass.base} ${baseClass.ontop} ${identifyBox[idx]}`
      );
      box.setAttribute(boxIdxAttr, identifyBox[idx]);
    }
    view === 'day'
      ? setBoxWidthDay(box, classPrepend, boxIdxAttr)
      : setBoxWidthWeek(box, classPrepend, boxIdxAttr);
  }
}
function getClosest(e, element) {
  return e.target.closest(element);
}

function getBoxDefaultStyle(y, backgroundColor) {
  const style = identifiers.styles.newBox;
  return `top:${y}px; left:${style.left}; height:${style.height}; width:${style.width}; background-color:${backgroundColor};`;
}

function startEndDefault(y) {
  let tempstarthour = Math.floor(y / 11.6 / 4);
  let tempstartmin = Math.floor((y / 11.6) % 4) * 10;
  return [
    tempstarthour, // start hour
    tempstartmin, // start minute
    tempstarthour, // end hour
    +tempstartmin + 10, // end minute
  ];
}

function calcNewHourFromCoords(h, y) {
  return Math.floor((h + y) / 11.6 / 4);
}

function calcNewMinuteFromCoords(h, y) {
  return Math.floor(((h + y) / 11.6) % 4) * 10;
}

function testDate(date) {
  return date instanceof Date && !isNaN(date) ? date : new Date(date);
}

function getDateTimeFormatted(date, hour, minute) {
  date = testDate(date);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(hour),
    parseInt(minute),
    1,
    1
  );
}

function getTempDates(tempdate, hours, minutes) {
  tempdate = testDate(tempdate);
  return [
    getDateTimeFormatted(tempdate, hours[0], minutes[0]),
    getDateTimeFormatted(tempdate, hours[1], minutes[1]),
  ];
}

function compareDates(date1, date2) {
  [date1, date2] = [testDate(date1), testDate(date2)];
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getOriginalBoxObject(box) {
  return {
    height: box.style.height,
    left: box.style.left,
    width: box.style.width,
    class: box.getAttribute('class'),
  };
}

function resetOriginalBox(box, boxorig) {
  box.setAttribute('class', boxorig.class);
  box.style.left = boxorig.left;
  box.style.width = boxorig.width;
}

function calcTime(start, length, y) {
  let startHours = Math.floor(+start / 6);
  let startMinutes = (+start * 10) % 60;

  let endHours = Math.floor((start + length) / 6);
  let endMinutes = 0;
  // let endMinutes = y > 1560 ? 60 : ((start + length) * 10) % 60;
  let calVal = 0;
  if (144 - (start + length) <= 2) {
    endMinutes = 60;
  } else {
    endMinutes = ((start + length) * 10) % 60;
  }

  let startingtime = formatTime(startHours, startMinutes);
  let endingtime = formatTime(endHours, endMinutes);

  if (startingtime.slice(-2) == endingtime.slice(-2)) {
    startingtime = startingtime.slice(0, -2);
  }

  const boxtime = `${startingtime} – ${endingtime}`;
  return boxtime;
}

function formatTime(hours, minutes) {
  let md;
  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }
  if (+hours === 0) {
    hours = 12;
    md = 'am';
  } else if (hours < 12) {
    md = 'am';
  } else if (hours === 12) {
    md = 'pm';
  } else if (hours === 24) {
    md = 'am';
    hours -= 12;
  } else {
    hours -= 12;
    md = 'pm';
  }
  minutes = parseInt(minutes);
  if (+minutes === 0) {
    return `${hours}${md}`;
  } else {
    return `${hours}:${minutes}${md}`;
  }
}

function resetStyleOnClick(view, box) {
  box.setAttribute('class', identifiers.boxClasses[view].base);
  box.style.left = 'calc((100% - 0px) * 0 + 0px)';
  box.style.width = 'calc((100% - 4px) * 1)';
}

function createTemporaryBox(box, col, hasSibling, view) {
  const clone = box.cloneNode(true);
  clone.classList.add(`${identifiers.boxClasses[view].temporary}`);
  if (hasSibling) {
    col.insertBefore(clone, box.nextElementSibling);
  } else {
    col.appendChild(clone);
  }
}

function setBoxTimeAttributes(box, view) {
  let start = +box.style.top.split('px')[0];
  start = start >= 0 ? start / 11.6 : 0;
  let length = +box.style.height.split('px')[0] / 11.6;
  let end = start + length;
  let prepend = identifiers.boxAttributes[view].prepend;
  box.setAttribute(`${prepend}start-time`, start);
  box.setAttribute(`${prepend}time-intervals`, length);
  box.setAttribute(`${prepend}end-time`, end);
}

function updateBoxCoordinates(box, view) {
  let [y, h] = identifiers.boxAttributes[view].updatecoord.map((x) => {
    return box.getAttribute(x);
  });
  let x = view === 'week' ? box.getAttribute('data-box-col') : 1;
  return {
    x: parseInt(x),
    y: parseInt(y),
    h: parseInt(h),
    e: parseInt(y) + parseInt(h),
  };
}

function setBoxWidthWeek(box, prepend, dataidx) {
  const attr = box.getAttribute(dataidx);
  switch (attr) {
    case `${prepend}one`:
      box.style.left = 'calc((100% - 0px) * 0 + 0px)';
      box.style.width = 'calc((100% - 4px) * 1)';
      break;
    case `${prepend}two`:
      box.style.left = 'calc((100% - 0px) * 0.2 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.80)';
      break;
    case `${prepend}three`:
      box.style.left = 'calc((100% - 0px) * 0.45 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.55)';
      break;
    case `${prepend}four`:
      box.style.left = 'calc((100% - 0px) * 0.0 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.44)';
      break;
    case `${prepend}five`:
      box.style.left = 'calc((100% - 0px) * .5 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.35)';
      break;
    case `${prepend}six`:
      box.style.left = 'calc((100% - 0px) * 0.1 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.4)';
      break;
    case `${prepend}seven`:
      box.style.left = 'calc((100% - 0px) * 0.5 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.5)';
      break;
    case `${prepend}eight`:
      box.style.left = 'calc((100% - 0px) * 0.25 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.25)';
      break;
    case `${prepend}nine`:
      box.style.left = 'calc((100% - 0px) * 0.55 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.35)';
      break;
    case `${prepend}ten`:
      box.style.left = 'calc((100% - 0px) * 0.55 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}eleven`:
      box.style.left = 'calc((100% - 0px) * 0.70 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}twelve`:
      box.style.left = 'calc((100% - 0px) * 0.85 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}thirteen`:
      box.style.left = 'calc((100% - 0px) * 0.05 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.25)';
      break;
    case `${prepend}fourteen`:
      box.style.left = 'calc((100% - 0px) * 0.30 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.25)';
      break;
    case `${prepend}fifteen`:
      box.style.left = 'calc((100% - 0px) * 0.55 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.25)';
      break;
    default:
      break;
  }
}

function setBoxWidthDay(box, prepend, dataidx) {
  const attr = box.getAttribute(dataidx);
  switch (attr) {
    case `${prepend}one`:
      box.style.left = 'calc((100% - 0px) * 0 + 0px)';
      box.style.width = 'calc((100% - 4px) * 1)';
      break;
    case `${prepend}two`:
      box.style.left = 'calc((100% - 0px) * 0.15 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.85)';
      break;
    case `${prepend}three`:
      box.style.left = 'calc((100% - 0px) * 0.30 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.70)';
      break;
    case `${prepend}four`:
      box.style.left = 'calc((100% - 0px) * 0.45 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.55)';
      break;
    case `${prepend}five`:
      box.style.left = 'calc((100% - 0px) * 0.60 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.40)';
      break;
    case `${prepend}six`:
      box.style.left = 'calc((100% - 0px) * 0.75 + 0px)';
      box.style.width = 'calc((100% - 4px) * 0.25)';
      break;
    case `${prepend}seven`:
      box.style.left = 'calc((100% - 0px) * 0.10 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}eight`:
      box.style.left = 'calc((100% - 0px) * 0.25 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}nine`:
      box.style.left = 'calc((100% - 0px) * 0.4 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}ten`:
      box.style.left = 'calc((100% - 0px) * 0.55 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}eleven`:
      box.style.left = 'calc((100% - 0px) * 0.70 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}twelve`:
      box.style.left = 'calc((100% - 0px) * 0.85 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.15)';
      break;
    case `${prepend}thirteen`:
      box.style.left = 'calc((100% - 0px) * 0.05 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.25)';
      break;
    case `${prepend}fourteen`:
      box.style.left = 'calc((100% - 0px) * 0.30 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.25)';
      break;
    case `${prepend}fifteen`:
      box.style.left = 'calc((100% - 0px) * 0.55 + 0px)';
      box.style.width = 'calc((100% - 16px) * 0.25)';
      break;
    default:
      break;
  }
}

export default getClosest;
export {
  handleOverlap,
  setBoxWidthWeek,
  setBoxWidthDay,
  updateBoxCoordinates,
  setBoxTimeAttributes,
  createTemporaryBox,
  resetStyleOnClick,
  formatTime,
  calcTime,
  resetOriginalBox,
  getOriginalBoxObject,
  testDate,
  compareDates,
  getTempDates,
  getBoxDefaultStyle,
  calcNewMinuteFromCoords,
  calcNewHourFromCoords,
  startEndDefault,
};
