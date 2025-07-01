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

document.addEventListener("DOMContentLoaded", () => {
  const basePath = window.location.pathname.includes("/teacher/") ? "../" :
                   window.location.pathname.includes("/student/") ? "../" :
                   ""; // root level

  // Load header
  fetch(`${basePath}partials/header.html`)
    .then(res => res.text())
    .then(data => {
      const header = document.getElementById("header-placeholder");
      if (header) header.innerHTML = data;
    });

  // Load footer
  fetch(`${basePath}partials/footer.html`)
    .then(res => res.text())
    .then(data => {
      const footer = document.getElementById("footer-placeholder");
      if (footer) footer.innerHTML = data;
    });
});



document.addEventListener("DOMContentLoaded", () => {
  const teacherSelect = document.getElementById("teacher");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const showPasswordCheckbox = document.getElementById("showPassword");
  const rememberMeCheckbox = document.getElementById("rememberMe");

  // Load remembered teacher name and password
  if (localStorage.getItem("rememberedTeacher")) {
    teacherSelect.value = localStorage.getItem("rememberedTeacher");
    passwordInput.value = localStorage.getItem("rememberedPassword");
    rememberMeCheckbox.checked = true;
  }

  // Show/hide password
  showPasswordCheckbox.addEventListener("change", () => {
    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
  });

  // Login logic
  loginBtn.addEventListener("click", () => {
    const selectedTeacher = teacherSelect.value;
    const enteredPassword = passwordInput.value;

    if (TEACHER_CREDENTIALS[selectedTeacher] === enteredPassword) {
      // Store if remember me checked
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberedTeacher", selectedTeacher);
        localStorage.setItem("rememberedPassword", enteredPassword);
      } else {
        localStorage.removeItem("rememberedTeacher");
        localStorage.removeItem("rememberedPassword");
      }

      // Show notice then go to home
      fetch("../notice.html")
        .then(res => res.text())
        .then(html => {
          const noticeWindow = window.open("", "Notice", "width=600,height=400");
          noticeWindow.document.write(html);
          const checkClosed = setInterval(() => {
            if (noticeWindow.closed) {
              clearInterval(checkClosed);
              window.location.href = "home.html";
            }
          }, 500);
        });
    } else {
      alert("Invalid credentials!");
    }
  });
});
