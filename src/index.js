const imgCart = document.getElementById("img-cart");
const showCart = document.getElementById("show-cart");
const contentBuy = document.getElementById("contentBuy");
const empty = document.getElementById("empty");
const btnCart = document.getElementById("btn_cart");
let mainImg = document.getElementById("main-img");
let cantidad = document.getElementById("cantidad");
const priceProduct = document.getElementById("priceProduct");
const circle = document.getElementById("cantCircle");
const mainTitle = document.getElementById("mainTitle");

/* --------- Menu --------- */

// Mostrar Menu mobile
const showToggle = () => {
  const toggle = document.getElementById("toggle-menu");
  const menuNav = document.getElementById("links");
  toggle.addEventListener("click", (e) => {
    const show = menuNav.classList.toggle("showitems");
    closeMenu(menuNav);
  });
};

showToggle();

// Cerrar Menu mobile
const closeMenu = (menuNav) => {
  const close = document.createElement("img");
  close.src = "/images/icon-close.svg";
  close.classList.add("close");
  menuNav.insertAdjacentElement("afterbegin", close);

  close.addEventListener("click", () => {
    menuNav.classList.toggle("showitems");
    menuNav.removeChild(close);
  });
};

class Elements {
  constructor() {
    this.parent = contentBuy;
  }

  childs() {
    return [...this.parent.children];
  }

  remove(element) {
    this.parent.removeChild(element);
  }

  add(element) {
    this.parent.append(element);
  }

  size() {
    return this.childs().length;
  }

  createElements(src, title, price, cant) {
    const div = document.createElement("div");
    div.classList.add("childBuy");
    div.innerHTML = `
    <div class="show-cart__product">
      <img src="${src}"/>
      <div class="title">
      <h4>${title}</h4>
        <p>$${price} X ${cant} <span class="price-total">$${parseInt(
      price * cant
    )}.00<span></p>
      </div>
      <img class="imgdel" src="/images/icon-delete.svg" />
    </div>
    <div class="show-cart__cont-btn">
      <button class="show-cart__check">Checkout</button>
    </div>`;
    return div;
  }
}

function delProduct(parent) {
  const imgdel = [...document.querySelectorAll(".imgdel")];
  imgdel.forEach((el) => {
    el.addEventListener("click", () => {
      parent.remove(el.parentElement.parentElement);
      totalCircle(parent.size());
    });
  });
}

/* ---------- Add products ----------*/

btnCart.addEventListener("click", () => {
  if (parseInt(cantidad.textContent) > 0) {
    empty.style.display = "none";
    const parent = new Elements();
    parent.add(
      parent.createElements(
        mainImg.src,
        mainTitle.textContent,
        priceProduct.textContent,
        cantidad.textContent
      )
    );
    delProduct(parent);
    totalCircle(parent.size());
  }
});

/* ---------- Circle cantidad products ----------*/

const totalCircle = (value) => {
  if (value >= 1) {
    circle.classList.add("cant-products");
    circle.innerHTML = value;
  } else {
    circle.classList.remove("cant-products");
    empty.style.display = "block";
  }
};

/* ---------- Show products ----------*/

const carritoPrecio = () => {
  imgCart.addEventListener("click", () => {
    showCart.classList.toggle("show-cart");
  });
};
carritoPrecio();

/* ---------- Input cantidad ----------*/

const sumProduct = () => {
  const plus = document.getElementById("plus"),
    minus = document.getElementById("minus");
  let value = 0;

  plus.addEventListener("click", () => sumValue(plus));
  minus.addEventListener("click", () => sumValue(minus));

  const sumValue = (e) => {
    const operacion = e.id;
    operacion == "plus" ? value++ : value--;
    if (value <= 0) value = 0;
    cantidad.innerHTML = value;
  };
};

sumProduct();
/* --------- Slider --------- */

// Slider mobile
(function () {
  const sliders = [...document.querySelectorAll(".slider__body")];
  const arrowNext = document.querySelector("#next");
  const arrowBefore = document.querySelector("#previous");
  let value;

  arrowNext.addEventListener("click", () => changePosition(1));
  arrowBefore.addEventListener("click", () => changePosition(-1));

  function changePosition(change) {
    const currentElement = parseInt(
      document.querySelector(".slider__body--show").dataset.id
    );
    value = currentElement;
    value += change;
    if (value == 0 || value == sliders.length + 1) {
      value = value === 0 ? sliders.length : 1;
    }
    sliders[currentElement - 1].classList.toggle("slider__body--show");
    sliders[value - 1].classList.toggle("slider__body--show");
  }
})();

/* Slider Desktop */
function sliderDesktop() {
  const childSlider = [...document.querySelectorAll(".slider__img")];
  childSlider.forEach((el) => {
    el.addEventListener("click", () => {
      mainImg.setAttribute("src", `${el.src}`);
    });
  });
}
sliderDesktop();
