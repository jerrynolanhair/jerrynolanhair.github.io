// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav__link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      }
    })
  }

  // Keyboard navigation for mobile toggle
  if (navToggle) {
    navToggle.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        navToggle.click()
      }
    })
  }
})

// Smooth Scrolling for Anchor Links
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's just "#"
      if (href === "#") return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()

        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})

// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const phone = formData.get("phone")
      const preferredDate = formData.get("preferred-date")
      const message = formData.get("message")

      // Basic validation
      if (!name || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Create mailto link
      const subject = encodeURIComponent("Hair Appointment Enquiry from " + name)
      const body = encodeURIComponent(
        `Name: ${name}\n` +
          `Phone: ${phone || "Not provided"}\n` +
          `Preferred Date: ${preferredDate || "Not specified"}\n\n` +
          `Message:\n${message}`,
      )

      const mailtoLink = `mailto:jerry@example.com?subject=${subject}&body=${body}`

      // Try to open email client
      window.location.href = mailtoLink

      // Show success message
      alert(
        "Thank you for your message! Your email client should open now. If not, please contact Jerry directly via WhatsApp or phone.",
      )

      // Reset form
      contactForm.reset()
    })

    // Form validation on input
    const requiredFields = contactForm.querySelectorAll("[required]")
    requiredFields.forEach((field) => {
      field.addEventListener("blur", function () {
        if (!this.value.trim()) {
          this.style.borderColor = "rgba(255, 100, 100, 0.5)"
        } else {
          this.style.borderColor = "rgba(255, 255, 255, 0.2)"
        }
      })
    })
  }
})

// Gallery Lightbox (Simple Implementation)
document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery__item img")

  galleryItems.forEach((img) => {
    img.addEventListener("click", function () {
      // Create lightbox overlay
      const lightbox = document.createElement("div")
      lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `

      // Create image
      const lightboxImg = document.createElement("img")
      lightboxImg.src = this.src
      lightboxImg.alt = this.alt
      lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `

      lightbox.appendChild(lightboxImg)
      document.body.appendChild(lightbox)

      // Close on click
      lightbox.addEventListener("click", () => {
        document.body.removeChild(lightbox)
      })

      // Close on escape key
      const closeOnEscape = (e) => {
        if (e.key === "Escape") {
          document.body.removeChild(lightbox)
          document.removeEventListener("keydown", closeOnEscape)
        }
      }
      document.addEventListener("keydown", closeOnEscape)
    })
  })
})

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[loading="lazy"]')

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.src // Trigger loading
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }
})

// Update Copyright Year
document.addEventListener("DOMContentLoaded", () => {
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }
})

// Header Scroll Effect
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.98)"
    } else {
      header.style.background = "rgba(0, 0, 0, 0.95)"
    }

    lastScrollY = currentScrollY
  })
})

// Accessibility: Skip to main content
document.addEventListener("DOMContentLoaded", () => {
  // Create skip link
  const skipLink = document.createElement("a")
  skipLink.href = "#main"
  skipLink.textContent = "Skip to main content"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px"
  })

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add id to main if it doesn't exist
  const main = document.querySelector("main")
  if (main && !main.id) {
    main.id = "main"
  }
})

// Performance: Preload critical resources
document.addEventListener("DOMContentLoaded", () => {
  // Preload WhatsApp link for faster navigation
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]')
  whatsappLinks.forEach((link) => {
    link.addEventListener(
      "mouseenter",
      function () {
        // Prefetch the WhatsApp page
        const prefetchLink = document.createElement("link")
        prefetchLink.rel = "prefetch"
        prefetchLink.href = this.href
        document.head.appendChild(prefetchLink)
      },
      { once: true },
    )
  })
})



// Console message for developers
console.log("🎨 Jerry Nolan Hair Website - Built with vanilla HTML, CSS & JS")
console.log("📱 Mobile-first, accessible, and optimized for performance")
console.log("🚀 Ready for GitHub Pages deployment")
