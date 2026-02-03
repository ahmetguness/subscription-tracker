# Subscription Tracker (SubDub) - Türkçe

Bu, SubDub adlı bir abonelik takip hizmeti için bir backend uygulamasıdır. Kullanıcıların aboneliklerini yönetmelerini sağlar.

## Özellikler

*   Kullanıcı kimlik doğrulaması (kayıt olma, giriş yapma)
*   Abonelikler için CRUD işlemleri (Oluşturma, Okuma, Güncelleme, Silme)
*   Kullanıcı profili yönetimi

## Kullanılan Teknolojiler

*   **Backend:** Node.js, Express.js
*   **Veritabanı:** Mongoose ile MongoDB
*   **Kimlik Doğrulama:** JSON Web Tokens (JWT)
*   **Güvenlik:** Arcjet
*   **Dil:** TypeScript

## Kurulum

1.  Depoyu klonlayın:
    ```bash
    git clone https://github.com/your-username/subscription-tracker.git
    ```
2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
3.  Kök dizinde bir `.env` dosyası oluşturun ve aşağıdaki ortam değişkenlerini ekleyin:
    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

## Uygulamayı Çalıştırma

*   **Geliştirme:**
    ```bash
    npm run dev
    ```
*   **Prodüksiyon:**
    ```bash
    npm start
    ```

## API Endpoints

### Auth

*   `POST /api/auth/signup` - Kullanıcı kaydı
*   `POST /api/auth/login` - Kullanıcı girişi

### Abonelikler

*   `GET /api/subscriptions` - Kimliği doğrulanmış kullanıcının tüm aboneliklerini alın
*   `GET /api/subscriptions/:id` - Belirli bir aboneliği alın
*   `POST /api/subscriptions` - Yeni bir abonelik oluşturun
*   `PUT /api/subscriptions/:id` - Bir aboneliği güncelleyin
*   `DELETE /api/subscriptions/:id` - Bir aboneliği silin

### Kullanıcı

*   `GET /api/user/me` - Kimliği doğrulanmış kullanıcının profilini alın

## Mail Entegrasyonu

Bu proje, çeşitli etkinlikler için e-posta bildirimleri gönderecek şekilde yapılandırılmıştır, örneğin:

*   **Abonelik Hatırlatıcıları:** Bir aboneliğin süresi dolmadan birkaç gün önce bir hatırlatma e-postası gönderir.
*   **Hoş Geldiniz E-postası:** Başarılı bir şekilde kaydolan yeni kullanıcılara bir hoş geldiniz e-postası gönderir.
*   **Şifre Sıfırlama:** E-posta yoluyla bir şifre sıfırlama sürecini kolaylaştırır.



# Subscription Tracker (SubDub)

This is a backend application for a subscription tracker service called SubDub. It allows users to manage their subscriptions.

## Features

*   User authentication (signup, login)
*   CRUD operations for subscriptions (Create, Read, Update, Delete)
*   User profile management

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose
*   **Authentication:** JSON Web Tokens (JWT)
*   **Security:** Arcjet
*   **Language:** TypeScript

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/subscription-tracker.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the following environment variables:
    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

## Running the Application

*   **Development:**
    ```bash
    npm run dev
    ```
*   **Production:**
    ```bash
    npm start
    ```

## API Endpoints

### Auth

*   `POST /api/auth/signup` - User signup
*   `POST /api/auth/login` - User login

### Subscriptions

*   `GET /api/subscriptions` - Get all subscriptions for the authenticated user
*   `GET /api/subscriptions/:id` - Get a specific subscription
*   `POST /api/subscriptions` - Create a new subscription
*   `PUT /api/subscriptions/:id` - Update a subscription
*   `DELETE /api/subscriptions/:id` - Delete a subscription

### User

*   `GET /api/user/me` - Get the authenticated user's profile

## Mail Integration

This project is configured to send email notifications for various events, such as:

*   **Subscription Reminders:** Sends a reminder email a few days before a subscription is due to expire.
*   **Welcome Email:** Sends a welcome email to new users upon successful registration.
*   **Password Reset:** Facilitates a password reset process via email.