import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportDashboardPdf = async (elementId = 'dashboard-root', filename = 'AI-Startup-Pack.pdf') => {
  try {
    const targetElement = document.getElementById(elementId) || document.body;

    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
      onclone: (clonedDoc, clonedElement) => {
        // Force light theme on root and body
        clonedDoc.documentElement.setAttribute('data-theme', 'light');
        clonedDoc.body.setAttribute('data-theme', 'light');

        if (clonedElement) {
          clonedElement.setAttribute('data-theme', 'light');
          clonedElement.style.backgroundColor = '#FFFFFF';
          clonedElement.style.color = '#0F172A';
          clonedElement.style.overflow = 'visible';
          clonedElement.style.height = 'auto';
          clonedElement.style.maxHeight = 'none';
        }

        // Inject print-optimized clean white stylesheet
        const printStyle = clonedDoc.createElement('style');
        printStyle.innerHTML = `
          * {
            color-scheme: light !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            color: #0F172A !important;
          }
          #dashboard-root, .dashboard-content-wrapper, .dashboard-body, .presentation-slide, #presentation-slide-box {
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            color: #0F172A !important;
            padding: 24px !important;
            padding-bottom: 48px !important;
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
          }
          .card, .card--glass, .card--surface, .card--gradient,
          .headlines-card, .value-props-card, .ad-hooks-card, .channel-card,
          .audience-card, .tech-card, .financial-card, .milestone-card,
          .slide-body-box {
            background: #FFFFFF !important;
            background-color: #FFFFFF !important;
            border: 1px solid #E2E8F0 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          .headline-item, .props-item, .hook-item, .channel-item, .asset-card,
          .metric-item, .tool-item, .tech-item {
            background: #F8FAFC !important;
            background-color: #F8FAFC !important;
            border: 1px solid #E2E8F0 !important;
          }
          h1, h2, h3, h4, h5, h6, .headline-text, .slide-title, strong, b {
            color: #0F172A !important;
          }
          p, span, div, li, .slide-subtitle, .slide-body-box {
            color: #334155 !important;
          }
          .slide-tag {
            color: #7C3AED !important;
            background: #EDE9FE !important;
          }
          /* Hide interactive web UI controls in exported PDF */
          button, .btn, .copy-btn, .copy-button, .error-banner, [role="button"],
          .modal-close, .presentation-controls, .presentation-header-actions,
          .dashboard-header, nav, header {
            display: none !important;
          }
        `;
        clonedDoc.head.appendChild(printStyle);
      },
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

    // Add clean light-themed footer
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
  // Clean, professional light footer bar
  pdf.setFillColor(248, 250, 252);
  pdf.rect(0, height - 12, width, 12, 'F');

  // Subtle brand divider line
  pdf.setDrawColor(124, 58, 237);
  pdf.setLineWidth(0.5);
  pdf.line(0, height - 12, width, height - 12);

  // High contrast slate text
  pdf.setFontSize(8);
  pdf.setTextColor(100, 116, 139);
  pdf.text('AI Startup Studio — Confidential Investor Pack', 10, height - 5);
  pdf.text(`Page ${pageNum}`, width - 20, height - 5);
};

export const exportToPdf = exportDashboardPdf;
