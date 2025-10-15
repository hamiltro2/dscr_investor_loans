# 🎤 Cap's Voice Settings

**Current Voice:** Echo (Natural conversational male)

---

## 🔊 Quick Voice Reference

### **Current: Echo** ⭐ (Active)
- **Character:** Natural, conversational, friendly
- **Gender:** Male
- **Depth:** Medium
- **Tone:** Warm and approachable
- **Best for:** Balanced professional + friendly conversations
- **Sounds like:** A helpful friend who knows finance

---

## 🎯 Voice Comparison

| Voice | Gender | Depth | Conversational | Professional | Best Use |
|-------|--------|-------|----------------|--------------|----------|
| **Echo** ⭐ | Male | Medium | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | **Current** - Balanced |
| **Nova** | Female | Medium | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Most friendly |
| **Onyx** | Male | **Deep** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Most authoritative |
| Alloy | Neutral | Medium | ⭐⭐⭐ | ⭐⭐⭐⭐ | Previous default |
| Fable | Male (UK) | Medium | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | British charm |
| Shimmer | Female | Light | ⭐⭐⭐⭐ | ⭐⭐⭐ | Gentle, soft |

---

## 🎭 Voice Personalities

### **Echo** (Current) ⭐
```
"Hey! I'm Cap, your Capital Bridge Solutions Loan Companion. 
I can pre-qualify you for a real estate loan in about 2 minutes."
```
**Sounds like:** Your smart friend giving financial advice
**Vibe:** Approachable expert

### **Nova** (Most Conversational)
```
Same text, but with:
- More energy and warmth
- Slightly higher pitch (female)
- Very natural and friendly
```
**Sounds like:** An enthusiastic, helpful colleague
**Vibe:** Energetic companion

### **Onyx** (Deepest & Smoothest)
```
Same text, but with:
- Deep, rich voice
- Authoritative tone
- Confident delivery
```
**Sounds like:** Experienced financial advisor
**Vibe:** Professional authority

---

## 🔧 How to Change Cap's Voice

### **Option 1: Quick Change**

Edit these two files:

**1. API Route** (`src/app/api/voice/speak/route.ts`):
```typescript
const { text, voice = 'echo' } = await req.json();
//                    ^^^^^^ Change this
```

**2. Chat Widget** (`src/components/AIChat/ChatWidget.tsx`):
```typescript
body: JSON.stringify({ text, voice: 'echo' }),
//                                  ^^^^^^ Change this
```

**Available options:**
- `'echo'` - Natural conversational male (current)
- `'nova'` - Energetic conversational female
- `'onyx'` - Deep authoritative male
- `'alloy'` - Neutral balanced (previous)
- `'fable'` - British male
- `'shimmer'` - Gentle female

### **Option 2: Make it User-Selectable** (Future)

Add a voice picker in the chat settings:
```typescript
const [selectedVoice, setSelectedVoice] = useState('echo');

// In settings menu:
<select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
  <option value="echo">Echo (Male, Natural)</option>
  <option value="nova">Nova (Female, Energetic)</option>
  <option value="onyx">Onyx (Male, Deep)</option>
</select>
```

---

## 🧪 Testing Different Voices

### **Test Script:**
1. Change voice in both files
2. Restart dev server: `npm run dev`
3. Open chat, send a message
4. Listen to Cap's response
5. Compare how it sounds

### **Test Message:**
```
"Hey! I'm Cap, your Capital Bridge Solutions Loan Companion. 
DSCR loans start at 5.99% with rates as low as 0.75 points 
on loans over $450,000. We can pre-qualify you in about 2 minutes."
```

This gives you:
- Greeting
- Technical terms (DSCR, points, rates)
- Numbers (percentages, dollar amounts)
- Call to action

---

## 📊 Voice Recommendations by Use Case

### **For Real Estate Investors (Current):**
**Echo** ⭐⭐⭐⭐⭐
- Professional but approachable
- Builds trust
- Not intimidating

### **For Maximum Friendliness:**
**Nova** ⭐⭐⭐⭐⭐
- Warm and energetic
- Very conversational
- Great for nervous first-time borrowers

### **For Premium/High-Net-Worth:**
**Onyx** ⭐⭐⭐⭐⭐
- Deep, authoritative
- Sophisticated
- Commands respect

### **For International Appeal:**
**Fable** ⭐⭐⭐⭐
- British accent
- Polished
- Unique differentiation

---

## 💡 Pro Tips

### **Speed Adjustment:**
You can also adjust speaking speed:
```typescript
speed: 1.0  // Normal (current)
speed: 0.9  // 10% slower (more clear)
speed: 1.1  // 10% faster (more energetic)
```

Change in `src/app/api/voice/speak/route.ts`:
```typescript
const mp3 = await openai.audio.speech.create({
  model: 'tts-1',
  voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
  input: truncatedText,
  speed: 1.0, // <-- Adjust here
});
```

### **Model Options:**
- `tts-1` - Current (fast, good quality)
- `tts-1-hd` - Higher quality (slower, more $)

---

## 🎯 Current Configuration

```typescript
// Voice Synthesis Settings
{
  model: 'tts-1',           // Standard quality
  voice: 'echo',            // Natural conversational male
  speed: 1.0,               // Normal speed
  input: text,              // Cap's message
}
```

---

## 📈 Voice Impact on User Experience

### **Echo (Current):**
- **Trust:** High - sounds like a real person
- **Approachability:** High - friendly but professional
- **Clarity:** Excellent - easy to understand
- **Memorability:** Good - distinct but not distracting

### **Why Echo for Cap:**
1. ✅ Matches "loan companion" personality
2. ✅ Professional enough for finance
3. ✅ Friendly enough to build rapport
4. ✅ Natural conversational flow
5. ✅ Not too deep, not too light

---

## 🔄 Quick Voice Swap Guide

### **Want to try Onyx (Deeper)?**

**File 1:** `src/app/api/voice/speak/route.ts` (line 18)
```typescript
const { text, voice = 'onyx' } = await req.json();
```

**File 2:** `src/components/AIChat/ChatWidget.tsx` (line 191)
```typescript
body: JSON.stringify({ text, voice: 'onyx' }),
```

### **Want to try Nova (Most Conversational)?**

**File 1:** `src/app/api/voice/speak/route.ts` (line 18)
```typescript
const { text, voice = 'nova' } = await req.json();
```

**File 2:** `src/components/AIChat/ChatWidget.tsx` (line 191)
```typescript
body: JSON.stringify({ text, voice: 'nova' }),
```

---

## 🎉 Summary

**Current:** Echo - Natural, conversational male voice  
**Why:** Best balance of professional + friendly for Cap  
**Change:** Edit 2 files, restart server, test  

**Alternatives:**
- **Deeper:** Onyx
- **More conversational:** Nova
- **British:** Fable

---

*Last Updated: October 14, 2025*  
*Voice: Echo*
