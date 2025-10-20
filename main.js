// JavaScript compiled from TypeScript for OSON E-commerce Site

// Cart Management
class ShoppingCart {
  constructor() {
    this.items = [];
    this.cartCountElement = null;
    this.cartCountElement = document.querySelector('[aria-label="Cart"] span');
    this.loadCart();
  }

  loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.updateCartDisplay();
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  addItem(product) {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.updateCartDisplay();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.updateCartDisplay();
      }
    }
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartDisplay() {
    const count = this.getItemCount();
    if (this.cartCountElement) {
      this.cartCountElement.textContent = count.toString();
    }
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-20 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300";
    notification.textContent = message;
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-20px)";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 10);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-20px)";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Countdown Timer
class CountdownTimer {
  constructor(daysFromNow = 2) {
    this.endTime = new Date();
    this.endTime.setDate(this.endTime.getDate() + daysFromNow);

    this.daysElement = document.getElementById("days");
    this.hoursElement = document.getElementById("hours");
    this.minutesElement = document.getElementById("minutes");
    this.secondsElement = document.getElementById("seconds");

    this.intervalId = null;
    this.start();
  }

  start() {
    this.update();
    this.intervalId = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.endTime.getTime() - now;

    if (distance < 0) {
      this.stop();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysElement) this.daysElement.textContent = days.toString();
    if (this.hoursElement) this.hoursElement.textContent = hours.toString();
    if (this.minutesElement)
      this.minutesElement.textContent = minutes.toString();
    if (this.secondsElement)
      this.secondsElement.textContent = seconds.toString();
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Newsletter Form Handler
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');

  if (emailInput && emailInput.value) {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300";
    notification.textContent = `Thank you for subscribing!`;
    notification.style.opacity = "0";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    emailInput.value = "";
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Shopping Cart
  const cart = new ShoppingCart();

  // Initialize Countdown Timer (2 days from now)
  const countdown = new CountdownTimer(2);

  // Add event listeners to all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(
    'button:has-text("Add to Cart"), button[class*="bg-black"]'
  );
  document.querySelectorAll("button").forEach((button, index) => {
    if (button.textContent.includes("Add to Cart")) {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        // Find the parent product card
        const productCard = button.closest(".bg-white");
        if (productCard) {
          const nameElement = productCard.querySelector("h3");
          const priceElement = productCard.querySelector(
            'p[class*="text-neutral-600"]'
          );

          const product = {
            id: index + 1,
            name: nameElement ? nameElement.textContent.trim() : "Product",
            price: priceElement
              ? parseFloat(
                  priceElement.textContent.replace("$", "").replace(",", "")
                )
              : 0,
            image: "",
            rating: 4,
          };

          cart.addItem(product);
        }
      });
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Header scroll effect with transition
  let lastScroll = 0;
  const header = document.querySelector("header");

  if (header) {
    header.style.transition = "transform 0.3s ease-in-out";
  }

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (header) {
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
    }

    lastScroll = currentScroll;
  });

  // Add hover effect transitions to all buttons
  document.querySelectorAll("button").forEach((button) => {
    button.style.transition = "all 0.2s ease-in-out";
  });
});
