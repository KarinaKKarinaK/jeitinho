import { error } from '@sveltejs/kit';

export const prerender = false;

// ponytail: the daily reminder is a repeating calendar event with an alert, not web push.
// It works on every phone with no server, no keys and no permission prompt.
// Upgrade path: web push (VAPID keys, a subscriptions table and a daily cron) if a calendar alert is not enough.
export function GET({ url }) {
	const m = (url.searchParams.get('t') || '19:00').match(/^([01]\d|2[0-3]):([0-5]\d)$/);
	if (!m) error(400, 'Time must look like 19:00.');
	const ics = [
		'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//jeitinho//daily quiz//EN',
		'BEGIN:VEVENT', 'UID:daily-quiz@jeitinho', 'DTSTAMP:20260101T000000Z',
		`DTSTART:20260101T${m[1]}${m[2]}00`, 'DURATION:PT10M', 'RRULE:FREQ=DAILY',
		'SUMMARY:jeitinho: quiz do dia', `URL:${url.origin}/quiz`, `DESCRIPTION:${url.origin}/quiz`,
		'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Quiz do dia', 'TRIGGER:PT0M', 'END:VALARM',
		'END:VEVENT', 'END:VCALENDAR'
	].join('\r\n');
	return new Response(ics, { headers: { 'content-type': 'text/calendar; charset=utf-8', 'content-disposition': 'inline; filename="jeitinho.ics"' } });
}
