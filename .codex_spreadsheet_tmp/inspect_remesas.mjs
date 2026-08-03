import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const files = [
  "C:/Users/EXCOMERCAFE/Downloads/reporte de ventas mario/GLOBAL AGROMERCADOS (REMESAS) (1).xlsx",
  "C:/Users/EXCOMERCAFE/Downloads/reporte de ventas mario/GLOBAL AGROMERCADOS (REMESAS) - 2026-07-30T081834.518.xlsx",
  "C:/Users/EXCOMERCAFE/Downloads/reporte de ventas mario/GLOBAL AGROMERCADOS (REMESAS) - 2026-07-31T150545.020.xlsx",
];

const out = [];

for (const file of files) {
  const blob = await FileBlob.load(file);
  const wb = await SpreadsheetFile.importXlsx(blob);
  out.push(`FILE: ${path.basename(file)}`);
  const sheetSummary = await wb.inspect({ kind: "sheet", include: "id,name" });
  out.push(sheetSummary.ndjson);

  for (const sheet of wb.worksheets.items) {
    const used = sheet.getUsedRange(true);
    out.push(`SHEET: ${sheet.name} USED: ${used ? used.address : "EMPTY"}`);
    if (!used) continue;
    const range = sheet.getRange(used.address);
    const values = await range.values;
    const head = values.slice(0, Math.min(values.length, 12));
    out.push(JSON.stringify(head));
  }
  out.push("");
}

await fs.writeFile("C:/Users/EXCOMERCAFE/Documents/agroproyect/.codex_spreadsheet_tmp/remesas_inspect.txt", out.join("\n"), "utf8");
console.log("wrote inspect");
