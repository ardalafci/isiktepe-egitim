const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Global EVENTS_DATA'ya erişim (main.js'deki diziyi buraya da kopyalaman gerekecek veya tek bir config dosyası yapabiliriz)
// Şimdilik test için basit bir yapı:
const events = [
    { title: 'Mentorluk Programı', date: '10.06.2026', description: 'Detaylı mentorluk bilgileri...' },
    { title: 'Kariyer Günleri', date: '15.06.2026', description: 'Kariyer günü detayları...' }
];

const event = events[id];
if (event) {
    document.getElementById('event-title').innerText = event.title;
    document.getElementById('event-date').innerText = event.date;
    document.getElementById('event-content').innerText = event.description;
}