// Keeps a secret (your own API key) encrypted on this device.
// The encryption key is created in the browser as non-extractable: scripts can use it but cannot read
// or export it, and it never leaves the device. What sits in storage is ciphertext only, so the key
// does not show up in backups, exports, synced data or a look at the browser's storage.
// Limit, stated plainly: code running on this site could still ask the browser to decrypt it,
// which is why the site also blocks third-party scripts (see the content security policy).
const SLOT = 'jeitinho:vault';
const b64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const bytes = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

const open = () =>
	new Promise((ok, fail) => {
		const r = indexedDB.open('jeitinho', 1);
		r.onupgradeneeded = () => r.result.createObjectStore('keys');
		r.onsuccess = () => ok(r.result);
		r.onerror = () => fail(r.error);
	});
const tx = async (mode, fn) => {
	const db = await open();
	return new Promise((ok, fail) => {
		const req = fn(db.transaction('keys', mode).objectStore('keys'));
		req.onsuccess = () => ok(req.result);
		req.onerror = () => fail(req.error);
	});
};

async function deviceKey() {
	let k = await tx('readonly', (s) => s.get('device'));
	if (!k) {
		k = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']); // false = cannot be exported
		await tx('readwrite', (s) => s.put(k, 'device'));
	}
	return k;
}

export async function seal(text) {
	if (!text) return localStorage.removeItem(SLOT);
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await deviceKey(), new TextEncoder().encode(text));
	localStorage.setItem(SLOT, `${b64(iv)}.${b64(ct)}`);
}

export async function unseal() {
	try {
		const [iv, ct] = (localStorage.getItem(SLOT) || '').split('.');
		if (!ct) return '';
		return new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(iv) }, await deviceKey(), bytes(ct)));
	} catch {
		return ''; // storage cleared or blocked: the key is simply gone and can be pasted again
	}
}
