/* main script */
function showAlert(msg) {
  alert(msg);
}
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const user =
    typeof dataPengguna !== "undefined"
      ? dataPengguna.find((u) => u.email === email && u.password === password)
      : null;
  if (user) {
    localStorage.setItem("namaUser", user.nama);
    localStorage.setItem("emailUser", user.email);
    window.location.href = "dashboard.html";
  } else {
    alert("Email/password yang anda masukkan salah!");
  }
}
function openModal(type) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modal-body");
  modal.style.display = "block";
  if (type === "forgot") {
    body.innerHTML = `<h3>Lupa Password</h3><p>Masukkan email untuk reset (simulasi)</p><input id="fpEmail" placeholder="Email"><br><br><button onclick="simulateForgot()">Kirim</button>`;
  } else if (type === "register") {
    body.innerHTML = `<h3>Daftar</h3><input id="regNama" placeholder="Nama"><br><input id="regEmail" placeholder="Email"><br><input id="regPass" placeholder="Password" type="password"><br><button onclick="registerUser()">Daftar</button>`;
  } else if (type === "message") {
  }
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
function simulateForgot() {
  const e = document.getElementById("fpEmail").value.trim();
  if (!e) {
    alert("Email wajib diisi");
    return;
  }
  alert("Instruksi reset telah dikirim (simulasi)");
}
function registerUser() {
  const nama = document.getElementById("regNama").value.trim(),
    email = document.getElementById("regEmail").value.trim(),
    pass = document.getElementById("regPass").value.trim();
  if (!nama || !email || !pass) {
    alert("Semua kolom wajib diisi");
    return;
  }
  if (typeof dataPengguna !== "undefined") {
    const id = dataPengguna.length
      ? Math.max(...dataPengguna.map((u) => u.id)) + 1
      : 1;
    dataPengguna.push({
      id,
      nama,
      email,
      password: pass,
      role: "UPBJJ-UT",
      lokasi: "-",
    });
  }
  alert("Pendaftaran berhasil (simulasi)");
}
function greeting() {
  const user = localStorage.getItem("namaUser") || "Admin SITTA";
  const hour = new Date().getHours();
  let greet =
    hour < 12 ? "Selamat Pagi" : hour < 18 ? "Selamat Siang" : "Selamat Malam";
  const el = document.getElementById("greet");
  if (el) el.innerText = `${greet}, ${user}!`;
}
function cariDO() {
  const no = document.getElementById("noDO").value.trim();
  const hasil = document.getElementById("hasilTracking");
  hasil.innerHTML = "";
  if (!no) {
    hasil.innerHTML = "<p>Masukkan nomor DO.</p>";
    return;
  }
  const data = typeof dataTracking !== "undefined" ? dataTracking[no] : null;
  if (!data) {
    hasil.innerHTML = "<p>Nomor DO tidak ditemukan.</p>";
    return;
  }
  const prog = data.progress || 0;
  let perjalananHTML = "";
  if (data.perjalanan && data.perjalanan.length) {
    perjalananHTML =
      "<ul>" +
      data.perjalanan
        .map((p) => `<li>${p.waktu} - ${p.keterangan}</li>`)
        .join("") +
      "</ul>";
  }
  hasil.innerHTML = `<h3>${data.nama}</h3><p>Status: <strong>${data.status}</strong></p><p>Ekspedisi: ${data.ekspedisi} | Tgl Kirim: ${data.tanggalKirim} | Paket: ${data.paket}</p><p>Total: ${data.total}</p><label>Progress:</label><div class="progress-bar"><div class="progress-fill" style="width:${prog}%">${prog}%</div></div><h4>Riwayat:</h4>${perjalananHTML}`;
}
function tampilStok() {
  const tabel = document.getElementById("tabelStok");
  if (!tabel) return;
  tabel.querySelectorAll("tr.data-row").forEach((r) => r.remove());
  if (typeof dataBahanAjar === "undefined") {
    const row = tabel.insertRow();
    row.classList.add("data-row");
    row.insertCell(0).innerText = "-";
    row.insertCell(1).innerText = "Tidak ada data";
    row.insertCell(2).innerText = "-";
    row.insertCell(3).innerText = "-";
    row.insertCell(4).innerText = "-";
    row.insertCell(5).innerText = "-";
    return;
  }
  dataBahanAjar.forEach((b, i) => {
    const row = tabel.insertRow();
    row.classList.add("data-row");
    row.insertCell(0).innerText = b.kodeBarang || "-";
    row.insertCell(1).innerText = b.namaBarang || "-";
    row.insertCell(2).innerText = b.jenisBarang || "-";
    row.insertCell(3).innerText = b.edisi || "-";
    row.insertCell(4).innerText = b.stok || 0;
    row.insertCell(5).innerHTML = b.cover
      ? `<img src="${b.cover}" width="80">`
      : "-";
  });
}
function tambahStok() {
  const kode = document.getElementById("kode").value.trim(),
    nama = document.getElementById("nama").value.trim(),
    stok = parseInt(document.getElementById("stok").value);
  if (!kode || !nama || isNaN(stok)) {
    alert("Isi semua kolom dengan benar");
    return;
  }
  const newItem = {
    kodeLokasi: "-",
    kodeBarang: kode,
    namaBarang: nama,
    jenisBarang: "-",
    edisi: "-",
    stok: stok,
    cover: "",
  };
  if (typeof dataBahanAjar !== "undefined") dataBahanAjar.push(newItem);
  tampilStok();
  alert("Data stok berhasil ditambahkan (lokal).");
}
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (!modal) return;
  if (event.target === modal) modal.style.display = "none";
};
