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

export const generatePDFReport = (data: ExportData, filename: string = 'IWS_Strategic_Brief.pdf') => {
  const doc = new jsPDF();
  
  // Cast to 'any' to resolve strict Tuple type errors in jspdf-autotable
  const brandGold: any = [212, 175, 55];
  const brandDark: any = [19, 78, 74];

  // Header Background
  doc.setFillColor(brandDark[0], brandDark[1], brandDark[2]);
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('INTEGRATED WELLTH SOLUTIONS', 15, 20);
  
  doc.setTextColor(brandGold[0], brandGold[1], brandGold[2]);
  doc.setFontSize(10);
  doc.text('SOVEREIGNTY PROTOCOL ALPHA-1', 15, 28);

  // Subtitle
  doc.setTextColor(brandDark[0], brandDark[1], brandDark[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.title.toUpperCase(), 15, 55);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(data.subtitle, 15, 62);

  let currentY = 75;

  // Add Confidentiality Stamp
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('HIGHLY CONFIDENTIAL | SOVEREIGN INTEL HUB', 150, 55);

  data.sections.forEach((section) => {
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

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
        alternateRowStyles: { fillColor: [245, 250, 250] },
        styles: { fontSize: 8, cellPadding: 3 },
        margin: { left: 15, right: 15 }
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
    doc.text(`© 2026 Integrated Wellth Solutions | Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
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
