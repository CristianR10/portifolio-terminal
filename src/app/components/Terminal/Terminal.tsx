"use client";

import { useState, useRef, useEffect, JSX } from "react";
import styles from "./Terminal.module.scss";
import TerminalBackground from "../TerminalBack/TerminalBack";
import { COMMANDS_INFO, HELP_COMMANDS } from "@/app/data/ContentInfo";

interface Command {
  input: string;
  output: string | JSX.Element;
}



export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null); // Referência para o container do input e sugestões
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  // Foco automático ao carregar o componente
  useEffect(() => {
    inputRef.current?.focus();
  }, []); // Array vazio para rodar apenas na montagem

  // Scroll automático para o final do container, incluindo input e sugestões
  useEffect(() => {
    if (terminalRef.current) {
      // Pequeno atraso para garantir que o DOM esteja renderizado
      setTimeout(() => {
        terminalRef.current!.scrollTop = terminalRef.current!.scrollHeight;
      }, 0);
    }
  }, [history, suggestion]); // Adiciona 'suggestion' como dependência para rolar quando sugestões aparecem

  // Sugestão dinâmica
  useEffect(() => {
    if (!input) return setSuggestion(null);
    const match = HELP_COMMANDS.find((cmd) =>
      cmd.startsWith(input.toLowerCase()),
    );
    setSuggestion(match && match !== input ? match : null);
  }, [input]);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return;

      if (trimmed === "clear") {
        setHistory([]);
        setInput("");
        setHistoryIndex(null);
        return;
      }

      let output: string | JSX.Element;

      if (trimmed === "help" || trimmed === "?") {
        const columns = 4;
        const lines: string[] = [];
        const keys = Object.keys(COMMANDS_INFO);
        for (let i = 0; i < keys.length; i += columns) {
          const slice = keys.slice(i, i + columns);
          lines.push(slice.map((cmd) => cmd.padEnd(15, " ")).join(""));
        }
        output = lines.join("\n");
      } else if (trimmed === "commands") {
        const lines = Object.entries(COMMANDS_INFO).map(
          ([cmd, info]) => `${cmd.padEnd(12, " ")} - ${info.description}`,
        );
        output = lines.join("\n");
      } else {
        output =
          COMMANDS_INFO[trimmed]?.output || `Command not found: ${trimmed}`;
      }

      setHistory((prev) => [...prev, { input: trimmed, output }]);
      setInput("");
      setSuggestion(null);
      setHistoryIndex(null); // reseta o índice do histórico
    }

    // Autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
        setSuggestion(null);
      }
    }

    // Navegação no histórico
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;

      setHistoryIndex((prev) => {
        const newIndex =
          prev === null ? history.length - 1 : Math.max(prev - 1, 0);
        setInput(history[newIndex].input);
        return newIndex;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;

      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const newIndex = prev + 1;
        if (newIndex >= history.length) {
          setInput("");
          return null;
        }
        setInput(history[newIndex].input);
        return newIndex;
      });
    }
  };

  return (
    <div className={styles.terminalWrapper}>
      <TerminalBackground />
      <div
        className={styles.terminal}
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
      >
        
        {history.map((cmd, idx) => (
          <div key={idx} className={styles.line}>
            <span className={styles.prompt}>
              user@anonymous~$: <span>{cmd.input}</span>
            </span>
            <div className={styles.output}>
              {typeof cmd.output === "string" ? (
                <pre>{cmd.output}</pre>
              ) : (
                cmd.output
              )}
            </div>
          </div>
        ))}
        <div className={styles.line} ref={inputContainerRef}>
            
          <span className={styles.prompt}>
            user@anonymous~$:
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInput}
              className={styles.input}
            />
          </span>
          {suggestion && (
            <div className={styles.suggestion}>
              Pressione <strong>Tab</strong> para completar: {suggestion}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
