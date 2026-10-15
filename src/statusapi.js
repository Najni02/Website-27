function editcard(status, auraid, badgeid) {
    const aura = document.getElementById(auraid);
    const badge = document.getElementById(badgeid);

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
        
        if (data.online) {
            const serveraura = document.getElementById('serveraura');
            const serverbadge = document.getElementById('serverbadge');
            serveraura.classList.remove('border-warning');
            serveraura.classList.add('border-success');
            serverbadge.classList.remove('badge-warning');
            serverbadge.classList.add('badge-success');
            serverbadge.innerHTML = 'Online';

            editcard(data.immich, "immichaura", "immichbadge");
            editcard(data.n8n, "n8naura", "n8nbadge");
            editcard(data.pelican, "pelicanaura", "pelicanbadge");
            const mcbadge = document.getElementById('mcbadge');
            if (data.mc == 'true') {
                loadmc();
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
reload();