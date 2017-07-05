const createRangeArray = (start, end) => {
  const startNum = Number(start);
  const endNum = Number(end);
  let i = startNum;
  const arr = [];

  while (i <= endNum) {
    arr.push(i.toString());
    i += 1;
  }

  return arr;
};

const createIsInRange = pageRange => frame => {
  const pageName = frame.parentPage.name;
  const includes = pageRange.findIndex(page => page === pageName);
  return includes > -1;
};

export default (sourceFile, { start, end }) => {
  const pageRange = createRangeArray(start, end);
  const isInRange = createIsInRange(pageRange);

  const linkedText = pageRange.map(pageNum => {
    const page = sourceFile.pages.item(pageNum);
    const textFramesLength = page.textFrames.length;
    let i = 0;
    let hasLinkedTextFrameOutsideRange = false;

    while (i < textFramesLength) {
      const frame = page.textFrames.item(i);
      const nextFrame = frame.nextTextFrame;
      const prevFrame = frame.previousTextFrame;

      if (nextFrame && !isInRange(nextFrame)) hasLinkedTextFrameOutsideRange = true;
      if (prevFrame && !isInRange(prevFrame)) hasLinkedTextFrameOutsideRange = true;

      i += 1;
    }

    return hasLinkedTextFrameOutsideRange ? page.name : null;
  });

  return linkedText.filter(hasLinkedText => hasLinkedText);
};
