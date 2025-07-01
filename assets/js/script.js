// General JS for Kamal Kumari Devi Model School Examination Portal

document.addEventListener("DOMContentLoaded", () => {
  // Spinner handling
  const showSpinner = () => {
    const spinner = document.querySelector(".spinner");
    if (spinner) spinner.style.display = "block";
  };

  const hideSpinner = () => {
    const spinner = document.querySelector(".spinner");
    if (spinner) spinner.style.display = "none";
  };

  // Simulate loading where needed
  const simulateLoading = (callback, delay = 1000) => {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      if (callback) callback();
    }, delay);
  };

  // Example usage:
  // simulateLoading(() => console.log("Loaded"));

  // Dropdown toggle for nav submenus
  document.querySelectorAll(".dropdown-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const submenu = btn.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle("active");
      }
    });
  });

  // Mobile menu toggle
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.querySelector(".navbar").classList.toggle("open");
    });
  }

  // Form validation example
  const loginForm = document.querySelector("form.login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      const inputs = loginForm.querySelectorAll("input[required]");
      let allFilled = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = "red";
          allFilled = false;
        } else {
          input.style.borderColor = "#ccc";
        }
      });
      if (!allFilled) {
        e.preventDefault();
        alert("Please fill in all required fields.");
      }
    });
  }
});

