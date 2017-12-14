import '../polyfills';
import Loadbar from '../utils/loadbar';

function forEach(list, fn) {
  Array.prototype.forEach.call(list, fn);
}

function sort(list, predicate) {
  return Array.prototype.slice.call(list, 0).sort(predicate);
}

function main() {
  const sortedDocuments = sort(app.documents, (a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  const firstDocument = sortedDocuments[0];
  const restDocuments = sortedDocuments.slice(1);

  const newFile = new File(`${firstDocument.filePath}/ztory.indd`);

  firstDocument.saveACopy(newFile);
  app.open(newFile);
  const newDoc = app.documents.itemByName(newFile.name);

  function duplicateSpreads(fromDoc, toDoc) {
    const pages = fromDoc.spreads.everyItem();
    pages.duplicate(LocationOptions.AT_END, toDoc.spreads.lastItem());
  }

  const loadbar = new Loadbar(restDocuments.length, 'Moving pages');
  loadbar.label('Moving pages');
  loadbar.show();

  forEach(restDocuments, (doc, i) => {
    loadbar.label(`Moving pages from ${doc.name}`);
    loadbar.update(i);
    duplicateSpreads(doc, newDoc);
  });

  loadbar.close();
  newDoc.transparencyPreferences.blendingSpace = BlendingSpace.RGB;

  const pdfFile = new File(`${newDoc.filePath}/ztory.pdf`);
  const preset = app.pdfExportPresets.itemByName('ztory_v2');

  newDoc.asynchronousExportFile(ExportFormat.PDF_TYPE, pdfFile, false, preset);
  newDoc.save();
  alert('Ztory PDF is being exported in the background');
}

main();
