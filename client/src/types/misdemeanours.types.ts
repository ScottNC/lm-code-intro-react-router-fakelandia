export const MISDEMEANOURS = [
	'rudeness',
	'vegetables',
	'lift',
	'united',
] as const;
export type MisdemeanourKind = (typeof MISDEMEANOURS)[number];

export const JUST_TALK = 'just-talk';
export type JustTalk = typeof JUST_TALK;

export type Misdemeanour = {
	citizenId: number;
	misdemeanour: MisdemeanourKind;
	date: string; // we'll stringify this for easy sending via HTTP rather than storing the full Date object
	options: undefined | {subject: string, details: string};
};

export const misdemeanourDisplay : {[key in typeof MISDEMEANOURS[number]] : string} = {
  rudeness: 'Mild Public Rudeness 🤪',
  lift: 'Speaking in a Lift 🗣',
  vegetables: 'Not Eating Your Vegetables 🥗',
  united: 'Supporting Manchester United 😈'
}
