import "swiper/swiper-bundle.css";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import products from "./products.json";

const heartIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.808 11.079C19.829 16.132 12 20.5 12 20.5s-7.829-4.368-8.808-9.421C2.227 6.1 5.066 3.5 8 3.5a4.444 4.444 0 0 1 4 2 4.444 4.444 0 0 1 4-2c2.934 0 5.773 2.6 4.808 7.579z"/></svg>
`;

const expandIcon = `
<svg version="1.1" id="ios7_x5F_arrows_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><style>.st0{display:none}.st1{display:inline}</style><g id="_x32_4_1_"><path d="M53.4 69.3 7.7 115.1V86.6H.2V128h45.1v-7.5H13l45.7-45.8-5.3-5.4zm67-69.3H86.6l-.1 7.6h28.6L69.4 53.4l5.3 5.3 45.7-45.8v28.6h7.5V0h-7.5z" id="icon_15_"/></g></svg>`;

const shoppingCartIcon = `
<svg version="1.1" id="shopping_x5F_carts_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve" class="shopping-cart-icon">
  <style>
    .shopping-cart-icon { fill: #FFFFFF; }
  </style>
  <g id="_x33__1_">
    <path d="M51.5 97.4c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7s9.7-4.4 9.7-9.7c0-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2zM19.7 13.4c-.3-1.3-1.4-2.2-2.7-2.2H2.8C1.3 11.2 0 12.4 0 14c0 1.5 1.2 2.8 2.8 2.8h11.9L41 92.4c.3 1.3 1.4 2.2 2.7 2.2h73.1V89H46L19.7 13.4zm84.6 84c-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.4 9.7 9.7 9.7 5.4 0 9.7-4.4 9.7-9.7.1-5.3-4.3-9.7-9.7-9.7zm0 13.9c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.8 4.2-4.2 4.2zM33.4 33.4l2.8 5.6h85s-.5 3.4-2.5 8.3H38.3l.7 2.8h78.5c-.9 2-2.1 4.2-3.5 6.5-.4.6-.9 1.2-1.4 1.8H41.1l.7 2.8h67.8c-7 5.6-18.5 8.3-25.6 8.3H44.5h.2-.2l2.8 5.6h33.4c16 0 29.1-4.9 36.2-13.9C126.4 49 128 33.4 128 33.4H33.4zm76.3 27.8 2.7-2.6c-.8.9-1.7 1.8-2.7 2.6z" id="icon_12_"/>
  </g>
</svg>
`;

const swiper = new Swiper(".swiper-container", {
	modules: [Navigation],
	slidesPerView: 1,
	spaceBetween: 20,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	rewind: "true",
});

const swiperWrapper = document.querySelector(".swiper-wrapper");

products.forEach((product) => {
	const slide = document.createElement("div");
	slide.className = "swiper-slide";

	// Split the product name into main title and subtitle
	const [mainTitle, ...restTitle] = product.name.split(" - ");
	const subtitle = restTitle.join(" - ");

	const productPriceHtml =
		product.discounted_price === null
			? `
		<div class='next-to-each-other'>
			<div class='price-section'>
				<i class="fas fa-euro-sign" id='reduced-euro-icon'></i>
				<p id='discounted-price'>${product.original_price.toFixed(2)}</p>
			</div>
		</div>
	`
			: `
		<div>
			<div class='next-to-each-other'>
				<i class="fas fa-euro-sign" id='euro-icon'></i>
				<p id='original-price'>€ ${product.original_price.toFixed(2)}</p>
			</div>
			<div class='next-to-each-other'>
				<div class='price-section'>
					<p id='discounted-price'>€ ${product.discounted_price.toFixed(2)}</p>
				</div>
			</div>
		</div>
	`;

	slide.innerHTML = `
		<div class="slide-content">
			<div class="card2">
				<div class='img-container'>
					<a href="${product.link}">
						<img src="${product.image}" alt="${product.name}">
					</a>
				</div>
				<div class='card-content'>
					<div class='icon-container'>
						<p id='likeIcon' class="heart-icon unfilled">${heartIcon}</p>
						<p id='expandIcon' class="expand-icon">${expandIcon}</p>					
						</div>
					<h2 class='product-title'>${mainTitle}</h2>
					${subtitle ? `<h3>${subtitle}</h3>` : ""}
					</h2>
					<div class='price-container'>
						<div class='line'></div>
						<div class='product-price'>
							${productPriceHtml}
						</div>
						<p id='delivery'>Delivery in 1 - 3 days</p>
						<button class='add-cart' disabled>
							${shoppingCartIcon}
							<p id='cart-text'>Add to cart</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	`;

	swiperWrapper.appendChild(slide);
});

document.addEventListener("click", function (event) {
	let target = event.target;

	while (target && !target.classList.contains("heart-icon") && !target.classList.contains("expand-icon")) {
		target = target.parentElement;
	}

	if (target.classList.contains("unfilled")) {
		target.classList.remove("unfilled");
		target.classList.add("filled");
	} else {
		target.classList.remove("filled");
		target.classList.add("unfilled");
	}
});
