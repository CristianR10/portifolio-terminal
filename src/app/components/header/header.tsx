"use client";

import styles from "@/app/components/Terminal/Terminal.module.scss";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  link?: string;
  linkLabel?: string;
}

function Header({ link, linkLabel }: HeaderProps) {
  const [date, setDate] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  const [instructionsMessage, setInstructionsMessage] = useState("");
  const [emoji, setEmoji] = useState("");

  const asciiArt = `
::::::::  :::::::::  :::::::::::  ::::::::  ::::::::::: :::::::::::     :::     ::::    :::
:+:    :+: :+:    :+:     :+:     :+:    :+:     :+:         :+:       :+: :+:   :+:+:   :+:
+:+        +:+    +:+     +:+     +:+            +:+         +:+      +:+   +:+  :+:+:+  +:+
#+#        +#++:++#:      +#+     +#++:++#++     +#+         +#+     +#++:++#++: +#+ +:+ +#+
#+#        +#+    +#+     +#+            +#+     +#+         +#+     +#+     +#+ +#+  +#+#+#
#+#    #+# #+#    #+#     #+#     #+#    #+#     #+#         #+#     #+#     #+# #+#   #+#+#
########  ###    ### ###########  ########      ###     ########### ###     ### ###    ####
`;

  const welcomeMessage = "Bem vindo ao meu terminal Portfolio";
  const instructionsText = ' Digite "help" ou "?" para ver a lista de comandos';
  const emojis = ["😁", "🤯", "🤖", "🎃", "👹", "👾", "😺", "👨‍👩‍👧‍👦", "🐶", "🐐"];

  // Dentro do componente Header
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  const typeText = (
    text: string,
    callback: React.Dispatch<React.SetStateAction<string>>,
    delay: number,
    onComplete?: () => void,
  ) => {
    // Limpa intervalo anterior se existir
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    indexRef.current = 0;
    callback(""); // limpa o texto antes de começar

    intervalRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        const nextChar = text.charAt(indexRef.current);
        callback((prev) => prev + nextChar);
        indexRef.current += 1;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (onComplete) onComplete();
      }
    }, delay);
  };
  // Seleciona um emoji aleatório no carregamento
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[randomIndex]);
  }, []);

  // Atualiza a data/hora
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setDate(formatted);
    }, 1000); // atualiza a cada 1 segundo

    return () => clearInterval(interval); // limpa o intervalo ao desmontar
  }, []);

  useEffect(() => {
    if (!emoji) return;

    // Limpa os textos
    setTypedMessage("");
    setInstructionsMessage("");

    // Primeira mensagem
    typeText(welcomeMessage, setTypedMessage, 65, () => {
      setTypedMessage((prev) => prev + " " + emoji);

      // Segunda mensagem com delay
      setTimeout(() => {
        typeText(instructionsText, setInstructionsMessage, 45);
      }, 280);
    });

    // Cleanup ao desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [emoji]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.linkPort}>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.headerLink}
            >
              {linkLabel || "Meu Link"}
            </a>
          )}
        </div>
        <div>
          <span className={styles.date}>{date}</span>
        </div>
      </div>

      <pre
        style={{
          color: "var(--neon)",
          fontFamily: "Share Tech Mono, monospace",
          whiteSpace: "pre",
          animation: "neonPulse 1s infinite alternate",
        }}
      >
        {asciiArt}
      </pre>

      <div
        style={{
          color: "var(--neon)",
          fontFamily: "Share Tech Mono, monospace",
          margin: "1rem",
        }}
      >
        {typedMessage}
        <p className={styles.instructions}>{instructionsMessage}</p>
      </div>

      <style>
        {`
          @keyframes neonPulse {
            0% { text-shadow: 0 0 5px var(--neon), 0 0 10px var(--neon), 0 0 20px var(--neon); }
            50% { text-shadow: 0 0 10px var(--neon), 0 0 20px var(--neon), 0 0 30px var(--neon); }
            100% { text-shadow: 0 0 5px var(--neon), 0 0 10px var(--neon), 0 0 20px var(--neon); }
          }
        `}
      </style>
    </header>
  );
}

export default Header;
