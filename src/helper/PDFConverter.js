import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const pxToMm = (px) => {
  return Math.floor(px / document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById('myMm').offsetHeight * mm;
};

const range = (start, end) => {
  return Array(end - start)
    .join(0)
    .split(0)
    .map(function (val, id) {
      return id + start;
    });
};

const savePDF = async (height) => {
  const input = document.getElementById('report');
  const inputHeightMm = pxToMm(input.offsetHeight);
  const a4WidthMm = 210;
  const a4HeightMm = height;
  const a4HeightPx = mmToPx(a4HeightMm);
  const numPages =
    inputHeightMm <= a4HeightMm
      ? 1
      : Math.floor(inputHeightMm / a4HeightMm) + 1;
  console.log({
    input,
    inputHeightMm,
    a4HeightMm,
    a4HeightPx,
    numPages,
    range: range(0, numPages),
    comp: inputHeightMm <= a4HeightMm,
    inputHeightPx: input.offsetHeight,
  });
  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL('image/png');
  let pdf;
  // Document of a4WidthMm wide and inputHeightMm high
  if (inputHeightMm > a4HeightMm) {
    // elongated a4 (system print dialog will handle page breaks)
    pdf = new jsPDF('p', 'mm', [inputHeightMm + 16, a4WidthMm]);
  } else {
    // standard a4
    pdf = new jsPDF();
  }
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('download.pdf');
};

export default savePDF