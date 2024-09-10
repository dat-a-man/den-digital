const TruncateText = ({ text, wordLimit = 25 }) => {
  const words = text?.split(" ") || [];
  const screenSize = window.innerWidth;
  if (screenSize < 768) {
    wordLimit = 15;
  }
  const shouldTruncate = words.length > wordLimit;

  const truncatedText = shouldTruncate
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;

  return (
    <p className="text-sm text-gray-600 dark:text-gray-400">{truncatedText}</p>
  );
};

export default TruncateText;
