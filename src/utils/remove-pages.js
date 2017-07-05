const removePages = (dest, { start, end }) => {
  try {
    // Select the pages to remove, and remove them
    const pagesToRemove = dest.pages.itemByRange(start, end);
    pagesToRemove.remove();
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = removePages;
