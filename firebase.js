import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, setDoc, addDoc, collection, query, where, orderBy, onSnapshot, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGcVOjHbAgUHexOg4eOvZgzkvMZcWec30",
  authDomain: "taqwimupa.firebaseapp.com",
  projectId: "taqwimupa",
  storageBucket: "taqwimupa.firebasestorage.app",
  messagingSenderId: "1087829486688",
  appId: "1:1087829486688:web:ee08acd07ca4b11cb82705"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const $ = id => document.getElementById(id);
let currentUser = null;
let activeRole = "unassigned";
const ADMIN_EMAIL = "pakmuha@gmail.com";
let stopRequestsListener = null;

function message(text, status) {
  if ($("cloudMsg")) $("cloudMsg").textContent = text;
  if (status && $("cloudStatus")) $("cloudStatus").textContent = status;
}
function friendlyError(error) {
  const code = error?.code || "";
  const map = {
    "auth/email-already-in-use": "Email ini sudah terdaftar.",
    "auth/invalid-email": "Format email tidak valid.",
    "auth/weak-password": "Kata sandi terlalu lemah; gunakan minimal 6 karakter.",
    "auth/invalid-credential": "Email atau kata sandi salah.",
    "auth/user-not-found": "Akun tidak ditemukan.",
    "auth/wrong-password": "Kata sandi salah.",
    "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
    "auth/network-request-failed": "Koneksi internet gagal menghubungi Firebase. Periksa jaringan lalu coba lagi.",
    "auth/user-disabled": "Akun ini dinonaktifkan di Firebase Authentication. Hubungi admin.",
    "auth/operation-not-allowed": "Metode Email/Password belum diaktifkan di Firebase Authentication.",
    "auth/invalid-api-key": "Konfigurasi API Firebase tidak valid.",
    "permission-denied": "Akses ditolak. Periksa aturan keamanan Firestore di panduan.",
    "unavailable": "Firebase sedang tidak tersedia atau koneksi internet bermasalah."
  };
  return map[code] || error?.message || "Terjadi kesalahan yang tidak diketahui.";
}
function requireEmailPassword() {
  const email = $("authEmail").value.trim();
  const password = $("authPassword").value;
  if (!email) throw new Error("Masukkan email terlebih dahulu.");
  if (!password) throw new Error("Masukkan kata sandi terlebih dahulu.");
  return { email, password };
}
async function saveCloud() {
  if (!currentUser) throw new Error("Silakan masuk ke akun terlebih dahulu.");
  const data = window.getTaqwimData?.();
  if (!data) throw new Error("Data aplikasi belum siap.");
  const ref = doc(db, "users", currentUser.uid, "taqwim", "data");
  await setDoc(ref, { payload: data, updatedAt: serverTimestamp(), schemaVersion: 1 });
  message("Data berhasil dikirim ke Firebase untuk akun " + currentUser.email + ".", "Firebase terhubung");
}
async function loadCloud() {
  if (!currentUser) throw new Error("Silakan masuk ke akun terlebih dahulu.");
  const ref = doc(db, "users", currentUser.uid, "taqwim", "data");
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    message("Belum ada data cloud untuk akun ini. Isi data lalu tekan Kirim ke Cloud.", "Akun aktif");
    return;
  }
  const remote = snap.data()?.payload;
  if (!remote || !Array.isArray(remote.participants) || !remote.activity) throw new Error("Data cloud tidak sesuai format aplikasi.");
  if (!confirm("Data lokal di perangkat akan diganti dengan data cloud akun ini. Lanjutkan?")) return;
  window.setTaqwimData(remote);
  message("Data berhasil ditarik dari Firebase.", "Firebase terhubung");
}

$("signUp").addEventListener("click", async () => {
  try { const { email, password } = requireEmailPassword(); message("Mendaftarkan akun…"); await createUserWithEmailAndPassword(auth, email, password); message("Akun berhasil dibuat dan sudah masuk.", "Firebase terhubung"); }
  catch (e) { message(friendlyError(e)); }
});
$("signIn").addEventListener("click", async () => {
  try { const { email, password } = requireEmailPassword(); message("Sedang masuk…"); await signInWithEmailAndPassword(auth, email, password); message("Berhasil masuk.", "Firebase terhubung"); }
  catch (e) { message("Gagal masuk: " + friendlyError(e), "Login gagal"); console.error("Firebase sign-in error:", e); }
});
$("resetPassword").addEventListener("click", async () => {
  try { const email = $("authEmail").value.trim(); if (!email) throw new Error("Isi email terlebih dahulu untuk menerima tautan pengaturan ulang."); await sendPasswordResetEmail(auth, email); message("Jika email terdaftar, tautan pengaturan ulang kata sandi akan dikirim."); }
  catch (e) { message("Gagal mengirim tautan reset: " + friendlyError(e)); console.error("Firebase password reset error:", e); }
});
$("signOut").addEventListener("click", async () => { try { await signOut(auth); message("Anda sudah keluar.", "Belum masuk"); } catch (e) { message(friendlyError(e)); } });
window.addEventListener("taqwim:push", async () => { try { message("Mengirim data ke Firebase…"); await saveCloud(); alert("Data berhasil dikirim ke Firebase."); } catch (e) { message(friendlyError(e)); alert("Gagal mengirim data: " + friendlyError(e)); } });
window.addEventListener("taqwim:pull", async () => { try { message("Mengambil data dari Firebase…"); await loadCloud(); } catch (e) { message(friendlyError(e)); alert("Gagal menarik data: " + friendlyError(e)); } });
// Escape teks dari Firestore sebelum dimasukkan ke HTML agar daftar pemohon aman ditampilkan.
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  }[ch]));
}

function safeText(value, max=1000) { return String(value || "").trim().slice(0,max); }
const requestStatus = id => $(id);
$("submitRequest")?.addEventListener("click", async () => {
  const name = safeText($("requestName")?.value,100);
  const email = safeText($("requestEmail")?.value,200).toLowerCase();
  const phone = safeText($("requestPhone")?.value,30);
  const role = $("requestRole")?.value;
  const note = safeText($("requestNote")?.value,1000);
  const msg = $("requestMsg");
  try {
    if (!name || !email || !phone) throw new Error("Lengkapi nama, email, dan nomor WhatsApp.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Format email calon anggota belum benar.");
    if (!["Tim Taqwim","Murobby","Murobbiyah","Naqib","Naqibah"].includes(role)) throw new Error("Pilih peran yang tersedia.");
    $("submitRequest").disabled = true;
    if(msg) msg.textContent = "Mengirim permohonan…";
    await addDoc(collection(db,"joinRequests"), {name,email,phone,requestedRole:role,note,status:"pending",createdAt:serverTimestamp(),source:"app"});
    if(msg) msg.textContent = "Permohonan tercatat. Admin utama akan meninjau pengajuan ini. Pengajuan belum memberi akses akun.";
    $("requestName").value=""; $("requestEmail").value=""; $("requestPhone").value=""; $("requestNote").value="";
  } catch(e) { if(msg) msg.textContent = "Gagal mengirim permohonan: " + friendlyError(e); }
  finally { $("submitRequest").disabled = false; }
});
$("directEmail")?.addEventListener("click", () => {
  const name = safeText($("requestName")?.value,100);
  const email = safeText($("requestEmail")?.value,200);
  const phone = safeText($("requestPhone")?.value,30);
  const role = $("requestRole")?.value || "Tim Taqwim";
  const note = safeText($("requestNote")?.value,1000);
  const subject = encodeURIComponent("Permohonan Bergabung TaqwimUPA - " + (name || "Calon Anggota"));
  const body = encodeURIComponent(`Assalamu'alaikum Admin Utama TaqwimUPA,\n\nSaya mengajukan permohonan bergabung.\nNama: ${name}\nEmail: ${email}\nWhatsApp: ${phone}\nPeran diajukan: ${role}\nKeterangan: ${note}\n\nMohon ditinjau. Terima kasih.`);
  window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
});
function renderRequests(snapshot) {
  const list = $("requestList"), count = $("requestCount");
  if (!list || !count) return;
  const docs = snapshot.docs;
  const pending = docs.filter(d => d.data().status === "pending");
  count.textContent = `${pending.length} permohonan menunggu persetujuan · ${docs.length} total permohonan`;
  list.innerHTML = docs.length ? docs.map(d => {
    const r=d.data(); const date=r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString("id-ID") : "Waktu belum tersedia";
    return `<div class="participant"><div class="phead"><b>${esc(r.name||"Tanpa nama")}</b><span class="pill">${esc(r.status||"pending")}</span></div><p class="small">${esc(r.email||"")} · ${esc(r.phone||"")}<br>Peran diajukan: ${esc(r.requestedRole||"-")}<br>${esc(date)}</p><p>${esc(r.note||"")}</p>${r.status==="pending"?`<div class="actions"><button class="primary" data-approve="${esc(d.id)}">Setujui permohonan</button><button class="warn" data-reject="${esc(d.id)}">Tolak</button></div>`:""}</div>`;
  }).join("") : '<p class="muted">Belum ada permohonan.</p>';
  list.querySelectorAll("[data-approve]").forEach(b=>b.onclick=async()=>{
    if(!currentUser || currentUser.email?.toLowerCase()!==ADMIN_EMAIL) return alert("Hanya Admin Utama yang boleh menyetujui permohonan.");
    if(!confirm("Setujui permohonan ini? Jika calon anggota sudah memiliki akun dengan email yang sama, peran yang diajukan akan diaktifkan saat ia masuk berikutnya.")) return;
    try { await updateDoc(doc(db,"joinRequests",b.dataset.approve),{status:"approved",reviewedAt:serverTimestamp(),reviewedBy:currentUser.email}); }
    catch(e){alert("Gagal memperbarui status: "+friendlyError(e));}
  });
  list.querySelectorAll("[data-reject]").forEach(b=>b.onclick=async()=>{
    if(!currentUser || currentUser.email?.toLowerCase()!==ADMIN_EMAIL) return alert("Hanya Admin Utama yang boleh menolak permohonan.");
    if(!confirm("Tolak permohonan ini?")) return;
    try { await updateDoc(doc(db,"joinRequests",b.dataset.reject),{status:"rejected",reviewedAt:serverTimestamp(),reviewedBy:currentUser.email}); }
    catch(e){alert("Gagal memperbarui status: "+friendlyError(e));}
  });
}
function watchRequests(user) {
  if(stopRequestsListener) { stopRequestsListener(); stopRequestsListener=null; }
  const adminBox=$("adminRequests");
  const isAdmin=!!user && user.email?.toLowerCase()===ADMIN_EMAIL;
  adminBox?.classList.toggle("hidden",!isAdmin);
  if(!isAdmin) return;
  stopRequestsListener=onSnapshot(query(collection(db,"joinRequests"),orderBy("createdAt","desc")), renderRequests, err=>{
    const count=$("requestCount"); if(count) count.textContent="Tidak dapat memuat permohonan. Periksa aturan Firestore dan koneksi.";
    console.error(err);
  });
}

async function loadAccessProfile(user) {
  if (!user) {
    activeRole = "unassigned";
    window.dispatchEvent(new CustomEvent("taqwim:role", {detail:{role:activeRole}}));
    return;
  }

  if (user.email?.toLowerCase() === ADMIN_EMAIL) {
    activeRole = "Admin Utama";
    window.dispatchEvent(new CustomEvent("taqwim:role", {detail:{role:activeRole}}));
    return;
  }

  const profileRef = doc(db, "users", user.uid, "profile", "access");
  try {
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      activeRole = String(profileSnap.data()?.role || "unassigned");
    } else {
      // Aktivasi hanya dapat dilakukan jika ada permohonan berstatus approved
      // dengan email dan peran yang sama. Firestore Rules memvalidasi ulang
      // syarat ini saat dokumen profil dibuat.
      const email = String(user.email || "").trim().toLowerCase();
      if (!email) throw new Error("Akun tidak memiliki alamat email.");
      const approvedQuery = query(
        collection(db, "joinRequests"),
        where("email", "==", email),
        where("status", "==", "approved")
      );
      const approvedSnap = await getDocs(approvedQuery);
      const approved = approvedSnap.docs
        .map(d => ({ id:d.id, data:d.data() }))
        .filter(x => ["Tim Taqwim","Murobby","Murobbiyah","Naqib","Naqibah"].includes(x.data.requestedRole))
        .sort((a,b) => {
          const ta = a.data.reviewedAt?.toMillis?.() || 0;
          const tb = b.data.reviewedAt?.toMillis?.() || 0;
          return tb-ta;
        })[0];

      if (!approved) {
        activeRole = "unassigned";
      } else {
        const role = approved.data.requestedRole;
        await setDoc(profileRef, {
          role,
          email,
          approvalRequestId: approved.id,
          assignedBinaan: [],
          activatedAt: serverTimestamp(),
          activatedBy: "approved-request"
        });
        activeRole = role;
      }
    }
  } catch (e) {
    activeRole = "unassigned";
    console.error("Gagal memeriksa atau mengaktifkan profil akses", e);
    message(
      "Akun berhasil masuk, tetapi peran belum dapat diaktifkan. Pastikan Firestore Rules v2.8.1 sudah dipasang. " + friendlyError(e),
      "Perlu pemeriksaan akses"
    );
  }
  window.dispatchEvent(new CustomEvent("taqwim:role", {detail:{role:activeRole}}));
}

onAuthStateChanged(auth, async user => {
  currentUser = user;
  try {
    await loadAccessProfile(user);
    window.dispatchEvent(new CustomEvent("taqwim:session", {detail:{uid:user?.uid||null, email:user?.email||null, role:activeRole}}));
    watchRequests(user);
    $("authState").value = user ? "Masuk: " + user.email : "Belum masuk";
    $("signIn").disabled = !!user;
    $("signUp").disabled = !!user;
    $("signOut").disabled = !user;
    $("pull").disabled = !user;
    $("push").disabled = !user;
    if (user) message("Masuk sebagai " + user.email + ". Data lokal belum otomatis dikirim; tekan Kirim ke Cloud untuk menyimpan.", "Akun masuk");
    else message("Belum masuk. Data peserta disembunyikan sampai akun aktif.", "Belum masuk");
  } catch (e) {
    console.error("Kesalahan saat memeriksa status akun:", e);
    $("authState").value = "Gagal memeriksa akun";
    message("Login terdeteksi, tetapi pemeriksaan profil gagal: " + friendlyError(e), "Perlu pemeriksaan");
  }
});
