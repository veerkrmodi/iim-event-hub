export const getGoogleCalendarLink = (event) => {
  const start = `${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00`;
  const details = encodeURIComponent(`${event.description}\n\nHost: ${event.club}`);
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${start}&details=${details}&location=${encodeURIComponent(event.venue)}`;
};

export const downloadICS = (event) => {
  const content = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00
LOCATION:${event.venue}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;
  
  const blob = new Blob([content], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
