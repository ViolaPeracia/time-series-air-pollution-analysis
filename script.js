/**
 * INFO3020 Air Pollution Analysis Roadmap - Interactive Application Logic
 * Technology: Vanilla JavaScript (ES6+)
 * Compatibility: GitHub Pages (No server/build dependencies)
 */

(function () {
  "use strict";

  // =========================================================================
  // 1. Theme Management (Dark / Light Mode)
  // =========================================================================
  const THEME_STORAGE_KEY = "info3020_theme";
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const htmlElement = document.documentElement;

  const sunIconSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIconSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" ? sunIconSVG : moonIconSVG;
      themeToggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
      );
    }
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
    });
  }

  // =========================================================================
  // 2. Scroll Progress Bar
  // =========================================================================
  const scrollProgressBar = document.getElementById("scrollProgressBar");

  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = `${scrollPercent}%`;
    scrollProgressBar.setAttribute("aria-valuenow", Math.round(scrollPercent));
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  // =========================================================================
  // 3. Active Navigation (IntersectionObserver)
  // =========================================================================
  const navSections = [
    "overview",
    "pipeline",
    "roadmap",
    "data-plan",
    "analysis",
    "modeling",
    "ethics",
    "repository"
  ];

  const desktopNavLinks = document.querySelectorAll("#desktopNav .nav-link");
  const mobileNavLinks = document.querySelectorAll("#mobileDrawer .mobile-nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        setActiveNavLink(id);
      }
    });
  }, observerOptions);

  navSections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  function setActiveNavLink(id) {
    desktopNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${id}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    mobileNavLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${id}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // =========================================================================
  // 4. Mobile Menu Drawer
  // =========================================================================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");

  function toggleMobileMenu(forceOpen) {
    if (!mobileDrawer) return;
    const shouldOpen = forceOpen !== undefined ? forceOpen : !mobileDrawer.classList.contains("is-open");
    if (shouldOpen) {
      mobileDrawer.removeAttribute("hidden");
      mobileDrawer.classList.add("is-open");
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    } else {
      mobileDrawer.classList.remove("is-open");
      mobileDrawer.setAttribute("hidden", "");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => toggleMobileMenu());
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });

  // =========================================================================
  // 5. Research Pipeline Expand / Collapse
  // =========================================================================
  const pipelineStages = document.querySelectorAll(".pipeline-stage");

  pipelineStages.forEach((stage) => {
    const header = stage.querySelector(".pipeline-stage-header");
    if (!header) return;

    function toggleStage() {
      const isActive = stage.classList.contains("is-active");
      stage.classList.toggle("is-active", !isActive);
      header.setAttribute("aria-expanded", !isActive ? "true" : "false");
    }

    header.addEventListener("click", toggleStage);
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleStage();
      }
    });
  });

  // =========================================================================
  // 6. 15-Week Roadmap Timeline Interactions
  // =========================================================================
  const timelineCards = document.querySelectorAll(".timeline-card");
  const filterButtons = document.querySelectorAll(".roadmap-filter-buttons .filter-btn");
  const expandAllWeeksBtn = document.getElementById("expandAllWeeksBtn");
  const collapseAllWeeksBtn = document.getElementById("collapseAllWeeksBtn");

  // Toggle single card
  timelineCards.forEach((card) => {
    const header = card.querySelector(".timeline-card-header");
    if (!header) return;

    function toggleCard() {
      const isExpanded = card.classList.contains("is-expanded");
      card.classList.toggle("is-expanded", !isExpanded);
      header.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
    }

    header.addEventListener("click", toggleCard);
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCard();
      }
    });
  });

  // Filter roadmap weeks by phase
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      timelineCards.forEach((card) => {
        const cardPhase = card.getAttribute("data-phase");
        if (filter === "all" || cardPhase === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Expand / Collapse all weeks
  if (expandAllWeeksBtn) {
    expandAllWeeksBtn.addEventListener("click", () => {
      timelineCards.forEach((card) => {
        if (card.style.display !== "none") {
          card.classList.add("is-expanded");
          const header = card.querySelector(".timeline-card-header");
          if (header) header.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  if (collapseAllWeeksBtn) {
    collapseAllWeeksBtn.addEventListener("click", () => {
      timelineCards.forEach((card) => {
        card.classList.remove("is-expanded");
        const header = card.querySelector(".timeline-card-header");
        if (header) header.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================================================================
  // 7. Interactive Cleaning Checklist
  // =========================================================================
  const CHECKLIST_STORAGE_KEY = "info3020_cleaning_checklist";
  const checklistItems = document.querySelectorAll(".checklist-item");
  const checklistCounter = document.getElementById("checklistCounter");

  function getSavedChecklist() {
    try {
      return JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveChecklistState(state) {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(state));
  }

  function updateChecklistCounter() {
    const total = checklistItems.length;
    let checkedCount = 0;
    checklistItems.forEach((item) => {
      const cb = item.querySelector(".checklist-checkbox");
      if (cb && cb.checked) {
        checkedCount++;
        item.classList.add("is-completed");
      } else {
        item.classList.remove("is-completed");
      }
    });

    if (checklistCounter) {
      checklistCounter.textContent = `${checkedCount}/${total} hoàn thành`;
      if (checkedCount === total) {
        checklistCounter.className = "badge badge-emerald";
      } else if (checkedCount > 0) {
        checklistCounter.className = "badge badge-cyan";
      } else {
        checklistCounter.className = "badge badge-subtle";
      }
    }
  }

  // Initialize checklist state
  const savedState = getSavedChecklist();
  checklistItems.forEach((item) => {
    const cb = item.querySelector(".checklist-checkbox");
    if (!cb) return;
    const id = cb.getAttribute("data-id");
    if (savedState[id]) {
      cb.checked = true;
    }

    cb.addEventListener("change", () => {
      savedState[id] = cb.checked;
      saveChecklistState(savedState);
      updateChecklistCounter();
    });
  });
  updateChecklistCounter();

  // =========================================================================
  // 8. Copy Repository Structure
  // =========================================================================
  const copyRepoStructureBtn = document.getElementById("copyRepoStructureBtn");
  const copyBtnText = document.getElementById("copyBtnText");
  const repoStructureCode = document.getElementById("repoStructureCode");

  if (copyRepoStructureBtn && repoStructureCode) {
    copyRepoStructureBtn.addEventListener("click", () => {
      const textToCopy = repoStructureCode.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        if (copyBtnText) copyBtnText.textContent = "Copied! ✓";
        copyRepoStructureBtn.style.borderColor = "var(--accent-emerald)";
        copyRepoStructureBtn.style.color = "var(--accent-emerald)";

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = "Copy Tree";
          copyRepoStructureBtn.style.borderColor = "";
          copyRepoStructureBtn.style.color = "";
        }, 2000);
      }).catch(() => {
        if (copyBtnText) copyBtnText.textContent = "Copy failed";
      });
    });
  }

  // =========================================================================
  // 9. Client-Side Search Engine
  // =========================================================================
  const searchOpenBtn = document.getElementById("searchOpenBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchCloseBtn = document.getElementById("searchCloseBtn");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchTagButtons = document.querySelectorAll(".search-hints .search-tag");

  // Search Index Dictionary
  const searchIndex = [
    {
      title: "W01 — Khởi động Dự án & Thiết lập Môi trường CRISP-DM",
      category: "Roadmap",
      snippet: "Thiết lập cấu trúc thư mục, gitignore, requirements.txt, dữ liệu thô bất biến, chuẩn CRISP-DM.",
      targetId: "week-body-1",
      weekNum: 1
    },
    {
      title: "W02 — Thu thập Dữ liệu Đa nguồn (Multi-source Data Collection)",
      category: "Roadmap",
      snippet: "OpenAQ REST API v3, Open-Meteo Historical API, trạm US Embassy BAM 1020, data_dictionary.md, lưu trữ Parquet.",
      targetId: "week-body-2",
      weekNum: 2
    },
    {
      title: "W03 — Kiểm toán Chất lượng Dữ liệu (Data Quality Audit)",
      category: "Roadmap",
      snippet: "6 Chiều chất lượng quốc tế, phát hiện missing ngụy trang (-999), cơ chế Rubin (MCAR, MAR, MNAR).",
      targetId: "week-body-3",
      weekNum: 3
    },
    {
      title: "W04 — Thực hành Làm sạch & Lập Cleaning Log",
      category: "Roadmap",
      snippet: "Lọc logic PM2.5 <= PM10, xử lý kẹt cảm biến, reindex chuỗi thời gian lưới 1 giờ, cleaning_log.md.",
      targetId: "week-body-4",
      weekNum: 4
    },
    {
      title: "W05 — Biến đổi, Tích hợp & Đóng gói Pipeline",
      category: "Roadmap",
      snippet: "Merge timestamp không gây Row Explosion, RobustScaler, log-transform, Scikit-Learn Pipeline, xuất Parquet.",
      targetId: "week-body-5",
      weekNum: 5
    },
    {
      title: "W06 — Xác suất & Thống kê Mô tả (Descriptive Statistics)",
      category: "Roadmap",
      snippet: "4 Họ thống kê mô tả, chứng minh phân phối lệch phải dùng Median & IQR, kiểm tra Anscombe Quartet.",
      targetId: "week-body-6",
      weekNum: 6
    },
    {
      title: "W07 — Thiết kế Trực quan hóa Dữ liệu & Kể chuyện SCQA",
      category: "Roadmap",
      snippet: "Nguyên tắc Tufte Data-Ink, Cleveland visual hierarchy, vẽ 7 biểu đồ Explanatory, tiêu đề là câu kết luận.",
      targetId: "week-body-7",
      weekNum: 7
    },
    {
      title: "W08 — Báo cáo & Đánh giá Giữa kỳ (Midterm Milestone)",
      category: "Milestone",
      snippet: "Báo cáo EDA 8-10 trang PDF, thuyết trình 7 phút + 3 phút viva phản biện theo 5 tiêu chí rubric.",
      targetId: "week-body-8",
      weekNum: 8
    },
    {
      title: "W09 — Suy luận Thống kê & Kiểm định Giả thuyết",
      category: "Roadmap",
      snippet: "Kiểm định phi tham số Mann-Whitney U mùa đông vs hè, ngày thường vs cuối tuần, Effect size r_rb, 95% Bootstrap CI.",
      targetId: "week-body-9",
      weekNum: 9
    },
    {
      title: "W10 — Phân tích Hồi quy & Chẩn đoán Giả định OLS",
      category: "Roadmap",
      snippet: "Chẩn đoán 4 giả định LINE, đa cộng tuyến VIF, Cook's distance, điều hòa Ridge/Lasso, 3 nghĩa vụ diễn giải beta.",
      targetId: "week-body-10",
      weekNum: 10
    },
    {
      title: "W11 — Phân loại Cảnh báo Ô nhiễm & Kỹ nghệ Đặc trưng",
      category: "Roadmap",
      snippet: "Ngưỡng PM2.5 >= 50, bẫy Accuracy, threshold tuning 0.30, PR-AUC & Recall, kiểm toán 4 dạng rò rỉ dữ liệu.",
      targetId: "week-body-11",
      weekNum: 11
    },
    {
      title: "W12 — Đạo đức Dữ liệu, Định kiến & Nộp Project Charter",
      category: "Roadmap",
      snippet: "Giải trình không dùng Spark cho dữ liệu nhỏ, kiểm toán 4 loại bias, Datasheet for Dataset, Model Card 1 trang.",
      targetId: "week-body-12",
      weekNum: 12
    },
    {
      title: "W13 — Cố vấn Đồ án & Tinh chỉnh Toàn diện (Mentoring)",
      category: "Roadmap",
      snippet: "Làm việc cùng ThS. Phạm Ngọc Đông, giải quyết điểm nghi vấn, refactoring module python trong src/.",
      targetId: "week-body-13",
      weekNum: 13
    },
    {
      title: "W14 — Kể chuyện Dữ liệu & Soạn thảo Báo cáo Cuối kỳ",
      category: "Roadmap",
      snippet: "Hoàn thiện báo cáo đồ án final_report.pdf theo cấu trúc SCQA, thiết kế slide 12-15 trang, Q&A prep document.",
      targetId: "week-body-14",
      weekNum: 14
    },
    {
      title: "W15 — Final Defense (Bảo vệ Đồ án Tốt nghiệp Môn học)",
      category: "Milestone",
      snippet: "Thuyết trình bảo vệ trước hội đồng, oral viva phản biện từng dòng code, kiểm chứng tính tái lập repo.",
      targetId: "week-body-15",
      weekNum: 15
    },
    {
      title: "Main Research Question & 4 Sub-Questions",
      category: "Overview",
      snippet: "Biến động quy luật chu kỳ thời gian PM2.5, liên hệ khí tượng bề mặt và xây dựng mô hình cảnh báo sớm.",
      targetId: "overview"
    },
    {
      title: "Sequential Research Pipeline (8 Giai đoạn)",
      category: "Pipeline",
      snippet: "Data Collection, Audit & Cleaning, Integration, EDA, Statistical Inference, Regression/Classification, Ethics, Defense.",
      targetId: "pipeline"
    },
    {
      title: "Data Plan & 10 Biến Định lượng",
      category: "Data Plan",
      snippet: "timestamp, station_id, pm25, pm10, temperature, relative_humidity, wind_speed, wind_direction, precipitation, surface_pressure.",
      targetId: "data-plan"
    },
    {
      title: "LINE Checklist trong Hồi quy Tuyến tính",
      category: "Modeling",
      snippet: "Linearity (Residuals vs Fitted), Independence (Durbin-Watson), Normality (Q-Q plot), Equal Variance (Breusch-Pagan).",
      targetId: "modeling"
    },
    {
      title: "4 Dạng Rò rỉ Dữ liệu (Data Leakage Prevention)",
      category: "Modeling",
      snippet: "Temporal Leakage, Target Leakage, Train-Test Contamination, Group Leakage.",
      targetId: "modeling"
    },
    {
      title: "Bộ 7 Biểu đồ Kế hoạch Trực quan (FIG-01 đến FIG-07)",
      category: "Visualizations",
      snippet: "Line chart rolling mean, histogram KDE, monthly boxplot, 2D heatmap, wind scatter LOWESS, correlation matrix, bar chart.",
      targetId: "visualizations"
    },
    {
      title: "Sổ tay Định kiến (Sensor, Spatial, Survivorship Bias)",
      category: "Ethics",
      snippet: "Độ ẩm cao gây tán xạ quang học, thiếu trạm đo ngoại ô công nghiệp, mất dữ liệu trong bão cực đoan, Missing != Zero.",
      targetId: "ethics"
    },
    {
      title: "Cấu trúc Repository Chuẩn mực & Lệnh Copy",
      category: "Repository",
      snippet: "Cây thư mục data/raw, interim, processed, docs, notebooks, src, figures, reports, requirements.txt.",
      targetId: "repository"
    }
  ];

  function openSearchModal() {
    if (!searchOverlay) return;
    searchOverlay.removeAttribute("hidden");
    searchOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
    renderSearchResults("");
  }

  function closeSearchModal() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove("is-active");
    searchOverlay.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      searchResults.innerHTML = `
        <div class="search-empty">
          Nhập từ khóa tìm kiếm (e.g. <code>PM2.5</code>, <code>Mann-Whitney</code>, <code>LINE</code>, <code>Week 10</code>, <code>OpenAQ</code>, <code>VIF</code>) để xem kết quả.
        </div>`;
      return;
    }

    const normQuery = normalizeText(cleanQuery);
    const matches = searchIndex.filter((item) => {
      const matchTitle = normalizeText(item.title).includes(normQuery);
      const matchSnippet = normalizeText(item.snippet).includes(normQuery);
      const matchCategory = normalizeText(item.category).includes(normQuery);
      return matchTitle || matchSnippet || matchCategory;
    });

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div class="search-empty">
          Không tìm thấy nội dung phù hợp với <strong>"${cleanQuery}"</strong>. Hãy thử tìm <em>PM2.5</em>, <em>Pipeline</em>, <em>Bias</em> hoặc <em>Week</em>.
        </div>`;
      return;
    }

    searchResults.innerHTML = matches
      .map((item, idx) => `
        <div class="search-result-item" data-target="${item.targetId}" data-week="${item.weekNum || ""}" role="button" tabindex="0">
          <div class="search-result-title">
            <span>${item.title}</span>
            <span class="search-result-category">${item.category}</span>
          </div>
          <div class="search-result-snippet">${item.snippet}</div>
        </div>
      `)
      .join("");

    // Attach click events to search result items
    searchResults.querySelectorAll(".search-result-item").forEach((item) => {
      item.addEventListener("click", () => {
        const targetId = item.getAttribute("data-target");
        const weekNum = item.getAttribute("data-week");
        closeSearchModal();

        if (weekNum) {
          // Ensure week card is expanded and visible
          const card = document.querySelector(`.timeline-card[data-week="${weekNum}"]`);
          if (card) {
            card.style.display = "block";
            card.classList.add("is-expanded");
            const header = card.querySelector(".timeline-card-header");
            if (header) header.setAttribute("aria-expanded", "true");
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.style.outline = "2px solid var(--accent-cyan)";
            setTimeout(() => {
              card.style.outline = "";
            }, 2500);
            return;
          }
        }

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  if (searchOpenBtn) {
    searchOpenBtn.addEventListener("click", openSearchModal);
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener("click", closeSearchModal);
  }

  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        closeSearchModal();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderSearchResults(e.target.value);
    });
  }

  // Quick search tag buttons
  searchTagButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const query = btn.getAttribute("data-query");
      if (searchInput) {
        searchInput.value = query;
        renderSearchResults(query);
      }
    });
  });

  // Keyboard shortcut Ctrl+K / Cmd+K and Escape
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (searchOverlay && searchOverlay.classList.contains("is-active")) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    } else if (e.key === "Escape") {
      if (searchOverlay && searchOverlay.classList.contains("is-active")) {
        closeSearchModal();
      }
      if (mobileDrawer && mobileDrawer.classList.contains("is-open")) {
        toggleMobileMenu(false);
      }
    }
  });

  // Smooth anchor scrolling behavior enhancement
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without jumping
        history.pushState(null, null, href);
      }
    });
  });

})();
