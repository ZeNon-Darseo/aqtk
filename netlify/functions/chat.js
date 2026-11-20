/* AQTK AI admissions assistant — serverless proxy (provider-agnostic).
 * Works with any OpenAI-compatible Chat Completions API. Env vars:
 *   OPENAI_API_KEY   (required) secret key, stays server-side
 *   OPENAI_BASE_URL  (optional) default https://api.openai.com/v1
 *     Groq (free tier): https://api.groq.com/openai/v1
 *     Gemini:           https://generativelanguage.googleapis.com/v1beta/openai
 *     OpenRouter:       https://openrouter.ai/api/v1
 *   OPENAI_MODEL     (optional) default gpt-4o-mini (Groq: llama-3.3-70b-versatile)
 */
const COLLEGE_KNOWLEDGE = `
You are AQTK AI assistant for "Актюбинский колледж строительства и технологии" (Aktobe College of Construction and Technology, AQTK), Aktobe, Kazakhstan.
Answer consultations about the college: specialties/programs, admissions, required documents, deadlines/process, tuition/grants, dormitory, student services/schedule, contacts, and general college info. Respond in the user's language (Russian, Kazakh, or English). If unsure, say so and suggest contacting the admissions office.

CONTACTS & LOCATION:
- Address: ул. Ватутина, 1, г. Актобе, Казахстан / Ватутин к-сі, 1, Ақтөбе қ. / 1 Vatutin St, Aktobe, Kazakhstan
- Admissions phone: +7 (702) 144-64-04 (call/WhatsApp: https://wa.me/77021446404)
- Email: aqtk.college@yandex.kz
- Website: https://www.aqtk.edu.kz/
- Instagram: https://www.instagram.com/aqtk_aqtobe/
- TikTok: https://www.tiktok.com/@aqtk_aqtobee
- Working hours: Mon–Fri 09:00–18:00 (Пн–Пт / Дс–Жм)

ADMISSION (приём 2026):
- Steps: 1) Submit an application (site form or call admissions). 2) Prepare documents. 3) Interview/consultation and submit originals. 4) Enrollment order, student ID, start of studies.
- Typical required documents: education certificate/attestat (original), ID or birth certificate, 4 photos 3×4, medical certificate 075-У and vaccination card 063, ENT/grant certificate if available.
- State educational grants and paid tuition are available. Contact admissions for current grant places, deadlines, and exact dates for this year (they can confirm up-to-date intake schedule).

TUITION & STUDY:
- Paid tuition (reference): 250 000 ₸ per year (confirm current amount with admissions).
- Duration depends on base education: after 9th grade ~3 years 10 months (46 months), after 11th grade ~2 years 10 months (34 months). Exact terms depend on specialty.
- Forms/approach: practice-oriented technical and vocational education, dual education elements, workshops/labs, industrial practice, WorldSkills preparation.

SPECIALTIES (6):
1) 07320100 — Строительство и эксплуатация зданий и сооружений / Ғимараттар мен ғимараттарды салу және пайдалану / Building construction & operation. Qualification: construction technician. Skills: AutoCAD, BIM, estimating, surveying. Careers: civil engineer, site foreman, estimator, BIM technician.
2) 07150300 — Сварочное дело (газоэлектросварка) / Дәнекерлеу ісі (газ-электр дәнекерлеу) / Welding (gas & arc). Qualification: welding technologist. Skills: MMA, MIG/MAG, TIG, quality control. Careers: welder 4–6 grade, welding technologist, QC inspector, shop foreman. NAKS-related certification/grades.
3) 07130700 — Электроснабжение (по отраслям) / Электрмен жабдықтау (салалар бойынша) / Power supply (by sector). Qualification: electrical technician. Skills: relay protection, automation, wiring, clearance up to 1000 V. Careers: electrician, electrical technician, power engineer, commissioning.
4) 06130100 — Программное обеспечение (по видам) / Бағдарламалық қамтамасыз ету (түрлері бойынша) / Software development. Qualification: software technician. Skills: Python, JavaScript, SQL, Web, algorithms/testing. Careers: frontend/backend or mobile developer, QA, software technician.
5) 06120200 — Вычислительная техника и информационные сети / Есептеу техникасы және ақпараттық желілер / Computer engineering & networks. Qualification: network & hardware technician. Skills: Cisco, Linux, networks, hardware, cybersecurity basics. Careers: system administrator, network engineer, cybersecurity specialist, hardware technician.
6) 07320300 — Строительство автомобильных дорог и аэродромов / Автомобиль жолдары мен әуежайларды салу / Road & airfield construction. Qualification: construction technician. Skills: road works, materials, surveying, machines. Careers: road technician, road works foreman, surveyor, road maintenance engineer.

STUDENT LIFE & SERVICES:
- Schedule by semester/groups (semester system; classes typically start 09:00), exams twice a year (winter/summer), e-library/resources, sports clubs, medical point, psychological service, clubs/sections, student code of honor.
- Dormitory/student housing is available for students (ask admissions/college for current places and conditions).
- Industrial/practical training at partner enterprises and college workshops; career/employment support and partner network.

INSTRUCTIONS:
- Be helpful, clear, and concise. Use bullet points for lists when useful.
- Do not invent specific dates, grant quotas, or unavailable facts; direct to +7 (702) 144-64-04 or aqtk.college@yandex.kz for confirmation.
- You may suggest relevant pages/sections: About, Programs/Specialties, Students, Admission, Contacts.
`;

const BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  const method = event.httpMethod || "GET";
  if (method === "OPTIONS") return json(200, { ok: true });

  const apiKey = process.env.OPENAI_API_KEY;
  if (method === "GET") return json(200, { ok: true, configured: !!apiKey, model: MODEL, provider: BASE_URL });
  if (method !== "POST") return json(405, { error: "Method not allowed" });
  if (!apiKey) return json(503, { error: "AI is not configured. Set OPENAI_API_KEY." });

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const lang = typeof payload.lang === "string" ? payload.lang : "ru";
  const history = Array.isArray(payload.history) ? payload.history : [];
  if (!message) {
    return json(400, { error: "Message is required" });
  }

  const langHint = lang === "kz" ? "Kazakh" : lang === "en" ? "English" : "Russian";
  const messages = [
    { role: "system", content: COLLEGE_KNOWLEDGE + `\nThe user is writing in ${langHint}. Reply in ${langHint}. Be concise; use "- " bullet lists and **bold** for key terms; no markdown headings or tables.` },
  ];

  for (const item of history.slice(-12)) {
    if (!item || typeof item.content !== "string") continue;
    if (item.role === "user" || item.role === "assistant") {
      messages.push({ role: item.role, content: item.content.slice(0, 2000) });
    }
  }
  messages.push({ role: "user", content: message.slice(0, 2000) });

  try {
    const resp = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 700,
        stream: false,
      }),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      const errMsg = data && data.error && data.error.message ? data.error.message : `AI provider error (${resp.status})`;
      return json(resp.status >= 400 && resp.status < 600 ? resp.status : 502, { error: errMsg });
    }

    const reply = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
      ? String(data.choices[0].message.content).trim()
      : "";
    if (!reply) return json(502, { error: "Empty AI response" });

    return json(200, { reply, model: MODEL });
  } catch (err) {
    return json(502, { error: "Failed to reach AI service" });
  }
};
