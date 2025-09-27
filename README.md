# Win-95_Ai

[![License](https://img.shields.io/github/license/Argh94/Win-95_Ai.svg)](https://github.com/Argh94/Win-95_Ai/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/Argh94/Win-95_Ai.svg)](https://github.com/Argh94/Win-95_Ai/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/Argh94/Win-95_Ai.svg)](https://github.com/Argh94/Win-95_Ai)
[![Contributors](https://img.shields.io/github/contributors/Argh94/Win-95_Ai.svg)](https://github.com/Argh94/Win-95_Ai/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/Argh94/Win-95_Ai.svg)](https://github.com/Argh94/Win-95_Ai/issues)

---

## Description

**Win-95_Ai** is an innovative project that blends the nostalgic aesthetics of Windows 95 with modern artificial intelligence capabilities. Inspired by a thought-provoking tweet from Lucas Crespo ("What if ChatGPT came out in '95?"), this project reimagines a retro user interface with cutting-edge AI features, offering a unique and functional experience.

### Key Features

- **Retro Windows 95 UI:** A vintage design crafted with HTML, CSS, and JavaScript, diverging from the React95 library for a custom approach.
- **AI-Powered Tools:** Enhanced user interaction through AI, leveraging the OpenRouter API.
- **Messaging & Notification System:** Secure communication with websites via Cloudflare Workers for packet delivery.
- **Cloudflare Integration:** Utilizes Cloudflare services for efficient and reliable data handling and messaging.
- **Custom AI Integration:** AI responses are processed through Cloudflare Workers, interfacing with the OpenRouter API.
- **Modular Design:** Flexible architecture allowing easy customization and extension.

---
## Screenshots

<div align="center">
  <img src="https://github.com/Argh94/Win-95_Ai/blob/main/icons/D.png?raw=true" alt="Chicken Crossy Road Desktop Screenshot" width="320"/>
  <img src="https://github.com/Argh94/Win-95_Ai/blob/main/icons/M.png?raw=true" alt="Chicken Crossy Road Mobile Screenshot" width="200"/>
</div>

---
## Inspiration

This project was sparked by a tweet from [Lucas Crespo](https://x.com/lucas__crespo/status/1795870218234785865), posing the question, "What if ChatGPT came out in '95?" While the [React95 library](https://github.com/React95/React95) offers pre-built Windows 95 components, this project was intentionally developed from scratch using HTML, CSS, and JavaScript to fully embrace the hypothetical '95 aesthetic and technical constraints.

---

## Technologies Used

- **Python** (core backend logic)
- **JavaScript** (frontend interactions)
- **HTML/CSS** (custom UI design)
- **Cloudflare Workers** (AI request handling and packet delivery)
- **OpenRouter API** (AI routing and response generation)

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm
- Cloudflare account (for API and Workers integration)
- OpenRouter API key

### Installation

```bash
git clone https://github.com/Argh94/Win-95_Ai.git
cd Win-95_Ai
# Install backend dependencies
pip install -r requirements.txt
# Install frontend dependencies
npm install
```

### Usage

1. **Configure API keys:**  
   Add your Cloudflare and OpenRouter credentials to the `.env` file.

2. **Run the application:**  
   ```bash
   # Start backend
   python main.py
   # Start frontend (if applicable)
   npm start
   ```

---

## Credits

- **Inspiration:** [Lucas Crespo](https://x.com/lucas__crespo/status/1795870218234785865) for the original tweet idea.
- **Code Inspiration:** Partially sourced and inspired by [OpenRouter](https://openrouter.ai/).
- **Infrastructure:** Powered by [Cloudflare](https://www.cloudflare.com/) for messaging and packet delivery.

---

## Contributing

We welcome contributions to enhance this project!  
Please submit issues, suggestions, or pull requests via [GitHub Issues](https://github.com/Argh94/Win-95_Ai/issues).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For support or inquiries, please open an issue or contact [Argh94](https://github.com/Argh94).

---

## Notes

- The project avoids using the React95 library, opting for a custom-built UI to reflect a '95-era development style.
- AI functionality is achieved through Cloudflare Workers interfacing with the OpenRouter API, ensuring a seamless retro-modern experience.
