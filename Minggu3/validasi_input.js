const form = document.getElementById("registerForm");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const namaInput = document.getElementById("nama");
const tanggalLahirInput = document.getElementById("tanggalLahir");
const alamatInput = document.getElementById("alamat");
const telponInput = document.getElementById("telpon");

// Tanggal hari ini (format YYYY-MM-DD, pakai waktu lokal biar tidak kena bug timezone)
function getToday() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Sesuai spek dosen: tanggal harus >= hari ini, jadi date picker dikasih batas minimum hari ini
tanggalLahirInput.min = getToday();

// Tampilkan / sembunyikan pesan error
function setError(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  if (message) {
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
    input.classList.remove("border-gray-300");
    input.classList.add("border-red-500");
  } else {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
    input.classList.remove("border-red-500");
    input.classList.add("border-gray-300");
  }
}

// Setiap fungsi validasi mengembalikan true kalau valid, false kalau tidak
function validateUsername() {
  const value = usernameInput.value.trim();
  if (value === "") {
    setError(usernameInput, "usernameError", "Username tidak boleh kosong");
    return false;
  }
  if (value.length < 3) {
    setError(usernameInput, "usernameError", "Username minimal 3 karakter");
    return false;
  }
  setError(usernameInput, "usernameError", "");
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (value === "") {
    setError(passwordInput, "passwordError", "Password tidak boleh kosong");
    return false;
  }
  if (value.length < 8) {
    setError(passwordInput, "passwordError", "Password minimal 8 karakter");
    return false;
  }
  setError(passwordInput, "passwordError", "");
  return true;
}

function validateNama() {
  if (namaInput.value.trim() === "") {
    setError(namaInput, "namaError", "Nama tidak boleh kosong");
    return false;
  }
  setError(namaInput, "namaError", "");
  return true;
}

function validateTanggalLahir() {
  const value = tanggalLahirInput.value;
  if (value === "") {
    setError(tanggalLahirInput, "tanggalLahirError", "Tanggal lahir tidak boleh kosong");
    return false;
  }
  // Format YYYY-MM-DD bisa dibandingkan langsung sebagai string
  if (value < getToday()) {
    setError(tanggalLahirInput, "tanggalLahirError", "Tanggal lahir harus hari ini atau setelahnya");
    return false;
  }
  setError(tanggalLahirInput, "tanggalLahirError", "");
  return true;
}

function validateAlamat() {
  if (alamatInput.value.trim() === "") {
    setError(alamatInput, "alamatError", "Alamat tidak boleh kosong");
    return false;
  }
  setError(alamatInput, "alamatError", "");
  return true;
}

function validateTelpon() {
  const value = telponInput.value.trim();
  if (value === "") {
    setError(telponInput, "telponError", "Nomor telpon tidak boleh kosong");
    return false;
  }
  if (!/^\d+$/.test(value)) {
    setError(telponInput, "telponError", "Nomor telpon hanya boleh berisi angka");
    return false;
  }
  if (!value.startsWith("62")) {
    setError(telponInput, "telponError", "Nomor telpon harus diawali 62");
    return false;
  }
  setError(telponInput, "telponError", "");
  return true;
}

// Validasi real-time: saat user mengetik / mengubah isi, dan saat keluar dari field
usernameInput.addEventListener("input", validateUsername);
usernameInput.addEventListener("blur", validateUsername);

passwordInput.addEventListener("input", validatePassword);
passwordInput.addEventListener("blur", validatePassword);

namaInput.addEventListener("input", validateNama);
namaInput.addEventListener("blur", validateNama);

tanggalLahirInput.addEventListener("change", validateTanggalLahir);
tanggalLahirInput.addEventListener("blur", validateTanggalLahir);

alamatInput.addEventListener("input", validateAlamat);
alamatInput.addEventListener("blur", validateAlamat);

telponInput.addEventListener("input", validateTelpon);
telponInput.addEventListener("blur", validateTelpon);

// Saat submit: jalankan semua validasi, kalau ada yang gagal form tidak dikirim
form.addEventListener("submit", function (event) {
  // Sengaja tidak pakai && langsung, supaya semua pesan error muncul sekaligus
  const results = [
    validateUsername(),
    validatePassword(),
    validateNama(),
    validateTanggalLahir(),
    validateAlamat(),
    validateTelpon(),
  ];

  if (results.includes(false)) {
    event.preventDefault();
  }
});
