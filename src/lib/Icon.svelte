<script>
	const P = {
		home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
		book: 'M3 5.5C6 4 9.5 4 12 6c2.5-2 6-2 9-.5V19c-3-1.5-6.5-1.5-9 .5-2.5-2-6-2-9-.5zM12 6v13.5',
		layers: 'M12 3 3 8l9 5 9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5',
		plus: 'M12 5v14M5 12h14',
		chat: 'M4 5h16v11H9l-5 4z',
		back: 'M15 5l-7 7 7 7',
		chev: 'M9 5l7 7-7 7',
		sound: 'M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12',
		check: 'M5 12.5l4.5 4.5L19 7.5',
		x: 'M6 6l12 12M18 6 6 18',
		flame: 'M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
		bolt: 'M13 3 5 13h6l-1 8 8-10h-6z',
		trash: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13',
		music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
		camera: 'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
		link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
		user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5a7.5 7.5 0 0 1 15 0',
		mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3',
		bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',
		send: 'M4 12 20 4l-6 16-3-7z'
	};
	let { name, size = 22 } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
	<path d={P[name]} />
</svg>
