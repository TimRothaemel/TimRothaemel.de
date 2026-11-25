import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = process.cwd();

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        about: resolve(root, "src/pages/about-me/about-me.html"),
        contact: resolve(root, "src/pages/contact/contact.html"),
        cv: resolve(root, "src/pages/cv/cv.html"),
        legalNotice: resolve(root, "src/pages/legal-notice/legal-notice.html"),
        projects: resolve(root, "src/pages/projects/projects.html"),
        skills: resolve(root, "src/pages/skills/skills.html"),
        tuninghub: resolve(root, "src/projects/tuninghub/tuninghub.html"),
      },
    },
  },
  plugins: [
    {
      name: "copy-runtime-content",
      async closeBundle() {
        const output = resolve(root, "dist");
        await mkdir(resolve(output, "src"), { recursive: true });
        await Promise.all([
          cp(resolve(root, "lang"), resolve(output, "lang"), { recursive: true }),
          cp(resolve(root, "src/projects"), resolve(output, "src/projects"), {
            recursive: true,
            filter: (source) => {
              const relative = source.slice(resolve(root, "src/projects").length);
              return !relative.endsWith(".html") && !relative.endsWith(".js") && !relative.endsWith(".css");
            },
          }),
          cp(resolve(root, "src/pages/skills/skills.json"), resolve(output, "src/pages/skills/skills.json")),
          cp(resolve(root, "src/pages/skills/certificates.json"), resolve(output, "src/pages/skills/certificates.json")),
          cp(resolve(root, "src/components/header/header.html"), resolve(output, "src/components/header/header.html")),
        ]);
      },
    },
  ],
});
