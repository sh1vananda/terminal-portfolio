import type { Dispatch, SetStateAction } from "react"

type Theme = "green" | "blue" | "amber" | "purple" | "pink"

interface Dependencies {
  setTheme?: (theme: Theme) => void
  toggleSound?: () => void
  isSoundEnabled?: boolean
}

interface GameState {
  word: string
  guessedLetters: string[]
  remainingGuesses: number
}

class CommandProcessor {
  private setHistory: Dispatch<SetStateAction<string[]>>
  private setCurrentView: Dispatch<SetStateAction<string>>
  private dependencies: Dependencies
  private gameActive = false
  private gameState: GameState | null = null

  constructor(
    setHistory: Dispatch<SetStateAction<string[]>>,
    setCurrentView: Dispatch<SetStateAction<string>>,
    dependencies: Dependencies = {},
  ) {
    this.setHistory = setHistory
    this.setCurrentView = setCurrentView
    this.dependencies = dependencies
  }

  updateDependencies(dependencies: Dependencies) {
    this.dependencies = { ...this.dependencies, ...dependencies }
  }

  getAvailableCommands(): string[] {
    return [
      "help",
      "about",
      "projects",
      "skills",
      "contact",
      "clear",
      // "theme",
      "sound",
      "exit",
      "github",
      "linkedin",
      "whoami",
      "date",
      "time",
      "echo",
      "ls",
      "cat",
      "matrix",
      // "game",
      // "weather",
      "social",
      "resume",
      "experience",
      "education",
    ]
  }

  processCommand(command: string): void {
    try {
      // If a game is active, process game input
      // if (this.gameActive && this.gameState) {
      //   this.processGameInput(command)
      //   return
      // }

      const lowerCommand = command.toLowerCase().trim()
      const parts = lowerCommand.split(" ")
      const mainCommand = parts[0]
      const args = parts.slice(1)

      switch (mainCommand) {
        case "help":
          this.showHelp()
          break
        case "about":
          this.showAbout()
          break
        case "projects":
          this.showProjects()
          break
        case "skills":
          this.showSkills()
          break
        case "contact":
          this.showContact()
          break
        case "clear":
          this.clearScreen()
          break
        // case "theme":
        //   this.handleTheme(args[0])
        //   break
        case "sound":
          this.toggleSound(args[0])
          break
        case "github":
          this.openLink("https://github.com/sh1vananda")
          break
        case "linkedin":
          this.openLink("https://linkedin.com/in/shivananda-reddy-kankanala")
          break
        case "exit":
          this.exitTerminal()
          break
        case "hello":
        case "hi":
          this.greet()
          break
        case "whoami":
          this.whoami()
          break
        case "date":
          this.showDate()
          break
        case "time":
          this.showTime()
          break
        case "echo":
          this.echo(args.join(" "))
          break
        case "ls":
          this.listFiles()
          break
        case "cat":
          this.catFile(args[0])
          break
        case "matrix":
          this.showMatrix()
          break
        // case "game":
        //   this.startGame()
        //   break
        // case "weather":
        //   this.showWeather(args[0])
        //   break
        case "social":
          this.showSocial()
          break
        case "resume":
          this.showResume()
          break
        case "experience":
          this.showExperience()
          break
        case "education":
          this.showEducation()
          break
        default:
          this.commandNotFound(command)
      }

      this.setCurrentView(mainCommand === "clear" ? "home" : mainCommand)
    } catch (error) {
      console.error("Error in processCommand:", error)
      this.setHistory((prev) => [
        ...prev,
        "",
        "An error occurred while processing your command.",
        'Please try again or type "help" for available commands.',
        "",
      ])
    }
  }

  private showHelp(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                     HELP                        │",
      "└─────────────────────────────────────────────────┘",
      "",
      "Available commands:",
      "",
      "Navigation:",
      "  about       - Display information about me",
      "  projects    - View my portfolio projects",
      "  skills      - List my technical skills",
      "  experience  - Show my work experience",
      "  education   - Show my educational background",
      "  contact     - Show contact information",
      "  resume      - View and download my resume",
      "  social      - Display social media links",
      "",
      "Terminal Controls:",
      "  clear       - Clear the terminal screen",
      // "  theme       - Change terminal theme (usage: theme [green|blue|amber|purple|pink])",
      "  sound       - Toggle sound effects (usage: sound [on|off])",
      "  exit        - Exit the terminal",
      "",
      "External Links:",
      "  github      - Open my GitHub profile",
      "  linkedin    - Open my LinkedIn profile",
      "",
      // "Utilities:",
      // // "  weather     - Check weather (usage: weather [city])",
      // // "  game        - Play a simple hangman game",
      // "",
      "Easter eggs:",
      '  Try typing some common terminal commands like "ls", "cat", "whoami", etc.',
      "",
      "Keyboard Shortcuts:",
      "  [Tab]       - Autocomplete commands",
      "  [Up/Down]   - Navigate command history",
      "  [Esc]       - Clear current input",
      "",
    ])
  }

  private showAbout(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                   ABOUT ME                      │",
      "└─────────────────────────────────────────────────┘",
      "",
      "Hello! Im Shivananda Reddy, a product minded Software Developer with practical experience in full-stack development, focused on building scalable and maintainable applications. Proficient in Python, JavaScript, React.js fundamentals, Node.js, RESTful APIs, and SQL databases. Strong understanding of web technologies and core software engineering principles. Proven ability to design, develop, optimize, and own features end-to-end.",
      "\n",
      "I also specialize in blockchain development, with a focus on building decentralized applications (dApps) and smart contracts. I have hands-on experience with Ethereum, Solidity, and various blockchain frameworks.",
      "\n",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects and building UI/UX designs, and Games! I enjoy solving complex problems and am always eager to learn and grow in the tech field.",
      "\n",
      "I'm currently open to new opportunities and collaborations.",
      "\n",
      "Education:",
      "- Bachelors in Computer Science from VIT Vellore, India",
      "\n",
      'Type "projects" to see my work or "contact" to get in touch!',
      "",
    ])
  }

  private showProjects(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                   PROJECTS                      │",
      "└─────────────────────────────────────────────────┘",
      "",
      "1. Project Name: kiwi - Hyperlocal Chat App",
      "   Description: A hyperlocal chat application that connects users based on",
      "   their geographical location.",
      "   Technologies: Flutter, Node.js, Firestore",
      "   Link: https://github.com/sh1vananda/kiwi-hyperlocal-chat",
      "",
      "2. Project Name: Blockchain Price Alert System",
      "   Description: Full stack application that tracks cryptocurrency prices",
      "   and sends alerts based on user-defined thresholds.",
      "   Technologies: Svelte, Django, PostgreSQL",
      "   Link: [project-link.com]",
      "",
      "3. Project Name: Machine Learning in PCOS Diagnosis",
      "   Description: Developed a interpretable deep learning model to assist in",
      "   the diagnosis of Polycystic Ovary Syndrome (PCOS) using SHAP and XGBoost.",
      "   Technologies: Python, Scikit-learn, PyTorch, NumPy, SHAP, XGBoost",
      "   Link: *not open sourced yet*",
      "",
      "4. Project Name: sustAIn - AI For Sustainable Material Design",
      "   Description: Built AI models (GNN, VAE) for predicting and",
      "   creating sustainable material structures based on user requirements,", 
      "   and using NSGA-III to optimize sustainable design trade-offs.",
      "   Technologies: Python, PyTorch, TensorFlow, pymoo, RDKit",
      "   Link: *not open sourced yet*",
      "",
      "5. Project Name: still-frame",
      "   Description: A web application that allows AI automated content delivery",
      "   Technologies: Svelte, Tailwind CSS",
      "   Link: [project-link.com]",
      "",
      "6. Project Name: [Project 5]",
      "   Description: [Brief description of the project]",
      "   Technologies: [Tech stack used]",
      "   Link: [project-link.com]",
      "",
      'Type "github" to visit my GitHub profile for more projects.',
      "",
    ])
  }

  private showSkills(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                    SKILLS                       │",
      "└─────────────────────────────────────────────────┘",
      "",
      "Programming Languages:",
      "- Python                [██████████] 100%",
      "- Java                  [████████░░] 80%",
      "- Solidity              [████████░░] 80%",
      "- SQL                   [███████░░░] 70%",
      "- Javascript/Typescript [██████░░░░] 60%",
      "- C/C++                 [██████░░░░] 60%",
      "- C#                    [████░░░░░░] 40%",
      "",
      "Frontend:",
      "- Flutter               [█████████░] 90%",
      "- Svelte/Sveltekit      [████████░░] 80%",
      "- React                 [███████░░░] 70%",
      "- Next.js               [███████░░░] 70%",
      "- HTML5/CSS3            [█████████░] 100%",
      "",
      "Backend:",
      "- Node.js               [████████░░] 80%",
      "- Firebase              [████████░░] 80%",
      "- Supabase              [████████░░] 80%",
      "- Express               [████████░░] 80%",
      "- Django                [██████░░░░] 60%",
      "- PostgreSQL            [████████░░] 80%",
      "",
      "Other:",
      "- Git/GitHub            [██████████] 100%",
      "- Docker                [██████░░░░] 60%",
      "- Kubernetes            [████░░░░░░] 40%",
      "- UI/UX Design          [██████░░░░] 60%",
      "- RESTful APIs          [████████░░] 80%",
      "",
    ])
  }

  private showContact(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                   CONTACT                       │",
      "└─────────────────────────────────────────────────┘",
      "",
      "Email: shivanandareddy.kankanala@gmail.com",
      "LinkedIn: linkedin.com/in/shivananda-reddy-kankanala",
      "GitHub: github.com/sh1vanand",
      "Twitter: @_av1hs_",
      "",
      "Feel free to reach out for collaboration opportunities,",
      "job inquiries, or just to say hello!",
      "",
      'Type "linkedin" or "github" to visit my profiles directly.',
      "",
    ])
  }

  private clearScreen(): void {
    this.setHistory([])
  }

  // private handleTheme(theme: string): void {
  //   if (!theme) {
  //     this.setHistory((prev) => [...prev, "", "Usage: theme [green|blue|amber|purple|pink]", "Example: theme blue", ""])
  //     return
  //   }

  //   const validThemes = ["green", "blue", "amber", "purple", "pink"]

  //   if (!validThemes.includes(theme)) {
  //     this.setHistory((prev) => [
  //       ...prev,
  //       "",
  //       `Invalid theme: ${theme}`,
  //       "Available themes: green, blue, amber, purple, pink",
  //       "",
  //     ])
  //     return
  //   }

  //   if (this.dependencies.setTheme) {
  //     this.dependencies.setTheme(theme as any)
  //     this.setHistory((prev) => [...prev, "", `Theme changed to ${theme}.`, ""])
  //   } else {
  //     this.setHistory((prev) => [...prev, "", "Theme functionality is not available.", ""])
  //   }
  // }

  private toggleSound(state: string): void {
    if (!state || (state !== "on" && state !== "off")) {
      this.setHistory((prev) => [...prev, "", "Usage: sound [on|off]", "Example: sound off", ""])
      return
    }

    if (this.dependencies.toggleSound) {
      if (
        (state === "on" && !this.dependencies.isSoundEnabled) ||
        (state === "off" && this.dependencies.isSoundEnabled)
      ) {
        this.dependencies.toggleSound()
      }

      this.setHistory((prev) => [...prev, "", `Sound effects turned ${state}.`, ""])
    } else {
      this.setHistory((prev) => [...prev, "", "Sound functionality is not available.", ""])
    }
  }

  private openLink(url: string): void {
    this.setHistory((prev) => [...prev, "", `Opening ${url}...`, ""])

    // Open in a new tab
    window.open(url, "_blank", "noopener,noreferrer")
  }

  private exitTerminal(): void {
    this.setHistory((prev) => [...prev, "", "Thanks for visiting! Closing terminal...", ""])

    // In a real implementation, this might redirect to another page
    setTimeout(() => {
      window.location.href = "/"
    }, 2000)
  }

  private commandNotFound(command: string): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      `Command not found: ${command}`,
      'Type "help" to see available commands.',
      "",
    ])
  }

  // Easter egg commands
  private greet(): void {
    const greetings = [
      "Hello there!",
      "Hi! How can I help you today?",
      "Greetings, human!",
      "Hey! Nice to see you here.",
      "*beep boop* Human detected. Hello!",
    ]

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

    this.setHistory((prev) => [...prev, "", randomGreeting, ""])
  }

  private whoami(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "You are a visitor to my portfolio terminal.",
      "But the real question is: who are any of us, really?",
      "",
    ])
  }

  private showDate(): void {
    const date = new Date().toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    this.setHistory((prev) => [...prev, "", `Today's date: ${date}`, ""])
  }

  private showTime(): void {
    const time = new Date().toLocaleTimeString()
    this.setHistory((prev) => [...prev, "", `Current time: ${time}`, ""])
  }

  private echo(text: string): void {
    this.setHistory((prev) => [...prev, "", text || "", ""])
  }

  private listFiles(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "drwxr-xr-x  2 user  group  4096 May  6 08:54 about",
      "drwxr-xr-x  2 user  group  4096 May  6 08:54 projects",
      "drwxr-xr-x  2 user  group  4096 May  6 08:54 skills",
      "drwxr-xr-x  2 user  group  4096 May  6 08:54 contact",
      "-rw-r--r--  1 user  group  1024 May  6 08:54 resume.pdf",
      "-rw-r--r--  1 user  group  2048 May  6 08:54 README.md",
      "-rw-r--r--  1 user  group  3072 May  6 08:54 experience.txt",
      "-rw-r--r--  1 user  group  1536 May  6 08:54 education.txt",
      "",
    ])
  }

  private catFile(filename: string): void {
    if (!filename) {
      this.setHistory((prev) => [...prev, "", "Usage: cat [filename]", "Example: cat README.md", ""])
      return
    }

    if (filename === "README.md") {
      this.setHistory((prev) => [
        ...prev,
        "",
        "# Portfolio Terminal",
        "",
        "Welcome to my interactive terminal portfolio!",
        "",
        "## Navigation",
        'Use commands like "about", "projects", "skills", and "contact" to navigate.',
        "",
        "## Features",
        "- Interactive command-line interface",
        "- Responsive design",
        "- Easter eggs (try to find them all!)",
        "",
        'Type "help" to see all available commands.',
        "",
      ])
    } else if (filename === "resume.pdf") {
      this.setHistory((prev) => [
        ...prev,
        "",
        "Error: Binary file cannot be displayed in terminal.",
        'Type "resume" to view and download my resume.',
        "",
      ])
    } else if (filename === "experience.txt") {
      this.showExperience()
    } else if (filename === "education.txt") {
      this.showEducation()
    } else {
      this.setHistory((prev) => [...prev, "", `File not found: ${filename}`, ""])
    }
  }

  private showMatrix(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "Entering the Matrix...",
      "",
      "01010111 01100101 01101100 01100011 01101111 01101101 01100101",
      "01110100 01101111 00100000 01110100 01101000 01100101 00100000",
      "01001101 01100001 01110100 01110010 01101001 01111000 00101110",
      "",
      "Follow the white rabbit...",
      "",
      "Wake up, Neo...",
      "",
    ])
  }

  private showExperience(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                  EXPERIENCE                     │",
      "└─────────────────────────────────────────────────┘",
      "",
      "App Developer | Timeslotter Pvt Ltd",
      "Oct 2024 - Dec 2024",
      "- Led development of front end for Timeslotter app",
      "- Transated figma designs to functional UI",
      "- Improved app performance by 40% via widget tree optimization",
      "- Implemented state management using Riverpod",
      "- Collaborated with backend to facilitate backend integration",
      "",
      "Full Stack Developer | Flixdin",
      "May 2024 - Jul 2024",
      "- Developed and maintained full stack application",
      "- Implemented RESTful APIs using Node.js and Express",
      "- Designed and optimized database schemas using PostgreSQL",
      "- Collaborated with frontend team to integrate APIs",
      "",
      "Blockchain Developer | Altibbe Health Pvt Ltd",
      "May 2025",
      "- Developed secure end-to-end audit trial system",
      "- Implemented backend gateway for blockchain interaction",
      "- Developed decentralized application (dApp) for user interaction",
      "- Collaborated with cross-functional teams to ensure seamless integration",
      "",
    ])
  }

  private showEducation(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                  EDUCATION                      │",
      "└─────────────────────────────────────────────────┘",
      "",
      "Bachelors in Computer Science",
      "Vellore Institute of Technology | 2021 - 2025",
      "- Specialization: Blockchain Technology",
      "- GPA: 8.25/10",
      "",
      "Certifications:",
      "- MERN Full Stack Development        | Ethnus    | 2023",
      "- Google Cloud Computing Foundations | Google    | 2023",
      "- Ethereum Developer Degree          | LearnWeb3 | 2025 (ongoing)",
      "- Rust + Solana                      | ICB       | 2025 (ongoing)",
      "",
    ])
  }

  private showResume(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                    RESUME                       │",
      "└─────────────────────────────────────────────────┘",
      "",
      "My resume is available for download as a PDF.",
      "",
      'Type "experience" to see my work history',
      'Type "education" to see my educational background',
      'Type "skills" to see my technical skills',
      "",
      "Download Resume:",
      "[Download link would be here in a real implementation]",
      "",
    ])
  }

  private showSocial(): void {
    this.setHistory((prev) => [
      ...prev,
      "",
      "┌─────────────────────────────────────────────────┐",
      "│                 SOCIAL MEDIA                    │",
      "└─────────────────────────────────────────────────┘",
      "",
      "Connect with me on:",
      "",
      "GitHub: github.com/yourusername",
      "LinkedIn: linkedin.com/in/yourusername",
      "Twitter: @yourusername",
      "Dev.to: dev.to/yourusername",
      "Medium: medium.com/@yourusername",
      "",
      'Type the platform name (e.g., "github") to visit directly.',
      "",
    ])
  }

  // private showWeather(city: string): void {
  //   if (!city) {
  //     this.setHistory((prev) => [...prev, "", "Usage: weather [city]", "Example: weather london", ""])
  //     return
  //   }

  //   // In a real implementation, this would fetch actual weather data
  //   // For this demo, we'll simulate a weather response
  //   const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Partly Cloudy", "Thunderstorms"]
  //   const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
  //   const randomTemp = Math.floor(Math.random() * 35) + 5 // Random temp between 5-40°C

  //   this.setHistory((prev) => [
  //     ...prev,
  //     "",
  //     `Weather for ${city.charAt(0).toUpperCase() + city.slice(1)}:`,
  //     "",
  //     `Condition: ${randomCondition}`,
  //     `Temperature: ${randomTemp}°C`,
  //     `Humidity: ${Math.floor(Math.random() * 60) + 30}%`,
  //     `Wind: ${Math.floor(Math.random() * 30)} km/h`,
  //     "",
  //     "Note: This is simulated weather data for demonstration purposes.",
  //     "",
  //   ])
  // }

  // // Simple Hangman game
  // private startGame(): void {
  //   try {
  //     const words = ["javascript", "react", "nextjs", "typescript", "developer", "portfolio", "terminal", "coding"]
  //     const word = words[Math.floor(Math.random() * words.length)]
  //     const maxGuesses = 6

  //     // Initialize game state first
  //     this.gameState = {
  //       word,
  //       guessedLetters: [],
  //       remainingGuesses: maxGuesses,
  //     }

  //     // Only set gameActive to true after gameState is fully initialized
  //     this.gameActive = true

  //     this.setHistory((prev) => [
  //       ...prev,
  //       "",
  //       "┌─────────────────────────────────────────────────┐",
  //       "│                   HANGMAN                       │",
  //       "└─────────────────────────────────────────────────┘",
  //       "",
  //       "Welcome to Hangman! Try to guess the programming-related word.",
  //       "Type a single letter to guess, or 'quit' to exit the game.",
  //       "",
  //       `Word: ${this.getDisplayWord()}`,
  //       `Guessed letters: `,
  //       `Remaining guesses: ${this.gameState?.remainingGuesses || maxGuesses}`,
  //       "",
  //     ])
  //   } catch (error) {
  //     console.error("Error in startGame:", error)
  //     this.gameActive = false
  //     this.gameState = null
  //     this.setHistory((prev) => [
  //       ...prev,
  //       "",
  //       "An error occurred while starting the game.",
  //       'Please try again by typing "game".',
  //       "",
  //     ])
  //   }
  // }

  // private getDisplayWord(): string {
  //   try {
  //     // Defensive check to ensure gameState exists
  //     if (!this.gameState || !this.gameState.word) {
  //       return "_ _ _ _ _" // Default display if gameState is null or incomplete
  //     }

  //     return this.gameState.word
  //       .split("")
  //       .map((letter) => (this.gameState?.guessedLetters.includes(letter) ? letter : "_"))
  //       .join(" ")
  //   } catch (error) {
  //     console.error("Error in getDisplayWord:", error)
  //     return "_ _ _ _ _" // Default display in case of error
  //   }
  // }

  // private processGameInput(input: string): void {
  //   try {
  //     if (!this.gameActive || !this.gameState) {
  //       this.setHistory((prev) => [...prev, "", "No active game. Type 'game' to start a new game.", ""])
  //       return
  //     }

  //     const command = input.toLowerCase().trim()

  //     if (command === "quit") {
  //       this.gameActive = false
  //       this.gameState = null
  //       this.setHistory((prev) => [...prev, "", "Game exited. Thanks for playing!", ""])
  //       return
  //     }

  //     // Check if input is a single letter
  //     if (!/^[a-z]$/.test(command)) {
  //       this.setHistory((prev) => [
  //         ...prev,
  //         "",
  //         "Please enter a single letter, or 'quit' to exit.",
  //         "",
  //         `Word: ${this.getDisplayWord()}`,
  //         `Guessed letters: ${this.gameState.guessedLetters.join(", ")}`,
  //         `Remaining guesses: ${this.gameState.remainingGuesses}`,
  //         "",
  //       ])
  //       return
  //     }

  //     // Check if letter was already guessed
  //     if (this.gameState.guessedLetters.includes(command)) {
  //       this.setHistory((prev) => [
  //         ...prev,
  //         "",
  //         `You already guessed the letter '${command}'.`,
  //         "",
  //         `Word: ${this.getDisplayWord()}`,
  //         `Guessed letters: ${this.gameState.guessedLetters.join(", ")}`,
  //         `Remaining guesses: ${this.gameState.remainingGuesses}`,
  //         "",
  //       ])
  //       return
  //     }

  //     // Add letter to guessed letters
  //     this.gameState.guessedLetters.push(command)

  //     // Check if letter is in the word
  //     if (!this.gameState.word.includes(command)) {
  //       this.gameState.remainingGuesses--
  //     }

  //     // Check if game is won
  //     const isWon = this.gameState.word.split("").every((letter) => this.gameState?.guessedLetters.includes(letter))

  //     // Check if game is lost
  //     const isLost = this.gameState.remainingGuesses <= 0

  //     if (isWon) {
  //       this.setHistory((prev) => [
  //         ...prev,
  //         "",
  //         `Word: ${this.gameState?.word.split("").join(" ")}`,
  //         "",
  //         "Congratulations! You guessed the word correctly!",
  //         "",
  //       ])
  //       this.gameActive = false
  //       this.gameState = null
  //     } else if (isLost) {
  //       this.setHistory((prev) => [
  //         ...prev,
  //         "",
  //         `Word: ${this.gameState?.word.split("").join(" ")}`,
  //         "",
  //         `Game over! The word was "${this.gameState?.word}".`,
  //         "",
  //       ])
  //       this.gameActive = false
  //       this.gameState = null
  //     } else {
  //       this.setHistory((prev) => [
  //         ...prev,
  //         "",
  //         `You guessed: ${command}`,
  //         this.gameState?.word.includes(command)
  //           ? `Good guess! '${command}' is in the word.`
  //           : `Sorry, '${command}' is not in the word.`,
  //         "",
  //         `Word: ${this.getDisplayWord()}`,
  //         `Guessed letters: ${this.gameState?.guessedLetters.join(", ")}`,
  //         `Remaining guesses: ${this.gameState?.remainingGuesses}`,
  //         "",
  //       ])
  //     }
  //   } catch (error) {
  //     console.error("Error in processGameInput:", error)
  //     this.gameActive = false
  //     this.gameState = null
  //     this.setHistory((prev) => [
  //       ...prev,
  //       "",
  //       "An error occurred during the game.",
  //       'The game has been reset. Type "game" to start a new game.',
  //       "",
  //     ])
  //   }
  // }
}

export default CommandProcessor
