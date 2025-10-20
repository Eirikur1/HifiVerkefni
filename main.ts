// TypeScript for OSON E-commerce Site

// Interface for Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
}

// Interface for Cart Item
interface CartItem extends Product {
  quantity: number;
}

// Cart Management
class ShoppingCart {
  private items: CartItem[] = [];
  private cartCountElement: HTMLElement | null = null;

  constructor() {
    this.cartCountElement = document.querySelector(".cart-count");
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.updateCartDisplay();
    }
  }

  private saveCart(): void {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  addItem(product: Product): void {
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

  removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  updateQuantity(productId: number, quantity: number): void {
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

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCartDisplay(): void {
    const count = this.getItemCount();
    if (this.cartCountElement) {
      this.cartCountElement.textContent = count.toString();
      this.cartCountElement.style.display = count > 0 ? "flex" : "none";
    }
  }

  private showNotification(message: string): void {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-20 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Countdown Timer
class CountdownTimer {
  private endTime: Date;
  private daysElement: HTMLElement | null;
  private hoursElement: HTMLElement | null;
  private minutesElement: HTMLElement | null;
  private secondsElement: HTMLElement | null;
  private intervalId: number | null = null;

  constructor(daysFromNow: number = 2) {
    this.endTime = new Date();
    this.endTime.setDate(this.endTime.getDate() + daysFromNow);

    this.daysElement = document.getElementById("days");
    this.hoursElement = document.getElementById("hours");
    this.minutesElement = document.getElementById("minutes");
    this.secondsElement = document.getElementById("seconds");

    this.start();
  }

  private start(): void {
    this.update();
    this.intervalId = window.setInterval(() => this.update(), 1000);
  }

  private update(): void {
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

  private stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Newsletter Form Handler
function handleNewsletterSubmit(event: Event): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const emailInput = form.querySelector(
    'input[type="email"]'
  ) as HTMLInputElement;

  if (emailInput && emailInput.value) {
    alert(`Thank you for subscribing with: ${emailInput.value}`);
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
  const addToCartButtons = document.querySelectorAll("[data-add-to-cart]");
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Sample product data - in a real app, this would come from a database
      const product: Product = {
        id: index + 1,
        name: button.getAttribute("data-product-name") || "Product",
        price: parseFloat(button.getAttribute("data-product-price") || "0"),
        image: button.getAttribute("data-product-image") || "",
        rating: 4,
      };
      cart.addItem(product);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href && href !== "#") {
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

  // Add hover effects to product cards
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("shadow-xl", "scale-105");
    });
    card.addEventListener("mouseleave", function () {
      this.classList.remove("shadow-xl", "scale-105");
    });
  });

  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector("header");

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
});

// Export for use in other modules
export { ShoppingCart, CountdownTimer, handleNewsletterSubmit };
