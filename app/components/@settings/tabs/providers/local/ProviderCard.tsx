import React, { useState } from 'react';
import { Switch } from '~/components/ui/Switch';
import { Card, CardContent } from '~/components/ui/Card';
import { Link, Server, Monitor, Globe, Key, Layers, Eye, EyeOff } from 'lucide-react';
import { classNames } from '~/utils/classNames';
import type { IProviderConfig } from '~/types/model';
import { PROVIDER_DESCRIPTIONS } from './types';

// Provider Card Component
interface ProviderCardProps {
  provider: IProviderConfig;
  onToggle: (enabled: boolean) => void;
  onUpdateBaseUrl: (url: string) => void;
  onUpdateApiKey?: (apiKey: string) => void;
  onUpdateModels?: (models: string) => void;
  isEditing: boolean;
  onStartEditing: () => void;
  onStopEditing: () => void;
}

function ProviderCard({
  provider,
  onToggle,
  onUpdateBaseUrl,
  onUpdateApiKey,
  onUpdateModels,
  isEditing,
  onStartEditing,
  onStopEditing,
}: ProviderCardProps) {
  const [editingField, setEditingField] = useState<'baseUrl' | 'apiKey' | 'models' | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const getIcon = (providerName: string) => {
    switch (providerName) {
      case 'Ollama':
        return Server;
      case 'LMStudio':
        return Monitor;
      case 'OpenAILike':
        return Globe;
      default:
        return Server;
    }
  };

  const Icon = getIcon(provider.name);
  const isOpenAILike = provider.name === 'OpenAILike';

  const handleStartEditing = (field: 'baseUrl' | 'apiKey' | 'models') => {
    setEditingField(field);
    if (field === 'baseUrl') {
      onStartEditing();
    }
  };

  const handleStopEditing = () => {
    setEditingField(null);
    onStopEditing();
  };

  return (
    <Card className="bg-bolt-elements-background-depth-2 hover:bg-bolt-elements-background-depth-3 transition-all duration-300 shadow-sm hover:shadow-md border border-bolt-elements-borderColor hover:border-purple-500/30">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div
              className={classNames(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300',
                provider.settings.enabled
                  ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 ring-1 ring-purple-500/30'
                  : 'bg-bolt-elements-background-depth-3',
              )}
            >
              <Icon
                className={classNames(
                  'w-6 h-6 transition-all duration-300',
                  provider.settings.enabled ? 'text-purple-500' : 'text-bolt-elements-textTertiary',
                )}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-bolt-elements-textPrimary">{provider.name}</h3>
                <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500 font-medium">Local</span>
              </div>
              <p className="text-sm text-bolt-elements-textSecondary mb-4">
                {PROVIDER_DESCRIPTIONS[provider.name as keyof typeof PROVIDER_DESCRIPTIONS]}
              </p>

              {provider.settings.enabled && (
                <div className="space-y-4">
                  {/* API Endpoint */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-bolt-elements-textPrimary">API Endpoint</label>
                    {isEditing || editingField === 'baseUrl' ? (
                      <input
                        type="text"
                        defaultValue={provider.settings.baseUrl}
                        placeholder={`Enter ${provider.name} base URL`}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-bolt-elements-background-depth-4 border border-purple-500/30 text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 shadow-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onUpdateBaseUrl(e.currentTarget.value);
                            handleStopEditing();
                          } else if (e.key === 'Escape') {
                            handleStopEditing();
                          }
                        }}
                        onBlur={(e) => {
                          onUpdateBaseUrl(e.target.value);
                          handleStopEditing();
                        }}
                        autoFocus
                      />
                    ) : (
                      <button
                        onClick={() => handleStartEditing('baseUrl')}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor hover:border-purple-500/30 hover:bg-bolt-elements-background-depth-4 hover:shadow-sm transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center gap-3 text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary">
                          <Link className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                          <span className="font-mono">{provider.settings.baseUrl || 'Click to set base URL'}</span>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* API Key - Only for OpenAILike */}
                  {isOpenAILike && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-bolt-elements-textPrimary">API Key</label>
                      {editingField === 'apiKey' ? (
                        <div className="relative">
                          <input
                            type={showApiKey ? 'text' : 'password'}
                            defaultValue={provider.settings.apiKey || ''}
                            placeholder="Enter your API key"
                            className="w-full px-4 py-3 pr-12 rounded-lg text-sm bg-bolt-elements-background-depth-4 border border-purple-500/30 text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 shadow-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                onUpdateApiKey?.(e.currentTarget.value);
                                handleStopEditing();
                              } else if (e.key === 'Escape') {
                                handleStopEditing();
                              }
                            }}
                            onBlur={(e) => {
                              onUpdateApiKey?.(e.target.value);
                              handleStopEditing();
                            }}
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-bolt-elements-textTertiary hover:text-bolt-elements-textPrimary transition-colors"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEditing('apiKey')}
                          className="w-full px-4 py-3 rounded-lg text-sm bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor hover:border-purple-500/30 hover:bg-bolt-elements-background-depth-4 hover:shadow-sm transition-all duration-200 text-left group"
                        >
                          <div className="flex items-center gap-3 text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary">
                            <Key className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                            <span className="font-mono">
                              {provider.settings.apiKey ? '••••••••••••••••' : 'Click to set API key'}
                            </span>
                          </div>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Custom Models - Only for OpenAILike */}
                  {isOpenAILike && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-bolt-elements-textPrimary">
                        Custom Models
                        <span className="ml-2 text-xs text-bolt-elements-textTertiary font-normal">
                          (格式: 模型名:最大token数, 用分号分隔)
                        </span>
                      </label>
                      {editingField === 'models' ? (
                        <textarea
                          defaultValue={provider.settings.OPENAI_LIKE_API_MODELS || ''}
                          placeholder="例如: Qwen/Qwen2.5-72B-Instruct:32768;deepseek-ai/DeepSeek-V3:65536"
                          className="w-full px-4 py-3 rounded-lg text-sm bg-bolt-elements-background-depth-4 border border-purple-500/30 text-bolt-elements-textPrimary placeholder-bolt-elements-textTertiary focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 shadow-sm resize-none"
                          rows={3}
                          onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                              handleStopEditing();
                            }
                          }}
                          onBlur={(e) => {
                            onUpdateModels?.(e.target.value);
                            handleStopEditing();
                          }}
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => handleStartEditing('models')}
                          className="w-full px-4 py-3 rounded-lg text-sm bg-bolt-elements-background-depth-3 border border-bolt-elements-borderColor hover:border-purple-500/30 hover:bg-bolt-elements-background-depth-4 hover:shadow-sm transition-all duration-200 text-left group"
                        >
                          <div className="flex items-center gap-3 text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary">
                            <Layers className="w-4 h-4 group-hover:text-purple-500 transition-colors" />
                            <span className="font-mono truncate">
                              {provider.settings.OPENAI_LIKE_API_MODELS || 'Click to add custom models'}
                            </span>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Switch
            checked={provider.settings.enabled}
            onCheckedChange={onToggle}
            aria-label={`Toggle ${provider.name} provider`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProviderCard;
