const duplicatePages = (source, dest, { start, end }) => {
  try {
    // Select the last page in range in the destination
    // document to place the new pages after
    const pageToInsertAfter = dest.pages.item(end);

    // Select the pages in the source document
    // and duplicate them on to the destination document
    const sourcePages = source.pages.itemByRange(start, end);
    sourcePages.duplicate(LocationOptions.AFTER, pageToInsertAfter);

    return true;
  } catch (e) {
    return false;
  }
};

export default duplicatePages;
