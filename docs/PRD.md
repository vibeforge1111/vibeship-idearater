# Vibeship IdeaRater

**Get roasted. Get better. Get building.**

---

## The One-Liner

Describe your startup idea → Get a brutally honest scorecard → Share it (or hide the idea and flex just the score).

---

## Why This Exists

Every founder validation tool out there does the same thing: generates a boring PDF report nobody reads, asks for your email first, and gives you wishy-washy "it depends" feedback.

Founders don't need a report. They need:
1. **A verdict** - Is this worth my next 6 months?
2. **Bragging rights** - Something to post when they score high
3. **A path forward** - What to do next if it's not perfect

Vibeship IdeaRater gives all three in under 30 seconds.

---

## The User Journey

### Moment 1: "I have an idea"

User lands on a single input field. No signup. No friction. Just:

> "Describe your startup idea in plain English"

That's it. One textarea. One button: **"Roast My Idea"**

Below: a few example ideas they can click to see how it works.

### Moment 2: "Show me what you got"

10-second animated analysis. Each dimension lights up as it's evaluated:

- Finding your customers...
- Sizing your market...
- Scanning competitors...
- Checking YC fit...

This isn't just a loading screen. It's building anticipation.

### Moment 3: "The Reveal"

The scorecard appears. This is the product.

```
┌─────────────────────────────────────────┐
│                                         │
│              🎯 73/100                  │
│                                         │
│   "A solid idea with one fatal flaw"   │
│                                         │
│   ████████░░ Problem Clarity    78     │
│   ██████░░░░ Market Size        62     │
│   █████████░ Competition        85     │
│   ███████░░░ Execution          71     │
│                                         │
│         ┌─────────────────┐             │
│         │   YC: MAYBE 🤔  │             │
│         └─────────────────┘             │
│                                         │
│   💡 "Your moat is weaker than you     │
│      think. Three funded competitors    │
│      already own this positioning."     │
│                                         │
└─────────────────────────────────────────┘
```

The key insight at the bottom is the real value. Not just a score - a specific, actionable observation.

### Moment 4: "I want to share this"

Two modes:

**Public Mode:** Full scorecard with idea visible. For when you're proud or want feedback.

**Stealth Mode:** Scores visible, idea blurred. Shows "Ask me about my 73/100 idea 👀" - lets you flex without giving away the goods.

One tap: download image or share directly to X/LinkedIn/Instagram.

### Moment 5: "How do I fix this?"

Below the scorecard, not above it, not interrupting it:

> **"Want to improve this score?"**
>
> Based on your weak points, these would help:
> - **Market Researcher** → Get real TAM numbers with sources
> - **Competitor Scout** → Deep dive on those 3 funded players
>
> [Explore on Spawner →]

This only appears AFTER they've gotten value. The recommendations are specific to their weaknesses, not generic upsells.

---

## What Makes This Different

### vs. Generic AI validators
They give you 2,000 words of hedged nonsense. We give you a number and one killer insight.

### vs. Startup scoring sites
They hide results behind email walls and paywalls. We show you everything instantly, then earn the conversion.

### vs. Asking ChatGPT
No structure, no shareability, no benchmark. We give you a card you can actually post.

### The emotional design principle

Most tools optimize for "comprehensive." We optimize for:

1. **Speed** - Value in under 30 seconds
2. **Clarity** - One number, one insight, one verdict
3. **Shareability** - Designed for screenshots
4. **Dignity** - Even low scores feel constructive, not crushing

---

## The Scorecard (This Is Everything)

The scorecard isn't a feature. It's the entire product. Everything else exists to make this card shareable.

### Dimensions (4, not 5 - simpler is better)

| Dimension | What It Actually Means |
|-----------|----------------------|
| **Problem Clarity** | Do you know who has this problem and how badly? |
| **Market Size** | Is this a $10M market or a $10B market? |
| **Competition** | Are you walking into a bloodbath or a blue ocean? |
| **Execution** | Can a small team ship an MVP in 8 weeks? |

### The YC Verdict

Three options, no hedging:

- **YES** 🟢 - "This fits YC's thesis. Apply."
- **MAYBE** 🟡 - "Interesting but needs one big unlock."  
- **PASS** 🔴 - "Not a VC-scale business. Could still be great."

### The Killer Insight

One sentence. The most important thing about this idea. Examples:

- "Your real competitor isn't [X], it's Excel spreadsheets."
- "This is a feature, not a company. Who's the platform?"
- "You're solving a problem that's about to be regulated away."
- "The timing is perfect. Three trends converging in your favor."

This insight is what makes people screenshot and share. It's the "holy shit" moment.

---

## Spawner Integration (The Business Model)

### Philosophy

Spawner recommendations should feel like a helpful friend, not a sales pitch. They appear:
- After the user has received full value
- Only when genuinely relevant to identified weaknesses
- As suggestions, not gates

### Mapping Weaknesses to Skills

| Low Score In | Spawner Skill | One-Line Pitch |
|--------------|---------------|----------------|
| Problem Clarity | Problem Discovery | "Talk to 10 customers in 10 minutes" |
| Market Size | Market Researcher | "Get TAM numbers you can cite" |
| Competition | Competitor Intel | "Know what you're walking into" |
| Execution | MVP Architect | "Scope something you can ship this month" |
| YC Verdict | Pitch Coach | "Nail the one-liner" |

### Always Available

Regardless of score, offer:
- **Landing Page Builder** - "Start collecting emails tonight"
- **Idea Refiner** - "Run this through 10 variations"

---

## Technical Decisions

### What to build

- Next.js (App Router)
- Tailwind + Framer Motion for the reveal animation
- Claude Sonnet for analysis
- Satori for OG image generation
- Supabase for storing scorecards (shareable links)

### What NOT to build (for MVP)

- User accounts (add later for history)
- Leaderboards (add later for engagement)
- Competitor analysis mode (add later)
- Payment/premium tier (validate virality first)

### Speed targets

- Idea submission → First animation: < 500ms
- Full analysis complete: < 10 seconds
- Scorecard image generation: < 2 seconds

---

## Launch Checklist

### Week 1-2: Core Loop
- [ ] Input → Analysis → Scorecard flow
- [ ] Static scorecard image generation
- [ ] Share to X with pre-filled text
- [ ] Mobile-responsive design

### Week 3-4: Viral Mechanics
- [ ] Stealth mode (blur idea, show scores)
- [ ] Platform-optimized image sizes
- [ ] Unique shareable URLs
- [ ] "Rate another idea" loop

### Week 5-6: Spawner Funnel
- [ ] Weakness-to-Skill mapping
- [ ] Deep links to Spawner
- [ ] Conversion tracking
- [ ] A/B test CTA placement

---

## Success = One Thing

People screenshot their scorecards and post them to X.

If that's happening organically, everything else follows. If it's not, nothing else matters.

---

## The Tone

Vibeship IdeaRater should feel like getting feedback from a smart friend who's seen 1,000 pitch decks:

- Direct, not mean
- Specific, not generic  
- Constructive, not deflating
- Confident, not hedging

Even a 34/100 should make the user think "damn, they're right" not "this is bullshit."

---

*Ship it. See if it spreads. Iterate.*
