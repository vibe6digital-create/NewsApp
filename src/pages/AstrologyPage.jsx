import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import { PORTAL_NAME } from '../utils/constants';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../utils/categoryImages';
import { timeAgo } from '../utils/formatDate';
import AdBanner from '../components/layout/AdBanner';
import '../styles/astrology.css';

const Sidebar = lazy(() => import('../components/layout/Sidebar'));

// ─── Static Data ──────────────────────────────────────────────────────────────

const RASHIS = [
  { id: 1,  name: 'मेष',      nameEn: 'Aries',       symbol: '♈', dates: '21 मार्च - 19 अप्रैल', datesEn: 'Mar 21 – Apr 19', element: 'अग्नि', elementEn: 'Fire',  ruler: 'मंगल', rulerEn: 'Mars',    color: '#e53935', lucky: '9', luckyColor: 'लाल',     luckyColorEn: 'Red',    stone: 'मूंगा',       stoneEn: 'Coral',          traits: ['साहसी', 'ऊर्जावान', 'नेतृत्वकर्ता', 'आत्मविश्वासी'], traitsEn: ['Courageous', 'Energetic', 'Leader', 'Confident'],      desc: 'मेष राशि के जातक स्वाभाविक नेता होते हैं। इनमें अपार ऊर्जा और साहस होता है। ये हर काम में सबसे आगे रहना पसंद करते हैं।',               descEn: 'Aries natives are natural-born leaders. They possess immense energy and courage, always striving to be first in everything.' },
  { id: 2,  name: 'वृषभ',    nameEn: 'Taurus',      symbol: '♉', dates: '20 अप्रैल - 20 मई',   datesEn: 'Apr 20 – May 20', element: 'पृथ्वी', elementEn: 'Earth', ruler: 'शुक्र', rulerEn: 'Venus',   color: '#43a047', lucky: '6', luckyColor: 'हरा',     luckyColorEn: 'Green',  stone: 'पन्ना',       stoneEn: 'Emerald',        traits: ['विश्वसनीय', 'धैर्यवान', 'व्यावहारिक', 'कलाप्रिय'],   traitsEn: ['Reliable', 'Patient', 'Practical', 'Artistic'],        desc: 'वृषभ राशि के जातक स्थिर और भरोसेमंद होते हैं। इन्हें सुंदर चीजें और प्रकृति से प्यार होता है।',                                            descEn: 'Taurus natives are stable and dependable. They love beautiful things and have a deep connection with nature.' },
  { id: 3,  name: 'मिथुन',   nameEn: 'Gemini',      symbol: '♊', dates: '21 मई - 20 जून',      datesEn: 'May 21 – Jun 20', element: 'वायु',   elementEn: 'Air',   ruler: 'बुध',  rulerEn: 'Mercury', color: '#ffb300', lucky: '5', luckyColor: 'पीला',    luckyColorEn: 'Yellow', stone: 'पीला पुखराज', stoneEn: 'Yellow Topaz',   traits: ['बुद्धिमान', 'जिज्ञासु', 'मिलनसार', 'अनुकूलनीय'],      traitsEn: ['Witty', 'Curious', 'Sociable', 'Adaptable'],           desc: 'मिथुन राशि के जातक बहुमुखी प्रतिभा के धनी होते हैं। इनकी संचार कला अद्वितीय होती है।',                                                    descEn: 'Gemini natives are gifted with versatile talents. Their communication skills are unparalleled.' },
  { id: 4,  name: 'कर्क',    nameEn: 'Cancer',      symbol: '♋', dates: '21 जून - 22 जुलाई',   datesEn: 'Jun 21 – Jul 22', element: 'जल',    elementEn: 'Water', ruler: 'चंद्र', rulerEn: 'Moon',    color: '#039be5', lucky: '2', luckyColor: 'सफेद',    luckyColorEn: 'White',  stone: 'मोती',        stoneEn: 'Pearl',          traits: ['भावुक', 'सहानुभूतिशील', 'सुरक्षात्मक', 'अंतर्ज्ञानी'], traitsEn: ['Emotional', 'Empathetic', 'Protective', 'Intuitive'],   desc: 'कर्क राशि के जातक अत्यंत भावनाशील और परिवार के प्रति समर्पित होते हैं। इनकी अंतर्ज्ञान शक्ति बहुत तीव्र होती है।',                     descEn: 'Cancer natives are deeply emotional and devoted to family. Their intuitive powers are very sharp.' },
  { id: 5,  name: 'सिंह',    nameEn: 'Leo',         symbol: '♌', dates: '23 जुलाई - 22 अगस्त', datesEn: 'Jul 23 – Aug 22', element: 'अग्नि', elementEn: 'Fire',  ruler: 'सूर्य', rulerEn: 'Sun',     color: '#f57f17', lucky: '1', luckyColor: 'सोना',    luckyColorEn: 'Gold',   stone: 'माणिक',       stoneEn: 'Ruby',           traits: ['करिश्माई', 'उदार', 'महत्वाकांक्षी', 'वफादार'],         traitsEn: ['Charismatic', 'Generous', 'Ambitious', 'Loyal'],        desc: 'सिंह राशि के जातक स्वाभाविक रूप से आकर्षक और प्रभावशाली होते हैं। इनमें नेतृत्व की अद्भुत क्षमता होती है।',                             descEn: 'Leo natives are naturally charismatic and impressive. They possess a remarkable capacity for leadership.' },
  { id: 6,  name: 'कन्या',   nameEn: 'Virgo',       symbol: '♍', dates: '23 अगस्त - 22 सितंबर', datesEn: 'Aug 23 – Sep 22', element: 'पृथ्वी', elementEn: 'Earth', ruler: 'बुध',  rulerEn: 'Mercury', color: '#6d4c41', lucky: '5', luckyColor: 'भूरा',    luckyColorEn: 'Brown',  stone: 'पन्ना',       stoneEn: 'Emerald',        traits: ['विश्लेषणात्मक', 'व्यवस्थित', 'परिश्रमी', 'विनम्र'],    traitsEn: ['Analytical', 'Organized', 'Hardworking', 'Modest'],     desc: 'कन्या राशि के जातक परफेक्शनिस्ट होते हैं। इनकी विश्लेषण क्षमता और काम के प्रति समर्पण अतुलनीय होता है।',                               descEn: 'Virgo natives are perfectionists. Their analytical ability and dedication to work is unmatched.' },
  { id: 7,  name: 'तुला',    nameEn: 'Libra',       symbol: '♎', dates: '23 सितंबर - 22 अक्टूबर', datesEn: 'Sep 23 – Oct 22', element: 'वायु',  elementEn: 'Air',   ruler: 'शुक्र', rulerEn: 'Venus',   color: '#e91e63', lucky: '6', luckyColor: 'गुलाबी',  luckyColorEn: 'Pink',   stone: 'हीरा',        stoneEn: 'Diamond',        traits: ['संतुलित', 'न्यायप्रिय', 'कूटनीतिक', 'सौंदर्यप्रिय'],  traitsEn: ['Balanced', 'Just', 'Diplomatic', 'Aesthetic'],          desc: 'तुला राशि के जातक संतुलन और न्याय के प्रतीक होते हैं। इनमें सौंदर्य बोध और रिश्तों में सामंजस्य की अद्भुत क्षमता होती है।',         descEn: 'Libra natives symbolise balance and justice. They have a wonderful sense of beauty and harmony in relationships.' },
  { id: 8,  name: 'वृश्चिक', nameEn: 'Scorpio',     symbol: '♏', dates: '23 अक्टूबर - 21 नवंबर', datesEn: 'Oct 23 – Nov 21', element: 'जल',   elementEn: 'Water', ruler: 'मंगल', rulerEn: 'Mars',    color: '#7b1fa2', lucky: '8', luckyColor: 'काला',    luckyColorEn: 'Black',  stone: 'नीलम',        stoneEn: 'Blue Sapphire',  traits: ['रहस्यमय', 'दृढ़', 'भावुक', 'शक्तिशाली'],               traitsEn: ['Mysterious', 'Determined', 'Passionate', 'Powerful'],   desc: 'वृश्चिक राशि के जातक गहरे और रहस्यमय स्वभाव के होते हैं। इनकी इच्छाशक्ति और दृढ़ता असाधारण होती है।',                                 descEn: 'Scorpio natives have a deep and mysterious nature. Their willpower and determination are extraordinary.' },
  { id: 9,  name: 'धनु',     nameEn: 'Sagittarius', symbol: '♐', dates: '22 नवंबर - 21 दिसंबर', datesEn: 'Nov 22 – Dec 21', element: 'अग्नि', elementEn: 'Fire',  ruler: 'गुरु',  rulerEn: 'Jupiter', color: '#00897b', lucky: '3', luckyColor: 'नीला',    luckyColorEn: 'Blue',   stone: 'पुखराज',      stoneEn: 'Yellow Sapphire',traits: ['आशावादी', 'साहसी', 'स्वतंत्र', 'दार्शनिक'],             traitsEn: ['Optimistic', 'Adventurous', 'Independent', 'Philosophical'], desc: 'धनु राशि के जातक स्वतंत्रता प्रेमी और आशावादी होते हैं। इन्हें यात्रा और ज्ञान की तलाश रहती है।',                                      descEn: 'Sagittarius natives are freedom-loving and optimistic. They are always in search of travel and knowledge.' },
  { id: 10, name: 'मकर',     nameEn: 'Capricorn',   symbol: '♑', dates: '22 दिसंबर - 19 जनवरी', datesEn: 'Dec 22 – Jan 19', element: 'पृथ्वी', elementEn: 'Earth', ruler: 'शनि',  rulerEn: 'Saturn',  color: '#37474f', lucky: '8', luckyColor: 'नीला',    luckyColorEn: 'Blue',   stone: 'नीलम',        stoneEn: 'Blue Sapphire',  traits: ['अनुशासित', 'जिम्मेदार', 'महत्वाकांक्षी', 'व्यावहारिक'], traitsEn: ['Disciplined', 'Responsible', 'Ambitious', 'Practical'], desc: 'मकर राशि के जातक अत्यंत अनुशासित और लक्ष्य केंद्रित होते हैं। इनकी मेहनत और लगन इन्हें शीर्ष पर ले जाती है।',                        descEn: 'Capricorn natives are highly disciplined and goal-oriented. Their hard work and dedication takes them to the top.' },
  { id: 11, name: 'कुंभ',    nameEn: 'Aquarius',    symbol: '♒', dates: '20 जनवरी - 18 फरवरी',  datesEn: 'Jan 20 – Feb 18', element: 'वायु',   elementEn: 'Air',   ruler: 'शनि',  rulerEn: 'Saturn',  color: '#1565c0', lucky: '4', luckyColor: 'आसमानी',  luckyColorEn: 'Sky Blue',stone: 'नीलम',        stoneEn: 'Blue Sapphire',  traits: ['प्रगतिशील', 'मानवतावादी', 'मौलिक', 'बुद्धिमान'],       traitsEn: ['Progressive', 'Humanitarian', 'Original', 'Intelligent'], desc: 'कुंभ राशि के जातक भविष्यवादी और मानवतावादी होते हैं। इनके विचार क्रांतिकारी और समाज को बेहतर बनाने वाले होते हैं।',                    descEn: 'Aquarius natives are visionary and humanitarian. Their ideas are revolutionary and aimed at making society better.' },
  { id: 12, name: 'मीन',     nameEn: 'Pisces',      symbol: '♓', dates: '19 फरवरी - 20 मार्च',  datesEn: 'Feb 19 – Mar 20', element: 'जल',    elementEn: 'Water', ruler: 'गुरु',  rulerEn: 'Jupiter', color: '#4527a0', lucky: '7', luckyColor: 'बैंगनी',  luckyColorEn: 'Purple', stone: 'पुखराज',      stoneEn: 'Yellow Sapphire',traits: ['संवेदनशील', 'कलात्मक', 'अंतर्ज्ञानी', 'दयालु'],         traitsEn: ['Sensitive', 'Artistic', 'Intuitive', 'Compassionate'],  desc: 'मीन राशि के जातक अत्यंत संवेदनशील और सहानुभूतिपूर्ण होते हैं। इनकी कल्पनाशक्ति और रचनात्मकता अद्वितीय होती है।',                     descEn: 'Pisces natives are extremely sensitive and empathetic. Their imagination and creativity are unmatched.' },
];

const DAILY_PREDICTIONS = [
  { love: 'प्रेम संबंधों में मधुरता आएगी। साथी के साथ खुलकर बात करें।', loveEn: 'Sweetness will prevail in love. Communicate openly with your partner.', career: 'करियर में नई संभावनाएं दिखेंगी। वरिष्ठों का सहयोग मिलेगा।', careerEn: 'New opportunities will emerge in career. Support from seniors expected.', health: 'स्वास्थ्य अच्छा रहेगा। योग और प्राणायाम करें।', healthEn: 'Health will be good. Practice yoga and pranayama.', finance: 'आर्थिक स्थिति संतोषजनक रहेगी। अनावश्यक खर्चों से बचें।', financeEn: 'Financial situation will be satisfactory. Avoid unnecessary expenses.', lucky_num: '3', lucky_color: 'पीला', lucky_colorEn: 'Yellow', tip: 'आज किसी पुराने मित्र से मिलना शुभ रहेगा।', tipEn: 'Meeting an old friend today will be auspicious.' },
  { love: 'पारिवारिक जीवन में सुख-शांति बनी रहेगी। प्रियजनों को समय दें।', loveEn: 'Peace and happiness will prevail in family life. Spend time with loved ones.', career: 'व्यापार में लाभ की संभावना है। नए अनुबंध पर हस्ताक्षर शुभ।', careerEn: 'Profit likely in business. Signing new contracts is auspicious.', health: 'थकान महसूस हो सकती है। पर्याप्त नींद लें।', healthEn: 'You may feel tired. Get adequate rest.', finance: 'निवेश के लिए उत्तम समय। दीर्घकालिक योजनाएं बनाएं।', financeEn: 'Excellent time for investment. Make long-term plans.', lucky_num: '6', lucky_color: 'हरा', lucky_colorEn: 'Green', tip: 'सफेद वस्त्र पहनना आज विशेष फलदायी होगा।', tipEn: 'Wearing white clothes will be especially fruitful today.' },
  { love: 'रोमांटिक माहौल बनेगा। अविवाहितों के लिए शुभ समय।', loveEn: 'A romantic atmosphere will develop. Auspicious time for singles.', career: 'मेहनत का फल मिलेगा। प्रोजेक्ट समय पर पूरा होगा।', careerEn: 'Hard work will pay off. Project will be completed on time.', health: 'ऊर्जा का स्तर उच्च रहेगा। व्यायाम जारी रखें।', healthEn: 'Energy levels will be high. Continue your exercise routine.', finance: 'धन लाभ की प्रबल संभावना। लॉटरी या उपहार मिल सकता है।', financeEn: 'Strong chances of financial gain. A gift or windfall may come.', lucky_num: '9', lucky_color: 'लाल', lucky_colorEn: 'Red', tip: 'मंगलवार को हनुमान जी की पूजा करें।', tipEn: 'Offer prayers to Hanuman on Tuesday.' },
  { love: 'जीवनसाथी से मतभेद हो सकते हैं। शांत रहें और समझदारी दिखाएं।', loveEn: 'Differences with spouse may arise. Stay calm and show wisdom.', career: 'नई जिम्मेदारियां मिलेंगी। आत्मविश्वास के साथ काम करें।', careerEn: 'New responsibilities will come. Work with confidence.', health: 'सिरदर्द से सावधान रहें। पानी पर्याप्त पिएं।', healthEn: 'Be cautious of headaches. Drink sufficient water.', finance: 'खर्चों पर नियंत्रण रखें। उधार देने से बचें।', financeEn: 'Control your expenses. Avoid lending money.', lucky_num: '2', lucky_color: 'सफेद', lucky_colorEn: 'White', tip: 'सोमवार को शिव जी को जल चढ़ाएं।', tipEn: 'Offer water to Lord Shiva on Monday.' },
  { love: 'प्रेम जीवन में उत्साह रहेगा। नई मुलाकात हो सकती है।', loveEn: 'Enthusiasm will prevail in love life. A new meeting may happen.', career: 'अपनी प्रतिभा दिखाने का अवसर मिलेगा। आगे बढ़ें।', careerEn: 'An opportunity to showcase your talent will arrive. Move forward.', health: 'पाचन तंत्र का ध्यान रखें। हल्का भोजन करें।', healthEn: 'Take care of your digestive system. Eat light meals.', finance: 'व्यापारिक यात्रा लाभदायक रहेगी। नए बाजार में कदम रखें।', financeEn: 'A business trip will be profitable. Step into new markets.', lucky_num: '5', lucky_color: 'नीला', lucky_colorEn: 'Blue', tip: 'बुधवार को हरे रंग का उपयोग करें।', tipEn: 'Use the colour green on Wednesday.' },
  { love: 'दांपत्य जीवन में मिठास आएगी। साथ में समय बिताएं।', loveEn: 'Sweetness will come to married life. Spend quality time together.', career: 'पदोन्नति के संकेत मिल रहे हैं। धैर्य रखें।', careerEn: 'Signs of promotion are appearing. Be patient.', health: 'मानसिक शांति बनाए रखें। ध्यान करें।', healthEn: 'Maintain mental peace. Practice meditation.', finance: 'शेयर बाजार में सावधानी बरतें। जोखिम कम लें।', financeEn: 'Exercise caution in the stock market. Take fewer risks.', lucky_num: '1', lucky_color: 'सुनहरा', lucky_colorEn: 'Golden', tip: 'रविवार को सूर्य को जल अर्पित करें।', tipEn: 'Offer water to the Sun on Sunday.' },
  { love: 'परिवार में खुशी का माहौल रहेगा। बच्चों के साथ समय बिताएं।', loveEn: 'A joyful atmosphere will prevail at home. Spend time with children.', career: 'काम में स्थिरता रहेगी। टीम के साथ तालमेल बेहतर होगा।', careerEn: 'Stability at work. Coordination with the team will improve.', health: 'जोड़ों के दर्द से सावधान रहें। व्यायाम करें।', healthEn: 'Be cautious of joint pain. Exercise regularly.', finance: 'आय में वृद्धि होगी। बचत पर ध्यान दें।', financeEn: 'Income will increase. Focus on savings.', lucky_num: '7', lucky_color: 'बैंगनी', lucky_colorEn: 'Purple', tip: 'शनिवार को काले तिल दान करें।', tipEn: 'Donate black sesame seeds on Saturday.' },
];

const GRAHAS = [
  { name: 'सूर्य', nameEn: 'Sun',     icon: '☀️', dasha: 6,  color: '#ff8f00', effect: 'आत्मशक्ति, नेतृत्व, पिता, सरकार, स्वास्थ्य', effectEn: 'Soul power, leadership, father, government, health', remedy: 'रविवार को सूर्य नमस्कार, गेहूं का दान', remedyEn: 'Sun salutation on Sunday, donate wheat', gem: 'माणिक (Ruby)', mantra: 'ॐ सूं सूर्याय नमः' },
  { name: 'चंद्र', nameEn: 'Moon',    icon: '🌙', dasha: 10, color: '#b0bec5', effect: 'मन, माता, भावनाएं, यात्रा, कल्पनाशक्ति', effectEn: 'Mind, mother, emotions, travel, imagination', remedy: 'सोमवार को शिव पूजा, चावल का दान', remedyEn: 'Shiva worship on Monday, donate rice', gem: 'मोती (Pearl)', mantra: 'ॐ चं चंद्राय नमः' },
  { name: 'मंगल', nameEn: 'Mars',     icon: '🔴', dasha: 7,  color: '#e53935', effect: 'साहस, भाई, भूमि, ऊर्जा, युद्ध, दुर्घटना', effectEn: 'Courage, brothers, land, energy, war, accidents', remedy: 'मंगलवार को हनुमान पूजा, मसूर दान', remedyEn: 'Hanuman worship on Tuesday, donate lentils', gem: 'मूंगा (Coral)', mantra: 'ॐ मं मंगलाय नमः' },
  { name: 'बुध',  nameEn: 'Mercury',  icon: '💚', dasha: 17, color: '#43a047', effect: 'बुद्धि, वाणी, व्यापार, संचार, शिक्षा', effectEn: 'Intelligence, speech, business, communication, education', remedy: 'बुधवार को गणेश पूजा, हरी चीजें दान', remedyEn: 'Ganesh worship on Wednesday, donate green items', gem: 'पन्ना (Emerald)', mantra: 'ॐ बुं बुधाय नमः' },
  { name: 'गुरु', nameEn: 'Jupiter',  icon: '🟡', dasha: 16, color: '#ffb300', effect: 'ज्ञान, धर्म, गुरु, पुत्र, विवाह, भाग्य', effectEn: 'Wisdom, religion, teacher, son, marriage, fortune', remedy: 'गुरुवार को विष्णु पूजा, चने की दाल दान', remedyEn: 'Vishnu worship on Thursday, donate chickpeas', gem: 'पुखराज (Yellow Sapphire)', mantra: 'ॐ बृं बृहस्पतये नमः' },
  { name: 'शुक्र', nameEn: 'Venus',   icon: '⭐', dasha: 20, color: '#e91e63', effect: 'प्रेम, विवाह, सौंदर्य, कला, वाहन, ऐश्वर्य', effectEn: 'Love, marriage, beauty, arts, vehicles, luxury', remedy: 'शुक्रवार को लक्ष्मी पूजा, दही का दान', remedyEn: 'Lakshmi worship on Friday, donate curd', gem: 'हीरा (Diamond)', mantra: 'ॐ शुं शुक्राय नमः' },
  { name: 'शनि', nameEn: 'Saturn',    icon: '🔵', dasha: 19, color: '#37474f', effect: 'कर्म, न्याय, अनुशासन, सेवक, दीर्घायु, विलंब', effectEn: 'Karma, justice, discipline, service, longevity, delays', remedy: 'शनिवार को शनि पूजा, काले तिल दान', remedyEn: 'Saturn worship on Saturday, donate black sesame', gem: 'नीलम (Blue Sapphire)', mantra: 'ॐ शं शनैश्चराय नमः' },
  { name: 'राहु', nameEn: 'Rahu',     icon: '🌑', dasha: 18, color: '#616161', effect: 'अचानक लाभ/हानि, विदेश यात्रा, भ्रम, राजनीति', effectEn: 'Sudden gains/losses, foreign travel, illusion, politics', remedy: 'शनिवार को दुर्गा पूजा, नारियल का दान', remedyEn: 'Durga worship on Saturday, donate coconut', gem: 'गोमेद (Hessonite)', mantra: 'ॐ रां राहवे नमः' },
  { name: 'केतु', nameEn: 'Ketu',     icon: '🌒', dasha: 7,  color: '#4527a0', effect: 'आध्यात्म, मोक्ष, रहस्य, पितृदोष, दुर्घटना', effectEn: 'Spirituality, liberation, mystery, ancestral issues, accidents', remedy: 'मंगलवार को गणेश पूजा, कंबल का दान', remedyEn: 'Ganesh worship on Tuesday, donate blankets', gem: 'लहसुनिया (Cat\'s Eye)', mantra: 'ॐ कें केतवे नमः' },
];

const NUMEROLOGY_DATA = {
  1: { ruler: 'सूर्य', rulerEn: 'Sun', traits: 'नेतृत्व, आत्मनिर्भरता, महत्वाकांक्षा', traitsEn: 'Leadership, independence, ambition', career: 'राजनीति, प्रशासन, प्रबंधन', careerEn: 'Politics, administration, management', lucky: '1, 10, 19, 28', color: 'सोना/लाल', colorEn: 'Gold/Red', desc: 'अंक 1 वाले लोग स्वाभाविक नेता होते हैं। इनमें अपार आत्मविश्वास और नई शुरुआत करने की क्षमता होती है।', descEn: 'Number 1 people are natural leaders. They have tremendous confidence and the ability to make new beginnings.' },
  2: { ruler: 'चंद्र', rulerEn: 'Moon', traits: 'सहयोग, संवेदनशीलता, कूटनीति', traitsEn: 'Cooperation, sensitivity, diplomacy', career: 'कला, संगीत, राजनय', careerEn: 'Art, music, diplomacy', lucky: '2, 11, 20, 29', color: 'सफेद/क्रीम', colorEn: 'White/Cream', desc: 'अंक 2 वाले लोग शांतिप्रिय और सहयोगी होते हैं। इनकी अंतर्ज्ञान शक्ति और भावनात्मक बुद्धि उत्कृष्ट होती है।', descEn: 'Number 2 people are peace-loving and cooperative. Their intuition and emotional intelligence are excellent.' },
  3: { ruler: 'गुरु', rulerEn: 'Jupiter', traits: 'रचनात्मकता, संचार, आनंद', traitsEn: 'Creativity, communication, joy', career: 'लेखन, मीडिया, शिक्षा', careerEn: 'Writing, media, education', lucky: '3, 12, 21, 30', color: 'पीला/सोना', colorEn: 'Yellow/Gold', desc: 'अंक 3 वाले लोग बहुत रचनात्मक और सामाजिक होते हैं। इनमें अभिव्यक्ति की अद्भुत क्षमता होती है।', descEn: 'Number 3 people are very creative and social. They have a wonderful ability for self-expression.' },
  4: { ruler: 'राहु', rulerEn: 'Rahu', traits: 'व्यवस्था, परिश्रम, स्थिरता', traitsEn: 'Organisation, hard work, stability', career: 'इंजीनियरिंग, वास्तुकला, वित्त', careerEn: 'Engineering, architecture, finance', lucky: '4, 13, 22, 31', color: 'नीला/भूरा', colorEn: 'Blue/Brown', desc: 'अंक 4 वाले लोग मेहनती और व्यावहारिक होते हैं। इनकी नींव मजबूत होती है और ये विश्वसनीय होते हैं।', descEn: 'Number 4 people are hardworking and practical. They have a strong foundation and are trustworthy.' },
  5: { ruler: 'बुध', rulerEn: 'Mercury', traits: 'स्वतंत्रता, साहस, बहुमुखी प्रतिभा', traitsEn: 'Freedom, courage, versatility', career: 'पर्यटन, व्यापार, मीडिया', careerEn: 'Tourism, business, media', lucky: '5, 14, 23', color: 'हरा/नारंगी', colorEn: 'Green/Orange', desc: 'अंक 5 वाले लोग स्वतंत्र और साहसी होते हैं। इन्हें बदलाव पसंद है और ये हर परिस्थिति में ढल जाते हैं।', descEn: 'Number 5 people are free-spirited and adventurous. They love change and adapt to every situation.' },
  6: { ruler: 'शुक्र', rulerEn: 'Venus', traits: 'प्रेम, जिम्मेदारी, सौंदर्य', traitsEn: 'Love, responsibility, beauty', career: 'स्वास्थ्य सेवा, शिक्षा, कला', careerEn: 'Healthcare, education, arts', lucky: '6, 15, 24', color: 'गुलाबी/नीला', colorEn: 'Pink/Blue', desc: 'अंक 6 वाले लोग प्रेम और देखभाल के प्रतीक होते हैं। ये परिवार और समुदाय के लिए समर्पित होते हैं।', descEn: 'Number 6 people are symbols of love and care. They are devoted to family and community.' },
  7: { ruler: 'केतु', rulerEn: 'Ketu', traits: 'आध्यात्मिकता, विश्लेषण, रहस्य', traitsEn: 'Spirituality, analysis, mystery', career: 'शोध, दर्शन, आध्यात्म', careerEn: 'Research, philosophy, spirituality', lucky: '7, 16, 25', color: 'बैंगनी/सफेद', colorEn: 'Purple/White', desc: 'अंक 7 वाले लोग गहरे विचारक और आध्यात्मिक होते हैं। इनकी रहस्यों को उजागर करने की क्षमता अद्भुत होती है।', descEn: 'Number 7 people are deep thinkers and spiritual. Their ability to unravel mysteries is remarkable.' },
  8: { ruler: 'शनि', rulerEn: 'Saturn', traits: 'शक्ति, सफलता, भौतिक उपलब्धि', traitsEn: 'Power, success, material achievement', career: 'व्यापार, बैंकिंग, प्रशासन', careerEn: 'Business, banking, administration', lucky: '8, 17, 26', color: 'काला/गहरा नीला', colorEn: 'Black/Dark Blue', desc: 'अंक 8 वाले लोग सफलता की ओर अग्रसर होते हैं। इनकी इच्छाशक्ति और कर्म के प्रति निष्ठा इन्हें महान बनाती है।', descEn: 'Number 8 people are driven towards success. Their willpower and dedication to work makes them great.' },
  9: { ruler: 'मंगल', rulerEn: 'Mars', traits: 'मानवता, करुणा, आदर्शवाद', traitsEn: 'Humanity, compassion, idealism', career: 'सेना, चिकित्सा, समाजसेवा', careerEn: 'Military, medicine, social service', lucky: '9, 18, 27', color: 'लाल/गुलाबी', colorEn: 'Red/Pink', desc: 'अंक 9 वाले लोग मानवता के सेवक होते हैं। इनमें करुणा, साहस और आदर्शवाद का अनोखा संगम होता है।', descEn: 'Number 9 people are servants of humanity. They have a unique combination of compassion, courage and idealism.' },
};

const COMPATIBILITY = {
  'मेष':     ['सिंह ♌', 'धनु ♐', 'मिथुन ♊'],
  'वृषभ':   ['कन्या ♍', 'मकर ♑', 'कर्क ♋'],
  'मिथुन':  ['तुला ♎', 'कुंभ ♒', 'मेष ♈'],
  'कर्क':   ['वृश्चिक ♏', 'मीन ♓', 'वृषभ ♉'],
  'सिंह':   ['मेष ♈', 'धनु ♐', 'तुला ♎'],
  'कन्या':  ['वृषभ ♉', 'मकर ♑', 'कर्क ♋'],
  'तुला':   ['मिथुन ♊', 'कुंभ ♒', 'सिंह ♌'],
  'वृश्चिक':['कर्क ♋', 'मीन ♓', 'मकर ♑'],
  'धनु':    ['मेष ♈', 'सिंह ♌', 'कुंभ ♒'],
  'मकर':   ['वृषभ ♉', 'कन्या ♍', 'वृश्चिक ♏'],
  'कुंभ':  ['मिथुन ♊', 'तुला ♎', 'धनु ♐'],
  'मीन':   ['कर्क ♋', 'वृश्चिक ♏', 'वृषभ ♉'],
};
const COMPATIBILITY_EN = {
  'Aries':       ['Leo ♌', 'Sagittarius ♐', 'Gemini ♊'],
  'Taurus':      ['Virgo ♍', 'Capricorn ♑', 'Cancer ♋'],
  'Gemini':      ['Libra ♎', 'Aquarius ♒', 'Aries ♈'],
  'Cancer':      ['Scorpio ♏', 'Pisces ♓', 'Taurus ♉'],
  'Leo':         ['Aries ♈', 'Sagittarius ♐', 'Libra ♎'],
  'Virgo':       ['Taurus ♉', 'Capricorn ♑', 'Cancer ♋'],
  'Libra':       ['Gemini ♊', 'Aquarius ♒', 'Leo ♌'],
  'Scorpio':     ['Cancer ♋', 'Pisces ♓', 'Capricorn ♑'],
  'Sagittarius': ['Aries ♈', 'Leo ♌', 'Aquarius ♒'],
  'Capricorn':   ['Taurus ♉', 'Virgo ♍', 'Scorpio ♏'],
  'Aquarius':    ['Gemini ♊', 'Libra ♎', 'Sagittarius ♐'],
  'Pisces':      ['Cancer ♋', 'Scorpio ♏', 'Taurus ♉'],
};

// Get day-of-year index for rotating predictions
const getDayIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
};

const getPrediction = (rashiIndex) => {
  const idx = (getDayIndex() + rashiIndex) % DAILY_PREDICTIONS.length;
  return DAILY_PREDICTIONS[idx];
};

const calcLifePath = (dob) => {
  const digits = dob.replace(/\D/g, '');
  let sum = digits.split('').reduce((s, d) => s + parseInt(d), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  return sum;
};

const TABS = [
  { key: 'rashifal',     label: 'राशिफल',         labelEn: 'Daily Rashifal',    icon: '🔮' },
  { key: 'sunsign',      label: 'सूर्य राशि',       labelEn: 'Sun Signs',         icon: '☀️' },
  { key: 'moonsign',     label: 'चंद्र राशि',       labelEn: 'Moon Sign',         icon: '🌙' },
  { key: 'marriage',     label: 'विवाह भविष्य',     labelEn: 'Marriage',          icon: '💑' },
  { key: 'numerology',   label: 'अंक ज्योतिष',      labelEn: 'Numerology',        icon: '🔢' },
  { key: 'grahdasha',    label: 'ग्रह दशा',          labelEn: 'Grah Dasha',        icon: '🪐' },
];

// Per-sign score seeds — gives each sign a distinct feel each day
const SCORE_SEEDS = [5, 3, 7, 2, 8, 4, 6, 1, 9, 3, 7, 5];
const getScores = (rashiIndex) => {
  const base = (getDayIndex() + rashiIndex + SCORE_SEEDS[rashiIndex]) % 5;
  return {
    love:    Math.min(5, 3 + ((base + 1) % 3)),
    career:  Math.min(5, 2 + ((base + 2) % 4)),
    finance: Math.min(5, 2 + ((base + 3) % 4)),
    health:  Math.min(5, 3 + ((base + 0) % 3)),
  };
};
const Stars = ({ score, color }) => (
  <span className="dh-stars">
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= score ? color : 'var(--card-border)', fontSize: '14px' }}>★</span>
    ))}
  </span>
);

// ─── Daily Horoscope Component ────────────────────────────────────────────────

const DailyHoroscope = ({ lang }) => {
  const { lang: currentLang } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const rashi = RASHIS[activeIdx];
  const pred  = getPrediction(activeIdx);
  const scores = getScores(activeIdx);
  const dateStr = new Date().toLocaleDateString(
    currentLang.toLowerCase() === 'hi' ? 'hi-IN' : 'en-IN',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <div className="dh-wrapper">
      <div>
        {/* Heading */}
        <div className="dh-heading">
          <h2>🔮 {lang === 'EN' ? "Today's Horoscope" : 'आज का राशिफल'}</h2>
          <span className="dh-date">📅 {dateStr}</span>
        </div>

        {/* Sign selector strip */}
        <div className="dh-sign-strip">
          {RASHIS.map((r, i) => (
            <button
              key={r.id}
              className={`dh-sign-btn${activeIdx === i ? ' active' : ''}`}
              onClick={() => setActiveIdx(i)}
              style={activeIdx === i ? { borderColor: r.color, background: `${r.color}22` } : {}}
            >
              <span className="dh-sign-symbol" style={{ color: activeIdx === i ? r.color : undefined }}>{r.symbol}</span>
              <span className="dh-sign-name">{lang === 'EN' ? r.nameEn : r.name}</span>
            </button>
          ))}
        </div>

        {/* Main prediction card */}
        <div className="dh-card" style={{ borderTop: `4px solid ${rashi.color}` }}>
          {/* Card header */}
          <div className="dh-card-header">
            <div className="dh-card-sign">
              <span className="dh-big-symbol" style={{ color: rashi.color }}>{rashi.symbol}</span>
              <div>
                <h3 className="dh-sign-title" style={{ color: rashi.color }}>
                  {lang === 'EN' ? rashi.nameEn : rashi.name}
                </h3>
                <div className="dh-sign-sub">{lang === 'EN' ? rashi.datesEn : rashi.dates} &nbsp;|&nbsp; {lang === 'EN' ? rashi.elementEn : rashi.element} &nbsp;|&nbsp; {lang === 'EN' ? rashi.rulerEn : rashi.ruler}</div>
              </div>
            </div>
            <div className="dh-overall">
              <span className="dh-overall-label">{lang === 'EN' ? "Today's Result" : 'आज का फल'}</span>
              <div className="dh-overall-stars">
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: i <= Math.round((scores.love+scores.career+scores.finance+scores.health)/4) ? rashi.color : 'var(--card-border)', fontSize: '20px' }}>★</span>
                ))}
              </div>
            </div>
          </div>

          {/* Score bars */}
          <div className="dh-scores">
            {[
              { label: lang === 'EN' ? '❤️ Love' : '❤️ प्रेम', score: scores.love },
              { label: lang === 'EN' ? '💼 Career' : '💼 करियर', score: scores.career },
              { label: lang === 'EN' ? '💰 Finance' : '💰 धन', score: scores.finance },
              { label: lang === 'EN' ? '🌿 Health' : '🌿 स्वास्थ्य', score: scores.health },
            ].map(({ label, score }) => (
              <div key={label} className="dh-score-row">
                <span className="dh-score-label">{label}</span>
                <div className="dh-score-bar">
                  <div className="dh-score-fill" style={{ width: `${score * 20}%`, background: rashi.color }} />
                </div>
                <Stars score={score} color={rashi.color} />
              </div>
            ))}
          </div>

          {/* Prediction blocks */}
          <div className="dh-preds">
            {[
              { icon: '❤️', label: lang === 'EN' ? 'Love & Relations' : 'प्रेम एवं संबंध',   text: lang === 'EN' ? pred.loveEn    : pred.love    },
              { icon: '💼', label: lang === 'EN' ? 'Career & Business' : 'करियर एवं व्यापार', text: lang === 'EN' ? pred.careerEn  : pred.career  },
              { icon: '💰', label: lang === 'EN' ? 'Finance & Wealth' : 'धन एवं वित्त',       text: lang === 'EN' ? pred.financeEn : pred.finance  },
              { icon: '🌿', label: lang === 'EN' ? 'Health' : 'स्वास्थ्य',                    text: lang === 'EN' ? pred.healthEn  : pred.health   },
            ].map(({ icon, label, text }) => (
              <div key={label} className="dh-pred-block" style={{ borderLeft: `3px solid ${rashi.color}` }}>
                <div className="dh-pred-label">{icon} {label}</div>
                <div className="dh-pred-text">{text}</div>
              </div>
            ))}
          </div>

          {/* Lucky details */}
          <div className="dh-lucky-row">
            <div className="dh-lucky-item" style={{ borderColor: rashi.color }}>
              <span className="dh-lucky-icon">🍀</span>
              <div><span className="dh-lucky-key">{lang === 'EN' ? 'Lucky No.' : 'शुभ अंक'}</span><span className="dh-lucky-val">{pred.lucky_num}</span></div>
            </div>
            <div className="dh-lucky-item" style={{ borderColor: rashi.color }}>
              <span className="dh-lucky-icon">🎨</span>
              <div><span className="dh-lucky-key">{lang === 'EN' ? 'Lucky Color' : 'शुभ रंग'}</span><span className="dh-lucky-val">{lang === 'EN' ? pred.lucky_colorEn : pred.lucky_color}</span></div>
            </div>
            <div className="dh-lucky-item" style={{ borderColor: rashi.color }}>
              <span className="dh-lucky-icon">💎</span>
              <div><span className="dh-lucky-key">{lang === 'EN' ? 'Lucky Stone' : 'शुभ रत्न'}</span><span className="dh-lucky-val">{lang === 'EN' ? rashi.stoneEn : rashi.stone}</span></div>
            </div>
            <div className="dh-lucky-item" style={{ borderColor: rashi.color }}>
              <span className="dh-lucky-icon">🔢</span>
              <div><span className="dh-lucky-key">{lang === 'EN' ? 'Root No.' : 'मूलांक'}</span><span className="dh-lucky-val">{rashi.lucky}</span></div>
            </div>
          </div>

          {/* Daily tip */}
          <div className="dh-tip" style={{ borderColor: rashi.color }}>
            <span className="dh-tip-icon">💡</span>
            <div><strong>{lang === 'EN' ? "Today's Tip:" : 'आज का सुझाव:'}</strong> {lang === 'EN' ? pred.tipEn : pred.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const RashiCard = ({ rashi, isSelected, onSelect, lang }) => (
  <div
    className={`astro-rashi-card${isSelected ? ' selected' : ''}`}
    onClick={() => onSelect(isSelected ? null : rashi)}
    style={{ borderTop: `3px solid ${rashi.color}` }}
  >
    <div className="astro-rashi-symbol" style={{ color: rashi.color }}>{rashi.symbol}</div>
    <div className="astro-rashi-name">{lang === 'EN' ? rashi.nameEn : rashi.name}</div>
    <div className="astro-rashi-dates">{lang === 'EN' ? rashi.datesEn : rashi.dates}</div>
  </div>
);

const RashiDetailPanel = ({ rashi, index, onClose, lang }) => {
  const pred = getPrediction(index);
  return (
    <div className="astro-detail-panel" style={{ borderColor: rashi.color }}>
      <div className="astro-detail-header">
        <div className="astro-detail-sign-info">
          <span style={{ color: rashi.color, fontSize: '2.4rem', lineHeight: 1 }}>{rashi.symbol}</span>
          <div>
            <strong style={{ color: rashi.color, fontSize: '1.2rem', display: 'block', fontFamily: "'Mukta','Noto Sans Devanagari',sans-serif" }}>
              {lang === 'EN' ? rashi.nameEn : rashi.name}
            </strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              {lang === 'EN' ? rashi.datesEn : rashi.dates} &nbsp;|&nbsp; {lang === 'EN' ? rashi.elementEn : rashi.element} &nbsp;|&nbsp; {lang === 'EN' ? rashi.rulerEn : rashi.ruler}
            </span>
          </div>
        </div>
        <button className="astro-detail-close" onClick={onClose}>✕</button>
      </div>
      <div className="astro-detail-preds">
        {[
          { icon: '❤️', label: lang === 'EN' ? 'Love & Relations'   : 'प्रेम एवं संबंध',   text: lang === 'EN' ? pred.loveEn    : pred.love    },
          { icon: '💼', label: lang === 'EN' ? 'Career & Business'  : 'करियर एवं व्यापार', text: lang === 'EN' ? pred.careerEn  : pred.career  },
          { icon: '💰', label: lang === 'EN' ? 'Finance & Wealth'   : 'धन एवं वित्त',       text: lang === 'EN' ? pred.financeEn : pred.finance  },
          { icon: '🌿', label: lang === 'EN' ? 'Health'             : 'स्वास्थ्य',           text: lang === 'EN' ? pred.healthEn  : pred.health   },
        ].map(({ icon, label, text }) => (
          <div key={label} className="astro-detail-pred" style={{ borderLeft: `3px solid ${rashi.color}` }}>
            <div className="dh-pred-label">{icon} {label}</div>
            <div className="dh-pred-text">{text}</div>
          </div>
        ))}
      </div>
      <div className="astro-lucky-row mt-2">
        <span className="astro-lucky-badge">🍀 {lang === 'EN' ? 'Lucky No.' : 'शुभ अंक'}: {pred.lucky_num}</span>
        <span className="astro-lucky-badge">🎨 {lang === 'EN' ? 'Lucky Color' : 'शुभ रंग'}: {lang === 'EN' ? pred.lucky_colorEn : pred.lucky_color}</span>
        <span className="astro-lucky-badge">💎 {lang === 'EN' ? 'Stone' : 'रत्न'}: {lang === 'EN' ? rashi.stoneEn : rashi.stone}</span>
        <span className="astro-lucky-badge">🔢 {lang === 'EN' ? 'Root No.' : 'मूलांक'}: {rashi.lucky}</span>
      </div>
      <div className="astro-tip mt-2" style={{ borderLeftColor: rashi.color }}>
        <span className="dh-tip-icon">💡</span>
        <div><strong>{lang === 'EN' ? "Today's Tip:" : 'आज का सुझाव:'}</strong> {lang === 'EN' ? pred.tipEn : pred.tip}</div>
      </div>
    </div>
  );
};

const SunSignCard = ({ rashi, lang }) => (
  <div className="astro-sun-card" style={{ borderLeft: `4px solid ${rashi.color}` }}>
    <div className="astro-sun-header">
      <span className="astro-sun-symbol" style={{ color: rashi.color }}>{rashi.symbol}</span>
      <div>
        <h5 className="astro-sun-name">{lang === 'EN' ? rashi.nameEn : rashi.name}</h5>
        <span className="astro-sun-dates">{lang === 'EN' ? rashi.datesEn : rashi.dates}</span>
      </div>
    </div>
    <p className="astro-sun-desc">{lang === 'EN' ? rashi.descEn : rashi.desc}</p>
    <div className="astro-sun-meta">
      <span>🔥 {lang === 'EN' ? rashi.elementEn : rashi.element}</span>
      <span>🪐 {lang === 'EN' ? rashi.rulerEn : rashi.ruler}</span>
      <span>🍀 {rashi.lucky}</span>
      <span>💎 {lang === 'EN' ? rashi.stoneEn : rashi.stone}</span>
    </div>
    <div className="astro-traits">
      {(lang === 'EN' ? rashi.traitsEn : rashi.traits).map((t, i) => (
        <span key={i} className="astro-trait-badge">{t}</span>
      ))}
    </div>
  </div>
);

// ─── Astro News Slider ────────────────────────────────────────────────────────

const AstroNewsSlider = ({ articles, navigate, lang, fullWidth = false }) => {
  const [current, setCurrent] = useState(0);
  const items = articles.slice(0, 8);
  const total = items.length;

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <div className={fullWidth ? 'astro-slider astro-slider--hero' : 'astro-slider'}>
      <div className="astro-slider-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((a, i) => {
          const fallback = getCategoryFallbackImage(a.category, a.id, a.title);
          const img = a.image || fallback;
          return (
            <div
              key={a.id}
              className="astro-slide-item"
              onClick={() => navigate(`/article/${a.id}`)}
            >
              <img
                src={img}
                alt={a.title}
                onError={e => { e.target.onerror = null; e.target.src = fallback || SAFE_FALLBACK; }}
              />
              <div className="astro-slide-overlay">
                <div className="astro-slide-content">
                  <span className="astro-slide-badge">{lang === 'EN' ? 'Astrology' : 'ज्योतिष'}</span>
                  <h4 className="astro-slide-title">{a.title}</h4>
                  <span className="astro-slide-time">{timeAgo(a.pubDate, lang.toLowerCase())}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {total > 1 && (
        <>
          <button className="astro-slide-btn astro-slide-prev" onClick={prev}>‹</button>
          <button className="astro-slide-btn astro-slide-next" onClick={next}>›</button>
          <div className="astro-slide-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`astro-slide-dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const AstrologyPage = () => {
  const { getByCategory, rawArticles } = useNews();
  const { lang } = useLang();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('rashifal');
  const [selectedRashi, setSelectedRashi] = useState(null);
  const [selectedSign, setSelectedSign] = useState('मेष');
  const [dobInput, setDobInput] = useState('');
  const [lifePathNum, setLifePathNum] = useState(null);
  const [moonBirthMonth, setMoonBirthMonth] = useState('');

  const astroNews = useMemo(() => {
    const primary = getByCategory('astro');
    if (primary.length > 0) return primary;
    const preferredLang = lang === 'EN' ? 'en' : 'hi';
    return rawArticles.filter(a => a.category === 'astro' && a.lang === preferredLang);
  }, [getByCategory, rawArticles, lang]);

  const dateStr = new Date().toLocaleDateString(
    lang.toLowerCase() === 'hi' ? 'hi-IN' : 'en-IN',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  );

  const moonSign = useMemo(() => {
    if (!moonBirthMonth) return null;
    const month = parseInt(moonBirthMonth);
    const idx = (month - 1) % 12;
    return RASHIS[idx];
  }, [moonBirthMonth]);

  const handleCalcNumerology = () => {
    if (dobInput.length >= 8) {
      setLifePathNum(calcLifePath(dobInput));
    }
  };

  return (
    <>
      <Helmet>
        <title>ज्योतिष | राशिफल | Astrology | {PORTAL_NAME}</title>
        <meta name="description" content="दैनिक राशिफल, सूर्य राशि, चंद्र राशि, विवाह भविष्य, अंक ज्योतिष और ग्रह दशा — सम्पूर्ण वैदिक ज्योतिष पोर्टल।" />
      </Helmet>

      <div className="container-fluid px-0">

        {/* ── Full-width news slider (like HeroSlider on home page) ── */}
        {astroNews.length > 0 ? (
          <AstroNewsSlider articles={astroNews} navigate={navigate} lang={lang} fullWidth />
        ) : (
          <div className="astro-hero">
            <div className="astro-hero-stars" />
            <div className="astro-hero-content container">
              <h1 className="astro-hero-title">⭐ {lang === 'EN' ? 'Astrology & Horoscope' : 'ज्योतिष एवं राशिफल'}</h1>
              <p className="astro-hero-subtitle">{lang === 'EN' ? 'Complete Vedic Astrology — Planets, Signs, Dasha & Predictions' : 'वैदिक ज्योतिष का सम्पूर्ण ज्ञान — ग्रह, राशि, दशा और भविष्यफल'}</p>
              <div className="astro-hero-date">📅 {dateStr}</div>
            </div>
          </div>
        )}

        {/* ── Leaderboard ad ── */}
        <div className="container my-2">
          <AdBanner size="728x90" index={0} />
        </div>

{/* ── Two-column layout ── */}
        <div className="container py-2">
          <div className="row g-4">

            {/* ── Main content col ── */}
            <div className="col-lg-8">

              {/* Daily Horoscope */}
              <DailyHoroscope lang={lang} />

              {/* Tab Nav */}
              <div className="astro-tabnav mt-3">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    className={`astro-tab${activeTab === tab.key ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span>{tab.icon}</span>
                    <span>{lang === 'EN' ? tab.labelEn : tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="py-4">

        {/* ══ TAB: RASHIFAL ══════════════════════════════════════════════════ */}
        {activeTab === 'rashifal' && (
          <div>
            <div className="astro-rashi-grid-heading">
              <span>✨ {lang === 'EN' ? 'All 12 Signs — Click on a Sign' : 'सभी 12 राशियां — राशि पर क्लिक करें'}</span>
            </div>
            <div className="astro-rashi-grid">
              {RASHIS.map((rashi) => (
                <RashiCard
                  key={rashi.id}
                  rashi={rashi}
                  isSelected={selectedRashi?.id === rashi.id}
                  onSelect={setSelectedRashi}
                  lang={lang}
                />
              ))}
            </div>
            {selectedRashi && (
              <RashiDetailPanel
                rashi={selectedRashi}
                index={RASHIS.findIndex(r => r.id === selectedRashi.id)}
                onClose={() => setSelectedRashi(null)}
                lang={lang}
              />
            )}

          </div>
        )}

        {/* ══ TAB: SUN SIGNS ═════════════════════════════════════════════════ */}
        {activeTab === 'sunsign' && (
          <div>
            <div className="astro-section-header">
              <h2>☀️ {lang === 'EN' ? 'Sun Signs — Detailed Guide' : 'सूर्य राशि — विस्तृत ज्ञान'}</h2>
              <p>{lang === 'EN' ? 'Complete introduction to all 12 signs — traits, strengths and characteristics' : 'सभी 12 राशियों का सम्पूर्ण परिचय, गुण-अवगुण और विशेषताएं'}</p>
            </div>
            <div className="row g-4">
              {RASHIS.map(r => (
                <div key={r.id} className="col-lg-6">
                  <SunSignCard rashi={r} lang={lang} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ TAB: MOON SIGN ═════════════════════════════════════════════════ */}
        {activeTab === 'moonsign' && (
          <div>
            <div className="astro-section-header">
              <h2>🌙 {lang === 'EN' ? 'Moon Sign' : 'चंद्र राशि'}</h2>
              <p>{lang === 'EN' ? 'Your Moon Sign is a mirror of your mind, emotions and subconscious' : 'चंद्र राशि आपके मन, भावनाओं और अवचेतन मन का दर्पण होती है'}</p>
            </div>

            <div className="astro-calc-card">
              <h4>{lang === 'EN' ? 'Find Your Moon Sign' : 'अपनी चंद्र राशि जानें'}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{lang === 'EN' ? 'Select your birth month (exact birth time & place needed for precise result)' : 'अपना जन्म माह चुनें (सटीक चंद्र राशि के लिए जन्म समय व स्थान आवश्यक है)'}</p>
              <div className="astro-input-row">
                <select
                  className="astro-select"
                  value={moonBirthMonth}
                  onChange={e => setMoonBirthMonth(e.target.value)}
                >
                  <option value="">{lang === 'EN' ? '-- Select Birth Month --' : '-- जन्म माह चुनें --'}</option>
                  {(lang === 'EN'
                    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
                    : ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर']
                  ).map((m, i) => (
                    <option key={i} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
              {moonSign && (
                <div className="astro-result-box" style={{ borderColor: moonSign.color }}>
                  <div className="astro-result-symbol" style={{ color: moonSign.color }}>{moonSign.symbol}</div>
                  <h4>{lang === 'EN' ? moonSign.nameEn : moonSign.name}</h4>
                  <p>{lang === 'EN' ? moonSign.descEn : moonSign.desc}</p>
                  <div className="astro-sun-meta">
                    <span>🔥 {lang === 'EN' ? moonSign.elementEn : moonSign.element}</span>
                    <span>🪐 {lang === 'EN' ? moonSign.rulerEn : moonSign.ruler}</span>
                    <span>💎 {lang === 'EN' ? moonSign.stoneEn : moonSign.stone}</span>
                    <span>🍀 {moonSign.lucky}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="astro-subheading">{lang === 'EN' ? 'Significance of Moon Sign' : 'चंद्र राशि का महत्व'}</h4>
              <div className="row g-3 mt-2">
                {(lang === 'EN' ? [
                  { icon: '🧠', title: 'Mind & Emotions', desc: 'The Moon Sign governs your emotional responses, subconscious mind and intuition.' },
                  { icon: '👪', title: 'Family & Mother', desc: 'The Moon Sign is connected to your mother, home and family happiness.' },
                  { icon: '💭', title: 'Dreams & Imagination', desc: 'Your Moon Sign has a deep influence on your dreams and creative imagination.' },
                  { icon: '🌊', title: 'Emotional Stability', desc: 'People with a strong Moon are emotionally balanced and stable.' },
                ] : [
                  { icon: '🧠', title: 'मन और भावनाएं', desc: 'चंद्र राशि आपकी भावनात्मक प्रतिक्रियाओं, अवचेतन मन और अंतर्ज्ञान को नियंत्रित करती है।' },
                  { icon: '👪', title: 'परिवार और माता', desc: 'चंद्र राशि का संबंध माता, घर और पारिवारिक सुख-दुख से होता है।' },
                  { icon: '💭', title: 'सपने और कल्पना', desc: 'आपके सपनों और रचनात्मक कल्पनाओं पर चंद्र राशि का गहरा प्रभाव पड़ता है।' },
                  { icon: '🌊', title: 'भावनात्मक स्थिरता', desc: 'मजबूत चंद्र वाले व्यक्ति भावनात्मक रूप से संतुलित और स्थिर होते हैं।' },
                ]).map((item, i) => (
                  <div key={i} className="col-md-6">
                    <div className="astro-info-card">
                      <span className="astro-info-icon">{item.icon}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: MARRIAGE ══════════════════════════════════════════════════ */}
        {activeTab === 'marriage' && (
          <div>
            <div className="astro-section-header">
              <h2>💑 {lang === 'EN' ? 'Marriage Compatibility & Kundali Milan' : 'विवाह भविष्य एवं कुंडली मिलान'}</h2>
              <p>{lang === 'EN' ? 'Estimate marriage success based on 36-Guna matching in Vedic astrology' : 'वैदिक ज्योतिष में 36 गुण मिलान के आधार पर विवाह की सफलता का अनुमान'}</p>
            </div>

            {/* Sign selector */}
            <div className="astro-calc-card">
              <h4>{lang === 'EN' ? 'Select Your Sign' : 'अपनी राशि चुनें'}</h4>
              <div className="astro-rashi-pills">
                {RASHIS.map(r => (
                  <button
                    key={r.id}
                    className={`astro-rashi-pill${selectedSign === (lang === 'EN' ? r.nameEn : r.name) ? ' active' : ''}`}
                    onClick={() => setSelectedSign(lang === 'EN' ? r.nameEn : r.name)}
                    style={selectedSign === (lang === 'EN' ? r.nameEn : r.name) ? { background: r.color, borderColor: r.color } : {}}
                  >
                    {r.symbol} {lang === 'EN' ? r.nameEn : r.name}
                  </button>
                ))}
              </div>

              {selectedSign && (COMPATIBILITY[selectedSign] || COMPATIBILITY_EN[selectedSign]) && (
                <div className="astro-result-box" style={{ borderColor: 'var(--primary)', marginTop: '20px' }}>
                  <h5>💑 {lang === 'EN' ? `Compatible Signs for ${selectedSign}` : `${selectedSign} राशि के लिए अनुकूल राशियां`}</h5>
                  <div className="astro-compat-list">
                    {(lang === 'EN' ? COMPATIBILITY_EN[selectedSign] : COMPATIBILITY[selectedSign])?.map((r, i) => (
                      <div key={i} className="astro-compat-item">
                        <span className="astro-compat-rank">{lang === 'EN' ? ['Best', 'Excellent', 'Compatible'][i] : ['सर्वश्रेष्ठ', 'उत्तम', 'अनुकूल'][i]}</span>
                        <span className="astro-compat-sign">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gunas info */}
            <h4 className="astro-subheading mt-4">{lang === 'EN' ? '36 Guna Milan — Key Kootas' : '36 गुण मिलान — मुख्य कूट'}</h4>
            <div className="row g-3 mt-2">
              {(lang === 'EN' ? [
                { name: 'Varna', max: 1, desc: 'Similarity in spiritual development and life goals' },
                { name: 'Vasya', max: 2, desc: 'Ability to control and influence each other' },
                { name: 'Tara', max: 3, desc: 'Compatibility of health and fortune from birth star' },
                { name: 'Yoni', max: 4, desc: 'Physical and intimate compatibility' },
                { name: 'Graha Maitri', max: 5, desc: 'Friendship between the ruling planets of each sign' },
                { name: 'Gana', max: 6, desc: 'Compatibility of Deva, Manushya and Rakshasa temperaments' },
                { name: 'Bhakoot', max: 7, desc: 'Wealth, progeny and longevity from sign positions' },
                { name: 'Nadi', max: 8, desc: 'Most important koota for health and progeny' },
              ] : [
                { name: 'वर्ण', max: 1, desc: 'आध्यात्मिक विकास और जीवन लक्ष्य की समानता' },
                { name: 'वश्य', max: 2, desc: 'एक दूसरे पर नियंत्रण और प्रभाव की क्षमता' },
                { name: 'तारा', max: 3, desc: 'जन्म नक्षत्र से स्वास्थ्य और भाग्य की अनुकूलता' },
                { name: 'योनि', max: 4, desc: 'शारीरिक और यौन अनुकूलता' },
                { name: 'ग्रह मैत्री', max: 5, desc: 'राशि स्वामी ग्रहों के बीच मित्रता' },
                { name: 'गण', max: 6, desc: 'देव, मानव और राक्षस गण की अनुकूलता' },
                { name: 'भकूट', max: 7, desc: 'राशि स्थिति से धन, संतान और दीर्घायु' },
                { name: 'नाड़ी', max: 8, desc: 'स्वास्थ्य और संतान प्राप्ति की सबसे महत्वपूर्ण कूट' },
              ]).map((g, i) => (
                <div key={i} className="col-md-6 col-lg-3">
                  <div className="astro-guna-card">
                    <div className="astro-guna-name">{g.name}</div>
                    <div className="astro-guna-max">{lang === 'EN' ? 'Points' : 'अंक'}: {g.max}/36</div>
                    <div className="astro-guna-desc">{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="astro-info-banner mt-4">
              <h5>🔔 {lang === 'EN' ? '18+ Gunas Required for Kundali Milan' : 'कुंडली मिलान में 18+ गुण आवश्यक हैं'}</h5>
              <p>{lang === 'EN' ? 'According to Vedic astrology, a minimum of 18 gunas must match for marriage. More than 28 gunas is considered excellent.' : 'वैदिक ज्योतिष के अनुसार विवाह के लिए न्यूनतम 18 गुणों का मिलान होना चाहिए। 28 से अधिक गुण मिलना उत्तम विवाह का संकेत है।'}</p>
              <div className="astro-guna-scale">
                <div className="astro-scale-item red">0–17: {lang === 'EN' ? 'Not Recommended' : 'निषेध'}</div>
                <div className="astro-scale-item yellow">18–24: {lang === 'EN' ? 'Average' : 'सामान्य'}</div>
                <div className="astro-scale-item green">25–32: {lang === 'EN' ? 'Good' : 'उत्तम'}</div>
                <div className="astro-scale-item gold">33–36: {lang === 'EN' ? 'Excellent' : 'श्रेष्ठ'}</div>
              </div>
            </div>
          </div>
        )}

        {/* ══ TAB: NUMEROLOGY ════════════════════════════════════════════════ */}
        {activeTab === 'numerology' && (
          <div>
            <div className="astro-section-header">
              <h2>🔢 {lang === 'EN' ? 'Numerology' : 'अंक ज्योतिष'}</h2>
              <p>{lang === 'EN' ? 'Calculate your Life Path Number from your date of birth and know your destiny' : 'अपनी जन्म तारीख से जीवन पथ अंक निकालें और अपना भविष्य जानें'}</p>
            </div>

            <div className="astro-calc-card">
              <h4>{lang === 'EN' ? 'Life Path Number Calculator' : 'जीवन पथ अंक (Life Path Number) कैलकुलेटर'}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{lang === 'EN' ? 'Enter your date of birth' : 'अपनी जन्म तारीख दर्ज करें (DD/MM/YYYY)'}</p>
              <div className="astro-input-row">
                <input
                  type="date"
                  className="astro-input"
                  value={dobInput}
                  onChange={e => setDobInput(e.target.value)}
                />
                <button className="astro-calc-btn" onClick={handleCalcNumerology}>
                  {lang === 'EN' ? 'Calculate' : 'गणना करें'}
                </button>
              </div>

              {lifePathNum && NUMEROLOGY_DATA[lifePathNum <= 9 ? lifePathNum : 9] && (
                <div className="astro-result-box" style={{ borderColor: 'var(--primary)' }}>
                  <div className="astro-num-big">{lifePathNum}</div>
                  <h4>{lang === 'EN' ? `Life Path Number: ${lifePathNum}` : `जीवन पथ अंक: ${lifePathNum}`}</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>{lang === 'EN' ? NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].descEn : NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].desc}</p>
                  <div className="row g-2 mt-2">
                    {[
                      [lang === 'EN' ? '🪐 Ruling Planet' : '🪐 स्वामी ग्रह', lang === 'EN' ? NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].rulerEn : NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].ruler],
                      [lang === 'EN' ? '✨ Traits' : '✨ गुण',               lang === 'EN' ? NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].traitsEn : NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].traits],
                      [lang === 'EN' ? '💼 Ideal Career' : '💼 उचित करियर',  lang === 'EN' ? NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].careerEn : NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].career],
                      [lang === 'EN' ? '🍀 Lucky Dates' : '🍀 शुभ तारीखें',  NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].lucky],
                      [lang === 'EN' ? '🎨 Lucky Color' : '🎨 शुभ रंग',      lang === 'EN' ? NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].colorEn : NUMEROLOGY_DATA[Math.min(lifePathNum, 9)].color],
                    ].map(([label, val], i) => (
                      <div key={i} className="col-md-6">
                        <div className="astro-num-row">
                          <span className="astro-num-label">{label}</span>
                          <span className="astro-num-val">{val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* All numerology numbers */}
            <h4 className="astro-subheading mt-4">{lang === 'EN' ? 'All Root Numbers — Detailed Description' : 'सभी मूलांक — विस्तृत विवरण'}</h4>
            <div className="row g-3 mt-2">
              {Object.entries(NUMEROLOGY_DATA).map(([num, data]) => (
                <div key={num} className="col-md-6 col-lg-4">
                  <div className="astro-num-card">
                    <div className="astro-num-circle">{num}</div>
                    <div className="astro-num-info">
                      <strong>{lang === 'EN' ? `No. ${num} — ${data.rulerEn}` : `अंक ${num} — ${data.ruler}`}</strong>
                      <p className="astro-num-traits">{lang === 'EN' ? data.traitsEn : data.traits}</p>
                      <p className="astro-num-desc">{lang === 'EN' ? data.descEn : data.desc}</p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <span className="astro-lucky-badge">🎨 {lang === 'EN' ? data.colorEn : data.color}</span>
                        <span className="astro-lucky-badge">🪐 {lang === 'EN' ? data.rulerEn : data.ruler}</span>
                        <span className="astro-lucky-badge">🍀 {data.lucky}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ TAB: GRAH DASHA ════════════════════════════════════════════════ */}
        {activeTab === 'grahdasha' && (
          <div>
            <div className="astro-section-header">
              <h2>🪐 {lang === 'EN' ? 'Grah Dasha — Navagraha' : 'ग्रह दशा — नवग्रह'}</h2>
              <p>{lang === 'EN' ? 'Vimshottari Dasha system of Vedic astrology — 120-year planetary cycle' : 'वैदिक ज्योतिष की विंशोत्तरी दशा प्रणाली — 120 वर्षों का ग्रह चक्र'}</p>
            </div>

            {/* Navagraha grid */}
            <div className="row g-3">
              {GRAHAS.map((g, i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="astro-graha-card" style={{ borderTop: `3px solid ${g.color}` }}>
                    <div className="astro-graha-header">
                      <span className="astro-graha-icon">{g.icon}</span>
                      <div>
                        <h5 className="astro-graha-name" style={{ color: g.color }}>{lang === 'EN' ? g.nameEn : `${g.name} (${g.nameEn})`}</h5>
                        <span className="astro-graha-dasha">{lang === 'EN' ? `Mahadasha: ${g.dasha} yrs` : `महादशा: ${g.dasha} वर्ष`}</span>
                      </div>
                    </div>
                    <div className="astro-graha-effect">
                      <strong>{lang === 'EN' ? 'Influence:' : 'प्रभाव क्षेत्र:'}</strong> {lang === 'EN' ? g.effectEn : g.effect}
                    </div>
                    <div className="astro-graha-remedy">
                      <strong>💊 {lang === 'EN' ? 'Remedy:' : 'उपाय:'}</strong> {lang === 'EN' ? g.remedyEn : g.remedy}
                    </div>
                    <div className="astro-graha-gem">
                      <strong>💎 {lang === 'EN' ? 'Gem:' : 'रत्न:'}</strong> {g.gem}
                    </div>
                    <div className="astro-mantra">{g.mantra}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dasha order chart */}
            <div className="astro-dasha-chart mt-5">
              <h4 className="astro-subheading">{lang === 'EN' ? 'Vimshottari Dasha Order (120-Year Cycle)' : 'विंशोत्तरी दशा क्रम (120 वर्ष चक्र)'}</h4>
              <div className="astro-dasha-timeline mt-3">
                {GRAHAS.map((g, i) => (
                  <div key={i} className="astro-dasha-bar-wrap">
                    <div className="astro-dasha-label">
                      {g.icon} {lang === 'EN' ? g.nameEn : g.name}
                    </div>
                    <div className="astro-dasha-bar-outer">
                      <div
                        className="astro-dasha-bar-fill"
                        style={{ width: `${(g.dasha / 20) * 100}%`, background: g.color }}
                      />
                    </div>
                    <span className="astro-dasha-years">{g.dasha} {lang === 'EN' ? 'yrs' : 'वर्ष'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dasha effects */}
            <div className="mt-4">
              <h4 className="astro-subheading">{lang === 'EN' ? 'What happens during each Dasha?' : 'दशा काल में क्या होता है?'}</h4>
              <div className="row g-3 mt-2">
                {(lang === 'EN' ? [
                  { icon: '☀️', title: 'Sun Dasha (6 yrs)', desc: 'Self-confidence, government positions, relation with father, success in leadership.' },
                  { icon: '🌙', title: 'Moon Dasha (10 yrs)', desc: 'Emotional ups and downs, mental peace, relation with mother, travel.' },
                  { icon: '🔴', title: 'Mars Dasha (7 yrs)', desc: 'Courage, energy, gains from land, risk of accidents, sibling relations.' },
                  { icon: '🟡', title: 'Jupiter Dasha (16 yrs)', desc: 'Education, marriage, children, religion, fortune and spiritual progress.' },
                  { icon: '⭐', title: 'Venus Dasha (20 yrs)', desc: 'Love, marriage, vehicles, luxury, success in arts and material comforts.' },
                  { icon: '🔵', title: 'Saturn Dasha (19 yrs)', desc: 'Karma, hard work, delays, justice and long-term success.' },
                ] : [
                  { icon: '☀️', title: 'सूर्य दशा (6 वर्ष)', desc: 'आत्मविश्वास, सरकारी पद, पिता से संबंध, नेतृत्व में सफलता मिलती है।' },
                  { icon: '🌙', title: 'चंद्र दशा (10 वर्ष)', desc: 'भावनात्मक उतार-चढ़ाव, मन की शांति, माता से संबंध, यात्राएं होती हैं।' },
                  { icon: '🔴', title: 'मंगल दशा (7 वर्ष)', desc: 'साहस, ऊर्जा, भूमि से लाभ, दुर्घटना का भय, भाई से संबंध।' },
                  { icon: '🟡', title: 'गुरु दशा (16 वर्ष)', desc: 'शिक्षा, विवाह, संतान, धर्म, भाग्योदय और आध्यात्मिक उन्नति।' },
                  { icon: '⭐', title: 'शुक्र दशा (20 वर्ष)', desc: 'प्रेम, विवाह, वाहन, ऐश्वर्य, कला में सफलता और भौतिक सुख।' },
                  { icon: '🔵', title: 'शनि दशा (19 वर्ष)', desc: 'कर्म का फल, मेहनत, विलंब, न्याय और दीर्घकालिक सफलता।' },
                ]).map((item, i) => (
                  <div key={i} className="col-md-6">
                    <div className="astro-info-card">
                      <span className="astro-info-icon">{item.icon}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

              </div>{/* end py-4 tab content */}
            </div>{/* end col-lg-8 */}

            {/* ── Sidebar col ── */}
            <div className="col-lg-4 d-none d-lg-block">
              <Suspense fallback={null}>
                <Sidebar />
              </Suspense>
            </div>

          </div>{/* end row */}
        </div>{/* end container */}

        {/* ── Bottom ad ── */}
        <div className="container my-2">
          <AdBanner size="970x90" index={5} />
        </div>

      </div>{/* end container-fluid */}
    </>
  );
};

export default AstrologyPage;
