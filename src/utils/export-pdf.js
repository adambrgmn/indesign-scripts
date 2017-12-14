function exportPdf(doc, filename, { preset, backgroundJob = true } = {}) {
  const args = [ExportFormat.PDF_TYPE, new File(filename), false, preset];

  if (backgroundJob) return doc.asynchronousExportFile(...args);
  return doc.exportFile(...args);
}

export { exportPdf as default };
