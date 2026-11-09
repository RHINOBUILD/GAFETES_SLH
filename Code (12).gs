/**
 * Generador de Gafetes de Colaboradores — Saint Luke's Hospitals
 * ----------------------------------------------------------------
 * Diseños disponibles: Saint Luke's (hospitales), Baywatch Beach Patrol
 * y Richport Beach Patrol (ambulancias).
 * Cada descarga o impresión queda anotada en la hoja "Gafetes"
 * (fecha, nombre, puesto, diseño, código de barras).
 *
 * Instalación:
 *  1. Reemplaza todo el contenido de Code.gs por este archivo.
 *  2. Reemplaza el archivo HTML "Index" por la nueva versión.
 *  3. Implementar → Gestionar implementaciones → editar (lápiz) →
 *     Versión: Nueva versión → Implementar. La URL /exec se mantiene.
 *
 * Si la hoja "Gafetes" ya existe, el encabezado se amplía solo con las
 * columnas nuevas (Diseño, Código de barras); los registros previos no cambian.
 */

const SHEET_NAME = 'Gafetes';
const HEADERS = ['Fecha', 'Hora', 'Nombre', 'Puesto', 'Acción', 'Generado por', 'Diseño', 'Código de barras'];
const DISENOS = ["Saint Luke's", 'Baywatch', 'Richport'];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle("Generador de Gafetes — Saint Luke's Hospitals")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Llamado desde el generador con google.script.run */
function registrarGafete(d) {
  const nombre = clean_(d && d.nombre, 80);
  if (!nombre) return false;
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const now = new Date();
    const tz = Session.getScriptTimeZone();
    let usuario = '';
    try { usuario = Session.getActiveUser().getEmail(); } catch (e) {}
    const diseno = DISENOS.indexOf(d.diseno) >= 0 ? d.diseno : "Saint Luke's";
    getSheet_().appendRow([
      Utilities.formatDate(now, tz, 'dd/MM/yyyy'),
      Utilities.formatDate(now, tz, 'HH:mm'),
      nombre,
      clean_(d.puesto, 80),
      d.accion === 'Impresión' ? 'Impresión' : 'Descarga',
      usuario,
      diseno,
      clean_(d.codigo, 60)
    ]);
    return true;
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange('A:B').setNumberFormat('@');
  }
  // Amplía el encabezado si la hoja venía de la versión anterior (6 columnas)
  if (sh.getLastColumn() < HEADERS.length) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  sh.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight('bold').setBackground('#0A1F38').setFontColor('#C9A227');
  return sh;
}

function clean_(v, max) {
  let s = String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;   // evita que se interprete como fórmula
  return s;
}
