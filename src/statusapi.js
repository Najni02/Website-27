function editcard(status, id) {
    const aura = document.getElementById(id+'aura');
    const badge = document.getElementById(id+'badge');

    if (status) {
        aura.classList.add("aura", "text-success");
        badge.classList.remove("badge-warning");
        badge.classList.add("badge-success");
        badge.innerHTML = "Online";
    } else {
        aura.classList.add("aura", "text-error");
        badge.classList.remove("badge-warning");
        badge.classList.add("badge-error");
        badge.innerHTML = "Offline";
    }
}
//editcard(false, "immichaura", "immichbadge");

async function reload() {
    try {
        const response = await fetch('https://api.janamrhein.ch/status');
        const data = await response.json()
        console.log(data);
        if (data.online) {
            const serveraura = document.getElementById('serveraura');
            const serverbadge = document.getElementById('serverbadge');
            serveraura.classList.remove('border-warning');
            serveraura.classList.add('border-success');
            serverbadge.classList.remove('badge-warning');
            serverbadge.classList.add('badge-success');
            serverbadge.innerHTML = 'Online';

            editcard(data.immich, "immich");
            editcard(data.n8n, "n8n");
            editcard(data.pelican, "pelican");
            editcard(data.plan, "plan");
            editcard(data.bluemap, "bm");
            const mcbadge = document.getElementById('mcbadge');
            if (data.mc == 'Online') {
                 await loadmc();
            } else if (data.mc == 'false') {
                mcbadge.classList.remove('badge-warning');
                mcbadge.classList.add('badge-error')
                mcbadge.innerHTML = 'Offline';
            } else {
                mcbadge.innerHTML = data.mc;
            }
        } else {
            console.error("Backend nicht erreichbar!")
            const serveraura = document.getElementById('serveraura');
            const serverbadge = document.getElementById('serverbadge');
            serveraura.classList.remove('border-warning');
            serveraura.classList.add('border-error');
            serverbadge.classList.remove('badge-warning');
            serverbadge.classList.add('badge-error');
            serverbadge.innerHTML = 'Offline';
        }    
    } catch {
        console.error("Backend nicht erreichbar!")
        const serveraura = document.getElementById('serveraura');
        const serverbadge = document.getElementById('serverbadge');
        serveraura.classList.remove('border-warning');
        serveraura.classList.add('border-error');
        serverbadge.classList.remove('badge-warning');
        serverbadge.classList.add('badge-error');
        serverbadge.innerHTML = 'Offline';

    }
}
async function loadmc() {
    const response = await fetch('https://api.mcstatus.io/v2/status/java/janamrhein.ch?query=false');
    const data = await response.json();
    console.log(data);
    const mcbadge = document.getElementById('mcbadge');
    if (data.online) {
        mcbadge.classList.remove("badge-warning");
        mcbadge.classList.add("badge-success");
        mcbadge.innerHTML = "Online";
        document.getElementById('mcinfo').classList.remove('hidden');

        document.getElementById('version').innerHTML = data.version.name_clean;
        document.getElementById('player').innerHTML = data.players.online + '/' + data.players.max;
    } else {
        mcbadge.innerHTML = 'Nicht öffentlich';
    }
}
reload();

async function renderPlayerList() {
    const response = await fetch('https://api.mcstatus.io/v2/status/java/janamrhein.ch?query=false');
    const data = await response.json();
    const playerListEl = document.getElementById('playerlist');
  
    // Vorherigen Inhalt leeren
    playerListEl.innerHTML = '';

    // Prüfen, ob die Liste leer oder nicht vorhanden ist
    if (!data.players.list || data.players.list.length === 0) {
    const li = document.createElement('li');
    li.className = 'list-row text-error';
    li.textContent = 'Keine Spieler online';
    playerListEl.appendChild(li);
    return;
  }

  // Für jeden Spieler einen Listeneintrag erstellen
  data.players.list.forEach(player => {
    const li = document.createElement('li');
    li.className = 'list-row';
    li.textContent = player.name_clean;
    playerListEl.appendChild(li);
  });
}


let clickCount = 0;
let resetTimer;

document.getElementById("player").addEventListener("click", async () => {
  clickCount++;

  // Wenn 5 Klicks erreicht sind
  if (clickCount === 5) {
    await renderPlayerList();
    document.getElementById('playermodal').showModal()

    // Zähler direkt zurücksetzen
    clickCount = 0;
    document.getElementById("counter").textContent = clickCount;
  }

  // Optional: Zähler nach 1,5 Sekunden Inaktivität wieder auf 0 setzen
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    clickCount = 0;
  }, 1500);
});

