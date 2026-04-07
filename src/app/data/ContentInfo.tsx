import { JSX } from "react";
import styles from "@/app/components/Terminal/Terminal.module.scss";
import Image from "next/image";

interface CommandInfo {
  description: string;
  output?: JSX.Element | string;
}

export const PROJECTS = [
  { name: "Tamashii", link: "https://www.tamashii.com.br" },
  { name: "The North Face", link: "https://www.thenorthface.com.br" },
  { name: "Soneda", link: "https://www.soneda.com.br" },
  { name: "Coqueluche Casa", link: "https://www.coqueluchecasa.com.br" },
  { name: "Autoglas", link: "https://www.autoglassonline.com.br" },
  { name: "All parts Net", link: "https://www.allpartsnet.com.br" },
  { name: "Karcher", link: "https://loja.karcher.com.br" },
  { name: "Mormaii", link: "https://www.mormaiishop.com.br" },
  { name: "Panasonic", link: "https://loja.panasonic.com.br" },
  { name: "São Geraldo Tintas", link: "https://www.saogeraldotintas.com.br" },
  { name: "Weleda", link: "https://www.weleda.com.br" },
  { name: "Heloisa Cestone", link: "https://heloisacestone.com.br" },
  { name: "Besni", link: "https://besni.com.br" },
  { name: "Rei do Armarinho", link: "https://www.reidoarmarinho.com.br" },
  { name: "Queens Berry", link: "https://www.geleiasqueensberry.com.br" },
  { name: "Condor", link: "https://condor.ind.br" },
  { name: "Santa Prata", link: "https://www.santaprata.com.br" },
  { name: "Cristais Cá doro", link: "https://www.cristaiscadoro.com" },
  { name: "Grupo Rojemac", link: "https://www.gruporojemac.com.br" },
  { name: "Hidramais", link: "https://www.hidramais.com.br" },
];

export const SOCIALMEDIA = [
  { name: "Instagram", link: "https://www.instagram.com/cristian_hiei" },
  { name: "GitHub", link: "https://github.com/CristianR10" },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/cristian-renato-950183193",
  },
  {
    name: "Whatsapp",
    link: "https://wa.me/5511942576338?text=Ol%C3%A1%2C%20como%20posso%20te%20ajudar%3F",
  },
];

export const EXPS = [
  {
    name: "Maeztra (2019 - 2023) - CLT ",
    cargo: "Desenvolvedor Jr - Desenvolvedor Pleno ",
    responsabilidade:
      "Desenvolver lojas na plataforma vtex legado e vtex IO, criação de componentes para a plataforma",
    Tecnologias:
      "Frontend: HTML5, CSS3, HandleBars, jQuery, Bootstrap, gulp, Sass, Less, React, Typescript, Javascript vanilla.",
    ControleVersão: "BitBucket, Gitflow",
  },
  {
    name: "FRN³ (2023 - atualmente) - CLT",
    cargo: "Desenvolvedor Pleno ",
    responsabilidade:
      "Desenvolver lojas na plataforma vtex IO, criação de componentes para a plataforma. Projetos no wordpress de lojas e landing pages e plugins ",
    Tecnologias:
      "Frontend: HTML5, CSS3, HandleBars, jQuery, Bootstrap, gulp, Sass, React,Typescript, Javascript vanilla, docker Backend: PHP, Nodejs",
    ControleVersão: "BitBucket, Gitflow, Git Lab",
  },
];

export const COMMANDS_INFO: Record<string, CommandInfo> = {
  aboutme: {
    description: "Mostra informações sobre o agente secreto",
    output: (
      <div className={styles.aboutme}>
        <div className={styles.aboutmeContainer}>
          <div className={styles.aboutmeHeader}>
            <div className={styles.aboutmeHeaderName}>
              <p>Desenvolvedor Full Stack</p>
              <strong>Cristian Renato</strong>
            </div>
            <div className={styles.aboutmeHeaderAcess}>
              <p>ACESS</p>
              <strong>*********</strong>
            </div>
          </div>
          <div className={styles.informations}>
            <Image
              src="/Screenshot_19.png"
              alt="Cristian Renato - Ficha Secreta"
              className={styles.baseImage}
              width={150}
              height={150}
            />
            <div className={styles.contentInfoCard}>
              <p>Faculdade Eniac - Formado 2019</p>
              <p>
                skills: HTML5, SASS, LESS, JS, React, TypeScript, Next.js,
                Node.js, VTEX, uappi, PHP
              </p>
            </div>
          </div>
          <div className={styles.footerCardAboutme}>
            <p>
              Especialista em Front-end há 5 anos e se aventurando no Back-end,
              construindo experiências digitais elegantes e funcionais.
              Desenvolvimento de e-commerce (principalmente VTEX), Wordpress,
              além de projetos pessoais e experimentos criativos. meu perfil é
              Proativo, colaborativo e sempre buscando melhorar processos e
              elevar o nível técnico da equipe
            </p>
          </div>
        </div>
      </div>
    ),
  },
  skills: {
    description: "Lista minhas skills",
    output:
      "HTML5, SASS, LESS, JS, React, TypeScript, Next.js, Node.js, VTEX, uappi, PHP",
  },
  projects: {
    description: "Mostra meus projetos",
    output: (
      <ul className={styles.allProjects}>
        {PROJECTS.map((project, idx) => (
          <li key={idx}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    ),
  },
  help: { description: "Mostra os comandos disponíveis" },
  clear: { description: "Limpa o terminal" },
  commands: { description: "Mostra os comandos com descrição" },
  social: {
    description: "Minhas redes Sociais",
    output: (
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
    ),
  },
  experiencie: {
    description: "Minhas Expêriencias",
    output: (
      <div className={styles.expContainer}>
        {EXPS.map((exp, idexp) => (
          <div className={styles.expContainerContent} key={idexp}>
            <div className={styles.expContainerContentHeaader}>
              <p>{exp.name}</p>
              <p>Cargo: {exp.cargo}</p>
            </div>
            <div className={styles.expContainerContentBody}>
              <p>Responsabilidades: {exp.responsabilidade}</p>
              <p>Tecnologias: {exp.Tecnologias}</p>
              <p>Ferramenta Controle de Versões: {exp.ControleVersão}</p>
            </div>
          </div>
        ))}
        {/* <ul className={styles.allProjects}>
                    {EXPS.map((project, idx) => (
                        <li key={idx}>
                            <a href={project.} target="_blank" rel="noopener noreferrer">
                                {project.name}
                            </a>
                        </li>
                    ))}
                </ul> */}
      </div>
    ),
  },
};

export const HELP_COMMANDS = Object.keys(COMMANDS_INFO);
