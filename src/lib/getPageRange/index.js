import notify from '../notify';

const parseRange = (range, { min, max }) => {
  // Match the input and get the values
  const regExp = /^(\d+)-(\d+)$/;
  const [fullMatch, start, end] = regExp.exec(range);

  // Check if the numbers are in range
  if (Number(start) < min || Number(end) > max) {
    notify(`Wrongly formatted range – the range must be between ${min}-${max}`);
    return null;
  }

  return { fullMatch, start, end };
};

const getPageRange = ({ min = '1', max = '9999' }) => {
  // Construct the dialog
  const dialog = app.dialogs.add({ name: 'Merge Pages', canCancel: true });
  const column = dialog.dialogColumns.add();
  const row = column.dialogRows.add();
  row.staticTexts.add({ staticLabel: 'Range:' });

  // Construct the input box
  const textEditbox = row.textEditboxes.add({
    editContents: '1-3',
    minWidth: 200,
  });

  // Show the dialog and ask for the range
  // If the user clicks "cancel" the function will return null
  const isShowed = dialog.show();
  if (!isShowed) return null;

  // Parse the result from the dialog
  const result = parseRange(textEditbox.editContents, {
    min: Number(min),
    max: Number(max),
  });

  // If the result is badly formatted the user can try again
  if (!result) return getPageRange({ min, max });
  return result;
};

export default getPageRange;
