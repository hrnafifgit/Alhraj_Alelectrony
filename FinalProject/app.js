// كود JavaScript لتحسين الموقع وجعله تفاعلياً
document.addEventListener("DOMContentLoaded", function () {
  console.log("تم تحميل التطبيق بنجاح");

  // إدارة حالة تسجيل الدخول
  const user = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    name: localStorage.getItem("userName") || "مستخدم",
  };

  // تحديث واجهة المستخدم بناءً على حالة تسجيل الدخول
  updateUI();

  // إدارة النماذج وعمليات الإرسال
  initForms();

  // إدارة عربة التسوق
  initCart();

  // البحث والتصفية
  initSearch();

  // تحميل المنتجات عند فتح الصفحة الرئيسية
  if (isHomePage()) {
    loadSavedProducts();
  }

  // تحسينات عامة للواجهة
  initUIEnhancements();
});

// التحقق إذا كانت الصفحة الحالية هي الصفحة الرئيسية
function isHomePage() {
  return (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname.endsWith(".html") === false
  );
}

// تحديث واجهة المستخدم بناءً على حالة تسجيل الدخول
function updateUI() {
  const loginLink = document.querySelector('a[href="#"]:has(.fa-user)');
  if (loginLink) {
    if (user.isLoggedIn) {
      loginLink.innerHTML = `<i class="fas fa-user"></i> مرحباً، ${user.name}`;
      loginLink.href = "#profile";
    } else {
      loginLink.innerHTML = '<i class="fas fa-user"></i> تسجيل الدخول';
      loginLink.href = "#login";
    }
  }
}

// تهيئة النماذج وعمليات الإرسال
function initForms() {
  // نموذج إضافة منتج
  const addProductForm = document.getElementById("productForm");
  if (addProductForm) {
    addProductForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleAddProduct(this);
    });
  }

  // نموذج طلب منتج
  const orderForm = document.querySelector("form");
  if (orderForm && orderForm.querySelector("fieldset.fieldset1")) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleOrderProduct(this);
    });
  }
}

// معالجة إضافة منتج جديد
function handleAddProduct(form) {
  const submitButton = form.querySelector("#submitButton");
  const loadingSpinner = submitButton.querySelector(".loading-spinner");
  const btnText = submitButton.querySelector(".btn-text");

  // إظهار حالة التحميل
  btnText.textContent = "جاري الإضافة...";
  loadingSpinner.style.display = "inline-block";
  submitButton.disabled = true;

  // جمع بيانات النموذج
  const productData = {
    name: document.getElementById("nameProduct").value,
    type: document.getElementById("productType").value,
    condition: document.getElementById("productCondition").value,
    price: document.getElementById("productPrice").value,
    description: document.getElementById("productDescription").value,
    image: "Laptop-computer.webp", // استخدام صورة افتراضية
  };

  // معالجة صورة المنتج إذا تم رفعها
  const imageFile = document.getElementById("productImage").files[0];
  if (imageFile) {
    // تحويل الصورة إلى base64 لتخزينها
    convertImageToBase64(imageFile, function (base64Image) {
      productData.image = base64Image;
      completeProductAddition(
        productData,
        form,
        submitButton,
        loadingSpinner,
        btnText
      );
    });
  } else {
    completeProductAddition(
      productData,
      form,
      submitButton,
      loadingSpinner,
      btnText
    );
  }
}

// تحويل الصورة إلى تنسيق base64
function convertImageToBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

// إكمال عملية إضافة المنتج
function completeProductAddition(
  productData,
  form,
  submitButton,
  loadingSpinner,
  btnText
) {
  // التحقق من صحة البيانات
  if (
    !productData.name ||
    !productData.type ||
    !productData.condition ||
    !productData.price ||
    !productData.description
  ) {
    alert("يرجى ملء جميع الحقول المطلوبة");
    btnText.textContent = "إضافة المنتج";
    loadingSpinner.style.display = "none";
    submitButton.disabled = false;
    return;
  }

  // محاكاة عملية الإرسال
  setTimeout(() => {
    // حفظ المنتج في localStorage
    saveProduct(productData);

    // إظهار رسالة النجاح
    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "block";
    }

    // إعادة تعيين النموذج
    form.reset();

    // إعادة حالة الزر إلى الطبيعي
    btnText.textContent = "إضافة المنتج";
    loadingSpinner.style.display = "none";
    submitButton.disabled = false;

    // تخزين علامة أن هناك منتجات جديدة
    localStorage.setItem("newProductAdded", "true");

    // توجيه المستخدم بعد 3 ثوانٍ
    setTimeout(() => {
      window.location.href = "index.html"; // الصفحة الرئيسية
    }, 3000);
  }, 2000);
}

// حفظ المنتج في localStorage
function saveProduct(productData) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  productData.id = Date.now(); // معرف فريد للمنتج
  products.push(productData);
  localStorage.setItem("products", JSON.stringify(products));
}

// معالجة طلب منتج
function handleOrderProduct(form) {
  // جمع بيانات النموذج
  const customerName = document.getElementById("nameTXT").value;
  const phoneNumber = document.getElementById("NumMobil").value;
  const governorate = document.getElementById("productType").value;

  // الحصول على معلومات المنتج من localStorage
  const selectedProduct =
    JSON.parse(localStorage.getItem("selectedProduct")) || {};

  // استخدام البيانات المحفوظة أو القيم الافتراضية
  const productName = selectedProduct.name || "منتج غير معروف";
  const productPrice = selectedProduct.price || "السعر غير متوفر";

  // التحقق من صحة البيانات
  if (!customerName || !phoneNumber || !governorate) {
    alert("يرجى ملء جميع الحقول المطلوبة");
    return;
  }

  // حفظ طلب المنتج
  const orderData = {
    customerName,
    phoneNumber,
    governorate,
    productName,
    productPrice,
    date: new Date().toLocaleString("ar-YE"),
  };

  saveOrder(orderData);

  // إرسال الطلب عبر WhatsApp
  sendWhatsAppOrder(orderData);

  // إظهار رسالة النجاح
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.style.display = "block";
  }

  // توجيه المستخدم بعد 3 ثوانٍ
  setTimeout(() => {
    window.location.href = "index.html"; // الصفحة الرئيسية
  }, 3000);
}

// حفظ الطلب في localStorage
function saveOrder(orderData) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orderData.id = Date.now(); // معرف فريد للطلب
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));
}

// إرسال الطلب عبر WhatsApp
function sendWhatsAppOrder(orderData) {
  const phoneNumber = "713178831"; // رقم WhatsApp الخاص بك
  const message = `طلب منتج جديد%0A%0Aالاسم: ${orderData.customerName}%0Aرقم الهاتف: ${orderData.phoneNumber}%0Aالمحافظة: ${orderData.governorate}%0Aالمنتج: ${orderData.productName}%0Aالسعر: ${orderData.productPrice}%0Aالتاريخ: ${orderData.date}`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  // فتح رابط WhatsApp في نافذة جديدة
  window.open(whatsappURL, "_blank");
}

// تهيئة عربة التسوق
function initCart() {
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    updateCartCount();

    // إضافة منتج إلى السلة
    const addToCartButtons = document.querySelectorAll(".btn");
    addToCartButtons.forEach((button) => {
      if (button.textContent.includes("طلب المنتج")) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          addToCart(this);
        });
      }
    });
  }
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cartItems.length;
  }
}

// إضافة منتج إلى السلة
function addToCart(button) {
  const productCard = button.closest(".product-card");
  const productName = productCard.querySelector(".product-title").textContent;
  const productPrice = productCard.querySelector(".price span").textContent;
  const productImage = productCard.querySelector(".img").src;

  const product = {
    id: Date.now(),
    name: productName,
    price: productPrice,
    image: productImage,
  };

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push(product);
  localStorage.setItem("cart", JSON.stringify(cartItems));

  updateCartCount();

  // إظهار تأكيد الإضافة
  alert(`تم إضافة ${productName} إلى سلة التسوق`);
}

// تهيئة وظائف البحث والتصفية
function initSearch() {
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      filterProducts(this.value);
    });
  }

  const categorySelect = document.getElementById("select");
  if (categorySelect) {
    categorySelect.addEventListener("change", function () {
      filterByCategory(this.value);
    });
  }
}

// تصفية المنتجات حسب البحث
function filterProducts(searchTerm) {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-title")
      .textContent.toLowerCase();
    const productModel = card
      .querySelector(".product-model")
      .textContent.toLowerCase();

    if (
      productName.includes(searchTerm.toLowerCase()) ||
      productModel.includes(searchTerm.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// تصفية المنتجات حسب الفئة
function filterByCategory(category) {
  const productCards = document.querySelectorAll(".product-card");
  const sections = document.querySelectorAll("section");

  if (category === " " || category === "") {
    // عرض جميع المنتجات
    productCards.forEach((card) => {
      card.style.display = "block";
    });
    sections.forEach((section) => {
      section.style.display = "block";
    });
  } else {
    // إخفاء جميع المنتجات أولاً
    productCards.forEach((card) => {
      card.style.display = "none";
    });

    // ثم عرض المنتجات التي تنتمي للفئة المحددة
    const targetSection = document.getElementById(category);
    if (targetSection) {
      targetSection.style.display = "block";
      const sectionProducts = targetSection.querySelectorAll(".product-card");
      sectionProducts.forEach((card) => {
        card.style.display = "block";
      });
    }

    // إخفاء الأقسام الأخرى
    sections.forEach((section) => {
      if (section.id !== category) {
        section.style.display = "none";
      }
    });
  }
}

// تحسينات عامة للواجهة
function initUIEnhancements() {
  // تحسين التنقل السلس
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#" && targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// تحميل المنتجات المحفوظة في الصفحة الرئيسية
// تحميل المنتجات المحفوظة في الصفحة الرئيسية
function loadSavedProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length > 0) {
    products.forEach((product) => {
      // تحديد القسم المناسب بناءً على نوع المنتج
      let targetSectionId = "d"; // افتراضيًا: الأجهزة الإلكترونية

      if (product.type === "smartphones") {
        targetSectionId = "phone"; // الهواتف النقالة
      } else if (product.type === "laptops") {
        targetSectionId = "computer"; // الكمبيوترات
      } else if (product.type === "accessories") {
        targetSectionId = "d"; // الإكسسوارات (في قسم الأجهزة الإلكترونية)
      }

      // إضافة المنتج إلى القسم المناسب
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        const productsGrid = targetSection.querySelector(".products-grid");

        // التحقق إذا كان المنتج معروضاً بالفعل
        const existingProduct = document.querySelector(
          `[data-product-id="${product.id}"]`
        );
        if (!existingProduct && productsGrid) {
          const productCard = createProductCard(product);
          productsGrid.appendChild(productCard);
        }
      }
    });
  }
}
// إنشاء بطاقة منتج جديدة
// إنشاء بطاقة منتج جديدة
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-product-id", product.id);
  card.innerHTML = `
        <div class="img-container">
            <img class="img" src="${product.image}" alt="${product.name}" onerror="this.src='Laptop-computer.webp'" />
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-model">${product.description}</p>
            <p class="price">السعر: <span>${product.price} RY</span></p>
            <div class="product-meta">
                <span><i class="fas fa-map-marker-alt"></i> موقع البائع</span>
                <span><i class="far fa-clock"></i> منذ قليل</span>
            </div>
            <div class="btn-container">
                <button class="btn">طلب المنتج</button>
            </div>
        </div>
    `;

  // إضافة حدث النقر على الزر
  const button = card.querySelector(".btn");
  button.addEventListener("click", function (e) {
    e.preventDefault();
    // حفظ بيانات المنتج للانتقال إلى صفحة الطلب
    localStorage.setItem(
      "selectedProduct",
      JSON.stringify({
        name: product.name,
        price: product.price,
        id: product.id,
        type: product.type,
      })
    );
    window.location.href = "order.html";
  });

  return card;
}
// وظيفة لفحص إذا كانت هناك منتجات جديدة وإضافتها
function checkForNewProducts() {
  if (localStorage.getItem("newProductAdded") === "true") {
    loadSavedProducts();
    localStorage.removeItem("newProductAdded");
  }
}

// عند العودة إلى الصفحة الرئيسية، تحميل المنتجات الجديدة
window.addEventListener("pageshow", function (event) {
  if (
    event.persisted ||
    (window.performance && window.performance.navigation.type === 2)
  ) {
    // تم العودة إلى الصفحة عبر زر الرجوع في المتصفح
    checkForNewProducts();
  }
});

// أيضا تحميل المنتجات عند تحميل الصفحة
window.addEventListener("load", function () {
  if (isHomePage()) {
    checkForNewProducts();
  }
});
