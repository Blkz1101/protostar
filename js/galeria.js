// ==============================
// GALERÍA - LISTA DE FOTOS
// ==============================
// Para AGREGAR una foto: añade un objeto al final del array.
// Para QUITARLA: borra su objeto.
// El orden del array es el orden en que aparecen.

const fotos = [
    {
        archivo: "assets/galeria-exterior.jpeg",
        alt: "Fachada de Carnicería Bigotes",
        categoria: "NUESTRA CARNICERÍA",
        titulo: "Exterior del negocio"
    },
    {
        archivo: "assets/galeria-historia.jpeg",
        alt: "Interior de la carnicería con retratos familiares",
        categoria: "DESDE 1890",
        titulo: "Nuestra historia"
    },
    {
        archivo: "assets/galeria-productos.jpeg",
        alt: "Vitrina con chorizos y cortes colgando",
        categoria: "CALIDAD QUE SE VE",
        titulo: "Nuestros productos"
    },
    {
        archivo: "assets/galeria-mostrador.jpeg",
        alt: "Mostrador y pared con fotografías",
        categoria: "TRADICIÓN FAMILIAR",
        titulo: "Mostrador y recuerdos"
    },
    {
        archivo: "assets/galeria-refrigerados.jpeg",
        alt: "Productos frescos refrigerados",
        categoria: "FRESCURA",
        titulo: "Productos refrigerados"
    },
    {
        archivo: "assets/galeria-puerta.jpeg",
        alt: "Puerta de entrada del negocio",
        categoria: "BIENVENIDOS",
        titulo: "Puerta del negocio"
    },
    {
        archivo: "assets/galeria-logo.jpeg",
        alt: "Logo de la carnicería",
        categoria: "NUESTRO LOGO",
        titulo: "Identidad de la marca"
    },


];


// ==============================
// RENDERIZADO DEL GRID
// ==============================

const contenedor = document.getElementById("masonryGrid");

if (contenedor) {
    fotos.forEach((foto, index) => {
        const numero = String(index + 1).padStart(2, "0");

        const figure = document.createElement("figure");
        figure.className = "masonry-item";
        figure.dataset.index = index;

        figure.innerHTML = `
            <span class="masonry-badge">${numero}</span>
            <img src="${foto.archivo}" alt="${foto.alt}" loading="lazy">
            <figcaption class="masonry-caption">
                <span>${foto.categoria}</span>
                ${foto.titulo}
            </figcaption>
        `;

        figure.addEventListener("click", () => abrirLightbox(index));
        contenedor.appendChild(figure);
    });
}


// ==============================
// LIGHTBOX
// ==============================

let indiceActual = 0;

// Crear el lightbox en el DOM
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
    <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Cerrar">✕</button>
        <button class="lightbox-prev" aria-label="Anterior">‹</button>
        <button class="lightbox-next" aria-label="Siguiente">›</button>

        <div class="lightbox-image-wrapper">
            <img id="lightboxImg" src="" alt="">
        </div>

        <div class="lightbox-info">
            <span class="lightbox-categoria" id="lightboxCategoria"></span>
            <div class="lightbox-titulo" id="lightboxTitulo"></div>
            <span class="lightbox-contador" id="lightboxContador"></span>
        </div>
    </div>
`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById("lightboxImg");
const lightboxCategoria = document.getElementById("lightboxCategoria");
const lightboxTitulo = document.getElementById("lightboxTitulo");
const lightboxContador = document.getElementById("lightboxContador");


function abrirLightbox(index) {
    indiceActual = index;
    actualizarLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function cerrarLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function siguienteFoto() {
    indiceActual = (indiceActual + 1) % fotos.length;
    actualizarLightbox();
}

function anteriorFoto() {
    indiceActual = (indiceActual - 1 + fotos.length) % fotos.length;
    actualizarLightbox();
}

function actualizarLightbox() {
    const foto = fotos[indiceActual];
    const numero = String(indiceActual + 1).padStart(2, "0");
    const total = String(fotos.length).padStart(2, "0");

    lightboxImg.src = foto.archivo;
    lightboxImg.alt = foto.alt;
    lightboxCategoria.textContent = foto.categoria;
    lightboxTitulo.textContent = foto.titulo;
    lightboxContador.textContent = `${numero} / ${total}`;
}


// ==============================
// EVENTOS DEL LIGHTBOX
// ==============================

lightbox.querySelector(".lightbox-close").addEventListener("click", cerrarLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", anteriorFoto);
lightbox.querySelector(".lightbox-next").addEventListener("click", siguienteFoto);

// Cerrar al hacer clic en el fondo oscuro
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) cerrarLightbox();
});

// Navegar con el teclado
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") cerrarLightbox();
    if (e.key === "ArrowRight") siguienteFoto();
    if (e.key === "ArrowLeft") anteriorFoto();
});