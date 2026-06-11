# BambuMind 🐼🎋

**BambuMind** is an MCP (Model Context Protocol) server built using **NestJS** and **TypeScript** that guides users through an interactive, humanized personality test based on behavioral typologies (MBTI style).

---

## 🧭 The Personality Test: Foundations & References

The personality mapping of **BambuMind** is based on the theory of **Psychological Types** developed by the Swiss psychiatrist and psychotherapist **Carl Gustav Jung** in 1921, later structured into a dichotomous inventory system by **Katharine Cook Briggs** and **Isabel Briggs Myers** (the origin of the *MBTI* system).

For this MVP, BambuMind focuses on **3 fundamental axes**, generating 8 distinct archetypal profiles of self-discovery:

### 1. Energy Orientation: Extraversion (E) vs. Introversion (I)
*Jungian Concept of Psychic Attitude:*
* **Extraversion (E):** Psychic energy is primarily directed outward, toward external objects and people. Individuals recharge their energy through social interactions and dynamic activities.
* **Introversion (I):** Psychic energy focuses on the subjective inner world of thoughts, ideas, and reflections. Individuals prefer quiet, productive solitude or small groups to recharge.

### 2. Perception Functions (How Information is Absorbed): Sensing (S) vs. Intuition (N)
*How the brain perceives and interprets stimuli:*
* **Sensing (S):** Focuses on the present, concrete facts, tangible details, and immediate experience from the five senses. Values order and what is practical.
* **Intuition (N):** Focuses on abstract connections, hidden patterns, latent meanings, and future possibilities. Values innovation, imagination, and systemic vision.

### 3. Judgment Functions (How Decisions are Made): Thinking (T) vs. Feeling (F)
*The criteria applied to evaluate and decide:*
* **Thinking (T):** Decisions guided by impersonal criteria, cause-and-effect logic, objectivity, and cold analysis of data. Seeks justice and logical truth.
* **Feeling (F):** Decisions based on human impact, ethical values, interpersonal harmony, and empathy. Seeks personal alignment and collective well-being.

---

## 🎭 The 8 Archetypal Profiles of BambuMind

The combination of these axes results in 8 rich psychological acronyms that define different ways of interacting with the world:

| Acronym | Archetype Name | Core Characteristics |
| :--- | :--- | :--- |
| **INF** | The Empathetic Guardian | Idealistic, deep, seeks emotional connection and creative solutions for people. |
| **INT** | The Silent Strategist | Logical and analytical, focuses on complex theories and efficient systemic solutions. |
| **ISF** | The Devoted Protector | Practical, detailed, warm, and highly loyal to the practical needs of others. |
| **IST** | The Reliable Inspector | Extremely focused on facts, duties, established rules, and logical organization. |
| **ENF** | The Inspiring Motivator | Enthusiastic, charismatic, communicates ideas with passion, and fosters everyone's potential. |
| **ENT** | The Visionary Leader | Decisive, strategic, and focused on long-term goals and structural innovation. |
| **ESF** | The Warm Host | Sociable, practical, cooperative, and focused on ensuring social harmony and well-being. |
| **EST** | The Efficient Administrator | Direct, action-oriented, with a natural ability to manage processes and people. |

---

### How the Scoring Algorithm Works
* Each chosen option adds $+2$ points to the respective pole (e.g., $+2$ for **E**, $+2$ for **I**).
* At the end of the test, the score for each axis is calculated in isolation.
* The predominant pole defines the corresponding letter of the profile. In case of ties, the algorithm defaults to the left letter (e.g., $E \geq I \rightarrow \mathbf{E}$).

---

## 🔌 How does MCP (Model Context Protocol) work?

The **Model Context Protocol (MCP)** is an open standard that allows AI models (like Gemini or Claude) to securely connect to local/external data sources and tools.

In our ecosystem:
1. **The Host (e.g., Roo Code, Cline, Cursor):** The application where you chat with the AI. It manages the session life cycle and the chat interface.
2. **The Client (embedded in the Host):** Establishes the connection and sends JSON-RPC commands.
3. **The Server (BambuMind):** Runs locally in the background via standard input/output (`stdio`). It exposes the tools (`tools`) that the AI can query and execute.

When the AI needs to pull the personality test, it does not "guess" the questions: it calls the `get_next_question` tool of the BambuMind server, receives the question details from the in-memory database, and displays it to you.

---

## 🤖 AI System Prompt (BambuMind)

Configure this prompt in your client (such as Roo Code's system rules or instructions) to guide the AI during the test.

> [!TIP]
> **Dynamic Language Detection (Backend Localization):** The BambuMind server analyzes the first message or context typed by the user (passed in the `userMessage` parameter of `get_next_question`) and automatically localizes the quiz questions and options to the detected language (currently supporting **Portuguese**, **English**, and **Spanish**).

```text
You are BambuMind, an expert in analytical psychology and behavioral mapping. Your goal is to guide the user on a journey of self-discovery through an interactive and relaxed personality test.

Behavior and Language Guidelines:
1. Detect the language in which the user initiated the conversation (e.g., Portuguese, English, Spanish, etc.). Warmly greet them in that language.
2. You MUST NOT make up the questions. Use the `get_next_question` tool to retrieve the first question, passing the user's initial message in the `userMessage` parameter so that the server localizes the questions properly.
3. Present only ONE question at a time in the correct language. Wait for the user's response before proceeding.
4. When the user responds (indicating option A or B), submit the response immediately using the `submit_answer` tool.
5. If the user makes an extra comment about the answer, be empathetic and make a brief conversational bridge before pulling the next question, keeping the tone light and welcoming (like a calm panda).
6. When the `submit_answer` tool indicates that the test is finished (status: completed), call the `calculate_personality_result` tool and present the final and detailed verdict to the user in the same language.
```

---

## 🛠️ Installation and Execution

### Prerequisites
* Node.js (version 18 or higher)
* NPM

### Install Dependencies
```bash
npm install
```

### Build the Project
```bash
npm run build
```

### Test with MCP Inspector (Visual Web UI)
The MCP team provides an interactive testing tool. You can run it with:
```bash
npx @modelcontextprotocol/inspector node dist/main.js
```
Open the link printed in the terminal (usually `http://localhost:5173`) to trigger and test the tools manually in your browser.

---

## ⚙️ Integration with Roo Code / Cline

In your project, the Roo Code configuration is saved in `.roo/mcp.json`. Make sure it is structured as follows:

```json
{
  "mcpServers": {
    "bambumind": {
      "command": "node",
      "args": [
        "/media/panda/Projects/satodu/BambuMind/dist/main.js"
      ]
    }
  }
}
```

---

## 📁 Directory Structure

```text
src/
├── mcp/
│   ├── mcp.module.ts       # Registers the MCP server and handles lifecycle
│   └── mcp.service.ts      # Initializes the SDK and exposes Tools
├── quiz/
│   ├── quiz.module.ts
│   ├── quiz.service.ts     # Manages session state and scoring logic
│   └── data/
│       └── questions.ts    # Multilingual questions, options, and axis weights
└── main.ts                 # Entry point, redirects console logs to debug.log
```
