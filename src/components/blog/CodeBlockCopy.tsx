"use client";

import { useEffect } from "react";

export default function CodeBlockCopy() {
  useEffect(() => {
    const figures = document.querySelectorAll<HTMLElement>("[data-rehype-pretty-code-figure]");

    figures.forEach((figure) => {
      // Don't add button if already present
      if (figure.querySelector(".copy-code-btn")) return;

      const pre = figure.querySelector("pre");
      if (!pre) return;

      figure.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = "copy-code-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerHTML = `
        <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <svg class="check-icon" style="display:none" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;

      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText ?? pre.innerText;
        try {
          await navigator.clipboard.writeText(code.trim());
          const copyIcon = btn.querySelector(".copy-icon") as HTMLElement;
          const checkIcon = btn.querySelector(".check-icon") as HTMLElement;
          if (copyIcon && checkIcon) {
            copyIcon.style.display = "none";
            checkIcon.style.display = "block";
            btn.classList.add("copied");
            setTimeout(() => {
              copyIcon.style.display = "block";
              checkIcon.style.display = "none";
              btn.classList.remove("copied");
            }, 2000);
          }
        } catch {
          // fallback or ignore
        }
      });

      figure.appendChild(btn);
    });
  }, []);

  return null;
}
