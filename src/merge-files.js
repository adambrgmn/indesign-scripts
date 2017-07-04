import './polyfills';
import getPageRange from './utils/get-page-range';
import duplicatePages from './utils/duplicate-pages';
import removePages from './utils/remove-pages';
import notify from './utils/notify';

// Get destination document from currently active document
const destinationDocument = app.activeDocument;

// Ask for file to merge pages from
const sourceFile = File.openDialog('Select InDesign file to merge pages from');

// If either is non existent (i.e. no documents open) or if the user
// clicked "cancel" in the dialog box the script will exit
if (!destinationDocument || !sourceFile) exit();

// Open the source file in the background
app.open(sourceFile, false);
const sourceDocument = app.documents.item(sourceFile.name);

// Ask for pages to merge
// the answer must be of format number-number
const pageRange = getPageRange({
  min: sourceDocument.pages.item(0).name, // Minimum possible page
  max: sourceDocument.pages.item(-1).name, // Maximum possible page
});

// If the user clicked "cancel" in the dialog the script will exit
if (!pageRange) exit();

// Duplicate the pages from the the
// source document to the detination document
const duplicated = duplicatePages(sourceDocument, destinationDocument, pageRange);

// If something went wrong, the script will exit and warn the user
if (!duplicated) {
  notify('Something went wrong, please try again');
  exit();
}

// Remove the pages from the previous pages from the source document
const removed = removePages(destinationDocument, pageRange);

// If something went wrong, the script will exit and warn the user
if (!duplicated) {
  notify('Something went wrong, please try again');
  exit();
}

// Close the source document without saving
sourceDocument.close(SaveOptions.NO);


notify('Merged completed');
exit();
