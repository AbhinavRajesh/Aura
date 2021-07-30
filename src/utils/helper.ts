export const getEmoji = (
  mood?: number
): { emoji: string; moodText: string; mood: number } => {
  if (typeof mood === "undefined") mood = -1;
  switch (mood) {
    case 0:
      return {
        emoji: "🙁",
        moodText: "You said you had a rough day",
        mood: 0,
      };
    case 1:
      return {
        emoji: "😐",
        moodText: "You said you had an okayish day",
        mood: 1,
      };
    case 2:
      return { emoji: "🙂", moodText: "You said it was a good day", mood: 2 };
    case 3:
      return {
        emoji: "😄",
        moodText: "You said you had an awesome day",
        mood: 3,
      };
    case 4:
      return {
        emoji: "🤗",
        moodText: "You said you had a great day!",
        mood: 4,
      };
    default:
      return {
        emoji: "🤔",
        moodText: "You didn't add any data for this day :(",
        mood: -1,
      };
  }
};
