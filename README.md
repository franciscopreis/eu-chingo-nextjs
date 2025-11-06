# Eu-Chingo

[![Vercel](https://img.shields.io/badge/deployed_on-vercel-black)](https://eu-chingo.vercel.app)
[![Next.js](https://img.shields.io/badge/next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5-blue?logo=typescript)](https://www.typescriptlang.org)

[![Roadmap](https://img.shields.io/badge/roadmap-available-blue)](ROADMAP.md)
[![Dev_Journey](https://img.shields.io/badge/dev_journey-available-blue)](DEV_JORUNEY.md)

A modern full-stack web application I built to make the ancient I Ching divination system accessible to everyone (mainly to the Portuguese speakers), whether you're new to it or already practice it.

**Throw some coins, get some wisdom, save your journey.** ✨

(nice slogan, right?)

_PS: I experimented building I Ching apps in the past, but this time I got serious about programming. It seemed like a more interesting portfolio project than yet another todo app._

## ✨ What It Does

### 🔮 Readings & Divination

- **Coin method**: Classic three coin approach, digitally recreated (other methods are coming soon)
- **Reading logs**: Watch your hexagram form step by step
- **Flexible Display**: 3 different ways to see your reading
- **Guest Mode**: Try it out before you register

### 📚 Study & Learning

- **Reading Archive**: Save and manage your reading history
- **Traditional texts**: Wilhelm/Baynes translations for each hexagram
- **Personal insights**: Add your own interpretations and notes
- **Reference Tables**: Two different hexagram reference tables
- **MDX Blog**: I Ching fundamentals and history that I actually wrote

### 👤 Your Space

- **Authentication**: Register once, access everywhere
- **Responsive Design**: Works on desktop and mobile
- **Dark/Light Theme**: Toggle based on your preference
- **Profile Management**: Update your info, change passwords
- **Donation**: Stripe integration
- **Verification email**: SendGrid setup (hello spam)

## 🛠️ Stack

**Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS, Context API
**Backend:** Next.js API Routes, SQLite, JWT, Zod, bcrypt, Stripe, SendGrid
**Deployment:** Vercel, Turso

## 📁 Under the Hood

I went with feature-based architecture to keep things organized:

```bash
reading/
├── components/     # UI Layer
├── lib/           # Business Logic
│   ├── services/  # What it does
│   └── repositories/ # Where data lives
├── hooks/         # State management
└── types/         # Type definitions

```

_I'll probably refactor this again next week and make my whole application crash because I can't help myself._

This project was my deep dive into full-stack development, where I discovered:

- **TypeScript** went from "annoying" to "essential" halfway through
- **Server Actions** create cleaner code but can be tricky to debug
- **Direct SQL** over ORMs helped me actually understand data flow
- **Feature-based architecture** saved me when adding new features
- **Planning ahead** saves hours of refactoring _(I learned this the hard way)_

## 🗺️ Roadmap

Curious about what's next? Check out our [development roadmap](ROADMAP.md) to see the features we're excited to build!

---

## 🔮 Try It Out

Live at: [eu-chingo.vercel.app](https://eu-chingo.vercel.app)

---

_Built as a portfolio project, because I wanted a better I Ching experience, and apparently I also wanted to learn every modern web technology at once._
