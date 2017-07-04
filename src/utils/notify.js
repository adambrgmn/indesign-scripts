export default (msg, title = '') => {
  const dialog = app.dialogs.add({ name: title, canCancel: false });
  const column = dialog.dialogColumns.add();
  const row = column.dialogRows.add();
  row.staticTexts.add({ staticLabel: msg });

  dialog.show();
};
