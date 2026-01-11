import React from 'react';
import { useTranslation } from 'react-i18next';

interface ExamplePromptsProps {
  sendMessage?: (event: React.UIEvent, messageInput?: string) => void;
}

export function ExamplePrompts({ sendMessage }: ExamplePromptsProps) {
  const { t } = useTranslation();

  const EXAMPLE_PROMPTS = [
    { text: t('examplePrompts.mobileApp'), originalText: 'Create a mobile app about bolt.diy' },
    { text: t('examplePrompts.todoApp'), originalText: 'Build a todo app in React using Tailwind' },
    { text: t('examplePrompts.blog'), originalText: 'Build a simple blog using Astro' },
    { text: t('examplePrompts.cookieConsent'), originalText: 'Create a cookie consent form using Material UI' },
    { text: t('examplePrompts.spaceGame'), originalText: 'Make a space invaders game' },
    { text: t('examplePrompts.ticTacToe'), originalText: 'Make a Tic Tac Toe game in html, css and js only' },
  ];

  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                // Send the original English prompt to the AI for better understanding
                sendMessage?.(event, examplePrompt.originalText);
              }}
              className="border border-bolt-elements-borderColor rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary px-3 py-1 text-xs transition-theme"
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
