# Proje README

Bu proje, [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) ile başlatılmış bir **Next.js** uygulamasıdır. Arayüz bileşenleri için **Ant Design (antd)**, grafikler için **echarts-for-react**, durum yönetimi için **Zustand**, MQTT tabanlı veri akışı için **mqtt**, ve lokal sahte API için **json-server** kullanılmaktadır.

---

## Mimari ve Bileşenler

* **Next.js (UI / Pages)**: Uygulamanın istemci ve sunucu tarafı render katmanı.
* **Ant Design (antd)**: Formlar, tablolar ve genel UI bileşenleri.
* **echarts-for-react**: Grafiklerin React bileşenleri üzerinden gösterimi.
* **Zustand**: Hafif durum yönetimi (store tabanlı yaklaşım).
* **mqtt**: MQTT broker’a bağlanarak gerçek zamanlı veri tüketimi.
* **json-server**: Lokal geliştirmede sahte REST API ve statik veri sağlayıcı.
* **concurrently (devDependency)**: Geliştirme sırasında Next.js ve JSON Server’ı aynı anda çalıştırma.

---

## Kullanılan Paketler

```json
{
  "dependencies": {
    "antd": "^5.27.0",
    "echarts-for-react": "^3.0.2",
    "json-server": "^1.0.0-beta.3",
    "mqtt": "^5.14.0",
    "next": "15.4.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "zustand": "^5.0.7"
  },
  "devDependencies": {
    "concurrently": "^9.2.0"
  }
}
```

> Versiyonlar `package.json` ile senkron tutulmalıdır.

---

## Önkoşullar

* **Node.js** 18+ (önerilir) ve **npm**/**yarn**/**pnpm**/**bun**
* Geliştirme ortamında **3000** (Next.js) ve **3001** (JSON Server) portlarının boş olması

---

## Kurulum ve Çalıştırma

1. Bağımlılıkların kurulumu:

   ```bash
   npm install
   ```
2. Geliştirme ortamını başlatma (Next.js + JSON Server):

   ```bash
   npm run dev
   ```

> Uygulama: [http://localhost:3000](http://localhost:3000)
> JSON Server: [http://localhost:3001](http://localhost:3001)

---

## Konfigürasyon (MQTT / DEMO Modu)

Uygulama, MQTT üzerinden canlı veri çekimini destekler. Değerlendirme sırasında yaşanan broker yanıtının tek kayıt ve tüm alanların `0` dönmesi durumuna karşı **DEMO modu** ile **dummy data** üzerinden grafikler devreye alınmıştır.

* **DEMO Modu**: Canlı akış yerine sahte veriyle grafiklerin çalışmasını gösterir.
* **Topic Değişimi**: Canlı veri akışı sağlandığında DEMO kapatılarak topic `$SYS` (veya proje içinde tanımlı sistem topic’i) olarak ayarlanır.

> **Not:** Projede bir `DEMO` değişkeni bulunmaktadır. Değişken adlandırması ve kullanım yeri kod içinde tanımlıdır. İhtiyaç halinde `.env.local` dosyasında aşağıdaki örneğe benzer şekilde ayarlanabilir (gerçek isimleri proje koduyla eşleştiriniz):
>
> ```env
> # Örnek/temsili anahtarlar — kendi kodunuzdaki isimlerle eşleştiriniz
> NEXT_PUBLIC_DEMO=true
> NEXT_PUBLIC_MQTT_URL=wss://broker.example.com:8083/mqtt
> NEXT_PUBLIC_MQTT_USERNAME=
> NEXT_PUBLIC_MQTT_PASSWORD=
> NEXT_PUBLIC_MQTT_TOPIC=$SYS/#
> ```

---

## JSON Server

* Varsayılan olarak `db.json` dosyasını baz alır ve REST uç noktaları üretir.
* Örnek kullanım:

  ```bash
  npx json-server --watch db.json --port 3001
  ```
* `npm run dev` komutu, **concurrently** aracılığıyla Next.js ve JSON Server’ı paralel başlatacak şekilde ayarlanmıştır (package.json’daki script’e göre).

---

## Komutlar

* Geliştirme:

  ```bash
  npm run dev
  ```
* (Opsiyonel) JSON Server’ı tek başına çalıştırma:

  ```bash
  npx json-server --watch db.json --port 3001
  ```

> Diğer paket yöneticileri ile çalışma: `yarn dev`, `pnpm dev`, `bun dev` (script’leriniz destekliyorsa).

---