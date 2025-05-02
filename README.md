# FiveM discord License System

A secure license management system for your server. Easily manage and verify server licenses for your online applications.

## Keywords
license management, server license, license validation, secure license system, server tools, online verification


## Description / Açıklama

This project is a license verification system for FiveM servers. It checks IP addresses against a database and sends notifications to Discord about the license status.

Bu proje, FiveM sunucuları için bir lisans doğrulama sistemidir. IP adreslerini bir veritabanı ile karşılaştırır ve lisans durumu hakkında Discord'a bildirim gönderir.

## Features / Özellikler

- **IP Verification:** Checks if the given IP address is licensed by querying the database.
- **Discord Webhook Integration:** Sends notifications to Discord about valid and invalid IP addresses.
- **Database Integration:** Stores and queries IP addresses from a MySQL database.
- **REST API:** You can verify IP addresses through the `/check_ips` endpoint.

- **IP Doğrulama:** Veritabanında kayıtlı olan IP adreslerinin geçerliliğini kontrol eder.
- **Discord Webhook Entegrasyonu:** Geçerli ve geçersiz IP adresleri hakkında Discord'a bildirim gönderir.
- **Veritabanı Entegrasyonu:** IP adreslerini MySQL veritabanına kaydeder ve sorgular.
- **REST API:** `/check_ips` endpoint'ini kullanarak IP adreslerini doğrulayabilirsiniz.

## Getting Started / Başlangıç

Follow these steps to set up the project locally.

Bu adımları takip ederek projeyi bilgisayarınızda çalıştırabilirsiniz.

### Prerequisites / Gereksinimler

- **Node.js** (v16.x or higher)
- **MySQL**
- **Discord Webhook URL**

- **Node.js** (v16.x veya daha yüksek)
- **MySQL**
- **Discord Webhook URL**

### Installation / Kurulum

1. **Database Setup / Veritabanı Kurulumu:**
   - Use the database file in the `DB` folder to create the database.
   - DB klasöründeki veritabanı dosyasını kullanarak veritabanını oluşturun.

2. **Module Installation / Modül Kurulumu:**
   - Run the `setup.bat` file to install the necessary modules.
   - Ardından, `setup.bat` dosyasını çalıştırarak gerekli modülleri kurun.

3. **Configuration / Yapılandırma:**
   - Edit the `config.json` file and configure it according to your needs.
   - `config.json` dosyasını düzenleyin ve ihtiyaçlarınıza göre yapılandırın.

4. **Run the Server / Sunucu Çalıştırma:**
   - The server must be always on, so it should be hosted on a VDS (Virtual Dedicated Server) or a similar environment.
   - Sunucu her zaman açık olmalıdır, bu yüzden VDS (Virtual Dedicated Server) veya benzeri bir ortamda sunucunun aktif durumda olması gerekmektedir.

5. **Usage / Kullanım:**
   - Once the installation and configuration are completed, you can use the system as per your needs.
   - Kurulum ve yapılandırma işlemleri tamamlandıktan sonra, sistemi ihtiyaçlarınıza göre kullanabilirsiniz.


