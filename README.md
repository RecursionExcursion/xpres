# xpres 🚀


![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-✔️-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express.js-%F0%9F%9A%80-lightgrey)
![Issues](https://img.shields.io/github/issues/RecursionExcursion/xpres)
![Last Commit](https://img.shields.io/github/last-commit/RecursionExcursion/xpres)

A web API that delivers prebuilt starter folders for Node.js + Express applications — in JavaScript or TypeScript.  
Think of it as your jumpstart tool for bootstrapping Express apps with best practices baked in.

---

## 🧪 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **AJV** (JSON schema validation)
- **Archiver** (for zipping starter folders)

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/xpres.git
cd xpres
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root directory:

```bash
PORT=<int>
```

## 🏁 Running the App

```bash
npm run start
```

The API will start on the port you defined in .env.

## 🔌 API Endpoints

## Base path: /express

### GET /express/starter/:template

Returns a zipped starter folder with the selected template (js or ts).

Example:

GET /express/starter/ts

### POST /express

Creates a custom Express starter based on user input (validated via AJV).

### GET /express/templates

Returns a list of available base templates (js, ts, etc).

## 📁 What’s in a Starter?

Each generated starter folder includes:

    package.json

    index.js or index.ts

    tsconfig.json (for TypeScript templates)

    .gitignore



