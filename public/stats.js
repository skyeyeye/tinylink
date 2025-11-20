(async function() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const loading = document.getElementById("loading");
  const notfound = document.getElementById("notfound");
  const stats = document.getElementById("stats");

  const res = await fetch("/api/links/" + code);

  if (res.status !== 200) {
    loading.classList.add("hidden");
    notfound.classList.remove("hidden");
    return;
  }

  const data = await res.json();

  document.getElementById("codeVal").textContent = data.code;
  document.getElementById("urlVal").textContent = data.targetUrl;
  document.getElementById("clicksVal").textContent = data.clicks;
  document.getElementById("lastVal").textContent = data.lastClicked || "-";
  document.getElementById("createdVal").textContent = data.createdAt;

  document.getElementById("openBtn").href = "/" + data.code;

  loading.classList.add("hidden");
  stats.classList.remove("hidden");
})();
