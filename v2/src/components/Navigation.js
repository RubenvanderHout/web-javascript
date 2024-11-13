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

// This runs after the components are rendered
export function PopulateNavigation() {
  const nav = document.querySelector("nav");
  const pages = document.querySelectorAll(".page-container > div");
  const ul = nav.querySelector("ul");
  pages.forEach((page, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    //if multiple pages have the same page-type, they will be numbered
    if (
      Array.from(pages).filter(
        (p) => p.getAttribute("page-type") === page.getAttribute("page-type")
      ).length > 1
    ) {
      button.textContent = `${
        page.getAttribute("page-type") || "Unnamed Page"
      } ${index + 1}`;
    } else {
      button.textContent = page.getAttribute("page-type") || "Unnamed Page";
    }
    button.onclick = () => {
      //@ts-ignore
      page.style.display = "block";
      pages.forEach((p, i) => {
        if (i !== index) {
          //@ts-ignore
          p.style.display = "none";
        }
      });
    };
    li.appendChild(button);
    ul.appendChild(li);
  });
}
