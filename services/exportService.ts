import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportData {
  title: string;
  subtitle: string;
  sections: {
    heading: string;
    content: string | string[];
    table?: {
      headers: string[];
      rows: any[][];
    };
  }[];
}

const LOGO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png";

export const generatePDFReport = (data: ExportData, filename: string = 'IWS_Strategic_Brief.pdf') => {
  const doc = new jsPDF();
  const brandGold = [212, 175, 55];
  const brandDark = [19, 78, 74];

  // Header Background
  doc.setFillColor(brandDark[0], brandDark[1], brandDark[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  // ADD IWS LOGO
  doc.addImage(LOGO_URL, 'PNG', 15, 12, 16, 16);

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('INTEGRATED WELLTH SOLUTIONS', 38, 20);
  
  doc.setTextColor(brandGold[0], brandGold[1], brandGold[2]);
  doc.setFontSize(10);
  doc.text('SOVEREIGNTY PROTOCOL ALPHA-1', 38, 28);

  // Subtitle
  doc.setTextColor(brandDark[0], brandDark[1], brandDark[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title.toUpperCase(), 15, 55);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(data.subtitle, 15, 62);

  let currentY = 75;

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('HIGHLY CONFIDENTIAL', 150, 55);

  data.sections.forEach((section) => {
    if (currentY > 250) { doc.addPage(); currentY = 20; }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(brandDark[0], brandDark[1], brandDark[2]);
    doc.text(section.heading.toUpperCase(), 15, currentY);
    
    currentY += 8;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    if (Array.isArray(section.content)) {
      section.content.forEach(line => {
        doc.text(`• ${line}`, 20, currentY);
        currentY += 6;
      });
    } else {
      const splitText = doc.splitTextToSize(section.content, 180);
      doc.text(splitText, 15, currentY);
      currentY += (splitText.length * 6) + 4;
    }

    if (section.table) {
      autoTable(doc, {
        startY: currentY,
        head: [section.table.headers],
        body: section.table.rows,
        theme: 'striped',
        headStyles: { fillColor: brandDark },
      });
      currentY = (doc as any).lastAutoTable.finalY + 15;
    }
    currentY += 5;
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`© ${new Date().getFullYear()} Integrated Wellth Solutions | Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
  }

  doc.save(filename);
};

export const generateCSVExport = (data: any[], filename: string = 'IWS_Export.csv') => {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] || '')).join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
