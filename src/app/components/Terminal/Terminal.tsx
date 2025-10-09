'use client'

import { useState, useRef, useEffect, JSX } from 'react'
import styles from './Terminal.module.scss'
import Image from 'next/image'

interface Command {
    input: string
    output: string | JSX.Element
}

interface CommandInfo {
    description: string
    output?: JSX.Element | string
}

const PROJECTS = [
    { name: 'Tamashii', link: 'https://www.tamashii.com.br' },
    { name: 'The North Face', link: 'https://www.thenorthface.com.br' },
    { name: 'Soneda', link: 'https://www.soneda.com.br' },
    { name: 'Coqueluche Casa', link: 'https://www.coqueluchecasa.com.br' },
    { name: 'Autoglas', link: 'https://www.autoglassonline.com.br' },
    { name: 'All parts Net', link: 'https://www.allpartsnet.com.br' },
    { name: 'Karcher', link: 'https://loja.karcher.com.br' },
    { name: 'Mormaii', link: 'https://www.mormaiishop.com.br' },
    { name: 'Panasonic', link: 'https://loja.panasonic.com.br' },
    { name: 'São Geraldo Tintas', link: 'https://www.saogeraldotintas.com.br' },
    { name: 'Weleda', link: 'https://www.weleda.com.br' },
    { name: 'Heloisa Cestone', link: 'https://heloisacestone.com.br' },
    { name: 'Besni', link: 'https://besni.com.br' },
    { name: 'Rei do Armarinho', link: 'https://www.reidoarmarinho.com.br' },
    { name: 'Queens Berry', link: 'https://www.geleiasqueensberry.com.br' },
    { name: 'Condor', link: 'https://condor.ind.br' },
    { name: 'Santa Prata', link: 'https://www.santaprata.com.br' },
    { name: 'Cristais Cá doro', link: 'https://www.cristaiscadoro.com' },
    { name: 'Grupo Rojemac', link: 'https://www.gruporojemac.com.br' },
]

const SOCIALMEDIA = [
    { name: 'Instagram', link: 'https://www.instagram.com/cristian_hiei' },
    { name: 'GitHub', link: 'https://github.com/CristianR10' },
    { name: 'Linkedin', link: 'https://www.linkedin.com/in/cristian-renato-950183193' },
    { name: 'Whatsapp', link: 'https://wa.me/5511942576338?text=Ol%C3%A1%2C%20como%20posso%20te%20ajudar%3F' },
]

// Definição dos comandos
const COMMANDS_INFO: Record<string, CommandInfo> = {
    aboutme: {
        description: 'Mostra informações sobre o agente secreto',
        output: (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    marginTop: '0.5rem'
                }}
            >
                <div style={{ flex: 1 }}>
                    <span role="img" aria-label="detective">🕵️‍♂️</span> <strong>Cristian Renato</strong><br />
                    <strong>Missão:</strong> Especialista em Front-end há 5 anos e se aventurando no Back-end, construindo experiências digitais elegantes e funcionais.<br />
                    <strong>Experiência:</strong> Desenvolvimento de e-commerce (principalmente VTEX), Wordpress, além de projetos pessoais e experimentos criativos.<br />
                    <strong>Perfil:</strong> Proativo, colaborativo e sempre buscando melhorar processos e elevar o nível técnico da equipe.<br />
                    <strong>Habilidades:</strong> React, TypeScript, Next.js, SCSS, Node.js, VTEX, entre outras tecnologias modernas.<br />
                    <strong>Educação: Faculdade Eniac (Analise e Desenvolvimento de sistemas)</strong>
                    <strong>Experiencia: ...</strong>
                    <strong>Motto:</strong> Ajudar colegas e melhorar processos é parte da missão!
                </div>

                <div className={styles.informations}>
                    <Image
                        src="/Screenshot_19.png"
                        alt="Cristian Renato - Ficha Secreta"
                        className={styles.baseImage}
                    />
                </div>
            </div>

        )
    },
    skills: { description: 'Lista minhas skills', output: 'HTML5, SASS, LESS, JS, React, TypeScript, Next.js, Node.js, VTEX, uappi, PHP' },
    projects: {
        description: 'Mostra meus projetos', output: (
            <ul className={styles.allProjects}>
                {PROJECTS.map((project, idx) => (
                    <li key={idx}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            {project.name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    },
    help: { description: 'Mostra os comandos disponíveis' },
    clear: { description: 'Limpa o terminal' },
    commands: { description: 'Mostra os comandos com descrição' },
    social: {
        description: 'Minhas redes Sociais', output: (
            <div className={styles.allContacts}>
                {SOCIALMEDIA.map((social, idx) => (
                    <pre key={idx}>
                        <span>{social.name}</span>
                        <a href={social.link} target="_blank" rel="noopener noreferrer">
                            -{social.link}
                        </a>
                    </pre>
                ))}
            </div>
        )
    }
}

const HELP_COMMANDS = Object.keys(COMMANDS_INFO)

export default function Terminal() {
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<Command[]>([])
    const [suggestion, setSuggestion] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [historyIndex, setHistoryIndex] = useState<number | null>(null)


    // Foco automático
    useEffect(() => {
        inputRef.current?.focus()
    }, [history])

    // Sugestão dinâmica
    useEffect(() => {
        if (!input) return setSuggestion(null)
        const match = HELP_COMMANDS.find(cmd => cmd.startsWith(input.toLowerCase()))
        setSuggestion(match && match !== input ? match : null)
    }, [input])

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const trimmed = input.trim().toLowerCase()
            if (!trimmed) return

            if (trimmed === 'clear') {
                setHistory([])
                setInput('')
                setHistoryIndex(null)
                return
            }

            let output: string | JSX.Element

            if (trimmed === 'help' || trimmed === '?') {
                const columns = 4
                const lines: string[] = []
                const keys = Object.keys(COMMANDS_INFO)
                for (let i = 0; i < keys.length; i += columns) {
                    const slice = keys.slice(i, i + columns)
                    lines.push(slice.map(cmd => cmd.padEnd(15, ' ')).join(''))
                }
                output = lines.join('\n')
            } else if (trimmed === 'commands') {
                const lines = Object.entries(COMMANDS_INFO).map(
                    ([cmd, info]) => `${cmd.padEnd(12, ' ')} - ${info.description}`
                )
                output = lines.join('\n')
            } else {
                output = COMMANDS_INFO[trimmed]?.output || `Command not found: ${trimmed}`
            }

            setHistory(prev => [...prev, { input: trimmed, output }])
            setInput('')
            setSuggestion(null)
            setHistoryIndex(null) // reseta o índice do histórico
        }

        // Autocomplete
        if (e.key === 'Tab') {
            e.preventDefault()
            if (suggestion) {
                setInput(suggestion)
                setSuggestion(null)
            }
        }

        // Navegação no histórico
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (history.length === 0) return

            setHistoryIndex(prev => {
                const newIndex = prev === null ? history.length - 1 : Math.max(prev - 1, 0)
                setInput(history[newIndex].input)
                return newIndex
            })
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (history.length === 0) return

            setHistoryIndex(prev => {
                if (prev === null) return null
                const newIndex = prev + 1
                if (newIndex >= history.length) {
                    setInput('')
                    return null
                }
                setInput(history[newIndex].input)
                return newIndex
            })
        }
    }


    return (
        <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
            {history.map((cmd, idx) => (
                <div key={idx} className={styles.line}>
                    <span className={styles.prompt}>
                        user@anonymous~$: <span>{cmd.input}</span>
                    </span>
                    <div className={styles.output}>
                        {typeof cmd.output === 'string' ? <pre>{cmd.output}</pre> : cmd.output}
                    </div>
                </div>
            ))}

            <div className={styles.line}>
                <span className={styles.prompt}>
                    user@anonymous~$:
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleInput}
                        className={styles.input}
                    />
                </span>
                {suggestion && <div className={styles.suggestion}>Pressione <strong>Tab</strong> para completar: {suggestion}</div>}
            </div>
        </div>
    )
}
