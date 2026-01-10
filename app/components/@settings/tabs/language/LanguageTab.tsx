import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { classNames } from '~/utils/classNames';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

export default function LanguageTab() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('bolt_language', langCode);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg">
          <Globe className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-bolt-elements-textPrimary">
            {t('settings.language.title')}
          </h2>
          <p className="text-sm text-bolt-elements-textSecondary">
            {t('settings.language.description')}
          </p>
        </div>
      </div>

      {/* Language Selection */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-bolt-elements-textPrimary">
          {t('settings.language.selectLanguage')}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={classNames(
                'flex items-center justify-between p-4 rounded-xl border transition-all duration-200',
                currentLanguage === lang.code || currentLanguage.startsWith(lang.code + '-')
                  ? 'border-purple-500 bg-purple-500/10 dark:bg-purple-500/20'
                  : 'border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-purple-500/30 hover:bg-bolt-elements-background-depth-3'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.code === 'en' ? '🇺🇸' : '🇨🇳'}</span>
                <div className="text-left">
                  <div className="font-medium text-bolt-elements-textPrimary">
                    {lang.nativeName}
                  </div>
                  <div className="text-sm text-bolt-elements-textSecondary">
                    {lang.name}
                  </div>
                </div>
              </div>
              {(currentLanguage === lang.code || currentLanguage.startsWith(lang.code + '-')) && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Current Language Info */}
      <div className="p-4 bg-bolt-elements-background-depth-2 rounded-xl border border-bolt-elements-borderColor">
        <div className="flex items-center gap-2 text-sm text-bolt-elements-textSecondary">
          <span>{t('settings.language.currentLanguage')}:</span>
          <span className="font-medium text-bolt-elements-textPrimary">
            {LANGUAGES.find((l) => currentLanguage === l.code || currentLanguage.startsWith(l.code + '-'))?.nativeName ||
              currentLanguage}
          </span>
        </div>
      </div>
    </div>
  );
}
