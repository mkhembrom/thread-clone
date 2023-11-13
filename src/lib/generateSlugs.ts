export const formatSlugByUsername = (name: string) => {
  // Remove leading and trailing spaces and convert to lowercase
  const formattedName = name.trim().toLowerCase();

  // Split the name by space to separate first and last name
  const nameParts = formattedName.split(" ");

  // Check if there are both first and last name parts
  if (nameParts.length === 2) {
    const [firstName, lastName] = nameParts;
    return `${firstName}${lastName}`;
  } else if (nameParts.length === 1) {
    // If there's only one part (first name), return it as "@firstname"
    const firstName = nameParts[0];
    return `${firstName}`;
  } else {
    // If the input is empty or doesn't follow the expected format, return an empty string or handle the error as needed
    return "";
  }
};
