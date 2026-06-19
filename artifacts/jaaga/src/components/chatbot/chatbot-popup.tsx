

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@/components/ui/prompt-input'
import { ArrowUp, Bot, Square, X, User, Mic, Volume2, Loader2, Pause, Play, Languages } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
// AI flows removed - using API calls

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type Message = {
  role: 'user' | 'bot'
  text: string
  audioData?: string;
  isAudioLoading?: boolean;
}

type AudioState = {
  index: number | null;
  audio: HTMLAudioElement | SpeechSynthesisUtterance | null;
  isPlaying: boolean;
};

const formatMessageText = (text: string) => {
  if (!text) return null;

  // Split text by double asterisks for bolding
  const boldParts = text.split('**');
  const elements = boldParts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part}
        </strong>
      );
    }
    
    // Process bullet points and replace asterisks within normal text
    const lines = part.split('\n');
    const formattedLines = lines.map((line) => {
      if (line.trim().startsWith('* ')) {
        return line.replace(/^\s*\*\s/, '• ');
      }
      return line;
    });
    
    return formattedLines.join('\n');
  });

  return <>{elements}</>;
};

export function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Hello! I am JaaGa’s AI Assistant. How can I help you with your property questions today?',
    },
  ])
  const [activeAudio, setActiveAudio] = useState<AudioState>({ index: null, audio: null, isPlaying: false });
  const [speechLanguage, setSpeechLanguage] = useState<'en' | 'te'>('en');

  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.lang = speechLanguage === 'te' ? 'te-IN' : 'en-US'
        recognitionRef.current.interimResults = false

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          if (event.error === 'not-allowed') {
            setMessages(prev => [
              ...prev,
              {
                role: 'bot',
                text: '⚠️ **Microphone access blocked.** Please grant microphone permission in your browser settings (usually by clicking the lock or microphone settings icon on the left of the URL bar) and try again.'
              }
            ])
          } else if (event.error === 'no-speech') {
            // No speech detected, ignore or reset silently
          } else {
            setMessages(prev => [
              ...prev,
              {
                role: 'bot',
                text: `⚠️ **Voice input issue:** ${event.error}. Please check your hardware or try again.`
              }
            ])
          }
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [speechLanguage])


  // Auto-scroll to bottom on new message
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      'div[data-radix-scroll-area-viewport]'
    )
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
      } else {
        recognitionRef.current.start()
      }
      setIsListening(!isListening)
    } else {
      alert('Speech recognition is not supported in your browser.')
    }
  }

  const generateAndSetAudio = async (text: string, messageIndex: number) => {
    try {
      const response = { audio: undefined }; // TTS not available in this environment
      setMessages(prev => {
        const newMessages = [...prev];
        if(newMessages[messageIndex]) {
          newMessages[messageIndex] = { ...newMessages[messageIndex], audioData: response.audio, isAudioLoading: false };
        }
        return newMessages;
      });
    } catch (error) {
      console.error('Failed to generate audio:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        if(newMessages[messageIndex]) {
          newMessages[messageIndex] = { ...newMessages[messageIndex], isAudioLoading: false };
        }
        return newMessages;
      });
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', text: input };
    const botMessagePlaceholder: Message = { role: 'bot', text: '', isAudioLoading: true };

    setMessages(prev => [...prev, userMessage, botMessagePlaceholder]);
    const botMessageIndex = messages.length + 1;
    
    setInput('')
    setIsLoading(true)

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      }).catch(() => null);
      const response = resp?.ok ? await resp.json().then(d => d.reply || d.response || d.message || 'Sorry, I could not process your request.').catch(() => 'Sorry, I could not process your request.') : 'I am the JaaGa AI assistant. I can help you understand property documents and services. Please visit jaaga.ai for a full experience.'
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[botMessageIndex]) {
            newMessages[botMessageIndex] = { ...newMessages[botMessageIndex], text: response };
        }
        return newMessages;
      });
      generateAndSetAudio(response, botMessageIndex);
    } catch {
      const errorMessage = 'Sorry, something went wrong. Please try again later.';
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[botMessageIndex]) {
            newMessages[botMessageIndex] = { role: 'bot', text: errorMessage, isAudioLoading: false };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false)
    }
  }

  const speakText = (text: string, index: number) => {
    if (typeof window === 'undefined') return;

    // Clean text of markdown syntax (*, **, #, etc.) to make TTS sound perfect and human-like
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/•/g, '')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .replace(/_(_)?/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Set language based on selected speechLanguage
    if (speechLanguage === 'te') {
      utterance.lang = 'te-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    // Try to find matching voice
    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(speechLanguage));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }

    utterance.onend = () => {
      setActiveAudio({ index: null, audio: null, isPlaying: false });
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      setActiveAudio({ index: null, audio: null, isPlaying: false });
    };

    setActiveAudio({ index, audio: utterance, isPlaying: true });
    window.speechSynthesis.speak(utterance);
  };

  const handlePlayAudio = (text: string, index: number) => {
    if (typeof window === 'undefined') return;

    // If clicking the currently playing audio, toggle pause/play
    if (activeAudio.index === index) {
      if (activeAudio.isPlaying) {
        window.speechSynthesis.cancel();
        setActiveAudio({ index: null, audio: null, isPlaying: false });
      } else {
        speakText(text, index);
      }
      return;
    }

    // Stop any currently playing speech
    window.speechSynthesis.cancel();
    speakText(text, index);
  };


  return (
    <>
      {/* BOT BUTTON */}
      <div className="fixed bottom-4 right-4 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full w-14 h-14 bg-primary shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                <Bot className="h-7 w-7" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>JaaGa Bot</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* CHAT CARD */}
      <div
        className={cn(
          'fixed z-50 transition-all duration-300',
          'bottom-4 right-4 sm:bottom-24 sm:right-4',
          'w-[calc(100vw-2rem)] h-[calc(100vh-5rem)] sm:w-[380px] sm:h-[500px]',
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        )}
      >
        <Card className="w-full h-full flex flex-col shadow-xl">
          {/* HEADER (FIXED) */}
          <CardHeader className="shrink-0 flex flex-row items-center justify-between border-b">
             <div className='flex items-center gap-2'>
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">JaaGa Bot</CardTitle>
            </div>
            <div className="flex items-center gap-1">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Languages className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => setSpeechLanguage('en')} className={cn(speechLanguage === 'en' && 'bg-accent')}>English</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSpeechLanguage('te')} className={cn(speechLanguage === 'te' && 'bg-accent')}>Telugu</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
            </div>
          </CardHeader>

          {/* MESSAGES (ONLY THIS SCROLLS) */}
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 px-4" ref={scrollRef}>
              <div className="space-y-4 py-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      msg.role === 'user' && 'justify-end'
                    )}
                  >
                    {msg.role === 'bot' && (
                      <div className="bg-primary text-primary-foreground p-2 rounded-full shrink-0">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}

                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap',
                        msg.role === 'bot'
                          ? 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      )}
                    >
                      {msg.text ? formatMessageText(msg.text) : <Loader2 className="w-5 h-5 animate-spin"/>}
                       {msg.role === 'bot' && msg.text && (
                        <div className="mt-2 text-right">
                           {msg.isAudioLoading ? (
                             <Loader2 className="w-4 h-4 animate-spin text-muted-foreground inline" />
                           ) : (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-primary rounded-full hover:bg-zinc-200"
                              onClick={() => handlePlayAudio(msg.text, index)}
                              title={speechLanguage === 'te' ? "వినండి" : "Listen"}
                            >
                              {activeAudio.index === index && activeAudio.isPlaying ? <Pause className="h-4 w-4 text-primary animate-pulse" /> : <Play className="h-4 w-4" />}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="bg-muted p-2 rounded-full shrink-0">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && !messages.some(m => m.role === 'bot' && !m.text) && (
                  <div className="flex gap-3">
                    <div className="bg-primary p-2 rounded-full">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-muted px-4 py-3 rounded-lg">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
    
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* INPUT (FIXED) */}
          <div className="shrink-0 border-t p-4">
            <PromptInput
              value={input}
              onValueChange={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            >
              <PromptInputTextarea placeholder="Ask me anything…" />
              <PromptInputActions className="justify-end pt-2">
                 <PromptInputAction tooltip="Voice Input">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    onClick={handleVoiceInput}
                    disabled={isLoading}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
                  </Button>
                </PromptInputAction>
                <PromptInputAction tooltip="Send">
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={handleSubmit}
                    disabled={!input || isLoading}
                  >
                    {isLoading ? (
                      <Square className="h-4 w-4 fill-current" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </Button>
                </PromptInputAction>
              </PromptInputActions>
            </PromptInput>
          </div>
        </Card>
      </div>
    </>
  )
}
