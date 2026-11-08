"use strict";

/* =========================================
   SHIV SHAKTI FURNITURE
   OWNER / EMPLOYEE LOGIN
========================================= */

(() => {

  const client = window.supabaseClient;

  if (!client) {
    alert("Supabase connect nahi hua. supabase.js check karein.");
    return;
  }

  /* ---------- ELEMENTS ---------- */

  const management = document.getElementById("order-tools");
  const requestsPanel = document.getElementById("customerRequestsPanel");

  if (!management) {
    console.error("Management section #order-tools nahi mila.");
    return;
  }

  /* ---------- LOGIN PANEL ---------- */

  let loginContainer = document.getElementById("staffLoginContainer");

  if (!loginContainer) {
    loginContainer = document.createElement("div");
    loginContainer.id = "staffLoginContainer";
    management.parentNode.insertBefore(loginContainer, management);
  }

  loginContainer.innerHTML = `
    <section id="staffLoginPanel"
      style="
        max-width:500px;
        margin:30px auto;
        padding:24px;
        background:#241b16;
        color:#fff8ed;
        border:1px solid #493629;
        border-radius:14px;
        box-sizing:border-box;
      ">

      <h2 style="color:#e8b75c;margin-bottom:15px">
        मालिक / कर्मचारी Login
      </h2>

      <form id="staffLoginForm">

        <label for="staffEmail">Email</label>

        <input
          id="staffEmail"
          type="email"
          required
          autocomplete="username"
          placeholder="Registered email"
          style="
            width:100%;
            padding:12px;
            margin:8px 0 15px;
            box-sizing:border-box;
          "
        >

        <label for="staffPassword">Password</label>

        <input
          id="staffPassword"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Password"
          style="
            width:100%;
            padding:12px;
            margin:8px 0 15px;
            box-sizing:border-box;
          "
        >

        <button
          id="staffLoginButton"
          type="submit"
          style="
            width:100%;
            padding:12px;
            background:#e8b75c;
            border:0;
            border-radius:8px;
            font-weight:bold;
            cursor:pointer;
          "
        >
          Login
        </button>

      </form>

      <p id="staffLoginMessage" style="margin-top:15px">
        Management देखने के लिए Login करें।
      </p>

      <div id="staffWelcome" style="margin-top:15px"></div>

    </section>
  `;

  const form = document.getElementById("staffLoginForm");
  const emailInput = document.getElementById("staffEmail");
  const passwordInput = document.getElementById("staffPassword");
  const loginButton = document.getElementById("staffLoginButton");
  const message = document.getElementById("staffLoginMessage");
  const welcome = document.getElementById("staffWelcome");

  /* ---------- INITIAL STATE ---------- */

  management.style.display = "none";

  if (requestsPanel) {
    requestsPanel.style.display = "none";
  }

  window.staffUser = null;

  let authCheckVersion = 0;
  let isSubmitting = false;

  /* ---------- MESSAGE ---------- */

  function showMessage(text, color = "#e8b75c") {
    message.textContent = text;
    message.style.color = color;
  }

  function hideManagement() {
    management.style.display = "none";

    if (requestsPanel) {
      requestsPanel.style.display = "none";
    }
  }

  function showLogin() {
    hideManagement();

    window.staffUser = null;

    form.style.display = "block";
    welcome.innerHTML = "";

    loginButton.disabled = false;
    loginButton.textContent = "Login";

    showMessage("Management देखने के लिए Login करें।");
  }

  /* ---------- LOGOUT BUTTON ---------- */

  function showWelcome(profile, permissions) {

    form.style.display = "none";

    const roleName =
      profile.role === "owner" ? "मालिक" : "कर्मचारी";

    welcome.innerHTML = `
      <div style="
        padding:15px;
        background:#30231b;
        border-radius:10px;
        border:1px solid #493629;
      ">

        <p>
          स्वागत है,
          <strong id="staffFullName"></strong>
        </p>

        <p>Role: ${roleName}</p>

        <button
          id="staffLogout"
          type="button"
          style="
            margin-top:12px;
            padding:10px 18px;
            background:#e8b75c;
            border:0;
            border-radius:7px;
            cursor:pointer;
            font-weight:bold;
          "
        >
          Logout
        </button>

      </div>
    `;

    document.getElementById("staffFullName").textContent =
      profile.full_name || "User";

    document.getElementById("staffLogout")
      .addEventListener("click", async () => {

        const button = document.getElementById("staffLogout");

        button.disabled = true;
        button.textContent = "Logout हो रहा है...";

        const { error } = await client.auth.signOut();

        if (error) {
          button.disabled = false;
          button.textContent = "Logout";
          showMessage("Logout error: " + error.message, "#ff7777");
        }
      });
  }

  /* ---------- CHECK PROFILE ---------- */

  async function checkUser(session, version) {

    hideManagement();
    window.staffUser = null;

    if (!session?.user) {
      showLogin();
      return;
    }

    showMessage("Account verify हो रहा है...");

    const { data: profile, error } = await client
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", session.user.id)
      .maybeSingle();

    if (version !== authCheckVersion) return;

    if (error) {
      console.error("Profile error:", error);

      showMessage(
        "Profile check error: " + error.message,
        "#ff7777"
      );

      return;
    }

    if (!profile || !["owner", "employee"].includes(profile.role)) {

      showMessage(
        "आपका Profile verify नहीं हुआ। Owner से संपर्क करें।",
        "#ff7777"
      );

      await client.auth.signOut();
      return;
    }

    /* ---------- EMPLOYEE PERMISSIONS ---------- */

    let permissions = {
      can_view_orders: false,
      can_create_orders: false,
      can_edit_orders: false,
      can_delete_orders: false,
      can_view_payments: false,
      can_manage_payments: false,
      can_view_reports: false
    };

    if (profile.role === "owner") {

      Object.keys(permissions).forEach(key => {
        permissions[key] = true;
      });

    } else {

      const { data, error: permissionError } = await client
        .from("employee_permissions")
        .select(`
          user_id,
          can_view_orders,
          can_create_orders,
          can_edit_orders,
          can_delete_orders,
          can_view_payments,
          can_manage_payments,
          can_view_reports
        `)
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (version !== authCheckVersion) return;

      if (permissionError) {
        console.error("Permission error:", permissionError);

        showMessage(
          "Permission check error: " + permissionError.message,
          "#ff7777"
        );

        return;
      }

      if (!data) {
        showMessage(
          "Employee permissions नहीं मिलीं। Owner से संपर्क करें।",
          "#ff7777"
        );

        return;
      }

      permissions = data;
    }

    /* ---------- SAVE STAFF SESSION ---------- */

    window.staffUser = {
      id: session.user.id,
      email: session.user.email,
      role: profile.role,
      permissions: permissions
    };

    showWelcome(profile, permissions);

    /* ---------- SHOW MANAGEMENT ---------- */

    if (profile.role === "owner" || permissions.can_view_orders) {

      management.style.display = "block";

      if (requestsPanel) {
        requestsPanel.style.display =
          profile.role === "owner" ? "block" : "none";
      }

      showMessage("Login successful.", "#8ee6a0");

      window.dispatchEvent(
        new CustomEvent("staff-login-success")
      );

    } else {

      hideManagement();

      showMessage(
        "आपको Orders देखने की permission नहीं है। Owner से संपर्क करें।",
        "#ff7777"
      );
    }
  }

  /* ---------- LOGIN SUBMIT ---------- */

  form.addEventListener("submit", async event => {

    event.preventDefault();

    if (isSubmitting) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showMessage("Email और Password भरें।", "#ff7777");
      return;
    }

    isSubmitting = true;

    loginButton.disabled = true;
    loginButton.textContent = "Login हो रहा है...";

    showMessage("Login हो रहा है...");

    try {

      const { data, error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      passwordInput.value = "";

      if (data.session) {
        const version = ++authCheckVersion;
        await checkUser(data.session, version);
      }

    } catch (error) {

      console.error("Login error:", error);

      showMessage(
        "Login failed: " + error.message,
        "#ff7777"
      );

    } finally {

      isSubmitting = false;

      if (!window.staffUser) {
        loginButton.disabled = false;
        loginButton.textContent = "Login";
      }
    }
  });

  /* ---------- AUTH SESSION CHECK ---------- */

  async function restoreSession() {

    const version = ++authCheckVersion;

    const { data, error } = await client.auth.getSession();

    if (version !== authCheckVersion) return;

    if (error) {
      showMessage(
        "Session error: " + error.message,
        "#ff7777"
      );
      return;
    }

    await checkUser(data.session, version);
  }

  /* ---------- AUTH STATE CHANGE ---------- */

  client.auth.onAuthStateChange((event, session) => {

    if (event === "SIGNED_OUT") {

      authCheckVersion++;
      showLogin();
      return;
    }

    if (
      event === "SIGNED_IN" ||
      event === "INITIAL_SESSION" ||
      event === "TOKEN_REFRESHED" ||
      event === "USER_UPDATED"
    ) {

      // Auth callback के अंदर Supabase query सीधे await नहीं करते।
      setTimeout(() => {
        restoreSession().catch(error => {
          console.error("Session restore error:", error);
          showMessage(
            "Session error: " + error.message,
            "#ff7777"
          );
        });
      }, 0);
    }
  });

  /* ---------- START ---------- */

  restoreSession().catch(error => {
    console.error("Initial session error:", error);

    showMessage(
      "Login system error: " + error.message,
      "#ff7777"
    );
  });

})();