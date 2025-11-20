async function loadLinks() {
  const loading = document.getElementById("loading");
  const empty = document.getElementById("empty");
  const table = document.getElementById("table");
  const tbody = document.getElementById("tbody");

  loading.classList.remove("hidden");
  empty.classList.add("hidden");
  table.classList.add("hidden");

  const res = await fetch("/api/links");
  const links = await res.json();

  if (links.length === 0) {
    loading.classList.add("hidden");
    empty.classList.remove("hidden");
    return;
  }

  tbody.innerHTML = "";
  links.forEach(l => {
    tbody.innerHTML += `
      <tr class="border-b">
        <td class="py-2">${l.code}</td>
        <td class="py-2 truncate max-w-xs">${l.targetUrl}</td>
        <td class="py-2">${l.clicks}</td>
        <td class="py-2">
          <a href="/code.html?code=${l.code}" class="text-blue-600 mr-2">Stats</a>
          <button onclick="deleteLink('${l.code}')" class="text-red-600">Delete</button>
        </td>
      </tr>`;
  });

  loading.classList.add("hidden");
  table.classList.remove("hidden");
}

async function deleteLink(code) {
  if (!confirm("Delete this link?")) return;

  await fetch("/api/links/" + code, { method: "DELETE" });
  loadLinks();
}

document.getElementById("createBtn").addEventListener("click", async () => {
  const url = document.getElementById("targetUrl").value.trim();
  const code = document.getElementById("customCode").value.trim();
  const msg = document.getElementById("formMsg");

  msg.textContent = "";

  if (!url.startsWith("http")) {
    msg.textContent = "Enter a valid URL with http/https";
    return;
  }

  const res = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ targetUrl: url, code })
  });

  if (res.status === 409) {
    msg.textContent = "Code already exists";
    return;
  }

  if (res.status !== 201) {
    msg.textContent = "Error creating link";
    return;
  }

  msg.textContent = "Created!";
  loadLinks();
});

loadLinks();
