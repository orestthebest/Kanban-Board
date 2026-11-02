const KEY = 'kanban-issues';

// Load issues from localStorage
export function loadIssues() {
	const data = localStorage.getItem(KEY);
	return data ? JSON.parse(data) : [];
}

// Save issues to localStorage
export function saveIssues(issues) {
	localStorage.setItem(KEY, JSON.stringify(issues));
}