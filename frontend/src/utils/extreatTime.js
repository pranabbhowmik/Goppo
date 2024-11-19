export function extractTime(dateString) {
  const date = new Date(dateString);

  // Use toLocaleTimeString to get time in the local timezone
  const options = { hour: "2-digit", minute: "2-digit", hour12: true }; // For 12-hour format, set hour12 to true
  return date.toLocaleTimeString("en-IN", options); // Adjust for IST using locale
}
