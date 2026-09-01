export class ComponentLoader {

    async load(url, targetId) {
        try {
            const target = document.getElementById(targetId);
            if (!target) return;

            let res = await fetch(url);
            if (!res.ok) {
                // Fallback attempt with relative path if initial fetch fails
                const filename = url.split('/').pop();
                const fallbackUrl = new URL(`../../styles/${filename}`, import.meta.url).href;
                res = await fetch(fallbackUrl);
            }

            if (!res.ok) {
                console.warn(`ComponentLoader: Failed to load ${url}`);
                return;
            }

            const html = await res.text();
            let cleanHtml = html;
            if (html.includes('<body')) {
                const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                if (match && match[1]) {
                    cleanHtml = match[1];
                }
            }

            target.innerHTML = cleanHtml;
        } catch (err) {
            console.error("Component load error:", err);
        }
    }
}
