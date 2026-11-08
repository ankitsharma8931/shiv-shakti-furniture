"use strict";

/* =========================================
   SHIV SHAKTI FURNITURE
   SUPABASE CONNECTED SCRIPT
   Updated Version
========================================= */

const client = window.supabaseClient;

if (!client) {
  throw new Error("Supabase connect nahi hua. supabase.js check karein.");
}

/* =========================================
   1. PRODUCT LIST
========================================= */

const productTypes = [
  {category:"बेड",prefix:"bed",names:["लकड़ी का बेड","डबल बेड","डिजाइनर बेड","शीशम लकड़ी का बेड","मॉडर्न बेड","किंग साइज बेड","क्वीन साइज बेड","स्टोरेज बेड","बॉक्स बेड","डबल बॉक्स बेड","सिंगल बेड","बच्चों का बेड","डिजाइनर डबल बेड","प्रीमियम बेड","मजबूत लकड़ी का बेड","सिंपल बेड","नक्काशीदार बेड","मॉडर्न डबल बेड","कस्टम डिजाइन बेड","स्पेशल बेड"]},
  {category:"सोफा",prefix:"sofa",names:["सोफा सेट","तीन सीटर सोफा","दो सीटर सोफा","सिंगल सोफा","लकड़ी का सोफा","डिजाइनर सोफा","मॉडर्न सोफा","L शेप सोफा","फैमिली सोफा","प्रीमियम सोफा","क्लासिक सोफा","सोफा चेयर","वुडन सोफा","नक्काशीदार सोफा","सिंपल सोफा","कॉर्नर सोफा","मॉडर्न सोफा सेट","कस्टम सोफा","लक्जरी सोफा","स्पेशल सोफा"]},
  {category:"कुर्सी",prefix:"chair",names:["लकड़ी की कुर्सी","डिजाइनर कुर्सी","डाइनिंग कुर्सी","ऑफिस कुर्सी","मजबूत कुर्सी","शीशम कुर्सी","सिंपल कुर्सी","हाई बैक कुर्सी","आर्मरेस्ट कुर्सी","मॉडर्न कुर्सी","नक्काशीदार कुर्सी","फोल्डिंग कुर्सी","प्रीमियम कुर्सी","डाइनिंग चेयर","लकड़ी की आर्म चेयर","कस्टम कुर्सी","स्टडी चेयर","गेस्ट चेयर","क्लासिक कुर्सी","स्पेशल कुर्सी"]},
  {category:"टेबल",prefix:"table",names:["लकड़ी की टेबल","स्टडी टेबल","ऑफिस टेबल","कंप्यूटर टेबल","सेंटर टेबल","कॉफी टेबल","डिजाइनर टेबल","मॉडर्न टेबल","शीशम टेबल","वर्क टेबल","सिंपल टेबल","प्रीमियम टेबल","छोटी टेबल","बड़ी टेबल","साइड टेबल","नक्काशीदार टेबल","कस्टम टेबल","मजबूत टेबल","ड्रॉअर वाली टेबल","स्पेशल टेबल"]},
  {category:"अलमारी",prefix:"almari",names:["लकड़ी की अलमारी","डबल डोर अलमारी","डिजाइनर अलमारी","शीशम अलमारी","कपड़ों की अलमारी","मॉडर्न अलमारी","तीन दरवाजे की अलमारी","प्रीमियम अलमारी","सिंपल अलमारी","बड़ी अलमारी","छोटी अलमारी","ड्रॉअर वाली अलमारी","नक्काशीदार अलमारी","स्टोरेज अलमारी","कस्टम अलमारी","मजबूत अलमारी","मॉडर्न डबल अलमारी","क्लासिक अलमारी","फैमिली अलमारी","स्पेशल अलमारी"]},
  {category:"डाइनिंग टेबल",prefix:"dining-table",names:["चार सीटर डाइनिंग टेबल","छह सीटर डाइनिंग टेबल","आठ सीटर डाइनिंग टेबल","लकड़ी की डाइनिंग टेबल","डिजाइनर डाइनिंग टेबल","शीशम डाइनिंग टेबल","मॉडर्न डाइनिंग टेबल","ग्लास टॉप डाइनिंग टेबल","सिंपल डाइनिंग टेबल","प्रीमियम डाइनिंग टेबल","गोल डाइनिंग टेबल","आयताकार डाइनिंग टेबल","डाइनिंग टेबल सेट","क्लासिक डाइनिंग टेबल","मजबूत डाइनिंग टेबल","छोटी डाइनिंग टेबल","बड़ी डाइनिंग टेबल","कस्टम डाइनिंग टेबल","फैमिली डाइनिंग टेबल","स्पेशल डाइनिंग टेबल"]},
  {category:"दरवाजा",prefix:"door",names:["लकड़ी का दरवाजा","मुख्य दरवाजा","डिजाइनर दरवाजा","शीशम दरवाजा","मॉडर्न दरवाजा","नक्काशीदार दरवाजा","सिंपल दरवाजा","डबल दरवाजा","पैनल वाला दरवाजा","प्रीमियम दरवाजा","कमरे का दरवाजा","मजबूत दरवाजा","क्लासिक दरवाजा","सजावटी दरवाजा","कस्टम दरवाजा","फ्रंट डोर","वुडन डोर","मॉडर्न डबल डोर","नया डिजाइन दरवाजा","स्पेशल दरवाजा"]},
  {category:"खिड़की",prefix:"window",names:["लकड़ी की खिड़की","एल्युमिनियम खिड़की","स्लाइडिंग खिड़की","डिजाइनर खिड़की","मॉडर्न खिड़की","शीशम खिड़की","सिंपल खिड़की","डबल पैनल खिड़की","ग्लास खिड़की","प्रीमियम खिड़की","छोटी खिड़की","बड़ी खिड़की","मजबूत खिड़की","क्लासिक खिड़की","कस्टम खिड़की","स्लाइडिंग विंडो","वुडन विंडो","मॉडर्न विंडो","घर की खिड़की","स्पेशल खिड़की"]},
  {category:"एल्युमिनियम",prefix:"aluminium",names:["एल्युमिनियम फ्रेम","एल्युमिनियम दरवाजा","एल्युमिनियम खिड़की","स्लाइडिंग विंडो","ग्लास फिटिंग","एल्युमिनियम पार्टिशन","शॉप फ्रंट","ऑफिस पार्टिशन","एल्युमिनियम फ्रेम सेट","मॉडर्न विंडो","ग्लास डोर","एल्युमिनियम डोर","कस्टम फ्रेम","स्लाइडिंग डोर","बालकनी विंडो","एल्युमिनियम वर्क","ग्लास खिड़की","मॉडर्न फ्रेम","शॉप विंडो","स्पेशल एल्युमिनियम वर्क"]},
  {category:"अन्य",prefix:"custom",names:["कस्टम फर्नीचर","जूता रैक","टीवी यूनिट","बुक शेल्फ","ड्रेसिंग टेबल","साइड कैबिनेट","वुडन रैक","स्टोरेज रैक","पूजा मंदिर","लकड़ी का स्टूल","कपबोर्ड","ड्रॉअर कैबिनेट","कस्टम शेल्फ","वुडन बेंच","फर्नीचर सेट","छोटा कैबिनेट","मॉडर्न फर्नीचर","डिजाइनर रैक","घर का फर्नीचर","स्पेशल कस्टम आइटम"]}
];

const products = productTypes.flatMap(type =>
  type.names.map((name, index) => ({
    name: `${name} ${String(index + 1).padStart(2, "0")}`,
    category: type.category,
    image: `${type.prefix}-${String(index + 1).padStart(2, "0")}.jpeg`
  }))
);

/* =========================================
   2. HELPERS
========================================= */

const $ = id => document.getElementById(id);

function required(id) {
  const el = $(id);
  if (!el) throw new Error(`HTML element #${id} नहीं मिला।`);
  return el;
}

function money(value) {
  return "₹" + (Number(value) || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2
  });
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[c]);
}

function balance(order) {
  return Math.max(0, Number(order.total || 0) - Number(order.paid || 0));
}

function getStaff() {
  return window.staffUser || null;
}

function isOwner() {
  return getStaff()?.role === "owner";
}

function can(permission) {
  const staff = getStaff();
  if (!staff) return false;
  if (staff.role === "owner") return true;
  return staff.permissions?.[permission] === true;
}

function currentUserId() {
  return getStaff()?.id || null;
}

function showError(error, prefix = "समस्या") {
  console.error(prefix, error);

  const message = error?.message || String(error);

  alert(`${prefix}:\n${message}`);
}

/* =========================================
   3. PRODUCT DISPLAY
========================================= */

let selectedCategory = "सभी";

function renderCategories() {
  const box = $("categories");
  if (!box) return;

  box.innerHTML = "";

  ["सभी", ...productTypes.map(x => x.category)].forEach(category => {
    const button = document.createElement("button");

    button.className = "category-btn" +
      (category === selectedCategory ? " active" : "");

    button.textContent = category;

    button.addEventListener("click", () => {
      selectedCategory = category;
      renderCategories();
      renderProducts();
    });

    box.appendChild(button);
  });
}

function openImage(src, alt) {
  let lightbox = $("productLightbox");

  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "productLightbox";

    lightbox.style.cssText =
      "display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;align-items:center;justify-content:center;padding:20px;";

    lightbox.innerHTML = `
      <button type="button" id="closeProductLightbox"
        style="position:absolute;top:15px;right:20px;font-size:30px;background:none;color:white;border:0;cursor:pointer">×</button>

      <img id="lightboxImage" alt=""
        style="max-width:95%;max-height:85vh;object-fit:contain;border-radius:10px">
    `;

    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", e => {
      if (
        e.target === lightbox ||
        e.target.id === "closeProductLightbox"
      ) {
        lightbox.style.display = "none";
      }
    });
  }

  $("lightboxImage").src = src;
  $("lightboxImage").alt = alt;
  lightbox.style.display = "flex";
}

function renderProducts() {
  const grid = $("productGrid");
  if (!grid) return;

  const q = ($("search")?.value || "").trim().toLowerCase();

  const list = products.filter(p =>
    (selectedCategory === "सभी" || p.category === selectedCategory) &&
    `${p.name} ${p.category}`.toLowerCase().includes(q)
  );

  grid.innerHTML = "";

  if ($("noResults")) {
    $("noResults").hidden = list.length > 0;
  }

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = "images/" + p.image;
    img.alt = p.name;
    img.loading = "lazy";
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      if (img.getAttribute("src")) {
        openImage(img.src, p.name);
      }
    });

    img.onerror = () => {
      img.removeAttribute("src");
      img.alt = p.name + " — फोटो उपलब्ध नहीं";
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const title = document.createElement("h3");
    title.textContent = p.name;

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = p.category;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = "कीमत के लिए संपर्क करें";

    const orderButton = document.createElement("button");
    orderButton.className = "btn";
    orderButton.textContent = "ऑर्डर बुक करें";

    orderButton.addEventListener("click", () => openOrder(p.name));

    const whatsapp = document.createElement("a");
    whatsapp.className = "btn btn-outline";
    whatsapp.textContent = "WhatsApp पर पूछें";
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener";

    whatsapp.href =
      "https://wa.me/916207486280?text=" +
      encodeURIComponent(
        `नमस्ते, मुझे ${p.name} के बारे में जानकारी और कीमत चाहिए।`
      );

    info.append(title, category, price, orderButton, whatsapp);
    card.append(img, info);
    grid.appendChild(card);
  });
}

/* =========================================
   4. MODALS
========================================= */

function openModal(id) {
  const el = $(id);
  if (!el) return;

  el.classList.add("show");
  el.setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const el = $(id);
  if (!el) return;

  el.classList.remove("show");
  el.setAttribute("aria-hidden", "true");
}

/* =========================================
   5. ORDER DATA
========================================= */

let orders = [];
let dataReady = false;
let initialized = false;

const META_PREFIX = "SSMETA:";

function encodeNotes(note, meta) {
  return META_PREFIX + JSON.stringify({
    note: note || "",
    design: meta.design || "",
    measurements: meta.measurements || "",
    deliveryDate: meta.deliveryDate || ""
  });
}

function decodeNotes(value) {
  if (!value) {
    return {
      note: "",
      design: "",
      measurements: "",
      deliveryDate: ""
    };
  }

  if (value.startsWith(META_PREFIX)) {
    try {
      return JSON.parse(value.slice(META_PREFIX.length));
    } catch (e) {
      console.warn("Order notes parse error", e);
    }
  }

  return {
    note: value,
    design: "",
    measurements: "",
    deliveryDate: ""
  };
}

function normalizeOrder(row, customer, item, paymentRows) {
  const meta = decodeNotes(row.notes);

  const payments = (paymentRows || [])
    .filter(p => !p.is_voided)
    .map(p => ({
      id: p.id,
      date: p.payment_date,
      amount: Number(p.amount),
      method: p.payment_method,
      note: p.notes || ""
    }));

  const paid = payments.reduce((sum, p) => sum + p.amount, 0);

  return {
    id: String(row.id),
    orderNumber: row.order_number,
    name: customer?.full_name || "",
    phone: customer?.phone || "",
    address: customer?.address || "",
    item: item?.product_name || "",
    design: meta.design || "",
    quantity: Number(item?.quantity || 1),
    measurements: meta.measurements || "",
    orderDate: row.created_at?.slice(0, 10) || today(),
    deliveryDate: meta.deliveryDate || "",
    total: Number(row.total_amount || 0),
    paid,
    note: meta.note || "",
    status: row.order_status,
    customerId: row.customer_id,
    itemId: item?.id || null,
    payments
  };
}

/* =========================================
   6. LOAD ORDERS
========================================= */

async function loadOrders() {
  if (!getStaff()) {
    dataReady = false;
    return;
  }

  dataReady = false;

  const { data: orderRows, error: orderError } = await client
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (orderError) throw orderError;

  if (!orderRows || orderRows.length === 0) {
    orders = [];
    dataReady = true;
    renderOrders();
    renderStats();
    return;
  }

  const orderIds = orderRows.map(row => row.id);
  const customerIds = [...new Set(orderRows.map(row => row.customer_id))];

  const [customerResult, itemResult] = await Promise.all([
    client
      .from("customers")
      .select("*")
      .in("id", customerIds),

    client
      .from("order_items")
      .select("*")
      .in("order_id", orderIds)
  ]);

  if (customerResult.error) throw customerResult.error;
  if (itemResult.error) throw itemResult.error;

  let paymentRows = [];

  // Payment permission नहीं है तो payment table को query नहीं करेंगे।
  if (can("can_view_payments")) {
    const { data, error } = await client
      .from("payments")
      .select("*")
      .in("order_id", orderIds)
      .eq("is_voided", false)
      .order("payment_date", { ascending: true });

    if (error) throw error;

    paymentRows = data || [];
  }

  const customerMap = new Map(
    (customerResult.data || []).map(x => [String(x.id), x])
  );

  const itemMap = new Map();

  (itemResult.data || []).forEach(item => {
    if (!itemMap.has(String(item.order_id))) {
      itemMap.set(String(item.order_id), item);
    }
  });

  const paymentMap = new Map();

  paymentRows.forEach(payment => {
    const key = String(payment.order_id);

    if (!paymentMap.has(key)) {
      paymentMap.set(key, []);
    }

    paymentMap.get(key).push(payment);
  });

  orders = orderRows.map(row =>
    normalizeOrder(
      row,
      customerMap.get(String(row.customer_id)),
      itemMap.get(String(row.id)),
      paymentMap.get(String(row.id)) || []
    )
  );

  dataReady = true;

  renderOrders();
  renderStats();
}

/* =========================================
   7. SAVE CUSTOMER
========================================= */

async function saveCustomer(name, phone, address) {
  const { data: existing, error: findError } = await client
    .from("customers")
    .select("id")
    .eq("phone", phone)
    .limit(1)
    .maybeSingle();

  if (findError) throw findError;

  if (existing) {
    const { error } = await client
      .from("customers")
      .update({
        full_name: name,
        address: address || null
      })
      .eq("id", existing.id);

    if (error) throw error;

    return existing.id;
  }

  const { data, error } = await client
    .from("customers")
    .insert({
      full_name: name,
      phone,
      address: address || null
    })
    .select("id")
    .single();

  if (error) throw error;

  return data.id;
}

function makeOrderNumber() {
  const date = today().replaceAll("-", "");
  const random = Math.floor(100000 + Math.random() * 900000);

  return `SS-${date}-${random}`;
}

/* =========================================
   8. ORDER FORM
========================================= */

function updateBalancePreview() {
  const total = Number($("totalAmount")?.value || 0);
  const paid = Number($("advanceAmount")?.value || 0);

  if ($("formBalance")) {
    $("formBalance").textContent =
      "बाकी रकम: " + money(Math.max(0, total - paid));
  }
}

function openOrder(item = "") {
  if (!can("can_create_orders")) {
    alert("आपको नया ऑर्डर बनाने की अनुमति नहीं है।");
    return;
  }

  required("orderForm").reset();

  $("editOrderId").value = "";
  $("modalTitle").textContent = "नया ऑर्डर";
  $("orderDate").value = today();
  $("advanceAmount").value = "0";
  $("quantity").value = "1";
  $("itemName").value = item;

  updateBalancePreview();
  openModal("orderModal");
}

function editOrder(id) {
  if (!can("can_edit_orders")) {
    alert("आपको ऑर्डर Edit करने की अनुमति नहीं है।");
    return;
  }

  const o = orders.find(x => x.id === String(id));
  if (!o) return;

  $("orderForm").reset();

  $("modalTitle").textContent = "ऑर्डर अपडेट करें";
  $("editOrderId").value = o.id;

  $("customerName").value = o.name;
  $("customerPhone").value = o.phone;
  $("customerAddress").value = o.address;
  $("itemName").value = o.item;
  $("design").value = o.design;
  $("quantity").value = o.quantity;
  $("measurements").value = o.measurements;
  $("orderDate").value = o.orderDate;
  $("deliveryDate").value = o.deliveryDate;
  $("totalAmount").value = o.total;
  $("advanceAmount").value = o.paid;
  $("orderNote").value = o.note;

  updateBalancePreview();
  openModal("orderModal");
}

/* =========================================
   9. SUBMIT NEW / EDIT ORDER
========================================= */

let orderSaving = false;

async function submitOrder(event) {
  event.preventDefault();

  if (orderSaving) return;

  if (!dataReady) {
    alert("डेटा अभी लोड हो रहा है। थोड़ी देर बाद कोशिश करें।");
    return;
  }

  if (!getStaff()) {
    alert("पहले Owner / Employee Login करें।");
    return;
  }

  const id = $("editOrderId").value;
  const editing = Boolean(id);

  if (editing && !can("can_edit_orders")) {
    alert("आपको ऑर्डर Edit करने की अनुमति नहीं है।");
    return;
  }

  if (!editing && !can("can_create_orders")) {
    alert("आपको ऑर्डर बनाने की अनुमति नहीं है।");
    return;
  }

  const name = $("customerName").value.trim();
  const phone = $("customerPhone").value.trim();
  const address = $("customerAddress").value.trim();
  const itemName = $("itemName").value.trim();

  const quantity = Number($("quantity").value);
  const total = Number($("totalAmount").value);
  const advance = Number($("advanceAmount").value || 0);

  if (
    name.length < 2 ||
    !/^[0-9+ -]{10,15}$/.test(phone)
  ) {
    alert("ग्राहक का नाम और मोबाइल नंबर सही भरें।");
    return;
  }

  if (
    !itemName ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    total <= 0 ||
    advance < 0
  ) {
    alert("सामान, मात्रा और कीमत सही भरें।");
    return;
  }

  if (advance > total) {
    alert("एडवांस कुल कीमत से अधिक नहीं हो सकता।");
    return;
  }

  const old = editing
    ? orders.find(o => o.id === String(id))
    : null;

  if (editing && !old) {
    alert("पुराना ऑर्डर नहीं मिला। पहले डेटा Reload करें।");
    return;
  }

  if (old && advance < old.paid) {
    alert("पहले से प्राप्त भुगतान को सीधे कम नहीं कर सकते।");
    return;
  }

  const extraPayment = old ? advance - old.paid : advance;

  // Database में कोई बदलाव करने से पहले Payment Permission जाँचें।
  if (extraPayment > 0 && !can("can_manage_payments")) {
    alert("आपको Advance Payment दर्ज करने की अनुमति नहीं है।");
    return;
  }

  const saveButton = $("orderForm").querySelector('[type="submit"]');

  orderSaving = true;

  if (saveButton) {
    saveButton.disabled = true;
    saveButton.textContent = "सेव हो रहा है...";
  }

  try {
    const customerId = await saveCustomer(
      name,
      phone,
      address
    );

    const notes = encodeNotes(
      $("orderNote").value.trim(),
      {
        design: $("design").value.trim(),
        measurements: $("measurements").value.trim(),
        deliveryDate: $("deliveryDate").value
      }
    );

    let orderId;

    if (editing) {
      orderId = Number(id);

      const { error: orderError } = await client
        .from("orders")
        .update({
          customer_id: customerId,
          subtotal: total,
          discount: 0,
          total_amount: total,
          notes,
          updated_at: new Date().toISOString()
        })
        .eq("id", orderId);

      if (orderError) throw orderError;

      const itemData = {
        product_name: itemName,
        quantity,
        unit_price: total / quantity,
        line_total: total
      };

      if (old.itemId) {
        const { error } = await client
          .from("order_items")
          .update(itemData)
          .eq("id", old.itemId);

        if (error) throw error;
      } else {
        const { error } = await client
          .from("order_items")
          .insert({
            ...itemData,
            order_id: orderId
          });

        if (error) throw error;
      }

    } else {
      const { data: newOrder, error: orderError } = await client
        .from("orders")
        .insert({
          order_number: makeOrderNumber(),
          customer_id: customerId,
          order_status: "pending",
          subtotal: total,
          discount: 0,
          total_amount: total,
          notes,
          created_by: currentUserId()
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      orderId = newOrder.id;

      const { error: itemError } = await client
        .from("order_items")
        .insert({
          order_id: orderId,
          product_name: itemName,
          quantity,
          unit_price: total / quantity,
          line_total: total
        });

      if (itemError) {
        throw new Error(
          "ऑर्डर बन गया, लेकिन सामान सेव नहीं हुआ। " +
          itemError.message +
          " ऑर्डर ID: " + orderId
        );
      }
    }

    // Advance payment
    if (extraPayment > 0) {
      const { error: paymentError } = await client
        .from("payments")
        .insert({
          order_id: orderId,
          amount: extraPayment,
          payment_method: "cash",
          payment_date: new Date().toISOString(),
          notes: editing
            ? "ऑर्डर अपडेट के समय अतिरिक्त एडवांस"
            : "प्रारंभिक एडवांस",
          recorded_by: currentUserId(),
          is_voided: false
        });

      if (paymentError) {
        throw new Error(
          "ऑर्डर सेव हो गया, लेकिन एडवांस सेव नहीं हुआ। " +
          paymentError.message +
          " ऑर्डर ID: " + orderId
        );
      }
    }

    await loadOrders();

    closeModal("orderModal");

    alert(
      editing
        ? "ऑर्डर सफलतापूर्वक अपडेट हो गया।"
        : "ऑर्डर सफलतापूर्वक सेव हो गया।"
    );

  } catch (error) {
    showError(error, "ऑर्डर सेव नहीं हुआ");

    // अगर ऑर्डर बन चुका हो तो दोबारा बनाने से पहले डेटा Reload करें।
    try {
      await loadOrders();
    } catch (reloadError) {
      console.error("Reload error:", reloadError);
    }

  } finally {
    orderSaving = false;

    if (saveButton) {
      saveButton.disabled = false;
      saveButton.textContent = "सेव करें";
    }
  }
}

/* =========================================
   10. STATS
========================================= */

function renderStats() {
  const total = orders.reduce(
    (s, o) => s + Number(o.total || 0), 0
  );

  const paid = orders.reduce(
    (s, o) => s + Number(o.paid || 0), 0
  );

  if ($("statOrders")) {
    $("statOrders").textContent = orders.length;
  }

  if ($("statSales")) {
    $("statSales").textContent = money(total);
  }

  if ($("statPaid")) {
    $("statPaid").textContent = money(paid);
  }

  if ($("statDue")) {
    $("statDue").textContent = money(Math.max(0, total - paid));
  }
}

/* =========================================
   11. ORDER TABLE
========================================= */

function renderOrders() {
  const body = $("ordersBody");
  if (!body) return;

  const q = ($("orderSearch")?.value || "")
    .trim()
    .toLowerCase();

  body.innerHTML = "";

  const filtered = orders.filter(o =>
    [
      o.orderNumber,
      o.name,
      o.phone,
      o.item,
      o.status
    ].join(" ").toLowerCase().includes(q)
  );

  if (!filtered.length) {
    body.innerHTML =
      '<tr><td colspan="7" class="empty-row">अभी कोई ऑर्डर नहीं है।</td></tr>';
    return;
  }

  filtered.forEach(o => {
    const tr = document.createElement("tr");
    const due = balance(o);

    const status = due <= 0
      ? '<span class="paid-text">पूरा भुगतान</span>'
      : '<span class="due-text">भुगतान बाकी</span>';

    const buttons = [];

    if (can("can_edit_orders")) {
      buttons.push(
        `<button class="btn" data-action="edit" data-id="${safeText(o.id)}">Edit</button>`
      );
    }

    if (can("can_view_payments")) {
      buttons.push(
        `<button class="btn btn-outline" data-action="pay" data-id="${safeText(o.id)}">भुगतान</button>`
      );
    }

    buttons.push(
      `<button class="btn btn-outline" data-action="receipt" data-id="${safeText(o.id)}">रसीद</button>`
    );

    buttons.push(
      `<button class="btn btn-outline" data-action="wa" data-id="${safeText(o.id)}">WhatsApp</button>`
    );

    if (isOwner()) {
      buttons.push(
        `<button class="btn btn-outline" data-action="cancel" data-id="${safeText(o.id)}">Cancel</button>`
      );
    }

    tr.innerHTML = `
      <td>${safeText(o.orderNumber)}</td>
      <td>${safeText(o.name)}</td>
      <td>${safeText(o.phone)}</td>
      <td>${safeText(o.deliveryDate || "—")}</td>
      <td>${money(o.total)}</td>
      <td>${money(due)}</td>
      <td>
        ${status}<br>
        <small>स्थिति: ${safeText(o.status)}</small><br>
        ${buttons.join(" ")}
      </td>
    `;

    body.appendChild(tr);
  });
}

/* =========================================
   12. CANCEL ORDER
========================================= */

async function cancelOrder(id) {
  if (!isOwner()) {
    alert("केवल Owner ऑर्डर Cancel कर सकता है।");
    return;
  }

  const o = orders.find(x => x.id === String(id));
  if (!o) return;

  if (o.status === "cancelled") {
    alert("यह ऑर्डर पहले से Cancel है।");
    return;
  }

  if (!confirm(`ऑर्डर ${o.orderNumber} Cancel करना चाहते हैं?`)) {
    return;
  }

  const { error } = await client
    .from("orders")
    .update({
      order_status: "cancelled",
      updated_at: new Date().toISOString()
    })
    .eq("id", Number(id));

  if (error) {
    showError(error, "ऑर्डर Cancel नहीं हुआ");
    return;
  }

  await loadOrders();

  alert("ऑर्डर Cancel हो गया। पुराना रिकॉर्ड सुरक्षित है।");
}

/* =========================================
   13. PAYMENTS
========================================= */

function addPayment(id) {
  if (!can("can_manage_payments")) {
    alert("आपको भुगतान दर्ज करने की अनुमति नहीं है।");
    return;
  }

  const o = orders.find(x => x.id === String(id));
  if (!o) return;

  if (balance(o) <= 0) {
    alert("इस ऑर्डर का पूरा भुगतान हो चुका है।");
    return;
  }

  $("paymentForm").reset();
  $("paymentOrderId").value = o.id;
  $("paymentDate").value = today();
  $("paymentAmount").max = balance(o);

  $("paymentSummary").textContent =
    `${o.name} | ऑर्डर ${o.orderNumber} | बाकी रकम ${money(balance(o))}`;

  openModal("paymentModal");
}

let paymentSaving = false;

async function submitPayment(event) {
  event.preventDefault();

  if (paymentSaving) return;

  if (!can("can_manage_payments")) {
    alert("आपको भुगतान दर्ज करने की अनुमति नहीं है।");
    return;
  }

  const id = $("paymentOrderId").value;
  const o = orders.find(x => x.id === String(id));

  if (!o) return;

  const amount = Number($("paymentAmount").value);
  const method = $("paymentMethod").value;

  const allowedMethods = [
    "cash",
    "upi",
    "bank",
    "card",
    "other"
  ];

  if (!allowedMethods.includes(method)) {
    alert("Payment Method सही चुनें।");
    return;
  }

  if (amount <= 0 || amount > balance(o)) {
    alert("रकम सही डालें। भुगतान बाकी रकम से अधिक नहीं हो सकता।");
    return;
  }

  const saveButton = $("paymentForm").querySelector('[type="submit"]');

  paymentSaving = true;

  if (saveButton) {
    saveButton.disabled = true;
  }

  try {
    const selectedDate = $("paymentDate").value || today();

    const { error } = await client
      .from("payments")
      .insert({
        order_id: Number(id),
        amount,
        payment_method: method,
        payment_date: new Date(
          selectedDate + "T12:00:00"
        ).toISOString(),
        notes: $("paymentNote").value.trim() || null,
        recorded_by: currentUserId(),
        is_voided: false
      });

    if (error) throw error;

    await loadOrders();

    closeModal("paymentModal");

    alert("भुगतान सफलतापूर्वक सेव हो गया।");

  } catch (error) {
    showError(error, "भुगतान सेव नहीं हुआ");

  } finally {
    paymentSaving = false;

    if (saveButton) {
      saveButton.disabled = false;
    }
  }
}

/* =========================================
   14. RECEIPT
========================================= */

function receipt(id) {
  const o = orders.find(x => x.id === String(id));
  if (!o) return;

  const payments = (o.payments || []).map(p => `
    <tr>
      <td>${safeText(String(p.date).slice(0, 10))}</td>
      <td>${safeText(p.method)}</td>
      <td>${safeText(p.note || "—")}</td>
      <td>${money(p.amount)}</td>
    </tr>
  `).join("");

  $("receiptArea").innerHTML = `
    <div class="receipt">

      <h1>Shiv Shakti Furniture &amp; Engineering Works</h1>

      <h2>ऑर्डर / भुगतान रसीद</h2>

      <p><b>पता:</b> सेमरियाँ, कोचस, रोहतास – 821112</p>
      <p><b>मोबाइल:</b> 6207486280</p>

      <hr>

      <p>
        <b>ऑर्डर ID:</b> ${safeText(o.orderNumber)}
        <b>ऑर्डर तारीख:</b> ${safeText(o.orderDate)}
      </p>

      <p>
        <b>ग्राहक:</b> ${safeText(o.name)}
        <b>मोबाइल:</b> ${safeText(o.phone)}
      </p>

      <p><b>पता:</b> ${safeText(o.address || "—")}</p>

      <table>
        <tr>
          <th>सामान</th>
          <th>डिजाइन / नाप</th>
          <th>मात्रा</th>
          <th>कुल</th>
        </tr>

        <tr>
          <td>${safeText(o.item)}</td>
          <td>${safeText(
            [o.design, o.measurements].filter(Boolean).join(" / ") || "—"
          )}</td>
          <td>${safeText(o.quantity)}</td>
          <td>${money(o.total)}</td>
        </tr>
      </table>

      <h3>भुगतान विवरण</h3>

      <table>
        <tr>
          <th>तारीख</th>
          <th>तरीका</th>
          <th>नोट</th>
          <th>रकम</th>
        </tr>

        ${payments || '<tr><td colspan="4">अभी भुगतान दर्ज नहीं है</td></tr>'}
      </table>

      <p class="receipt-total">
        कुल: ${money(o.total)} |
        प्राप्त: ${money(o.paid)} |
        बाकी: ${money(balance(o))}
      </p>

      <p>
        <b>डिलीवरी तारीख:</b>
        ${safeText(o.deliveryDate || "निर्धारित नहीं")}
      </p>

      <p><b>नोट:</b> ${safeText(o.note || "—")}</p>

      <br>

      <p>
        ग्राहक के हस्ताक्षर: __________________
        दुकान की मुहर: __________________
      </p>

      <p style="text-align:center">धन्यवाद! फिर पधारें।</p>

    </div>
  `;

  window.print();
}

/* =========================================
   15. WHATSAPP
========================================= */

function sendWhatsApp(id) {
  const o = orders.find(x => x.id === String(id));
  if (!o) return;

  const phone = o.phone.replace(/\D/g, "").slice(-10);

  if (phone.length !== 10) {
    alert("ग्राहक का मोबाइल नंबर सही नहीं है।");
    return;
  }

  const msg = `नमस्ते ${o.name} जी,
आपके Shiv Shakti Furniture ऑर्डर ${o.orderNumber} का विवरण:

सामान: ${o.item}
कुल कीमत: ${money(o.total)}
प्राप्त: ${money(o.paid)}
बाकी: ${money(balance(o))}
डिलीवरी तारीख: ${o.deliveryDate || "निर्धारित नहीं"}

धन्यवाद।`;

  window.open(
    "https://wa.me/91" + phone + "?text=" + encodeURIComponent(msg),
    "_blank",
    "noopener"
  );
}

/* =========================================
   16. CUSTOMER REQUESTS
========================================= */

async function loadCustomerRequests() {
  if (!isOwner() || !$("customerRequestsList")) return;

  const { data, error } = await client
    .from("customer_order_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Customer requests:", error);

    $("customerRequestsList").textContent =
      "Customer requests लोड नहीं हो सकीं: " + error.message;

    return;
  }

  const list = $("customerRequestsList");
  list.innerHTML = "";

  if (!data?.length) {
    list.textContent = "अभी कोई नया ग्राहक अनुरोध नहीं है।";
    return;
  }

  data.forEach(request => {
    const card = document.createElement("div");

    card.className = "customer-request-card";

    card.style.cssText =
      "padding:14px;margin:12px 0;border:1px solid #493629;border-radius:10px";

    card.innerHTML = `
      <h3>${safeText(request.customer_name)}</h3>
      <p>मोबाइल: ${safeText(request.customer_phone)}</p>
      <p>पता: ${safeText(request.customer_address)}</p>
      <p>सामान: ${safeText(request.item_name)}</p>
      <p>मात्रा: ${safeText(request.quantity)}</p>
      <p>डिजाइन: ${safeText(request.design_details || "—")}</p>
      <p>नाप: ${safeText(request.measurements || "—")}</p>
      <p>नोट: ${safeText(request.customer_note || "—")}</p>
      <p>स्थिति: ${safeText(request.status)}</p>
    `;

    list.appendChild(card);
  });
}

/* =========================================
   17. EXPORT BACKUP
========================================= */

function exportBackup() {
  const backup = {
    app: "Shiv Shakti Furniture",
    version: 3,
    exportedAt: new Date().toISOString(),
    orders
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `shiv-shakti-backup-${today()}.json`;

  a.click();

  URL.revokeObjectURL(url);
}

/* =========================================
   18. BACKUP IMPORT
========================================= */

function importBackup() {
  alert(
    "पुराने LocalStorage Backup को सीधे Supabase में Restore करना अभी उपलब्ध नहीं है। इससे गलत या Duplicate ऑर्डर बनने का खतरा है।"
  );

  if ($("importFile")) {
    $("importFile").value = "";
  }
}

/* =========================================
   19. TABLE BUTTON ACTIONS
========================================= */

function setupOrderActions() {
  const body = $("ordersBody");
  if (!body) return;

  body.addEventListener("click", async event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    try {
      if (action === "edit") editOrder(id);
      if (action === "pay") addPayment(id);
      if (action === "receipt") receipt(id);
      if (action === "wa") sendWhatsApp(id);
      if (action === "cancel") await cancelOrder(id);

    } catch (error) {
      showError(error);
    }
  });
}

/* =========================================
   20. INITIALIZATION
========================================= */

async function initializeManagement() {
  if (initialized || !getStaff()) return;

  initialized = true;
  dataReady = false;

  try {
    await loadOrders();
    await loadCustomerRequests();

  } catch (error) {
    initialized = false;
    dataReady = false;

    showError(error, "Database से डेटा लोड नहीं हुआ");
  }
}

/* =========================================
   21. LOGOUT DATA CLEAR
========================================= */

client.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_OUT") {
    orders = [];
    dataReady = false;
    initialized = false;

    renderOrders();
    renderStats();
  }
});

/* =========================================
   22. PAGE SETUP
========================================= */

function setupPage() {
  renderCategories();
  renderProducts();

  $("search")?.addEventListener("input", renderProducts);
  $("orderSearch")?.addEventListener("input", renderOrders);

  $("orderForm")?.addEventListener("submit", submitOrder);
  $("paymentForm")?.addEventListener("submit", submitPayment);

  ["totalAmount", "advanceAmount"].forEach(id => {
    $(id)?.addEventListener("input", updateBalancePreview);
  });

  $("newOrderBtn")?.addEventListener("click", () => openOrder());

  $("exportBtn")?.addEventListener("click", exportBackup);

  $("importFile")?.addEventListener("change", importBackup);

  $("menuBtn")?.addEventListener("click", () => {
    $("nav")?.classList.toggle("open");
  });

  document.querySelectorAll("#nav a").forEach(a => {
    a.addEventListener("click", () => {
      $("nav")?.classList.remove("open");
    });
  });

  $("closeModal")?.addEventListener("click", () => {
    closeModal("orderModal");
  });

  $("cancelModal")?.addEventListener("click", () => {
    closeModal("orderModal");
  });

  $("closePayment")?.addEventListener("click", () => {
    closeModal("paymentModal");
  });

  ["orderModal", "paymentModal"].forEach(id => {
    $(id)?.addEventListener("click", event => {
      if (event.target.id === id) {
        closeModal(id);
      }
    });
  });

  if ($("year")) {
    $("year").textContent = new Date().getFullYear();
  }

  setupOrderActions();

  window.addEventListener("staff-login-success", () => {
    initialized = false;
    initializeManagement();
  });

  if (getStaff()) {
    initializeManagement();
  }
}

/* =========================================
   23. START
========================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupPage);
} else {
  setupPage();
}
