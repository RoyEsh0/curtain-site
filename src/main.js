import "./style.css"
import { projects } from "./projects"

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

const carouselTrack = document.querySelector("#carousel-track");

function createSlide (project, index){
  return `
    <figure class="relative aspect-[4/3] min-w-full flex-none snap-center md:aspect - [16/9]">
      <img
        src="${project.image}"
        alt="${project.alt}"
        loading="${index === 0 ? "eager" : "lazy"}"
        class="h-full w-full object-cover"
      />
      <figcaption class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-6 text-white">
      <p class="text-xl font-bold">${project.title}</p>
      </figcaption>
    </figure>
  `;
}

carouselTrack.innerHTML = projects.map(createSlide).join("");

document.querySelector("#carousel-prev").addEventListener("click", ()=>{
  carouselTrack.scrollBy({ left: -carouselTrack.clientWidth, behavior: "smooth" });
});

document.querySelector("#carousel-next").addEventListener("click", () =>{
  carouselTrack.scrollBy({ left: carouselTrack.clientWidth, behavior: "smooth"});

});

