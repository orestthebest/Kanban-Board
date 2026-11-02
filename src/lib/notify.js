// Show a browser notification when an issue is done
export async function notifyDone(title) {
	// Not every browser supports notifications
	if (!('Notification' in window)) return;

	// Ask for permission the first time
	if (Notification.permission === 'default') {
		await Notification.requestPermission();
	}

	if (Notification.permission === 'granted') {
		new Notification('Issue done ✓', { body: title });
	}
}