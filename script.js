// نحن معك (Nahnu Ma'ak) - Healthcare Platform Application
// Main Application Script

class NahnuMaakApp {
    constructor() {
        this.currentPage = 'landing';
        this.currentLang = localStorage.getItem('nahnu_lang') || 'ar';
        this.chatHistory = JSON.parse(localStorage.getItem('nahnu_chat')) || [];
        this.isConnecting = false;
        this.callTimer = null;
        
        this.translations = {
            ar: {
                // App Texts
                appName: "نحن معك",
                appSubtitle: "Nahnu Ma'ak",
                privacyBadge: "مجهول",
                
                // Landing Page
                heroTitle: "خصوصيتك أولاً.<br>خذ الخطوة الأولى بثقة.",
                heroSubtitle: "Privacy first. Take the first step with confidence.",
                trustBadge1: "بدون اسم",
                trustBadge2: "هوية مخفية",
                trustBadge3: "دعم آمن",
                startButton: "ابدأ الآن",
                privacyInfoButton: "كيف نحمي خصوصيتك؟",
                
                // Privacy Modal
                privacyModalTitle: "كيف نحمي خصوصيتك",
                privacyPoint1: "جلسات مجهولة الهوية بشكل افتراضي",
                privacyPoint2: "لا نطلب اسمك الحقيقي",
                privacyPoint3: "التخزين المحلي فقط (لا توجد خوادم)",
                privacyPoint4: "لا نشارك بياناتك دون إذنك",
                privacyPoint5: "يمكنك حذف جلستك في أي وقت",
                privacyModalClose: "فهمت",
                
                // Choose Page
                backButton: "الرجوع",
                privacyTitle: "كل ما تكتبه هنا خاص. لا نشارك بياناتك إلا بإذنك.",
                privacySubtitle: "يمكنك المتابعة بدون اسم. والتحويل لمختص يبقى بدون كشف الهوية.",
                chooseTitle: "اختر طريقة الدعم",
                aiCardTitle: "التواصل مع الذكاء الاصطناعي",
                aiCardSubtitle: "دعم مبدئي بسرّية + أسئلة منظمة تساعدك تفهم مشاعرك.",
                aiFeature1: "إجابة فورية",
                aiFeature2: "أسئلة منظمة",
                aiFeature3: "تحويل لمختص",
                startAiButton: "ابدأ المحادثة",
                specialistCardTitle: "التواصل مع مختص حقيقي",
                specialistCardSubtitle: "واجهة اتصال للعرض — بدون اتصال فعلي.",
                specialistFeature1: "بدون كشف الهوية",
                specialistFeature2: "تجربة مكالمة رسمية",
                specialistFeature3: "طلب موعد (نموذج)",
                startSpecialistButton: "بدء المكالمة التجريبية",
                
                // Chat Page
                chatTitle: "محادثة مع الذكاء الاصطناعي",
                anonymousChip: "مجهول",
                onlineChip: "متصل",
                aiWelcomeMessage: "نحن معك. أخبرنا بما تشعر به الآن.",
                chatInputPlaceholder: "اكتب رسالتك هنا...",
                switchToSpecialistText: "التحويل إلى مختص",
                chatDisclaimer: "هذه نسخة أولية ولا تغني عن الاستشارة الطبية. في الحالات الطارئة تواصل مع الجهات المختصة.",
                saveChatTitle: "حفظ المحادثة",
                clearChatTitle: "مسح المحادثة",
                
                // Call Page
                callTitle: "مكالمة مجهولة",
                connectingStatus: "جارِ الاتصال...",
                specialistName: "أخصائي (تجريبي)",
                specialistRole: "استشاري صحة نفسية",
                noSpecialistTitle: "لا يوجد أخصائي متاح حاليًا — هذا مجرد عرض تجريبي",
                noSpecialistSubtitle: "يمكنك طلب موعد وسنتواصل معك خلال 24 ساعة",
                scheduleRequestButton: "طلب موعد (تجريبي)",
                micLabel: "ميكروفون",
                cameraLabel: "كاميرا",
                captionLabel: "ترجمة",
                endCallLabel: "إنهاء المكالمة",
                
                // Schedule Modal
                scheduleModalTitle: "طلب موعد مع مختص",
                timeLabel: "الوقت المفضل",
                timePlaceholder: "اختر وقتًا...",
                morningOption: "صباحًا (9 ص - 12 م)",
                afternoonOption: "بعد الظهر (12 م - 4 م)",
                eveningOption: "مساءً (4 م - 8 م)",
                concernLabel: "نوع الاستشارة",
                concernPlaceholder: "اختر نوعًا...",
                mentalOption: "دعم نفسي",
                medicalOption: "استشارة طبية",
                noteLabel: "ملاحظات إضافية (اختياري)",
                cancelScheduleButton: "إلغاء",
                submitScheduleButton: "إرسال الطلب",
                
                // Toasts
                toastSaved: "تم حفظ المحادثة محليًا",
                toastCleared: "تم مسح المحادثة",
                toastScheduled: "تم إرسال طلب الموعد (تجريبي)",
                toastError: "حدث خطأ، حاول مرة أخرى",
                
                // AI Responses
                aiResponses: {
                    default: "أفهم أنك تريد التحدث. هل يمكنك أن تخبرني أكثر عما تشعر به؟",
                    anxiety: "القلق شعور صعب. خذ نفسًا عميقًا. هل يمكنك تحديد ما الذي يسبب لك القلق تحديدًا؟",
                    sadness: "أنا هنا معك. الحزن جزء من التجربة الإنسانية. هل حدث شيء محدد جعلك تشعر بهذا الشعور؟",
                    sleep: "مشاكل النوم يمكن أن تؤثر على صحتك. هل تواجه صعوبة في النوم أم في الاستمرار في النوم؟",
                    pain: "الألم الجسدي قد يكون مرتبطًا بالتوتر. هل يمكنك وصف مكان وشدة الألم؟",
                    stress: "التوتر يمكن أن يكون مرهقًا. ما هي أكبر مصادر التوتر في حياتك حالياً؟",
                    doctor: "أقترح التحويل إلى أخصائي لمزيد من الدعم. هل تريد أن أبدلك إلى صفحة طلب موعد مع مختص؟"
                }
            },
            en: {
                // App Texts
                appName: "نحن معك",
                appSubtitle: "Nahnu Ma'ak",
                privacyBadge: "Anonymous",
                
                // Landing Page
                heroTitle: "Privacy first.<br>Take the first step with confidence.",
                heroSubtitle: "Privacy first. Take the first step with confidence.",
                trustBadge1: "No name required",
                trustBadge2: "Anonymous by design",
                trustBadge3: "Safe support",
                startButton: "Start now",
                privacyInfoButton: "How we protect your privacy",
                
                // Privacy Modal
                privacyModalTitle: "How we protect your privacy",
                privacyPoint1: "Anonymous sessions by default",
                privacyPoint2: "No real name required",
                privacyPoint3: "Local-only prototype storage",
                privacyPoint4: "Data is not shared without permission",
                privacyPoint5: "You can delete your session anytime",
                privacyModalClose: "Got it",
                
                // Choose Page
                backButton: "Back",
                privacyTitle: "Everything you share is private. We don't share data without your permission.",
                privacySubtitle: "Continue without a name. Switching to a specialist stays anonymous.",
                chooseTitle: "Choose support method",
                aiCardTitle: "Talk to AI Support",
                aiCardSubtitle: "Private first-step support + structured questions to help you reflect.",
                aiFeature1: "Instant response",
                aiFeature2: "Structured prompts",
                aiFeature3: "Switch to specialist",
                startAiButton: "Start conversation",
                specialistCardTitle: "Talk to a Real Specialist",
                specialistCardSubtitle: "Call UI demo — no real connection.",
                specialistFeature1: "Anonymous",
                specialistFeature2: "Official call experience",
                specialistFeature3: "Schedule request (demo)",
                startSpecialistButton: "Start demo call",
                
                // Chat Page
                chatTitle: "AI Support Conversation",
                anonymousChip: "Anonymous",
                onlineChip: "Online",
                aiWelcomeMessage: "We're with you. Tell us what you're feeling right now.",
                chatInputPlaceholder: "Type your message here...",
                switchToSpecialistText: "Switch to Specialist",
                chatDisclaimer: "Prototype only. Not medical advice. In emergencies, contact local services.",
                saveChatTitle: "Save conversation",
                clearChatTitle: "Clear conversation",
                
                // Call Page
                callTitle: "Anonymous Call",
                connectingStatus: "Connecting...",
                specialistName: "Specialist (Demo)",
                specialistRole: "Mental Health Consultant",
                noSpecialistTitle: "No specialist available — demo prototype only",
                noSpecialistSubtitle: "You can request an appointment and we'll contact you within 24 hours",
                scheduleRequestButton: "Schedule request (demo)",
                micLabel: "Microphone",
                cameraLabel: "Camera",
                captionLabel: "Captions",
                endCallLabel: "End call",
                
                // Schedule Modal
                scheduleModalTitle: "Schedule Appointment with Specialist",
                timeLabel: "Preferred time",
                timePlaceholder: "Choose a time...",
                morningOption: "Morning (9 AM - 12 PM)",
                afternoonOption: "Afternoon (12 PM - 4 PM)",
                eveningOption: "Evening (4 PM - 8 PM)",
                concernLabel: "Concern type",
                concernPlaceholder: "Choose a type...",
                mentalOption: "Mental support",
                medicalOption: "Medical consultation",
                noteLabel: "Additional notes (optional)",
                cancelScheduleButton: "Cancel",
                submitScheduleButton: "Submit request",
                
                // Toasts
                toastSaved: "Conversation saved locally",
                toastCleared: "Conversation cleared",
                toastScheduled: "Appointment request sent (demo)",
                toastError: "An error occurred, please try again",
                
                // AI Responses
                aiResponses: {
                    default: "I understand you want to talk. Can you tell me more about what you're feeling?",
                    anxiety: "Anxiety can be difficult. Take a deep breath. Can you pinpoint what's causing your anxiety?",
                    sadness: "I'm here with you. Sadness is part of the human experience. Has something specific made you feel this way?",
                    sleep: "Sleep issues can affect your health. Are you having trouble falling asleep or staying asleep?",
                    pain: "Physical pain might be related to stress. Can you describe the location and intensity of the pain?",
                    stress: "Stress can be overwhelming. What are the biggest sources of stress in your life right now?",
                    doctor: "I suggest switching to a specialist for more support. Would you like me to redirect you to schedule an appointment?"
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadLanguage(this.currentLang);
        this.loadChatHistory();
        this.setupChatAI();
    }
    
    setupEventListeners() {
        // Language Toggle
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.loadLanguage(lang);
                localStorage.setItem('nahnu_lang', lang);
            });
        });
        
        // Navigation
        document.getElementById('startButton').addEventListener('click', () => this.navigateTo('choose'));
        document.getElementById('privacyInfoButton').addEventListener('click', () => this.showPrivacyModal());
        document.getElementById('backToLanding').addEventListener('click', () => this.navigateTo('landing'));
        document.getElementById('backToChoose').addEventListener('click', () => this.navigateTo('choose'));
        document.getElementById('backToChooseFromCall').addEventListener('click', () => this.navigateTo('choose'));
        
        // Choose Cards
        document.getElementById('startAiButton').addEventListener('click', () => this.startAIChat());
        document.getElementById('startSpecialistButton').addEventListener('click', () => this.startCall());
        
        // Chat
        document.getElementById('sendMessageButton').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        document.getElementById('switchToSpecialistButton').addEventListener('click', () => this.navigateTo('call'));
        document.getElementById('saveChatButton').addEventListener('click', () => this.saveChat());
        document.getElementById('clearChatButton').addEventListener('click', () => this.clearChat());
        
        // Call
        document.getElementById('endCallButton').addEventListener('click', () => this.navigateTo('choose'));
        document.getElementById('scheduleRequestButton').addEventListener('click', () => this.showScheduleModal());
        
        // Modals
        document.getElementById('privacyModalCloseButton').addEventListener('click', () => this.hidePrivacyModal());
        document.getElementById('closePrivacyModal').addEventListener('click', () => this.hidePrivacyModal());
        document.getElementById('closeScheduleModal').addEventListener('click', () => this.hideScheduleModal());
        document.getElementById('cancelScheduleButton').addEventListener('click', () => this.hideScheduleModal());
        document.getElementById('submitScheduleButton').addEventListener('click', () => this.submitSchedule());
        
        // Modal overlay close
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modalOverlay')) {
                this.hidePrivacyModal();
                this.hideScheduleModal();
            }
        });
        
        // ESC key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hidePrivacyModal();
                this.hideScheduleModal();
            }
        });
        
        // Demo call controls
        ['micButton', 'cameraButton', 'captionButton'].forEach(id => {
            document.getElementById(id).addEventListener('click', function() {
                const icon = this.querySelector('i');
                const isActive = this.classList.toggle('active');
                
                if (id === 'micButton') {
                    icon.className = isActive ? 'fas fa-microphone-slash' : 'fas fa-microphone';
                } else if (id === 'cameraButton') {
                    icon.className = isActive ? 'fas fa-video-slash' : 'fas fa-video';
                }
                
                // Show toast
                const action = isActive ? 'disabled' : 'enabled';
                const control = this.querySelector('span').textContent;
                app.showToast(`${control} ${action}`, 'info');
            });
        });
    }
    
    loadLanguage(lang) {
        this.currentLang = lang;
        
        // Update HTML direction
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // Update language toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update all translatable elements
        const texts = this.translations[lang];
        
        // Function to safely update element text
        const updateText = (id, text) => {
            const element = document.getElementById(id);
            if (element) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else if (element.tagName === 'SELECT') {
                    // Handle select options
                    if (id === 'preferredTime') {
                        element.innerHTML = `
                            <option value="">${texts.timePlaceholder}</option>
                            <option value="morning">${texts.morningOption}</option>
                            <option value="afternoon">${texts.afternoonOption}</option>
                            <option value="evening">${texts.eveningOption}</option>
                        `;
                    } else if (id === 'concernType') {
                        element.innerHTML = `
                            <option value="">${texts.concernPlaceholder}</option>
                            <option value="mental">${texts.mentalOption}</option>
                            <option value="medical">${texts.medicalOption}</option>
                        `;
                    }
                } else {
                    element.innerHTML = text;
                }
            }
        };
        
        // Update all texts
        Object.keys(texts).forEach(key => {
            if (typeof texts[key] === 'string') {
                updateText(key + 'Text', texts[key]);
            } else if (typeof texts[key] === 'object') {
                // Handle nested objects like aiResponses
                if (key === 'aiResponses') {
                    // AI responses are handled separately
                } else {
                    Object.keys(texts[key]).forEach(subKey => {
                        updateText(key + subKey.charAt(0).toUpperCase() + subKey.slice(1), texts[key][subKey]);
                    });
                }
            }
        });
        
        // Special cases
        document.getElementById('logoText').textContent = texts.appName;
        document.getElementById('logoSubtitle').textContent = texts.appSubtitle;
        
        // Update AI welcome message if in chat
        if (document.querySelector('.ai-message .message-content p')) {
            document.querySelector('.ai-message .message-content p').textContent = texts.aiWelcomeMessage;
        }
        
        // Update chat input placeholder
        document.getElementById('chatInput').placeholder = texts.chatInputPlaceholder;
    }
    
    navigateTo(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        
        // Show target page
        document.getElementById(`page${page.charAt(0).toUpperCase() + page.slice(1)}`).classList.add('active');
        
        // Handle page-specific logic
        if (page === 'chat') {
            this.currentPage = 'chat';
            document.getElementById('chatInput').focus();
            
            // If no chat history, add welcome message
            if (this.chatHistory.length === 0) {
                this.addAIMessage(this.translations[this.currentLang].aiWelcomeMessage);
            } else {
                // Load chat history
                this.loadChatHistory();
            }
        } else if (page === 'call') {
            this.currentPage = 'call';
            this.startCallSimulation();
        } else if (page === 'choose') {
            this.currentPage = 'choose';
        } else {
            this.currentPage = 'landing';
        }
        
        // Close any open modals
        this.hidePrivacyModal();
        this.hideScheduleModal();
    }
    
    showPrivacyModal() {
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('privacyModal').style.display = 'block';
        document.getElementById('scheduleModal').style.display = 'none';
    }
    
    hidePrivacyModal() {
        document.getElementById('modalOverlay').classList.remove('active');
    }
    
    showScheduleModal() {
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('scheduleModal').style.display = 'block';
        document.getElementById('privacyModal').style.display = 'none';
        
        // Reset form
        document.getElementById('scheduleForm').reset();
    }
    
    hideScheduleModal() {
        document.getElementById('modalOverlay').classList.remove('active');
    }
    
    submitSchedule() {
        const time = document.getElementById('preferredTime').value;
        const concern = document.getElementById('concernType').value;
        
        if (!time || !concern) {
            this.showToast(this.translations[this.currentLang].toastError, 'warning');
            return;
        }
        
        // Show success toast
        this.showToast(this.translations[this.currentLang].toastScheduled, 'success');
        
        // Close modal
        this.hideScheduleModal();
        
        // In a real app, this would send data to a server
        console.log('Schedule request submitted:', { time, concern });
    }
    
    startAIChat() {
        this.navigateTo('chat');
    }
    
    startCall() {
        this.navigateTo('call');
    }
    
    startCallSimulation() {
        // Reset UI
        document.getElementById('noSpecialistMessage').classList.remove('active');
        document.querySelector('.video-overlay').classList.remove('active');
        document.getElementById('statusText').textContent = this.translations[this.currentLang].connectingStatus;
        
        // Clear any existing timer
        if (this.callTimer) clearTimeout(this.callTimer);
        
        // Start connecting simulation
        this.isConnecting = true;
        
        // After 3-5 seconds, show "no specialist available"
        const delay = 3000 + Math.random() * 2000; // 3-5 seconds
        this.callTimer = setTimeout(() => {
            this.isConnecting = false;
            document.querySelector('.video-overlay').classList.add('active');
            document.getElementById('noSpecialistMessage').classList.add('active');
            document.getElementById('statusText').textContent = this.translations[this.currentLang].noSpecialistTitle;
        }, delay);
    }
    
    setupChatAI() {
        this.aiResponses = this.translations[this.currentLang].aiResponses;
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addUserMessage(message);
        
        // Clear input
        input.value = '';
        input.focus();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate AI response after delay
        setTimeout(() => {
            this.removeTypingIndicator();
            const aiResponse = this.generateAIResponse(message);
            this.addAIMessage(aiResponse);
            
            // Save to history
            this.chatHistory.push({
                user: message,
                ai: aiResponse,
                timestamp: new Date().toISOString()
            });
            
            localStorage.setItem('nahnu_chat', JSON.stringify(this.chatHistory));
        }, 600 + Math.random() * 600); // 600-1200ms
    }
    
    addUserMessage(text) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(text)}</p>
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    addAIMessage(text) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${this.escapeHtml(text)}</p>
                <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        const currentLang = this.currentLang;
        const responses = this.translations[currentLang].aiResponses;
        
        // Arabic keyword matching
        if (currentLang === 'ar') {
            if (lowerMessage.includes('قلق') || lowerMessage.includes('توتر')) {
                return responses.anxiety;
            } else if (lowerMessage.includes('حزن') || lowerMessage.includes('اكتئاب') || lowerMessage.includes('حزين')) {
                return responses.sadness;
            } else if (lowerMessage.includes('نوم') || lowerMessage.includes('أرق')) {
                return responses.sleep;
            } else if (lowerMessage.includes('ألم') || lowerMessage.includes('وجع')) {
                return responses.pain;
            } else if (lowerMessage.includes('ضغط') || lowerMessage.includes('إجهاد')) {
                return responses.stress;
            } else if (lowerMessage.includes('طبيب') || lowerMessage.includes('مختص') || lowerMessage.includes('أحتاج طبيب')) {
                return responses.doctor;
            }
        } 
        // English keyword matching
        else {
            if (lowerMessage.includes('anxiety') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
                return responses.anxiety;
            } else if (lowerMessage.includes('sad') || lowerMessage.includes('depress') || lowerMessage.includes('sadness')) {
                return responses.sadness;
            } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
                return responses.sleep;
            } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('ache')) {
                return responses.pain;
            } else if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm')) {
                return responses.stress;
            } else if (lowerMessage.includes('doctor') || lowerMessage.includes('specialist') || lowerMessage.includes('i want a doctor')) {
                return responses.doctor;
            }
        }
        
        return responses.default;
    }
    
    saveChat() {
        if (this.chatHistory.length === 0) {
            this.showToast(this.translations[this.currentLang].toastError, 'warning');
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('nahnu_chat', JSON.stringify(this.chatHistory));
        
        // Show toast
        this.showToast(this.translations[this.currentLang].toastSaved, 'success');
    }
    
    clearChat() {
        if (this.chatHistory.length === 0) {
            this.showToast(this.translations[this.currentLang].toastError, 'warning');
            return;
        }
        
        // Clear chat history
        this.chatHistory = [];
        localStorage.removeItem('nahnu_chat');
        
        // Clear chat UI (keep welcome message)
        const messagesContainer = document.getElementById('chatMessages');
        const welcomeMessage = messagesContainer.querySelector('.ai-message');
        messagesContainer.innerHTML = '';
        if (welcomeMessage) {
            messagesContainer.appendChild(welcomeMessage);
        } else {
            // Add welcome message if not present
            this.addAIMessage(this.translations[this.currentLang].aiWelcomeMessage);
        }
        
        // Show toast
        this.showToast(this.translations[this.currentLang].toastCleared, 'success');
    }
    
    loadChatHistory() {
        const messagesContainer = document.getElementById('chatMessages');
        
        // Clear existing messages except welcome
        const welcomeMessage = messagesContainer.querySelector('.ai-message');
        messagesContainer.innerHTML = '';
        
        // Add welcome message back
        if (welcomeMessage) {
            messagesContainer.appendChild(welcomeMessage);
        } else {
            this.addAIMessage(this.translations[this.currentLang].aiWelcomeMessage);
        }
        
        // Load history from localStorage
        const savedChat = localStorage.getItem('nahnu_chat');
        if (savedChat) {
            this.chatHistory = JSON.parse(savedChat);
            
            // Add each message from history
            this.chatHistory.forEach(entry => {
                this.addUserMessage(entry.user);
                this.addAIMessage(entry.ai);
            });
        }
    }
    
    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    getToastIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'danger': return 'exclamation-circle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NahnuMaakApp();
});
