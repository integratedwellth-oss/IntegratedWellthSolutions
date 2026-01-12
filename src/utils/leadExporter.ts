/**
 * IWS SOVEREIGNTY - DATA EXFILTRATION (CSV EXPORT)
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

export const exportLeadsToCSV = (leads: any[]) => {
  const headers = ["Date", "Name", "Business", "WhatsApp", "Runway(m)", "Shock(%)", "Cash"];
  
  const csvContent = [
    headers.join(","),
    ...leads.map(lead => {
      const date = lead.timestamp?.toDate().toLocaleDateString() || "N/A";
      return [
        `"${date}"`,
        `"${lead.name}"`,
        `"${lead.business}"`,
        `"${lead.whatsapp}"`,
        lead.assessment?.runway || 0,
        lead.assessment?.shock || 0,
        lead.assessment?.cash || 0
      ].join(",");
    })
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `IWS_Leads_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
