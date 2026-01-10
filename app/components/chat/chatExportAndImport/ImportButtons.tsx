import type { Message } from 'ai';
import { toast } from 'react-toastify';
import { ImportFolderButton } from '~/components/chat/ImportFolderButton';
import { Button } from '~/components/ui/Button';
import { classNames } from '~/utils/classNames';
import { useTranslation } from 'react-i18next';

type ChatData = {
  messages?: Message[]; // Standard Bolt format
  description?: string; // Optional description
};

interface ImportButtonsProps {
  importChat?: (description: string, messages: Message[]) => Promise<void>;
}

export function ImportButtons({ importChat }: ImportButtonsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center w-auto">
      <input
        type="file"
        id="chat-import"
        className="hidden"
        accept=".json"
        onChange={async (e) => {
          const file = e.target.files?.[0];

          if (file && importChat) {
            try {
              const reader = new FileReader();

              reader.onload = async (e) => {
                try {
                  const content = e.target?.result as string;
                  const data = JSON.parse(content) as ChatData;

                  // Standard format
                  if (Array.isArray(data.messages)) {
                    await importChat(data.description || 'Imported Chat', data.messages);
                    toast.success(t('import.chatImported'));

                    return;
                  }

                  toast.error(t('import.invalidFormat'));
                } catch (error: unknown) {
                  if (error instanceof Error) {
                    toast.error(t('import.parseFailed') + ': ' + error.message);
                  } else {
                    toast.error(t('import.parseFailed'));
                  }
                }
              };
              reader.onerror = () => toast.error(t('import.readFailed'));
              reader.readAsText(file);
            } catch (error) {
              toast.error(error instanceof Error ? error.message : t('import.importFailed'));
            }
            e.target.value = ''; // Reset file input
          } else {
            toast.error(t('import.somethingWrong'));
          }
        }}
      />
      <div className="flex flex-col items-center gap-4 max-w-2xl text-center">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              const input = document.getElementById('chat-import');
              input?.click();
            }}
            variant="default"
            size="lg"
            className={classNames(
              'gap-2 bg-bolt-elements-background-depth-1',
              'text-bolt-elements-textPrimary',
              'hover:bg-bolt-elements-background-depth-2',
              'border border-bolt-elements-borderColor',
              'h-10 px-4 py-2 min-w-[120px] justify-center',
              'transition-all duration-200 ease-in-out',
            )}
          >
            <span className="i-ph:upload-simple w-4 h-4" />
            {t('chat.importChat')}
          </Button>
          <ImportFolderButton
            importChat={importChat}
            className={classNames(
              'gap-2 bg-bolt-elements-background-depth-1',
              'text-bolt-elements-textPrimary',
              'hover:bg-bolt-elements-background-depth-2',
              'border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]',
              'h-10 px-4 py-2 min-w-[120px] justify-center',
              'transition-all duration-200 ease-in-out rounded-lg',
            )}
          />
        </div>
      </div>
    </div>
  );
}
