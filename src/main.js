import "./style.css"
import { projects } from "./projects"
import { steps } from "./steps.js";

const projectList = document.querySelector("#project-list");

function createProjectCard (project){
  return `
  <article class="overflow-hidden rounded-lg bg-white p-6 shadow-olive-400">
    <img 
      src="${project.image}"
      alt="${project.alt}"
      loading="lazy"
      class="aspect-[4/3] w-full object-cover"
      />
      <div class="p-6">
        <span class="text-sm font-semibold uppercase text-brand">${project.category}</span>
        <h3 class="mt-2 text-xl font-bold">${project.title}</h3>
        <p class="mt-2 text-stone-600">${project.description}</p>
      </div>  
  </article>
  `;
}

const filterButtons = document.querySelector("#filter-buttons");
let currentFilter = "all";

function renderProjects () {
  const visibleProjects = 
    currentFilter === "all"
    ? projects
    : projects.filter((project) => project.category === currentFilter);

  
  projectList.innerHTML = visibleProjects.map(createProjectCard).join("");
}

function updateButtons() {
  filterButtons.querySelectorAll("button").forEach((button) =>{
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("bg-brand", isActive);
    button.classList.toggle("text-white", isActive);
    button.classList.toggle("bg-white", !isActive);
    button.classList.toggle("text-stone-700", !isActive);


  });

}

filterButtons.addEventListener("click", (event) =>{
  const button = event.target.closest("button");
  if (!button) return;

  currentFilter = button.dataset.filter;
  renderProjects();
  updateButtons();
  console.log(currentFilter);
});

renderProjects()
updateButtons()


document.querySelector("#year").textContent = new Date().getFullYear();

const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

menuButton.addEventListener("click", () =>{
const isOpen = !menu.classList.toggle("hidden");
menuButton.setAttribute("aria-expanded", isOpen);
}
);

menu.addEventListener("click", () =>{
  if (event.target.closest("a")){
    menu.classList.add("hidden");
    menuButton.setAttribute("aria-expanded", false);
  }
});

const stepsList = document.querySelector("#steps-list");

function createStep (step, index) {
  const isLast = index === steps.length - 1;

  return `
    <li class="relative text-center">
      ${isLast ? "" : '<div class="absolute left-[calc(50%+3rem)] top-[31px] hidden h-1 w-[calc(100%-4rem)] bg-brand lg:block"></div>'}
      <span class="mx-auto block h-16 w-16 p-2 rounded-full bg-white  text-brand [&>svg]:h-full [&>svg]:w-full shadow-sm">
      ${step.icon}
      </span>
      <h3 class="mt-4 text-xl font-bold">${step.title}</h3>
      <p class="mt-2 text-stone-600">${step.description}</p>
    </li>  
  `;

}

stepsList.innerHTML = steps.map(createStep).join("");