document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const previewModal = document.getElementById("image-preview-modal");
    const previewImage = document.getElementById("image-preview-image");
    const previewCaption = document.getElementById("image-preview-caption");
    const previewClose = document.getElementById("image-preview-close");

    const closePreview = () => {
        if (!previewModal || !previewImage) {
            return;
        }

        previewModal.classList.remove("open");
        previewModal.hidden = true;
        document.body.classList.remove("modal-open");
        previewImage.removeAttribute("src");
        previewImage.alt = "";
        previewCaption.textContent = "";
    };

    const openPreview = item => {
        if (!previewModal || !previewImage) {
            return;
        }

        const image = item.querySelector("img");

        if (!image) {
            return;
        }

        previewImage.src = image.currentSrc || image.src;
        previewImage.alt = image.alt;
        previewModal.hidden = false;
        previewModal.classList.add("open");
        document.body.classList.add("modal-open");
        previewClose?.focus();
    };

    if (galleryItems.length && previewModal) {
        galleryItems.forEach(item => {
            const image = item.querySelector("img");

            item.tabIndex = 0;
            item.setAttribute("role", "button");
            item.setAttribute("aria-label", image?.alt ? `Ampliar imagen: ${image.alt}` : "Ampliar imagen");

            item.addEventListener("click", () => {
                if (!item.classList.contains("is-hidden")) {
                    openPreview(item);
                }
            });

            item.addEventListener("keydown", event => {
                if ((event.key === "Enter" || event.key === " ") && !item.classList.contains("is-hidden")) {
                    event.preventDefault();
                    openPreview(item);
                }
            });
        });

        previewClose?.addEventListener("click", closePreview);

        previewModal.addEventListener("click", event => {
            if (event.target === previewModal) {
                closePreview();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && previewModal.classList.contains("open")) {
                closePreview();
            }
        });
    }

    if (!filterButtons.length || !galleryItems.length) {
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.dataset.filter;

            galleryItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.classList.remove("is-hidden");
                } else {
                    item.classList.add("is-hidden");
                }
            });
        });
    });
});