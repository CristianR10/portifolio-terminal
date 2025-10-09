'use client'

import styles from '@/app/components/Terminal/Terminal.module.scss'
import { useEffect, useState } from 'react'

interface HeaderProps {
    link?: string
    linkLabel?: string
}

function Header({ link, linkLabel }: HeaderProps) {
    const [date, setDate] = useState('')
    const [typedMessage, setTypedMessage] = useState('')
    const [instructionsMessage, setInstructionsMessage] = useState('')
    const [emoji, setEmoji] = useState('')

    const asciiArt = `
::::::::  :::::::::  :::::::::::  ::::::::  ::::::::::: :::::::::::     :::     ::::    :::
:+:    :+: :+:    :+:     :+:     :+:    :+:     :+:         :+:       :+: :+:   :+:+:   :+:
+:+        +:+    +:+     +:+     +:+            +:+         +:+      +:+   +:+  :+:+:+  +:+
#+#        +#++:++#:      +#+     +#++:++#++     +#+         +#+     +#++:++#++: +#+ +:+ +#+
#+#        +#+    +#+     +#+            +#+     +#+         +#+     +#+     +#+ +#+  +#+#+#
#+#    #+# #+#    #+#     #+#     #+#    #+#     #+#         #+#     #+#     #+# #+#   #+#+#
########  ###    ### ###########  ########      ###     ########### ###     ### ###    ####
`

    const welcomeMessage = ' Bem vindo ao meu terminal Portfolio'
    const instructionsText = ' Digite "help" ou "?" para ver a lista de comandos'
    const emojis = ['😁', '🤯', '🤖', '🎃', '👹', '👾', '😺', '👨‍👩‍👧‍👦', '🐶', '🐐']

    // Função genérica de digitação
    const typeText = (
        text: string,
        callback: React.Dispatch<React.SetStateAction<string>>,
        delay: number,
        onComplete?: () => void
    ) => {
        let index = 0
        const interval = setInterval(() => {
            if (index < text.length) {
                callback(prev => prev + text.charAt(index))
                index++
            } else {
                clearInterval(interval)
                if (onComplete) onComplete()
            }
        }, delay)
    }


    // Seleciona um emoji aleatório no carregamento
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * emojis.length)
        setEmoji(emojis[randomIndex])
    }, [emojis])

    // Atualiza a data/hora
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const formatted = now.toLocaleString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
            setDate(formatted)
        }, 1000) // atualiza a cada 1 segundo

        return () => clearInterval(interval) // limpa o intervalo ao desmontar
    }, [])


    // Efeito de digitação DRY
    useEffect(() => {
        if (!emoji) return

        typeText(welcomeMessage, setTypedMessage, 100, () => {
            setTypedMessage(prev => prev + ' ' + emoji)
            typeText(instructionsText, setInstructionsMessage, 50)
        })
    }, [emoji])

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
                            {linkLabel || 'Meu Link'}
                        </a>
                    )}
                </div>
                <div>
                    <span className={styles.date}>{date}</span>
                </div>
            </div>

            <pre
                style={{
                    color: 'var(--neon)',
                    fontFamily: 'Share Tech Mono, monospace',
                    whiteSpace: 'pre',
                    animation: 'neonPulse 1s infinite alternate'
                }}
            >
                {asciiArt}
            </pre>

            <div
                style={{
                    color: 'var(--neon)',
                    fontFamily: 'Share Tech Mono, monospace',
                    margin: '1rem'
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
    )
}

export default Header
