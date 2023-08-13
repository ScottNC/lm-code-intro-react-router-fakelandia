import { News } from "../types/misdemeanours.types";

export const getHeadline = async () => {
  const headline = await getText('http://metaphorpsum.com/sentences/1')

  const report = await getText('http://metaphorpsum.com/paragraphs/4/7');

  const news: News = {headline, report};

  return news;
}

const getText = async(url: string) => {
  try {
    const response = await fetch(url);
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