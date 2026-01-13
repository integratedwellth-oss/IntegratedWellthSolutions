export const exportLeadsToCSV = (leads: any[]) => {
  const headers = ["Date", "Name", "Email", "Phone", "Exposure"];
  const rows = leads.map(l => [
    new Date(l.createdAt?.seconds * 1000).toLocaleDateString(),
    l.name,
    l.email,
    l.phone,
    l.exposure
  ]);

  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers, ...rows].map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "IWS_Intelligence_Leads.csv");
  document.body.appendChild(link);
  link.click();
};
