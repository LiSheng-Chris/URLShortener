const urlLength: number = 5;
const urlCharacters: string =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";

export const generateUrl = () => {
  let short: string = "";
  while (short.length < urlLength) {
    const len: number = urlCharacters.length;
    const randomCharacter: string = urlCharacters.charAt(
      Math.round(Math.random() * len)
    );
    short += randomCharacter;
  }
  return short;
};
