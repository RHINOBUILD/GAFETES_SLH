# Generador de Gafetes · Grupo Saint Luke's Hospitals

Genera e imprime gafetes de colaboradores (tarjeta CR80, PNG a 600 dpi) con tres diseños:

- **Saint Luke's** — hospitales
- **Baywatch Beach Patrol** — ambulancias, con código de barras Code 128 (`BWBP` + nombre + apellido paterno, editable)
- **Richport Beach Patrol** — ambulancias

El icono de ambulancia aparece automáticamente cuando el puesto es "Operador de Ambulancia".
Cada descarga o impresión queda registrada en la hoja **Gafetes** (fecha, hora, nombre, puesto, acción, usuario, diseño y código de barras).

## Estructura

| Ruta | Qué es |
|---|---|
| `apps-script/Code.gs` | Backend de Apps Script: sirve la página y escribe la bitácora. |
| `apps-script/Index.html` | El generador (HTML autocontenido, con logotipos incrustados). |
| `index.html` + `preview.jpg` | Página puente (GitHub Pages): muestra la tarjeta de vista previa en WhatsApp y redirige al generador. |

## Despliegue del generador

1. En el proyecto de Apps Script, reemplaza `Code.gs` y el archivo HTML `Index` con los de `apps-script/`.
2. Implementar → Gestionar implementaciones → editar → Versión: **Nueva versión** → Implementar. La URL `/exec` no cambia.

Implementación actual:
`https://script.google.com/a/macros/saintlukeshospitals.com/s/AKfycbxxbZqwMX2SHoLi29etAapQ35vxS2nE2Uadxc9VJC_jBccWvSjhxBg11kvkEG1PEULp/exec`

## Enlace para compartir

`https://rhinobuild.github.io/GAFETES_SLH/?v=3` — si WhatsApp muestra una vista previa vieja, sube el número de `v`.

El enlace anterior (`rhinobuild.github.io/gafetes/`) redirige aquí.

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `(root)`.
