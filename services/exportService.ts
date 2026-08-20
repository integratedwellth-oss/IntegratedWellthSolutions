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

// ─── SECURITY FIX: Move Cloudinary URL to environment variable ───
const LOGO_URL = import.meta.env.VITE_LOGO_URL || "";

export const generatePDFReport = (data: ExportData, filename: string = 'IWS_Strategic_Brief.pdf') => {
  const doc = new jsPDF();

  const brandGold: any = [212, 175, 55];
  const brandDark: any = [19, 78, 74];

  // Header Background
  doc.setFillColor(brandDark[0], brandDark[1], brandDark[2]);
  doc.rect(0, 0, 210, 40, 'F');

  // IWS LOGO — only if URL is configured
  if (LOGO_URL) {
    doc.addImage(LOGO_URL, 'PNG', 15, 12, 16, 16);
  }

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

export const downloadFounderChecklistPDF = (recipientName: string = 'Founder') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const darkEmerald = [19, 78, 74];
  const gold = [212, 175, 55];
  const warmBg = [250, 248, 245];
  const textDark = [30, 41, 59];
  const textMuted = [100, 116, 139];

  // ══════════════════════════════════════════════════════════════
  // PAGE 1
  // ══════════════════════════════════════════════════════════════
  
  // Header Banner
  doc.setFillColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.rect(0, 0, 210, 56, 'F');
  
  // Gold accent bar
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 56, 210, 3, 'F');

  // Brand Name
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('INTEGRATEDWELLTH SOLUTIONS', 105, 16, { align: 'center' });

  // Main Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text("The Founder's Financial", 105, 28, { align: 'center' });
  doc.text("Self-Care Checklist", 105, 37, { align: 'center' });

  // Subtitle
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('5 Steps to Audit-Ready Books & Zero Anxiety', 105, 48, { align: 'center' });

  // Message from Marcia Box
  doc.setFillColor(warmBg[0], warmBg[1], warmBg[2]);
  doc.roundedRect(15, 68, 180, 56, 3, 3, 'F');
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(1.5);
  doc.line(15, 68, 15, 124);

  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('A Message from Marcia', 22, 78);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const msg1 = "I know firsthand that messy books and pending Annual Financial Statements (AFS) can keep you awake at night. If you run a business in South Africa, you already know that messy bookkeeping and delayed compliance are the number one reason tenders get rejected and funding falls through.";
  const msg2 = "But beyond the missed opportunities, the psychological weight of financial chaos leads straight to founder burnout. That's why I created this checklist. It's time to bridge the gap between your mental well-being and your financial clarity.";
  
  const splitMsg1 = doc.splitTextToSize(msg1, 168);
  doc.text(splitMsg1, 22, 85);
  
  const splitMsg2 = doc.splitTextToSize(msg2, 168);
  doc.text(splitMsg2, 22, 101);

  doc.setFont('helvetica', 'bolditalic');
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFontSize(9);
  doc.text('- Marcia Kgaphola, Founder of Integratedwellth Solutions', 22, 118);

  // Step 01
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(15, 132, 195, 132);

  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('01', 15, 142);

  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setFontSize(12);
  doc.text('The "Mindful Minute" Cash Flow Check', 25, 142);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('THE PSYCHOLOGY:', 25, 150);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const psych1 = "Avoidance breeds anxiety. We fear looking at our bank balances when we don't feel entirely in control of our spending.";
  const splitPsych1 = doc.splitTextToSize(psych1, 140);
  doc.text(splitPsych1, 58, 150);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.text('THE ACTION:', 25, 162);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const act1 = "Spend exactly 60 seconds each morning reviewing your bank balance and upcoming payments. Awareness is the crucial first step to taking back financial control.";
  const splitAct1 = doc.splitTextToSize(act1, 148);
  doc.text(splitAct1, 48, 162);

  // Step 02
  doc.setDrawColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setLineWidth(1);
  doc.line(15, 178, 195, 178);

  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('02', 15, 190);

  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setFontSize(12);
  doc.text('Strict Boundary Setting (Self vs. Business)', 25, 190);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('THE PSYCHOLOGY:', 25, 198);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const psych2 = "Blurred lines between personal and business finances lead to identity enmeshment and extreme tax-season panic.";
  const splitPsych2 = doc.splitTextToSize(psych2, 140);
  doc.text(splitPsych2, 58, 198);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.text('THE ACTION:', 25, 210);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const act2 = "Audit your accounts today. Ensure zero personal expenses run through the business account. This simple boundary protects your corporate veil and simplifies your financial reporting.";
  const splitAct2 = doc.splitTextToSize(act2, 148);
  doc.text(splitAct2, 48, 210);

  // Page 1 Footer
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Page 1 of 2 | Prepared for ' + recipientName + ' by Integratedwellth Solutions', 105, 285, { align: 'center' });

  // ══════════════════════════════════════════════════════════════
  // PAGE 2
  // ══════════════════════════════════════════════════════════════
  doc.addPage();

  // Top header rule
  doc.setFillColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.rect(0, 0, 210, 8, 'F');
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 8, 210, 2, 'F');

  // Step 03
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('03', 15, 24);

  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setFontSize(12);
  doc.text('The Monthly "Sanity Reconciliation"', 25, 24);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('THE PSYCHOLOGY:', 25, 32);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const psych3 = "Unfinished loops drain your cognitive energy. Unreconciled books sit in the back of your mind as a heavy, subconscious weight.";
  const splitPsych3 = doc.splitTextToSize(psych3, 140);
  doc.text(splitPsych3, 58, 32);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.text('THE ACTION:', 25, 44);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const act3 = "Schedule a non-negotiable 2-hour block by the 5th of every month to reconcile the previous month's bank statements. Treat this appointment as an act of self-care.";
  const splitAct3 = doc.splitTextToSize(act3, 148);
  doc.text(splitAct3, 48, 44);

  // Step 04
  doc.setDrawColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setLineWidth(1);
  doc.line(15, 62, 195, 62);

  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('04', 15, 74);

  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setFontSize(12);
  doc.text('Elevating to IFRS for SMEs', 25, 74);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('THE PSYCHOLOGY:', 25, 82);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const psych4 = "Imposter syndrome peaks when founders have to present unstandardized financials to a bank, investor, or tender board.";
  const splitPsych4 = doc.splitTextToSize(psych4, 140);
  doc.text(splitPsych4, 58, 82);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.text('THE ACTION:', 25, 94);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const act4 = "Shift your mindset from \"doing the books for SARS\" to \"compiling financials for growth.\" Ensure your AFS complies with the IFRS for SMEs standard to build instant credibility.";
  const splitAct4 = doc.splitTextToSize(act4, 148);
  doc.text(splitAct4, 48, 94);

  // Step 05
  doc.setDrawColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setLineWidth(1);
  doc.line(15, 112, 195, 112);

  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('05', 15, 124);

  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setFontSize(12);
  doc.text('The "Founder\'s Reward" Protocol', 25, 124);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.text('THE PSYCHOLOGY:', 25, 132);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  const psych5 = "Founders who reinvest 100% of revenue and starve themselves build deep resentment towards their own business, inevitably leading to burnout.";
  const splitPsych5 = doc.splitTextToSize(psych5, 140);
  doc.text(splitPsych5, 58, 132);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.text('THE ACTION:', 25, 144);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const act5 = "Structure a fixed, regular salary for yourself. Factor it into your breakeven analysis. You are your business's most valuable asset—compensate yourself accordingly.";
  const splitAct5 = doc.splitTextToSize(act5, 144);
  doc.text(splitAct5, 48, 144);

  // Bottom Callout Box
  doc.setFillColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.roundedRect(15, 166, 180, 72, 4, 4, 'F');

  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Ready to move from Chaos to Clarity?', 105, 180, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const closing1 = "Stop letting messy books steal your peace of mind. Let Integratedwellth Solutions build your holistic, IFRS-compliant financial system.";
  const splitClosing1 = doc.splitTextToSize(closing1, 160);
  doc.text(splitClosing1, 105, 188, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Book your Financial Well-being Alignment Review with Marcia today.', 105, 202, { align: 'center' });

  // Contact Pill
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.roundedRect(35, 210, 140, 14, 2, 2, 'F');
  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('enquiries@integratedwellth.co.za  |  067 055 5941', 105, 219, { align: 'center' });

  // Page 2 Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(darkEmerald[0], darkEmerald[1], darkEmerald[2]);
  doc.text('Integratedwellth Solutions Incorporated | Accounting • Tax • Advisory', 105, 252, { align: 'center' });
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text('Empowering Women. Strengthening Businesses.', 105, 258, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('LinkedIn: @integratedwellth  |  Instagram: @integratedwellth  |  Facebook: @integratedwellth', 105, 266, { align: 'center' });
  doc.text('© ' + new Date().getFullYear() + ' Integratedwellth Solutions. All rights reserved.', 105, 274, { align: 'center' });

  doc.save('Founders_Financial_Self_Care_Checklist.pdf');
};
