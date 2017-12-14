function copyDoc(doc, filename) {
  const newFile = new File(filename);
  doc.saveACopy(newFile);
  app.open(newFile);
  return app.documents.itemByName(newFile.name);
}

export { copyDoc as default };
