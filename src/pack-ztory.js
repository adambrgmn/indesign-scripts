import { join } from 'path';
import './polyfills/array/forEach';
import './polyfills/array/isArray';
import './polyfills/array/from';
import copyDoc from './utils/copy-doc';
import Loadbar from './utils/loadbar';
import exportPdf from './utils/export-pdf';

function forEach(list, fn) {
  Array.prototype.forEach.call(list, fn);
}

function sort(list, predicate) {
  return Array.prototype.slice.call(list, 0).sort(predicate);
}

function duplicateAllSpreads(fromDoc, toDoc) {
  const pages = fromDoc.spreads.everyItem();
  pages.duplicate(LocationOptions.AT_END, toDoc.spreads.lastItem());
}

function generateName(duplicatedDoc, suffix = 'sammanslaget', ext = '.indd') {
  const filePath = duplicatedDoc.filePath.fullName.split('/').slice(-2);
  return join(
    `${duplicatedDoc.filePath}`,
    `ST_${filePath[0].slice(2)}_${filePath[1]}_${suffix}${ext}`,
  );
}

function main() {
  /**
   * This scripts will merge all open documents into one large.
   * The pages will be sorted by the name of the documents.
   */
  const sortedDocuments = sort(app.documents, (a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  /**
   * First document will be the base, the rest will be merged into it.
   */
  const [firstDocument, ...restDocuments] = sortedDocuments;
  const newDoc = copyDoc(firstDocument, generateName(firstDocument));

  const loadbar = new Loadbar(
    restDocuments.length,
    'Packing Sjöfartstidningen',
  );

  loadbar.label('Moving pages');
  loadbar.show();

  /**
   * Loop thru restDocuments and duplicate all spreads from the docs into the new
   * document, placing them in the end.
   */
  forEach(restDocuments, (doc, i) => {
    loadbar.label(`Moving pages from ${doc.name}`);
    duplicateAllSpreads(doc, newDoc);
    loadbar.update(i + 1);
  });

  loadbar.close();

  /**
   * Change blending space to Document RGB because Ztory depends on it
   */
  newDoc.transparencyPreferences.blendingSpace = BlendingSpace.RGB;

  /**
   * Export pdf-file into same directory
   */
  const exports = [
    [
      generateName(firstDocument, 'ztory', '.pdf'),
      app.pdfExportPresets.itemByName('ztory_v2'),
    ],
    [
      generateName(firstDocument, 'retreiver', '.pdf'),
      app.pdfExportPresets.itemByName('[Minsta filstorlek]'),
    ],
  ];

  forEach(exports, ([filename, preset]) =>
    exportPdf(newDoc, filename, { preset }),
  );

  newDoc.save();
  alert('The PDFs are now being exported in the background');
}

try {
  main();
} catch (err) {
  $.writeln(err);
}
