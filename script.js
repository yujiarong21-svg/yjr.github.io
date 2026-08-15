const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeButton = document.querySelector(".close");
let lastTrigger = null;

function openBox(item) {
  const image = item.querySelector("img");
  lastTrigger = item;
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = image?.alt || "作品图片";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeBox() {
  if (!lightbox.classList.contains("open")) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
  lastTrigger?.focus();
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  item.setAttribute("aria-label", `放大查看${item.querySelector("img")?.alt || "作品图片"}`);
  item.addEventListener("click", () => openBox(item));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openBox(item);
    }
  });
});

closeButton.addEventListener("click", closeBox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeBox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBox();
});
