import { format, parseISO } from 'date-fns';

// Let the browser download text as a file
function download(content, filename, type) {
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}

// Export one issue as a calendar event (.ics)
export function exportIcs(issue) {
	const due = format(parseISO(issue.due), 'yyyyMMdd');
	const now = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';

	const ics = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Kanban Board//EN',
		'BEGIN:VEVENT',
		`UID:${issue.id}@kanban-board`,
		`DTSTAMP:${now}`,
		`DTSTART;VALUE=DATE:${due}`,
		`SUMMARY:${issue.title}`,
		`DESCRIPTION:${issue.description.replaceAll('\n', '\\n')}`,
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n');

	download(ics, `${issue.title}.ics`, 'text/calendar');
}

// Share one issue with the Web Share API
export async function shareIssue(issue) {
	const text = `${issue.title}\n${issue.description}\nDue: ${format(parseISO(issue.due), 'dd.MM.yyyy')} · ${issue.points} SP · ${issue.priority}`;

	try {
		if (navigator.share) {
			await navigator.share({ title: issue.title, text });
		} else {
			// Fallback for browsers without Web Share
			await navigator.clipboard.writeText(text);
			alert('Copied to clipboard');
		}
	} catch {
		// User closed the share window, so nothing to do
	}
}