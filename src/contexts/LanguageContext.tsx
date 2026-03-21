import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "es" | "en" | "pt" | "fr" | "de" | "it" | "ja" | "zh" | "ko" | "ru";

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Header
  "nav.converter": { es: "Conversor", en: "Converter", pt: "Conversor", fr: "Convertisseur", de: "Konverter", it: "Convertitore", ja: "コンバーター", zh: "转换器", ko: "변환기", ru: "Конвертер" },
  "nav.features": { es: "Características", en: "Features", pt: "Recursos", fr: "Fonctionnalités", de: "Funktionen", it: "Funzionalità", ja: "機能", zh: "功能", ko: "기능", ru: "Функции" },
  "nav.formats": { es: "Formatos", en: "Formats", pt: "Formatos", fr: "Formats", de: "Formate", it: "Formati", ja: "フォーマット", zh: "格式", ko: "형식", ru: "Форматы" },

  // Hero
  "hero.badge": { es: "Conversor gratuito y sin registro", en: "Free converter, no signup", pt: "Conversor gratuito, sem cadastro", fr: "Convertisseur gratuit, sans inscription", de: "Kostenloser Konverter, ohne Anmeldung", it: "Convertitore gratuito, senza registrazione", ja: "無料コンバーター、登録不要", zh: "免费转换器，无需注册", ko: "무료 변환기, 가입 불필요", ru: "Бесплатный конвертер, без регистрации" },
  "hero.title1": { es: "Convierte tus archivos", en: "Convert your files", pt: "Converta seus arquivos", fr: "Convertissez vos fichiers", de: "Konvertieren Sie Ihre Dateien", it: "Converti i tuoi file", ja: "ファイルを変換", zh: "转换您的文件", ko: "파일 변환", ru: "Конвертируйте файлы" },
  "hero.title2": { es: "al instante", en: "instantly", pt: "instantaneamente", fr: "instantanément", de: "sofort", it: "istantaneamente", ja: "即座に", zh: "即时", ko: "즉시", ru: "мгновенно" },
  "hero.desc": {
    es: "Texto, imágenes, audio y video. Todo en un solo lugar, 100% gratis y procesado directamente en tu navegador.",
    en: "Text, images, audio and video. All in one place, 100% free and processed directly in your browser.",
    pt: "Texto, imagens, áudio e vídeo. Tudo em um só lugar, 100% gratuito e processado diretamente no seu navegador.",
    fr: "Texte, images, audio et vidéo. Tout en un seul endroit, 100% gratuit et traité directement dans votre navigateur.",
    de: "Text, Bilder, Audio und Video. Alles an einem Ort, 100% kostenlos und direkt in Ihrem Browser verarbeitet.",
    it: "Testo, immagini, audio e video. Tutto in un unico posto, 100% gratuito e elaborato direttamente nel tuo browser.",
    ja: "テキスト、画像、音声、動画。すべてを一か所で、100%無料、ブラウザで直接処理。",
    zh: "文本、图像、音频和视频。一站式服务，100%免费，直接在浏览器中处理。",
    ko: "텍스트, 이미지, 오디오, 비디오. 한 곳에서 모두, 100% 무료, 브라우저에서 직접 처리.",
    ru: "Текст, изображения, аудио и видео. Всё в одном месте, 100% бесплатно и обрабатывается прямо в браузере.",
  },
  "hero.cta": { es: "Comenzar ahora", en: "Start now", pt: "Começar agora", fr: "Commencer", de: "Jetzt starten", it: "Inizia ora", ja: "今すぐ開始", zh: "立即开始", ko: "지금 시작", ru: "Начать сейчас" },

  // Stats
  "stats.formats": { es: "Formatos", en: "Formats", pt: "Formatos", fr: "Formats", de: "Formate", it: "Formati", ja: "フォーマット", zh: "格式", ko: "형식", ru: "Форматы" },
  "stats.conversions": { es: "Conversiones", en: "Conversions", pt: "Conversões", fr: "Conversions", de: "Konvertierungen", it: "Conversioni", ja: "変換数", zh: "转换次数", ko: "변환 수", ru: "Конвертаций" },
  "stats.users": { es: "Usuarios", en: "Users", pt: "Usuários", fr: "Utilisateurs", de: "Benutzer", it: "Utenti", ja: "ユーザー", zh: "用户", ko: "사용자", ru: "Пользователей" },
  "stats.rating": { es: "Valoración", en: "Rating", pt: "Avaliação", fr: "Note", de: "Bewertung", it: "Valutazione", ja: "評価", zh: "评分", ko: "평점", ru: "Рейтинг" },

  // Features
  "features.title": { es: "¿Por qué elegirnos?", en: "Why choose us?", pt: "Por que nos escolher?", fr: "Pourquoi nous choisir ?", de: "Warum uns wählen?", it: "Perché sceglierci?", ja: "なぜ私たちを選ぶのか？", zh: "为什么选择我们？", ko: "왜 우리를 선택해야 하나요?", ru: "Почему выбирают нас?" },
  "features.desc": { es: "Diseñado para ser simple, rápido y seguro.", en: "Designed to be simple, fast and secure.", pt: "Projetado para ser simples, rápido e seguro.", fr: "Conçu pour être simple, rapide et sécurisé.", de: "Entwickelt um einfach, schnell und sicher zu sein.", it: "Progettato per essere semplice, veloce e sicuro.", ja: "シンプル、高速、安全に設計。", zh: "设计简单、快速、安全。", ko: "간단하고 빠르고 안전하게 설계.", ru: "Разработан для простоты, скорости и безопасности." },
  "feature.secure.title": { es: "100% Seguro", en: "100% Secure", pt: "100% Seguro", fr: "100% Sécurisé", de: "100% Sicher", it: "100% Sicuro", ja: "100%安全", zh: "100%安全", ko: "100% 안전", ru: "100% Безопасно" },
  "feature.secure.desc": { es: "Tus archivos se procesan localmente. Nunca salen de tu navegador.", en: "Your files are processed locally. They never leave your browser.", pt: "Seus arquivos são processados localmente. Nunca saem do seu navegador.", fr: "Vos fichiers sont traités localement. Ils ne quittent jamais votre navigateur.", de: "Ihre Dateien werden lokal verarbeitet. Sie verlassen nie Ihren Browser.", it: "I tuoi file vengono elaborati localmente. Non lasciano mai il tuo browser.", ja: "ファイルはローカルで処理されます。ブラウザから外に出ることはありません。", zh: "您的文件在本地处理，永远不会离开您的浏览器。", ko: "파일은 로컬에서 처리됩니다. 브라우저를 떠나지 않습니다.", ru: "Ваши файлы обрабатываются локально. Они никогда не покидают браузер." },
  "feature.fast.title": { es: "Ultra Rápido", en: "Ultra Fast", pt: "Ultra Rápido", fr: "Ultra Rapide", de: "Ultra Schnell", it: "Ultra Veloce", ja: "超高速", zh: "超快速", ko: "초고속", ru: "Сверхбыстро" },
  "feature.fast.desc": { es: "Conversión instantánea sin necesidad de subir archivos a servidores.", en: "Instant conversion without uploading files to servers.", pt: "Conversão instantânea sem necessidade de enviar arquivos a servidores.", fr: "Conversion instantanée sans télécharger de fichiers sur des serveurs.", de: "Sofortige Konvertierung ohne Dateien auf Server hochzuladen.", it: "Conversione istantanea senza caricare file su server.", ja: "サーバーへのアップロード不要で即座に変換。", zh: "即时转换，无需上传文件到服务器。", ko: "서버에 파일 업로드 없이 즉시 변환.", ru: "Мгновенная конвертация без загрузки файлов на серверы." },
  "feature.free.title": { es: "Sin Registro", en: "No Signup", pt: "Sem Cadastro", fr: "Sans Inscription", de: "Ohne Anmeldung", it: "Senza Registrazione", ja: "登録不要", zh: "无需注册", ko: "가입 불필요", ru: "Без регистрации" },
  "feature.free.desc": { es: "Usa el conversor sin crear cuenta. Gratis y sin límites.", en: "Use the converter without creating an account. Free and unlimited.", pt: "Use o conversor sem criar conta. Gratuito e sem limites.", fr: "Utilisez le convertisseur sans créer de compte. Gratuit et illimité.", de: "Nutzen Sie den Konverter ohne Konto. Kostenlos und unbegrenzt.", it: "Usa il convertitore senza creare un account. Gratuito e illimitato.", ja: "アカウント作成なしで使用可能。無料で無制限。", zh: "无需创建账户即可使用。免费且无限制。", ko: "계정 생성 없이 사용. 무료 및 무제한.", ru: "Используйте конвертер без регистрации. Бесплатно и без ограничений." },
  "feature.available.title": { es: "24/7 Disponible", en: "24/7 Available", pt: "24/7 Disponível", fr: "Disponible 24/7", de: "24/7 Verfügbar", it: "Disponibile 24/7", ja: "24時間利用可能", zh: "全天候可用", ko: "24/7 이용 가능", ru: "Доступно 24/7" },
  "feature.available.desc": { es: "Funciona en cualquier momento, desde cualquier dispositivo.", en: "Works anytime, from any device.", pt: "Funciona a qualquer momento, de qualquer dispositivo.", fr: "Fonctionne à tout moment, depuis n'importe quel appareil.", de: "Funktioniert jederzeit, von jedem Gerät.", it: "Funziona in qualsiasi momento, da qualsiasi dispositivo.", ja: "いつでも、どのデバイスからでも動作。", zh: "随时随地，任何设备均可使用。", ko: "언제든지, 어떤 기기에서든 작동.", ru: "Работает в любое время, с любого устройства." },

  // Formats
  "formats.title": { es: "Formatos Soportados", en: "Supported Formats", pt: "Formatos Suportados", fr: "Formats Supportés", de: "Unterstützte Formate", it: "Formati Supportati", ja: "対応フォーマット", zh: "支持的格式", ko: "지원 형식", ru: "Поддерживаемые форматы" },
  "formats.text": { es: "Texto", en: "Text", pt: "Texto", fr: "Texte", de: "Text", it: "Testo", ja: "テキスト", zh: "文本", ko: "텍스트", ru: "Текст" },
  "formats.images": { es: "Imágenes", en: "Images", pt: "Imagens", fr: "Images", de: "Bilder", it: "Immagini", ja: "画像", zh: "图像", ko: "이미지", ru: "Изображения" },
  "formats.audio": { es: "Audio", en: "Audio", pt: "Áudio", fr: "Audio", de: "Audio", it: "Audio", ja: "オーディオ", zh: "音频", ko: "오디오", ru: "Аудио" },
  "formats.video": { es: "Video", en: "Video", pt: "Vídeo", fr: "Vidéo", de: "Video", it: "Video", ja: "ビデオ", zh: "视频", ko: "비디오", ru: "Видео" },

  // CTA
  "cta.title": { es: "¿Listo para convertir tus archivos?", en: "Ready to convert your files?", pt: "Pronto para converter seus arquivos?", fr: "Prêt à convertir vos fichiers ?", de: "Bereit Ihre Dateien zu konvertieren?", it: "Pronto a convertire i tuoi file?", ja: "ファイルを変換する準備はできましたか？", zh: "准备好转换您的文件了吗？", ko: "파일 변환 준비 되셨나요?", ru: "Готовы конвертировать файлы?" },
  "cta.desc": { es: "Empieza ahora. Sin registro, sin límites, sin complicaciones.", en: "Start now. No signup, no limits, no hassle.", pt: "Comece agora. Sem cadastro, sem limites, sem complicações.", fr: "Commencez maintenant. Sans inscription, sans limites.", de: "Jetzt starten. Ohne Anmeldung, ohne Limits.", it: "Inizia ora. Senza registrazione, senza limiti.", ja: "今すぐ開始。登録不要、制限なし。", zh: "立即开始。无需注册，无限制。", ko: "지금 시작하세요. 가입 없이, 제한 없이.", ru: "Начните сейчас. Без регистрации, без ограничений." },
  "cta.button": { es: "Ir al conversor", en: "Go to converter", pt: "Ir ao conversor", fr: "Aller au convertisseur", de: "Zum Konverter", it: "Vai al convertitore", ja: "コンバーターへ", zh: "前往转换器", ko: "변환기로 이동", ru: "Перейти к конвертеру" },

  // Footer
  "footer.desc": {
    es: "Convierte archivos de texto, imagen, audio y video de forma gratuita, segura y directamente en tu navegador.",
    en: "Convert text, image, audio and video files for free, securely and directly in your browser.",
    pt: "Converta arquivos de texto, imagem, áudio e vídeo gratuitamente, com segurança e diretamente no seu navegador.",
    fr: "Convertissez des fichiers texte, image, audio et vidéo gratuitement et directement dans votre navigateur.",
    de: "Konvertieren Sie Text-, Bild-, Audio- und Videodateien kostenlos und direkt in Ihrem Browser.",
    it: "Converti file di testo, immagini, audio e video gratuitamente e direttamente nel tuo browser.",
    ja: "テキスト、画像、音声、動画ファイルを無料で安全にブラウザで直接変換。",
    zh: "免费、安全地在浏览器中直接转换文本、图像、音频和视频文件。",
    ko: "텍스트, 이미지, 오디오, 비디오 파일을 무료로 안전하게 브라우저에서 직접 변환.",
    ru: "Конвертируйте текстовые, графические, аудио и видео файлы бесплатно прямо в браузере.",
  },
  "footer.formats": { es: "Formatos", en: "Formats", pt: "Formatos", fr: "Formats", de: "Formate", it: "Formati", ja: "フォーマット", zh: "格式", ko: "형식", ru: "Форматы" },
  "footer.legal": { es: "Legal", en: "Legal", pt: "Legal", fr: "Légal", de: "Rechtliches", it: "Legale", ja: "法的情報", zh: "法律", ko: "법적 정보", ru: "Правовая информация" },
  "footer.privacy": { es: "Política de Privacidad", en: "Privacy Policy", pt: "Política de Privacidade", fr: "Politique de Confidentialité", de: "Datenschutz", it: "Privacy Policy", ja: "プライバシーポリシー", zh: "隐私政策", ko: "개인정보처리방침", ru: "Политика конфиденциальности" },
  "footer.terms": { es: "Términos de Uso", en: "Terms of Use", pt: "Termos de Uso", fr: "Conditions d'Utilisation", de: "Nutzungsbedingungen", it: "Termini di Utilizzo", ja: "利用規約", zh: "使用条款", ko: "이용약관", ru: "Условия использования" },
  "footer.contact": { es: "Contacto", en: "Contact", pt: "Contato", fr: "Contact", de: "Kontakt", it: "Contatti", ja: "お問い合わせ", zh: "联系我们", ko: "연락처", ru: "Контакты" },
  "footer.rights": { es: "Todos los derechos reservados.", en: "All rights reserved.", pt: "Todos os direitos reservados.", fr: "Tous droits réservés.", de: "Alle Rechte vorbehalten.", it: "Tutti i diritti riservati.", ja: "全著作権所有。", zh: "版权所有。", ko: "모든 권리 보유.", ru: "Все права защищены." },
  "footer.note": {
    es: "Conversión de imágenes 100% en el navegador • Audio y video requieren backend con FFmpeg",
    en: "Image conversion 100% in browser • Audio and video require FFmpeg backend",
    pt: "Conversão de imagens 100% no navegador • Áudio e vídeo requerem backend com FFmpeg",
    fr: "Conversion d'images 100% dans le navigateur • Audio et vidéo nécessitent FFmpeg",
    de: "Bildkonvertierung 100% im Browser • Audio und Video benötigen FFmpeg",
    it: "Conversione immagini 100% nel browser • Audio e video richiedono FFmpeg",
    ja: "画像変換はブラウザ内で100%完結 • 音声と動画にはFFmpegが必要",
    zh: "图像转换100%在浏览器中完成 • 音频和视频需要FFmpeg后端",
    ko: "이미지 변환 100% 브라우저 내 • 오디오 및 비디오는 FFmpeg 필요",
    ru: "Конвертация изображений 100% в браузере • Аудио и видео требуют FFmpeg",
  },

  // Converter page
  "converter.title": { es: "Conversor de Archivos", en: "File Converter", pt: "Conversor de Arquivos", fr: "Convertisseur de Fichiers", de: "Dateikonverter", it: "Convertitore di File", ja: "ファイルコンバーター", zh: "文件转换器", ko: "파일 변환기", ru: "Конвертер файлов" },
  "converter.back": { es: "Volver al inicio", en: "Back to home", pt: "Voltar ao início", fr: "Retour à l'accueil", de: "Zurück zur Startseite", it: "Torna alla home", ja: "ホームに戻る", zh: "返回首页", ko: "홈으로 돌아가기", ru: "На главную" },
  "tab.text": { es: "Texto", en: "Text", pt: "Texto", fr: "Texte", de: "Text", it: "Testo", ja: "テキスト", zh: "文本", ko: "텍스트", ru: "Текст" },
  "tab.images": { es: "Imágenes", en: "Images", pt: "Imagens", fr: "Images", de: "Bilder", it: "Immagini", ja: "画像", zh: "图像", ko: "이미지", ru: "Изображения" },
  "tab.audio": { es: "Audio", en: "Audio", pt: "Áudio", fr: "Audio", de: "Audio", it: "Audio", ja: "オーディオ", zh: "音频", ko: "오디오", ru: "Аудио" },
  "tab.video": { es: "Video", en: "Video", pt: "Vídeo", fr: "Vidéo", de: "Video", it: "Video", ja: "ビデオ", zh: "视频", ko: "비디오", ru: "Видео" },

  // History
  "history.title": { es: "Historial de conversiones", en: "Conversion history", pt: "Histórico de conversões", fr: "Historique des conversions", de: "Konvertierungsverlauf", it: "Cronologia conversioni", ja: "変換履歴", zh: "转换历史", ko: "변환 기록", ru: "История конвертаций" },
  "history.empty": { es: "Sin conversiones recientes", en: "No recent conversions", pt: "Sem conversões recentes", fr: "Aucune conversion récente", de: "Keine aktuellen Konvertierungen", it: "Nessuna conversione recente", ja: "最近の変換はありません", zh: "没有最近的转换", ko: "최근 변환 없음", ru: "Нет недавних конвертаций" },
  "history.clear": { es: "Limpiar", en: "Clear", pt: "Limpar", fr: "Effacer", de: "Löschen", it: "Cancella", ja: "クリア", zh: "清除", ko: "지우기", ru: "Очистить" },
  "history.ago": { es: "hace", en: "ago", pt: "atrás", fr: "il y a", de: "vor", it: "fa", ja: "前", zh: "前", ko: "전", ru: "назад" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("ufc-language");
    return (saved as Language) || "es";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("ufc-language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
