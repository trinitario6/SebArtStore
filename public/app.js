// ============================================================
//  Sebastian's Space Art — Firebase Edition
// ============================================================

export const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBJus0fO1qbIyGYjm3xAyno93mLj8B86zg",
  authDomain:        "sebify-87bf5.firebaseapp.com",
  projectId:         "sebify-87bf5",
  storageBucket:     "sebify-87bf5.firebasestorage.app",
  messagingSenderId: "1028317310503",
  appId:             "1:1028317310503:web:c06cf377b0a110bf2fe802"
};

export const GOAL = 200; // default — overridden by Firestore settings/config
export const STATS_PATH = ["stats", "global"];

// ── Stars Background ─────────────────────────────────────────
export function createStars() {
  const container = document.getElementById("stars");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top  = Math.random() * 100 + "%";
    const size = Math.random() * 3 + 1;
    star.style.width  = size + "px";
    star.style.height = size + "px";
    star.style.animationDelay    = Math.random() * 3 + "s";
    star.style.animationDuration = (Math.random() * 2 + 2) + "s";
    container.appendChild(star);
  }
}

// ── Progress Bar helper ──────────────────────────────────────
export function applyProgress(totalPledged, backerCount) {
  const pct    = Math.min(100, (totalPledged / GOAL) * 100);
  const bar    = document.getElementById("progress-bar");
  const pctEl  = document.getElementById("progress-percent");
  const amtEl  = document.getElementById("pledged-amount");
  const backEl = document.getElementById("backer-count");
  if (bar)    bar.style.width = Math.max(pct, 4) + "%";
  if (pctEl)  pctEl.textContent = pct >= 100
    ? "🎉 Goal reached! Mission accomplished!"
    : `${Math.round(pct)}% to launch!`;
  if (amtEl)  amtEl.textContent = `$${Number(totalPledged).toFixed(0)} pledged`;
  if (backEl) backEl.textContent = backerCount;
}

// ── Format Firestore timestamp ───────────────────────────────
export function formatDate(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Build Storage download URL without SDK getDownloadURL() ──
export function storageUrl(bucket, filePath) {
  const encoded = encodeURIComponent(filePath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encoded}?alt=media`;
}
