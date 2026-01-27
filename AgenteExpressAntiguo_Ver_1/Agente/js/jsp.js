import { PDFDocument } from 'pdf-lib';

export async function crearPdf() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([300, 400]);
    page.drawText('¡Hola, mundo!', {
        x: 50,
        y: 300,
        size: 30,
    });
    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}
var btnImprimirOperacion = document.getElementById('btnImpOper');

btnImprimirOperacion.addEventListener('click', async () =>{

    const pdfBlob = await crearPdf();
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);
}
)

