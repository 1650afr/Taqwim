import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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
  catch (e) { message(friendlyError(e)); }
});
$("resetPassword").addEventListener("click", async () => {
  try { const email = $("authEmail").value.trim(); if (!email) throw new Error("Isi email terlebih dahulu untuk menerima tautan pengaturan ulang."); await sendPasswordResetEmail(auth, email); message("Jika email terdaftar, tautan pengaturan ulang kata sandi akan dikirim."); }
  catch (e) { message(friendlyError(e)); }
});
$("signOut").addEventListener("click", async () => { try { await signOut(auth); message("Anda sudah keluar.", "Belum masuk"); } catch (e) { message(friendlyError(e)); } });
window.addEventListener("taqwim:push", async () => { try { message("Mengirim data ke Firebase…"); await saveCloud(); alert("Data berhasil dikirim ke Firebase."); } catch (e) { message(friendlyError(e)); alert("Gagal mengirim data: " + friendlyError(e)); } });
window.addEventListener("taqwim:pull", async () => { try { message("Mengambil data dari Firebase…"); await loadCloud(); } catch (e) { message(friendlyError(e)); alert("Gagal menarik data: " + friendlyError(e)); } });
onAuthStateChanged(auth, user => {
  currentUser = user;
  $("authState").value = user ? "Masuk: " + user.email : "Belum masuk";
  $("signIn").disabled = !!user;
  $("signUp").disabled = !!user;
  $("signOut").disabled = !user;
  $("pull").disabled = !user;
  $("push").disabled = !user;
  if (user) message("Masuk sebagai " + user.email + ". Data lokal belum otomatis dikirim; tekan Kirim ke Cloud untuk menyimpan.", "Firebase terhubung");
  else message("Belum masuk ke Firebase. Data lokal tetap tersimpan di perangkat.", "Belum masuk");
});
