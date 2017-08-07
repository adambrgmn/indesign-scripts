import isEven from '../utils/isEven';

const duplicatePages = (source, dest, { start, end }) => {
  try {
    // Select the last page in range in the destination
    // document to place the new pages after
    const pageToInsertAfter = dest.pages.item(end);

    // Select the pages in the source document
    // and duplicate them on to the destination document
    const sourcePages = source.pages.itemByRange(start, end);
    const binding = isEven(start)
      ? BindingOptions.LEFT_ALIGN
      : BindingOptions.RIGHT_ALIGN;
    sourcePages.move(LocationOptions.AFTER, pageToInsertAfter, binding);

    return true;
  } catch (e) {
    return false;
  }
};

export default duplicatePages;
