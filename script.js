/* ---------------- SIGNUP ---------------- */
const formSignup = document.getElementById("form-signup");
if (formSignup) {
  formSignup.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("signup-nama").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const hp = document.getElementById("signup-hp").value.trim();
    const pass = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;
    const msg = document.getElementById("signup-msg");

    // regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namaRegex = /^[A-Za-z\s]{3,32}$/;
    const hpRegex = /^08\d{8,14}$/;

    if (!nama || !email || !hp || !pass || !confirm) {
      msg.innerHTML = "<span class='error'>Semua field wajib diisi!</span>";
      return;
    }
    if (!emailRegex.test(email)) {
      msg.innerHTML = "<span class='error'>Format email tidak valid!</span>";
      return;
    }
    if (pass.length < 8) {
      msg.innerHTML = "<span class='error'>Password minimal 8 karakter!</span>";
      return;
    }
    if (pass !== confirm) {
      msg.innerHTML = "<span class='error'>Konfirmasi password tidak sesuai!</span>";
      return;
    }
    if (!namaRegex.test(nama)) {
      msg.innerHTML = "<span class='error'>Nama harus 3–32 huruf tanpa angka!</span>";
      return;
    }
    if (!hpRegex.test(hp)) {
      msg.innerHTML = "<span class='error'>Nomor HP harus format 08xx dan 10–16 digit!</span>";
      return;
    }

    // simpan user
    const user = { nama, email, hp, pass };
    localStorage.setItem("user", JSON.stringify(user));

    msg.innerHTML = "<span class='success'>Registrasi berhasil!</span>";
    setTimeout(() => (window.location.href = "02-login.html"), 1200);
  });
}

/* ---------------- LOGIN ---------------- */
const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const pass = document.getElementById("login-password").value;
    const msg = document.getElementById("login-msg");

    if (!email || !pass) {
      msg.innerHTML = "<span class='error'>Email dan password wajib diisi!</span>";
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && email === savedUser.email && pass === savedUser.pass) {
      msg.innerHTML = "<span class='success'>Login berhasil!</span>";
      setTimeout(() => (window.location.href = "01-index.html"), 1000);
    } else {
      msg.innerHTML = "<span class='error'>Email atau password salah!</span>";
    }
  });
}

/* ---------------- BELI MOBIL (07) ---------------- */
const formMobil = document.getElementById("form-beli-mobil");
if (formMobil) {
  formMobil.addEventListener("submit", (e) => {
    e.preventDefault();

    const merk = document.getElementById("merk").value.trim();
    const jenis = document.getElementById("jenis").value.trim();
    const tahun = parseInt(document.getElementById("tahun").value);
    const harga = parseInt(document.getElementById("harga").value);
    const plat = document.getElementById("plat").value.trim();
    const mesin = document.getElementById("mesin").value.trim();
    const rangka = document.getElementById("rangka").value.trim();
    const pemilik = document.getElementById("pemilik").value.trim();
    const foto = document.getElementById("foto").files;
    const msg = document.getElementById("premi-mobil");

    if (!merk || !jenis || !tahun || !harga || !plat || !mesin || !rangka || !pemilik || foto.length === 0) {
      msg.innerHTML = "<span class='error'>Semua field wajib diisi!</span>";
      return;
    }

    let premi = harga * 0.03;
    const usiaMobil = new Date().getFullYear() - tahun;
    if (usiaMobil > 5) premi += 500000;

    msg.innerHTML = "Premi Mobil: Rp " + premi.toLocaleString();

    localStorage.setItem("premi", premi);
    localStorage.setItem("produk", "Asuransi Mobil");
    setTimeout(() => (window.location.href = "10-checkout.html"), 1500);
  });
}

/* ---------------- BELI KESEHATAN (08) ---------------- */
const formKes = document.getElementById("form-beli-kesehatan");
if (formKes) {
  formKes.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const lahirStr = document.getElementById("lahir").value;
    const pekerjaan = document.getElementById("pekerjaan").value.trim();
    const merokok = document.getElementById("merokok").value;
    const hipertensi = document.getElementById("hipertensi").value;
    const diabetes = document.getElementById("diabetes").value;
    const msg = document.getElementById("premi-kesehatan");

    if (!nama || !lahirStr || !pekerjaan || !merokok || !hipertensi || !diabetes) {
      msg.innerHTML = "<span class='error'>Semua field wajib diisi!</span>";
      return;
    }

    const lahir = new Date(lahirStr);
    const usia = new Date().getFullYear() - lahir.getFullYear();

    let P = 2000000; // premi dasar
    let m = 0.1;
    if (usia <= 20) m = 0.1;
    else if (usia <= 35) m = 0.2;
    else if (usia <= 50) m = 0.25;
    else m = 0.4;

    let k1 = merokok === "ya" ? 1 : 0;
    let k2 = hipertensi === "ya" ? 1 : 0;
    let k3 = diabetes === "ya" ? 1 : 0;

    const premi = P + (m * P) + (k1 * 0.5 * P) + (k2 * 0.4 * P) + (k3 * 0.5 * P);

    msg.innerHTML = "Premi Kesehatan (per tahun): Rp " + premi.toLocaleString();

    localStorage.setItem("premi", premi);
    localStorage.setItem("produk", "Asuransi Kesehatan");
    setTimeout(() => (window.location.href = "10-checkout.html"), 1500);
  });
}

/* ---------------- BELI JIWA (09) ---------------- */
const formJiwa = document.getElementById("form-beli-jiwa");
if (formJiwa) {
  formJiwa.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama-jiwa").value.trim();
    const lahirStr = document.getElementById("lahir").value;
    const pert = parseInt(document.getElementById("pertanggungan").value, 10);
    const msg = document.getElementById("premi-jiwa");

    if (!nama || !lahirStr || !pert) {
      msg.innerHTML = "<span class='error'>Semua field wajib diisi!</span>";
      return;
    }

    const lahir = new Date(lahirStr);
    const usia = new Date().getFullYear() - lahir.getFullYear();

    let m = 0.002; // default 0.2%
    if (usia <= 30) m = 0.002;
    else if (usia <= 50) m = 0.004;
    else m = 0.01;

    const premi = Math.round(m * pert);

    msg.innerHTML = "Premi Jiwa (per bulan): Rp " + premi.toLocaleString();

    localStorage.setItem("premi", premi);
    localStorage.setItem("produk", "Asuransi Jiwa");
    setTimeout(() => (window.location.href = "10-checkout.html"), 1500);
  });
}

/* ---------------- CHECKOUT (10) ---------------- */
const produkEl = document.getElementById("checkout-produk");
const totalEl = document.getElementById("checkout-total");
if (totalEl && produkEl) {
  const premi = parseFloat(localStorage.getItem("premi")) || 0;
  const produk = localStorage.getItem("produk") || "Produk Asuransi";
  produkEl.innerText = "Produk: " + produk;
  totalEl.innerText = "Total Premi: Rp " + Math.round(premi).toLocaleString();
}

function selesaiCheckout() {
  const premi = localStorage.getItem("premi");
  const produk = localStorage.getItem("produk") || "Produk Asuransi";
  let histori = JSON.parse(localStorage.getItem("histori") || "[]");
  histori.push({
    tanggal: new Date().toLocaleString(),
    premi,
    produk,
    status: "Lunas",
  });
  localStorage.setItem("histori", JSON.stringify(histori));
  window.location.href = "11-histori.html";
}

/* ---------------- HISTORI (11) ---------------- */
const list = document.getElementById("list-histori");
if (list) {
  const histori = JSON.parse(localStorage.getItem("histori") || "[]");
  if (!histori || histori.length === 0) {
    list.innerHTML = "<li>Belum ada pembelian</li>";
  } else {
    histori.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.tanggal} - ${item.produk} - Rp ${parseInt(item.premi).toLocaleString()} - Status: ${item.status}`;
      list.appendChild(li);
    });
  }
}
