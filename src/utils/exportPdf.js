import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportDashboardPdf = async (elementId = 'dashboard-root', filename = 'AI-Startup-Pack.pdf') => {
  try {
    const targetElement = document.getElementById(elementId) || document.body;
    
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#0A0A0A'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    let pageNum = 1;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    
    // Add brand-colored footer to page 1
    addFooter(pdf, pdfWidth, pdfHeight, pageNum);

    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pageNum++;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      addFooter(pdf, pdfWidth, pdfHeight, pageNum);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Export Dashboard PDF Error:', error);
  }
};

const addFooter = (pdf, width, height, pageNum) => {
  // Brand footer bar background
  pdf.setFillColor(10, 10, 10);
  pdf.rect(0, height - 12, width, 12, 'F');

  // Accent purple line
  pdf.setDrawColor(124, 58, 237);
  pdf.setLineWidth(0.5);
  pdf.line(0, height - 12, width, height - 12);

  // Footer text
  pdf.setFontSize(8);
  pdf.setTextColor(156, 163, 175);
  pdf.text('AI Startup Studio — Confidential Investor Pack', 10, height - 5);
  pdf.text(`Page ${pageNum}`, width - 20, height - 5);
};

export const exportToPdf = exportDashboardPdf;
