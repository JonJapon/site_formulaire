const DISCORD_URL = "https://discord.com/api/webhooks/1454621667094695956/NK1IJ53JX_c6fYzvSrB7Lbj0bpc_q9saExNiG4IBbsPUi6ZkUyrORCS7omPglebDEpO3";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupération des valeurs, incluant l'ID Discord
            const pseudo = document.getElementById('p-pseudo').value;
            const discordID = document.getElementById('p-discord-id').value; // <--- NOUVEAU
            const game = document.getElementById('p-game').value;
            const date = document.getElementById('p-date').value;
            const time = document.getElementById('p-time').value;
            const duration = document.getElementById('p-duration').value;
            const age = document.getElementById('p-age').value;

            // Création du lien vers le profil/DM Discord
            // Ce lien forcera l'ouverture du profil de la personne sur Discord
            const lienDiscord = `https://discord.com/users/${discordID}`;

            const message = {
                username: "Gestionnaire de RDV",
                embeds: [{
                    title: "🎮 Nouvelle demande à traiter",
                    description: `Un joueur souhaite réserver une session.`,
                    color: 5814783,
                    fields: [
                        { name: "👤 Joueur", value: `${pseudo}`, inline: true },
                        { name: "🆔 ID Discord", value: `\`${discordID}\``, inline: true },
                        { name: "🎂 Âge", value: age + " ans", inline: true },
                        { name: "🕹️ Jeu", value: game, inline: false },
                        { name: "📅 Date & Heure", value: `${date} à ${time}`, inline: true },
                        { name: "⏳ Durée", value: `${duration}h`, inline: true },
                        { 
                            name: "─── RÉPONDRE AU JOUEUR ───", 
                            value: `[✅ ACCEPTER (Ouvrir DM)](${lienDiscord}) \n [❌ REFUSER (Ouvrir DM)](${lienDiscord})`, 
                            inline: false 
                        }
                    ],
                    footer: { text: "Le lien ouvre directement le profil du joueur" },
                    timestamp: new Date()
                }]
            };

            fetch(DISCORD_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(message)
            })
            .then(response => {
                if (response.ok) {
                    alert("✅ Demande envoyée !");
                    form.reset();
                } else {
                    alert("❌ Erreur Discord : " + response.status);
                }
            })
            .catch(error => console.error("Erreur :", error));
        });
    }
});