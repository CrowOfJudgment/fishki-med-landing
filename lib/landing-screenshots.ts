// Genuine user-supplied English app captures, shared by both landing locales.
export const SCREENSHOT_WIDTH = 1260;
export const SCREENSHOT_HEIGHT = 2736;

export const LANDING_SCREENSHOTS = {
  dailyStudy: [
    {
      src: "/images/app-screenshots/landing/daily-study.png",
      view: "dailyStudy",
    },
  ],
  editor: [
    {
      src: "/images/app-screenshots/landing/flashcard-editor.png",
      view: "editor",
    },
  ],
  cloze: [
    {
      src: "/images/app-screenshots/landing/cloze-question.png",
      view: "question",
    },
    { src: "/images/app-screenshots/landing/cloze-answer.png", view: "answer" },
  ],
  examPlanner: [
    {
      src: "/images/app-screenshots/landing/exam-calendar.png",
      view: "calendar",
    },
    {
      src: "/images/app-screenshots/landing/exam-details.png",
      view: "examDetails",
    },
  ],
  smartReview: [
    {
      src: "/images/app-screenshots/landing/smart-review-question.png",
      view: "question",
    },
    {
      src: "/images/app-screenshots/landing/smart-review-answer.png",
      view: "answer",
    },
    {
      src: "/images/app-screenshots/landing/smart-review-again.png",
      view: "again",
    },
    {
      src: "/images/app-screenshots/landing/smart-review-hard.png",
      view: "hard",
    },
    {
      src: "/images/app-screenshots/landing/smart-review-good.png",
      view: "good",
    },
    {
      src: "/images/app-screenshots/landing/smart-review-easy.png",
      view: "easy",
    },
  ],
} as const;

export const EXAM_PLANNING_SCREENSHOT = LANDING_SCREENSHOTS.examPlanner[1].src;
