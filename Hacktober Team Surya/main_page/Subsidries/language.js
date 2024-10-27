function changeLanguage(lang) {
    const translations = {
        en: {
            title: "Farming Schemes Portal",
            searchPlaceholder: "Search for a scheme...",
            schemes: [
                { title: "Fertilizer Subsidy", description: "Subsidy on fertilizers for farmers." },
                { title: "Power Subsidy", description: "Reduced electricity rates for agricultural purposes." },
                { title: "PMKSY", description: "Subsidies for irrigation system installations." },
                { title: "Machinery Subsidy", description: "Financial assistance for agricultural machinery." },
                { title: "Minimum Support Price (MSP)", description: "Guaranteed price for crops." },
                { title: "Crop Insurance (PMFBY)", description: "Insurance against crop losses." },
            ]
        },
        hi: {
            title: "कृषि योजना पोर्टल",
            searchPlaceholder: "योजना के लिए खोजें...",
            schemes: [
                { title: "उर्वरक सब्सिडी", description: "किसानों के लिए उर्वरक पर सब्सिडी।" },
                { title: "शक्ति सब्सिडी", description: "कृषि उद्देश्यों के लिए कम बिजली दरें।" },
                { title: "PMKSY", description: "सिंचाई प्रणाली स्थापना के लिए सब्सिडी।" },
                { title: "यंत्र सब्सिडी", description: "कृषि यंत्रों के लिए वित्तीय सहायता।" },
                { title: "न्यूनतम समर्थन मूल्य (MSP)", description: "फसलों के लिए गारंटीकृत मूल्य।" },
                { title: "फसल बीमा (PMFBY)", description: "फसल के नुकसान के खिलाफ बीमा।" },
            ]
        },
        bn: {
            title: "কৃষি প্রকল্প পোর্টাল",
            searchPlaceholder: "একটি প্রকল্পের জন্য অনুসন্ধান করুন...",
            schemes: [
                { title: "সার সাবসিডি", description: "কৃষকদের জন্য সার সাবসিডি।" },
                { title: "বিদ্যুৎ সাবসিডি", description: "কৃষি উদ্দেশ্যে কম বিদ্যুৎ মূল্য।" },
                { title: "PMKSY", description: "সেচ ব্যবস্থার জন্য সাবসিডি।" },
                { title: "যন্ত্রপাতি সাবসিডি", description: "কৃষি যন্ত্রপাতির জন্য অর্থনৈতিক সহায়তা।" },
                { title: "নূন্যতম সমর্থন মূল্য (MSP)", description: "ফসলের জন্য নিশ্চিত মূল্য।" },
                { title: "ফসল বীমা (PMFBY)", description: "ফসলের ক্ষতির বিরুদ্ধে বীমা।" },
            ]
        },
        ta: {
            title: "விவசாய திட்டங்கள் வலைத்தளம்",
            searchPlaceholder: "ஒரு திட்டத்தை தேடு...",
            schemes: [
                { title: "உள்ளீட்டுக் குதிரை", description: "விவசாயிகளுக்கான உள்ளீட்டுக் குதிரை." },
                { title: "அணுக்கட்டணம்", description: "விவசாயக்கூறுகளுக்கு குறைந்த மின்சாரம்." },
                { title: "PMKSY", description: "பொது நீர் வாரியங்களுக்கு விதிகள்." },
                { title: "செயற்கை உற்பத்தி", description: "விவசாய உற்பத்திகளுக்கு நிதி உதவி." },
                { title: "குறைந்த ஆதரவு விலை (MSP)", description: "புதுப்பிப்பு விலை." },
                { title: "பண்ணை காப்பீடு (PMFBY)", description: "பண்ணையின் இழப்புக்கு எதிராக காப்பீடு." },
            ]
        },
        te: {
            title: "వ్యవసాయ పథకాలు పోర్టల్",
            searchPlaceholder: "ఒక పథకం కోసం వెతకండి...",
            schemes: [
                { title: "ఎరువుల సబ్సిడీ", description: "వ్యవసాయ కార్మికులకు ఎరువులపై సబ్సిడీ." },
                { title: "శక్తి సబ్సిడీ", description: "వ్యవసాయ అవసరాల కోసం తక్కువ విద్యుత్ రేట్లు." },
                { title: "PMKSY", description: "సంవర్థన వ్యవస్థల కోసం సబ్సిడీలు." },
                { title: "యంత్రాల సబ్సిడీ", description: "వ్యవసాయ యంత్రాలకు ఆర్థిక సహాయం." },
                { title: "తక్కువ మద్దతు ధర (MSP)", description: "ఫసలకు గ్యారంటీ ధర." },
                { title: "ఫసలు బీమా (PMFBY)", description: "ఫసలు నష్టాలకు బీమా." },
            ]
        },
        pa: {
            title: "ਕਿਸਾਨ ਯੋਜਨਾਵਾਂ ਪੋਰਟਲ",
            searchPlaceholder: "ਇੱਕ ਯੋਜਨਾ ਲਈ ਖੋਜ ਕਰੋ...",
            schemes: [
                { title: "ਖਾਦ ਸਬਸਿਡੀ", description: "ਕਿਸਾਨਾਂ ਲਈ ਖਾਦ ਉੱਤੇ ਸਬਸਿਡੀ।" },
                { title: "ਬਿਜਲੀ ਸਬਸਿਡੀ", description: "ਕਿਸਾਨੀ ਲਈ ਘੱਟ ਬਿਜਲੀ ਦੀਆਂ ਕੀਮਤਾਂ।" },
                { title: "PMKSY", description: "ਸਿੰਚਾਈ ਪ੍ਰਣਾਲੀਆਂ ਲਈ ਸਬਸਿਡੀਆਂ।" },
                { title: "ਯੰਤਰ ਸਬਸਿਡੀ", description: "ਕਿਸਾਨੀ ਯੰਤਰਾਂ ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ।" },
                { title: "ਨਿਊਨਤਮ ਸਮਰਥਨ ਕੀਮਤ (MSP)", description: "ਫਸਲਾਂ ਲਈ ਗਾਰੰਟੀ ਕੀਮਤ।" },
                { title: "ਫਸਲ ਬੀਮਾ (PMFBY)", description: "ਫਸਲ ਦੇ ਨੁਕਸਾਨਾਂ ਦੇ ਖਿਲਾਫ ਬੀਮਾ।" },
            ]
        },
    };

    const selectedLang = translations[lang];

    // Update the page title and search placeholder
    document.title = selectedLang.title;
    document.getElementById('searchBar').placeholder = selectedLang.searchPlaceholder;

    // Update schemes
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        tile.querySelector('h2 a').innerText = selectedLang.schemes[index].title;
        tile.querySelector('p').innerText = selectedLang.schemes[index].description;
    });
}
