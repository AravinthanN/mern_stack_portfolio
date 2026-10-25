"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { certification, education, experience, projects, skills, summary } from "@/data/portfolio";

type Position = { x: number; y: number };
type DragState = { pointerId: number; startX: number; startY: number; originX: number; originY: number };

const BUDDY_WIDTH = 118;
const BUDDY_HEIGHT = 132;
const EDGE_GAP = 12;
const GREETING = "Hello! My name's A-One, your assistant!";
const skillOpeners = ["My boss builds with", "A tool in my boss's toolkit is", "My boss knows their way around"];
const SECTION_OPENERS: Record<string, string> = {
    top: "Welcome! Want a little tour of my boss's portfolio?",
    about: "Curious about my boss? Here's a little about how he works.",
    skills: "Oh, checking out my boss's skills? Let me tell you about the toolkit.",
    experience: "You've found my boss's work story. Let me share a few highlights.",
    projects: "Oh, interested in my boss's projects? Let me tell you what he built.",
    achievements: "Want to hear what my boss is proud of? Here are a few results.",
    education: "A little about my boss's studies: He took an interesting path into tech.",
    certificates: "And here's a course my boss completed along the way.",
};
const SECTION_TOPICS: Record<string, string> = {
    top: "portfolio",
    about: "my boss",
    skills: "my boss's skills",
    experience: "my boss's work story",
    projects: "my boss's projects",
    achievements: "my boss's achievements",
    education: "my boss's education",
    certificates: "my boss's certificates",
};
const SECTION_LINES: Record<string, string[]> = {
    top: [
        "Want to hear a fun secret? My boss is also into game development, screenwriting, and video editing.",
        "He even has his own YouTube channel. Want to know more? Just ask, and I'll help you get in touch with him.",
        "My boss is Aravinthan, a full stack developer from Coimbatore who likes making complex software feel simple.",
    ],
    about: [
        "My boss has over two years of experience building web apps and industrial IoT platforms.",
        "Clean code and thoughtful design are kind of my boss's thing.",
        "My boss builds secure APIs and real-time dashboards. Pretty neat, huh?",
        `Here's the big idea: ${summary.split(".")[0]}.`,
    ],
    skills: [
        "How's my boss's skill set? Pretty stacked, right?",
        ...skills.map((skill, index) => `${skillOpeners[index % skillOpeners.length]} ${skill}.`),
    ],
    experience: [
        `My boss is a ${experience.role} at ${experience.company} in ${experience.location}.`,
        "He has been there since July 2024, building software that helps real teams.",
        ...experience.points.map((point) => point.split(/[.!?]/)[0].trim() + "."),
    ],
    projects: [
        "My boss built EMS Cloud to bring industrial monitoring and day-to-day operations together in one place.",
        "It gives teams live dashboards, useful analytics, and a clearer view of what's happening on the factory floor.",
        "My boss developed the platform with React, Next.js, Node.js, Express, GraphQL, MongoDB, and MQTT.",
        "MQTT brings in live device updates, and careful database tuning helps the dashboards stay responsive.",
        "My boss built the energy management tools with KPI dashboards, trend analytics, and exports for plant teams.",
        "For environmental monitoring, He added live pressure and temperature tracking with reports for audits and compliance.",
        "He also built oil-flow and production monitoring, with alerts and visual reports to help teams respond faster.",
        "And for inventory, my boss created a dashboard to track tools, stock levels, device activity, and item movements.",
        `The larger platform is called ${projects[0].name}.`,
        `One part of it focuses on ${projects[1].name}.`,
        `Another part handles ${projects[2].name}.`,
        `There's also a module for ${projects[3].name}.`,
        `And the team can manage tools and stock with ${projects[4].name}.`,
    ],
    achievements: [
        "MQTT streaming and smarter data handling reduced live dashboard latency by up to forty percent.",
        "Secure GraphQL and REST modules run on AWS with Docker and CI/CD.",
        "Reusable React and TypeScript components make the experience more consistent and responsive.",
        "Website optimization raised the Lighthouse score from 59 to over 90.",
        "MongoDB indexing and aggregation improvements help handle real-time IoT data efficiently.",
    ],
    education: [
        `My boss studied ${education.degree.split("|")[0].trim()} at ${education.institute}.`,
        `He completed his degree ${education.degree.split("|")[1]?.trim() ?? ""}.`,
    ],
    certificates: [
        `My boss earned the ${certification.name} from ${certification.provider}.`,
        `That's one of the milestones in ${certification.provider}'s course.`,
    ],
};
const TOUCH_LINES: Record<string, string[]> = {
    top: ["Boop! Want to hear more about my boss?", "Hey, curious about my boss's portfolio?"],
    about: ["Hey, I'm telling you about my boss!", "Boop! Want to know more about my boss?"],
    skills: ["Hey, we're talking about my boss's skills!", "Boop! Want to hear about another skill?"],
    experience: ["Hey, I'm in the middle of my boss's work story!", "Boop! Want another work highlight?"],
    projects: ["Hey, I'm telling you about my boss's projects!", "Boop! Want to hear what else my boss built?"],
    achievements: ["Hey, we're talking about my boss's results!", "Boop! Want to hear another achievement?"],
    education: ["Hey, I'm telling you about my boss's education!", "Boop! Want another detail about my boss's studies?"],
    certificates: ["Hey, we're talking about my boss's certificates!", "Boop! Want to hear about another course?"],
};

export default function GoofyBuddy() {
    const buddyRef = useRef<HTMLButtonElement>(null);
    const dragRef = useRef<DragState | null>(null);
    const didDragRef = useRef(false);
    const suppressClickRef = useRef(false);
    const isPlacedRef = useRef(false);
    const angryTimer = useRef<number | null>(null);
    const speechTimer = useRef<number | null>(null);
    const greetingTimer = useRef<number | null>(null);
    const permissionTimer = useRef<number | null>(null);
    const spokenLines = useRef(new Set<string>());
    const pendingLines = useRef(new Set<string>());
    const pendingSectionSpeech = useRef<string | null>(null);
    const sectionLines = useRef<Record<string, string[]>>({
        ...SECTION_LINES,
        top: [...SECTION_LINES.top],
    });
    const speakRef = useRef<(line: string) => boolean>(() => false);
    const voiceReady = useRef(false);
    const activeSection = useRef<string | null>(null);
    const sectionVisits = useRef<Record<string, number>>({});
    const sectionLineIndexes = useRef<Record<string, number>>({});
    const greetingSpoken = useRef(false);
    const greetingGestureOnBuddy = useRef(false);
    const [position, setPosition] = useState<Position>({ x: EDGE_GAP, y: EDGE_GAP });
    const [isAngry, setIsAngry] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isPlaced, setIsPlaced] = useState(false);
    const [speech, setSpeech] = useState("Hello! My name's A-One, your assistant!");
    const [isMuted, setIsMuted] = useState(false);
    const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
    const isMutedRef = useRef(false);
    const positionRef = useRef(position);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    const speak = useCallback((line: string, force = false) => {
        if (!("speechSynthesis" in window) || ((spokenLines.current.has(line) || pendingLines.current.has(line)) && !force)) return false;
        if (isMutedRef.current && !force) return false;
        pendingLines.current.add(line);

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(line);
        const voices = window.speechSynthesis.getVoices();
        const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
        const feminineVoicePattern = /female|samantha|victoria|zira|jenny|aria|ava|susan|karen|moira|tessa|serena|salli|joanna|natasha|linda|hazel|google us english/i;
        const naturalVoicePattern = /natural|neural|premium|enhanced/i;
        const preferredVoice = englishVoices.find((voice) => feminineVoicePattern.test(voice.name) && naturalVoicePattern.test(voice.name))
            ?? englishVoices.find((voice) => feminineVoicePattern.test(voice.name))
            ?? englishVoices.find((voice) => naturalVoicePattern.test(voice.name));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            utterance.lang = preferredVoice.lang;
        } else {
            utterance.lang = "en-US";
        }
        utterance.rate = 0.9;
        utterance.pitch = 1.08;
        utterance.volume = 1;
        utterance.onstart = () => {
            pendingLines.current.delete(line);
            spokenLines.current.add(line);
            voiceReady.current = true;
            if (line === GREETING) greetingSpoken.current = true;
        };
        utterance.onend = () => {
            if (line === GREETING && pendingSectionSpeech.current) {
                const nextLine = pendingSectionSpeech.current;
                pendingSectionSpeech.current = null;
                speakRef.current(nextLine);
            }
        };
        utterance.onerror = () => pendingLines.current.delete(line);
        window.speechSynthesis.speak(utterance);
        return true;
    }, []);

    useEffect(() => {
        speakRef.current = (line) => speak(line);
    }, [speak]);

    const announce = useCallback((line: string) => {
        setSpeech(line);
        if (!voiceReady.current && line !== GREETING) {
            pendingSectionSpeech.current = line;
            return true;
        }
        return speak(line);
    }, [speak]);

    const schedulePermissionRequest = useCallback(() => {
        if (permissionTimer.current) window.clearTimeout(permissionTimer.current);
        permissionTimer.current = window.setTimeout(() => {
            const question = "Can I speak now?";
            setSpeech(question);
            setShowPermissionPrompt(true);
            speak(question, true);
        }, 60 * 1000);
    }, [speak]);

    const getMad = useCallback((line: string) => {
        setIsAngry(true);
        announce(line);
        if (angryTimer.current) window.clearTimeout(angryTimer.current);
        angryTimer.current = window.setTimeout(() => setIsAngry(false), 1100);
    }, [announce]);

    useEffect(() => {
        greetingTimer.current = window.setTimeout(() => {
            announce(GREETING);
        }, 350);

        const greetOnFirstInteraction = (event: Event) => {
            if (greetingSpoken.current) return;
            pendingLines.current.delete(GREETING);
            const target = event.target;
            if (target instanceof Element && target.closest(".buddy-anchor")) {
                greetingGestureOnBuddy.current = true;
            }
            announce(GREETING);
        };
        window.addEventListener("pointerdown", greetOnFirstInteraction, { once: true, capture: true });
        window.addEventListener("keydown", greetOnFirstInteraction, { once: true, capture: true });

        const sectionIds = Object.keys(SECTION_LINES);
        sectionLines.current.top.sort(() => Math.random() - 0.5);

        const enterSection = (id: string | null) => {
            if (activeSection.current === id) return;
            pendingSectionSpeech.current = null;
            activeSection.current = id;
            if (!id) return;

            const visit = (sectionVisits.current[id] ?? 0) + 1;
            sectionVisits.current[id] = visit;
            const lines = sectionLines.current[id] ?? [];
            const lineIndex = sectionLineIndexes.current[id] ?? 0;

            if (visit === 1) {
                announce(SECTION_OPENERS[id]);
            } else if (lineIndex < lines.length) {
                sectionLineIndexes.current[id] = lineIndex + 1;
                announce(`You're back in ${SECTION_TOPICS[id]}; let me continue. ${lines[lineIndex]}`);
            } else {
                announce(`You're back in ${SECTION_TOPICS[id]}! I've shared all my favorite details for now.`);
            }
        };

        const updateSectionAtCursor = (x: number, y: number) => {
            const elementUnderCursor = document.elementFromPoint(x, y);
            if (elementUnderCursor?.closest(".buddy-anchor")) return;

            const sectionUnderCursor = sectionIds
                .flatMap((id) => {
                    const element = document.getElementById(id);
                    if (!element) return [];
                    const bounds = element.getBoundingClientRect();
                    if (x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom) return [];
                    return [{ id, area: bounds.width * bounds.height }];
                })
                .sort((a, b) => a.area - b.area)[0]?.id ?? null;

            enterSection(sectionUnderCursor);
        };
        let cursorPosition: { x: number; y: number } | null = null;
        const handleCursorMove = (event: PointerEvent) => {
            cursorPosition = { x: event.clientX, y: event.clientY };
            updateSectionAtCursor(event.clientX, event.clientY);
        };
        const handleScroll = () => {
            if (cursorPosition) updateSectionAtCursor(cursorPosition.x, cursorPosition.y);
        };
        window.addEventListener("pointermove", handleCursorMove, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });

        const choosePosition = (): Position => ({
            x: EDGE_GAP + Math.random() * Math.max(0, window.innerWidth - BUDDY_WIDTH - EDGE_GAP * 2),
            y: EDGE_GAP + Math.random() * Math.max(0, window.innerHeight - BUDDY_HEIGHT - EDGE_GAP * 2),
        });

        const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const wander = window.setInterval(() => {
            if (!motionPreference.matches && !isPlacedRef.current) setPosition(choosePosition());
        }, 2500);

        speechTimer.current = window.setInterval(() => {
            const id = activeSection.current;
            if (!id || !voiceReady.current || window.speechSynthesis.speaking || pendingSectionSpeech.current) return;
            const lines = sectionLines.current[id] ?? [];
            const lineIndex = sectionLineIndexes.current[id] ?? 0;
            if (lineIndex >= lines.length) return;

            const line = lines[lineIndex];
            sectionLineIndexes.current[id] = lineIndex + 1;
            announce(line);
        }, 7000);

        const keepInsideViewport = () => {
            setPosition((current) => current && ({
                x: Math.min(current.x, Math.max(EDGE_GAP, window.innerWidth - BUDDY_WIDTH - EDGE_GAP)),
                y: Math.min(current.y, Math.max(EDGE_GAP, window.innerHeight - BUDDY_HEIGHT - EDGE_GAP)),
            }));
        };

        window.addEventListener("resize", keepInsideViewport);
        return () => {
            window.clearInterval(wander);
            if (speechTimer.current) window.clearInterval(speechTimer.current);
            if (greetingTimer.current) window.clearTimeout(greetingTimer.current);
            if (permissionTimer.current) window.clearTimeout(permissionTimer.current);
            window.removeEventListener("pointermove", handleCursorMove);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("pointerdown", greetOnFirstInteraction, true);
            window.removeEventListener("keydown", greetOnFirstInteraction, true);
            window.removeEventListener("resize", keepInsideViewport);
            if (angryTimer.current) window.clearTimeout(angryTimer.current);
            window.speechSynthesis.cancel();
        };
    }, [announce, speak]);

    const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        didDragRef.current = false;
        dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: positionRef.current.x,
            originY: positionRef.current.y,
        };
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - drag.startX;
        const deltaY = event.clientY - drag.startY;
        if (!didDragRef.current && Math.hypot(deltaX, deltaY) < 5) return;

        didDragRef.current = true;
        setIsDragging(true);
        setPosition({
            x: Math.max(EDGE_GAP, Math.min(window.innerWidth - BUDDY_WIDTH - EDGE_GAP, drag.originX + deltaX)),
            y: Math.max(EDGE_GAP, Math.min(window.innerHeight - BUDDY_HEIGHT - EDGE_GAP, drag.originY + deltaY)),
        });
    };

    const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
        if (dragRef.current?.pointerId !== event.pointerId) return;
        dragRef.current = null;
        setIsDragging(false);
        if (didDragRef.current) {
            isPlacedRef.current = true;
            setIsPlaced(true);
            suppressClickRef.current = true;
            didDragRef.current = false;
        }
    };

    const handleClick = () => {
        if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
        }
        if (greetingGestureOnBuddy.current) {
            greetingGestureOnBuddy.current = false;
            return;
        }
        const lines = TOUCH_LINES[activeSection.current ?? "top"] ?? TOUCH_LINES.top;
        const availableLines = lines.filter((line) => !spokenLines.current.has(line));
        const line = availableLines[Math.floor(Math.random() * availableLines.length)];
        if (line) getMad(line);
    };

    const handleMute = () => {
        window.speechSynthesis.cancel();
        pendingLines.current.clear();
        isMutedRef.current = true;
        setIsMuted(true);
        setShowPermissionPrompt(false);
        setSpeech("Okay, I'll be quiet for one minute.");
        schedulePermissionRequest();
    };

    const handleTalk = () => {
        if (permissionTimer.current) window.clearTimeout(permissionTimer.current);
        isMutedRef.current = false;
        setIsMuted(false);
        setShowPermissionPrompt(false);
        window.speechSynthesis.resume();

        if (!greetingSpoken.current) {
            if (window.speechSynthesis.speaking && pendingLines.current.has(GREETING)) return;
            pendingLines.current.delete(GREETING);
            announce(GREETING);
            return;
        }

        if (window.speechSynthesis.speaking) return;
        if (pendingSectionSpeech.current) {
            const nextLine = pendingSectionSpeech.current;
            pendingSectionSpeech.current = null;
            announce(nextLine);
            return;
        }

        const id = activeSection.current;
        const lines = id ? sectionLines.current[id] ?? [] : [];
        const lineIndex = id ? sectionLineIndexes.current[id] ?? 0 : 0;
        if (lineIndex < lines.length) {
            if (id) sectionLineIndexes.current[id] = lineIndex + 1;
            announce(lines[lineIndex]);
        }
    };

    const handlePermissionResponse = (allowSpeech: boolean) => {
        if (permissionTimer.current) window.clearTimeout(permissionTimer.current);
        setShowPermissionPrompt(false);

        if (allowSpeech) {
            isMutedRef.current = false;
            setIsMuted(false);
            announce("Yay, thanks! I'll keep showing you around.");
            return;
        }

        window.speechSynthesis.cancel();
        setSpeech("No problem. I'll stay quiet.");
        schedulePermissionRequest();
    };

    return (
        <div
            className={`buddy-anchor${isDragging ? " is-dragging" : ""}${isPlaced ? " is-placed" : ""}`}
            style={{ left: position.x, top: position.y }}
        >
            <button
                ref={buddyRef}
                type="button"
                className={`goofy-buddy${isAngry ? " is-angry" : ""}${isDragging ? " is-dragging" : ""}${isPlaced ? " is-placed" : ""}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onClick={handleClick}
                aria-label={isAngry ? "A-One says: don't touch me" : "A-One, your floating portfolio assistant; drag or tap me"}
                title={isPlaced ? "I live here now." : "Drag me somewhere, or give me a boop."}
            >
                <span className="buddy-speech" aria-live="polite">{speech}</span>
                <svg className="buddy-face" viewBox="0 0 120 132" aria-hidden="true">
                    <defs>
                        <radialGradient id="ghost-body-gradient" cx="34%" cy="24%" r="78%">
                            <stop offset="0" stopColor="#fff" stopOpacity=".98" />
                            <stop offset=".58" stopColor="#e9f4f6" stopOpacity=".91" />
                            <stop offset="1" stopColor="#b8d2dc" stopOpacity=".82" />
                        </radialGradient>
                        <linearGradient id="ghost-smoke-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#dce9ec" stopOpacity=".55" />
                            <stop offset="1" stopColor="#9fbac3" stopOpacity="0" />
                        </linearGradient>
                        <filter id="ghost-shadow" x="-35%" y="-25%" width="170%" height="165%">
                            <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#66828d" floodOpacity=".2" />
                        </filter>
                    </defs>
                    <ellipse className="ghost-smoke ghost-smoke-left" cx="34" cy="116" rx="29" ry="9" fill="url(#ghost-smoke-gradient)" />
                    <ellipse className="ghost-smoke ghost-smoke-right" cx="83" cy="119" rx="26" ry="8" fill="url(#ghost-smoke-gradient)" />
                    <path className="ghost-body" d="M60 10C35 10 22 30 22 56v44c0 8 7 11 13 6l9-8 10 9c4 4 9 4 13 0l10-9 9 8c6 5 13 2 13-6V56c0-26-14-46-39-46Z" fill="url(#ghost-body-gradient)" stroke="#aec8d0" strokeOpacity=".76" strokeWidth="2" filter="url(#ghost-shadow)" />
                    <path className="ghost-shine" d="M35 37c4-11 11-16 20-18" fill="none" stroke="#fff" strokeLinecap="round" strokeOpacity=".9" strokeWidth="4" />
                    <path className="buddy-brow buddy-brow-left" d="M36 48l15 4" />
                    <path className="buddy-brow buddy-brow-right" d="M69 52l15-4" />
                    <ellipse className="buddy-eye" cx="45" cy="60" rx="4.5" ry="6.5" />
                    <ellipse className="buddy-eye" cx="76" cy="60" rx="4.5" ry="6.5" />
                    <path className="buddy-mouth-happy" d="M49 76q11 12 22 0" />
                    <path className="buddy-mouth-angry" d="M48 81q12-13 24 0" />
                    <circle className="buddy-cheek" cx="33" cy="70" r="4" />
                    <circle className="buddy-cheek" cx="88" cy="70" r="4" />
                </svg>
                <span className="buddy-sparkle" aria-hidden="true">✦</span>
            </button>
            <div
                className="buddy-controls"
                aria-label="A-One speech controls"
            >
                <button type="button" onClick={handleTalk}>Want me to talk?</button>
                {showPermissionPrompt ? (
                    <>
                        <button type="button" onClick={() => handlePermissionResponse(true)}>Yes</button>
                        <button type="button" onClick={() => handlePermissionResponse(false)}>No</button>
                    </>
                ) : !isMuted ? (
                    <button type="button" onClick={handleMute}>Shut up</button>
                ) : null}
            </div>
        </div>
    );
}