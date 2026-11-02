// Export all issues as a CSV file (opens in Excel)
export function exportCsv(issues) {
	const header = ['Title', 'Description', 'Created', 'Due', 'Story Points', 'Priority', 'Lane'];

	const rows = issues.map((issue) => [
		issue.title,
		issue.description,
		format(parseISO(issue.created), 'dd.MM.yyyy HH:mm'),
		format(parseISO(issue.due), 'dd.MM.yyyy'),
		issue.points,
		issue.priority,
		issue.lane
	]);

	// Every value in quotes (in case it contains a ";"), quotes inside are doubled
	const csv = [header, ...rows]
		.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(';'))
		.join('\n');

	download(csv, 'kanban-issues.csv', 'text/csv');
}