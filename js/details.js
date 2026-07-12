// 1. Verini buraya tanımla (main.js'den kopyaladığın verinin aynısı olmalı)
const EVENTS_DATA = [
    {
        day: '02',
        month: '08',
        year: 2026,
        title: '1. Olağan Genel Kurul İlanı',
        description: `Işıktepe Eğitim Gönüllüleri Derneği Yönetim Kurulu tarafından 1. Olağan Genel Kurul Toplantısı’na tüm üyelerimiz davetlidir.

1. Toplantı Tarihi: 02/08/2026, Saat: 12:00
Yer: Dernek Binası

(İlk toplantıda çoğunluk sağlanamadığı takdirde; 2. toplantı 15/08/2026 tarihinde, aynı saat ve yerde çoğunluk şartı aranmaksızın yapılacaktır.)

Detaylı bilgi için <a href="assets/pdf/1.pdf" target="_blank" style="color: blue; text-decoration: underline;">tıklayınız</a>.`,
        pdfLink: 'assets/pdf/1.pdf',
        status: 'upcoming'
    },
    {
        day: '—',
        month: '—',
        year: 2026,
        title: 'Kuruluş Buluşması',
        description: 'Derneğimizin kuruluş sürecini ve vizyonumuzu paylaştığımız ilk topluluk buluşması.',
        status: 'past'
    }
];

// 2. URL'den ID'yi al
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const event = EVENTS_DATA[id];

// 3. Veriyi sayfaya bas
if (event) {
    document.getElementById('event-title').innerText = event.title;
    
    // Tarih formatı
    const dateText = event.day === '—' ? 'Tarih Belirlenmedi' : `${event.day}.${event.month}.${event.year}`;
    document.getElementById('event-date').innerText = dateText;
    
    // ÖNEMLİ: innerHTML kullanıyoruz ki link çalışsın
    // .replace(/\n/g, '<br>') ile satır atlamaları HTML'e çeviriyoruz
    document.getElementById('event-content').innerHTML = event.description.replace(/\n/g, '<br>');
} else {
    document.getElementById('event-title').innerText = "Etkinlik bulunamadı.";
}