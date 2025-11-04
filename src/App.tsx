import { HologramOrb } from './components/HologramOrb';
import { Send, Paperclip, Image, Link2, Smile } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [showFirstTypingIndicator, setShowFirstTypingIndicator] = useState(false);
  const [showFirstResponse, setShowFirstResponse] = useState(false);
  const [displayedFirstText, setDisplayedFirstText] = useState('');
  const [showSecondTypingIndicator, setShowSecondTypingIndicator] = useState(false);
  const [showSecondResponse, setShowSecondResponse] = useState(false);
  const [visibleSecondParagraphs, setVisibleSecondParagraphs] = useState(0);
  const [showEmailWindow, setShowEmailWindow] = useState(false);
  const [showThirdTypingIndicator, setShowThirdTypingIndicator] = useState(false);
  const [showThirdResponse, setShowThirdResponse] = useState(false);
  const [displayedThirdText, setDisplayedThirdText] = useState('');
  
  const chatAreaRef = useRef<HTMLDivElement>(null);
  
  const userMessageText = '동동아. 미셸에게 다음 주에 한국에 오면 미팅 잡을거라는 메일을 불어로 보내. 아주 정중하고 공식적인 어투로.';
  const firstText = '그럼요 민아님. 저만 믿으세요^^';
  const thirdText = '여기, 보낼까요?';
  
  const secondParagraphs = [
    "Bonjour Mademoiselle Michèle,",
    "Je me permets de me présenter : je suis Mina Lee, assistante du directeur général M. Sunwoo Lee de Woo22.",
    "Mon directeur ainsi que l'ensemble de nos collaborateurs portent une profonde admiration et un vif intérêt à vos activités et à vos réalisations. Nous avons appris avec grand plaisir que votre projet de tournée mondiale inclut une étape en Corée, et c'est avec beaucoup de respect que je prends la liberté de vous écrire aujourd'hui.",
    "À cette occasion, nous souhaiterions avoir l'honneur d'échanger directement avec vous au sujet de notre projet de collaboration « Mam'selle » entre Woo22 et vous-même. Si votre emploi du temps le permet, pourriez-vous nous accorder un moment lors de votre séjour en Corée ?",
    "Nous nous adapterons bien entendu à la date, à l'heure et au lieu qui vous conviendront le mieux.\nNous espérons vivement une réponse favorable de votre part.",
    "Avec nos remerciements les plus sincères,\nMina Ｃhoi\nAssistante de direction, Woo22"
  ];

  const emailContent = {
    to: 'Mademoiselle Michèle',
    subject: 'Demande de rencontre concernant le projet',
    body: `Bonjour Mademoiselle Michèle,

Je me permets de me présenter : je suis Mina Lee, assistante du directeur général M. Sunwoo Lee de Woo22.

Mon directeur ainsi que l'ensemble de nos collaborateurs portent une profonde admiration et un vif intérêt à vos activités et à vos réalisations. Nous avons appris avec grand plaisir que votre projet de tournée mondiale inclut une étape en Corée, et c'est avec beaucoup de respect que je prends la liberté de vous écrire aujourd'hui.

À cette occasion, nous souhaiterions avoir l'honneur d'échanger directement avec vous au sujet de notre projet de collaboration « Mam'selle » entre Woo22 et vous-même. Si votre emploi du temps le permet, pourriez-vous nous accorder un moment lors de votre séjour en Corée ?

Nous nous adapterons bien entendu à la date, à l'heure et au lieu qui vous conviendront le mieux.
Nous espérons vivement une réponse favorable de votre part.

Avec nos remerciements les plus sincères,
Mina Ｃhoi
Assistante de direction, Woo22`
  };

  useEffect(() => {
    const listeningTimer = setTimeout(() => {
      setIsListening(true);
    }, 5000);

    const stopListeningTimer = setTimeout(() => {
      setIsListening(false);
    }, 12000); // 5초 + 7초
    
    const showUserMessageTimer = setTimeout(() => {
      setShowUserMessage(true);
    }, 13000); // 홀로그램 끝나고 1초 후

    return () => {
      clearTimeout(listeningTimer);
      clearTimeout(stopListeningTimer);
      clearTimeout(showUserMessageTimer);
    };
  }, []);

  // 사용자 메시지 표시 후 첫 번째 타이핑 ��디케이터
  useEffect(() => {
    if (showUserMessage) {
      const timer = setTimeout(() => {
        setShowFirstTypingIndicator(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [showUserMessage]);

  // 첫 번째 타이핑 인디케이터 후 첫 번째 응답
  useEffect(() => {
    if (showFirstTypingIndicator) {
      const timer = setTimeout(() => {
        setShowFirstTypingIndicator(false);
        setShowFirstResponse(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showFirstTypingIndicator]);

  // 첫 번째 말풍선 타이핑 효과
  useEffect(() => {
    if (showFirstResponse) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= firstText.length) {
          setDisplayedFirstText(firstText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          // 첫 번째 말풍선이 완료되면 1초 후 두 번째 입력중 표시
          setTimeout(() => {
            setShowSecondTypingIndicator(true);
          }, 1000);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [showFirstResponse]);

  // 두 번째 말풍선 표시 시작
  useEffect(() => {
    if (showSecondTypingIndicator) {
      const timer = setTimeout(() => {
        setShowSecondTypingIndicator(false);
        setShowSecondResponse(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSecondTypingIndicator]);

  // 두 번째 말풍선 문단별로 순차적으로 표시
  useEffect(() => {
    if (showSecondResponse && visibleSecondParagraphs < secondParagraphs.length) {
      const timer = setTimeout(() => {
        setVisibleSecondParagraphs(prev => prev + 1);
      }, 400); // 각 문단이 0.4초 간격으로 나타남

      return () => clearTimeout(timer);
    } else if (showSecondResponse && visibleSecondParagraphs === secondParagraphs.length) {
      // 두 번째 말풍선이 완료되면 1.5초 후 이메일창 표시
      const timer = setTimeout(() => {
        setShowEmailWindow(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showSecondResponse, visibleSecondParagraphs, secondParagraphs.length]);

  // 이메일창이 표시되면 1.5초 후 세 번째 입력중 표시
  useEffect(() => {
    if (showEmailWindow) {
      const timer = setTimeout(() => {
        setShowThirdTypingIndicator(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showEmailWindow]);

  // 세 번째 말풍선 표시 시작
  useEffect(() => {
    if (showThirdTypingIndicator) {
      const timer = setTimeout(() => {
        setShowThirdTypingIndicator(false);
        setShowThirdResponse(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showThirdTypingIndicator]);

  // 세 번째 말풍선 타이핑 효과
  useEffect(() => {
    if (showThirdResponse) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= thirdText.length) {
          setDisplayedThirdText(thirdText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [showThirdResponse]);

  // 자동 스크롤
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [showUserMessage, showFirstTypingIndicator, displayedFirstText, showSecondTypingIndicator, visibleSecondParagraphs, showEmailWindow, showThirdTypingIndicator, displayedThirdText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log('User input:', input);
      // Handle AI query here
      setInput('');
    }
  };

  return (
    <div className="w-full h-full max-w-[850px] mx-auto bg-gradient-to-b from-white to-gray-50 flex flex-col overflow-hidden">
        {/* Header with Hologram */}
        <div className="w-full bg-white px-4 sm:px-8 py-8 sm:py-12 md:py-16 flex items-center justify-center flex-shrink-0">
          <HologramOrb isListening={isListening} />
        </div>

        {/* Chat Area */}
        <div ref={chatAreaRef} className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-4 sm:py-8 md:py-12 space-y-4 sm:space-y-6 md:space-y-[26px]">
          {/* User Message - Right Aligned */}
          {showUserMessage && (
            <motion.div 
              className="flex justify-end"
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <div className="relative max-w-[70%]">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-3xl rounded-tr-sm px-4 sm:px-6 py-3 sm:py-4 shadow-md">
                  <p className="text-gray-800 text-sm sm:text-base" style={{ fontSize: '15pt' }}>
                    {userMessageText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* First Typing Indicator */}
          {showFirstTypingIndicator && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-3xl rounded-tl-sm px-4 sm:px-6 py-3 sm:py-4 shadow-md">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* First Response Chat Bubble */}
          {showFirstResponse && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative max-w-[70%]">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-3xl rounded-tl-sm px-4 sm:px-6 py-3 sm:py-4 shadow-md">
                  <p className="text-gray-800 text-sm sm:text-base" style={{ fontSize: '15pt' }}>
                    {displayedFirstText}
                    {displayedFirstText.length < firstText.length && (
                      <span className="inline-block w-0.5 h-4 sm:h-5 bg-cyan-500 ml-1 animate-pulse" />
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Second Typing Indicator */}
          {showSecondTypingIndicator && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-3xl rounded-tl-sm px-4 sm:px-6 py-3 sm:py-4 shadow-md">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Second Response Chat Bubble - Paragraphs */}
          {showSecondResponse && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative max-w-[85%]">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-3xl rounded-tl-sm px-4 sm:px-6 py-3 sm:py-4 shadow-md">
                  <div className="space-y-2 sm:space-y-4">
                    {secondParagraphs.slice(0, visibleSecondParagraphs).map((paragraph, index) => (
                      <motion.p
                        key={index}
                        className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base"
                        style={{ fontSize: '15pt', lineHeight: '1.6' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Window - Left Aligned */}
          {showEmailWindow && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative max-w-[85%]">
                <div className="bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
                  {/* Email Header */}
                  <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-3 sm:px-5 py-2 sm:py-3 border-b border-gray-300">
                    <p className="text-gray-600 text-xs sm:text-sm" style={{ fontSize: '13pt' }}>새 메일</p>
                  </div>
                  
                  {/* Email Fields */}
                  <div className="bg-white">
                    <div className="border-b border-gray-200 px-3 sm:px-5 py-2 sm:py-3 flex items-center">
                      <span className="text-gray-600 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" style={{ fontSize: '15pt' }}>받는사람:</span>
                      <span className="text-gray-800 text-sm sm:text-base" style={{ fontSize: '15pt' }}>{emailContent.to}</span>
                    </div>
                    <div className="border-b border-gray-200 px-3 sm:px-5 py-2 sm:py-3 flex items-start">
                      <span className="text-gray-600 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" style={{ fontSize: '15pt' }}>제목:</span>
                      <span className="text-gray-800 flex-1 text-sm sm:text-base" style={{ fontSize: '15pt' }}>{emailContent.subject}</span>
                    </div>
                    <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
                      <pre className="text-gray-800 whitespace-pre-wrap text-xs sm:text-sm" style={{ fontSize: '13pt', lineHeight: '1.6', fontFamily: 'Pretendard, sans-serif' }}>
                        {emailContent.body}
                      </pre>
                    </div>
                    {/* Email Actions */}
                    <div className="px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between bg-gray-50">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                        <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Image className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                        <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Link2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                        <button className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                      </div>
                      <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-br from-cyan-400 to-teal-500 text-white rounded-lg hover:from-cyan-500 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2">
                        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-sm sm:text-base" style={{ fontSize: '15pt' }}>보내기</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Third Typing Indicator */}
          {showThirdTypingIndicator && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-3xl rounded-tl-sm px-4 sm:px-6 py-3 sm:py-4 shadow-md">
                  <div className="flex gap-1.5">
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Third Response Chat Bubble */}
          {showThirdResponse && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative max-w-[70%]">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-3xl rounded-tl-sm px-4 sm:px-6 py-3 sm:py-4 shadow-md">
                  <p className="text-gray-800 text-sm sm:text-base" style={{ fontSize: '15pt' }}>
                    {displayedThirdText}
                    {displayedThirdText.length < thirdText.length && (
                      <span className="inline-block w-0.5 h-4 sm:h-5 bg-cyan-500 ml-1 animate-pulse" />
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Section */}
        <div className="w-full px-4 sm:px-8 md:px-12 py-2.5 sm:py-4 md:py-8 bg-white border-t border-gray-200 flex-shrink-0">
          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="AI에게 무엇이든 물어보세요."
                className="w-full px-4 sm:px-6 py-3 sm:py-5 pr-14 outline-none text-gray-800 placeholder:text-gray-400 bg-transparent text-sm sm:text-base"
                style={{ fontSize: '13pt' }}
              />
              <button
                type="submit"
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl text-white hover:from-cyan-500 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
