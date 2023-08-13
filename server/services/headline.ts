export const getHeadline = async () => {
  try {
    const response = await fetch('http://metaphorpsum.com/sentences/1');
    if (!response.ok) {
      throw new Error('Error getting sentence');
    }
    const headline = await response.text();
    return headline;
  } catch (e) {
    console.error(e);
    return null;
  }
}