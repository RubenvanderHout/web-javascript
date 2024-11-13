import { routes, navigate } from "../Router.js";

export function NavigationComponent() {
  const html = `
        <nav style=" height: 10vh; background: hsl(206 100% 83%); width: 100vw;">
            <h1>Future Colors - Color simulator</h1>
            <ul class="horizontal-list">
            </ul>
        </nav>
    `;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);

  const ul = fragment.querySelector("ul");

  const navRoutes = routes
    .filter((route) => route.showInNavbar)
    .map(
      (route) =>
        `<li>
            <a href="${route.path}" data-path=${route.path}>${route.title}</a>
        </li>`
    )
    .join(" ");
  ul.innerHTML = navRoutes;
  ul.addEventListener("click", (event) => {
    // @ts-ignore
    const path = event.target.getAttribute("data-path");

    if (path) {
      event.preventDefault();
      navigate(path);
    }
  });

  return fragment;
}