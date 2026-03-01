// data/DateManifestos.ts

export type DateLocation = {
  id: string;
  name: string;
  fact: string;
  icon: string;
  color: string;
};

export const DATE_MANIFESTOS: DateLocation[] = [
  {
    id: '1', // Matches "The Green Mill" ID
    name: 'The Green Mill',
    fact: "Al Capone's favorite booth still sits here. Tunnels under the floor allowed jazz musicians and bootleggers to vanish if the Loop police arrived.",
    icon: '🎷',
    color: '#D94133'
  },
  {
    id: '2', // Matches "Architecture Tour" ID
    name: 'Riverwalk',
    fact: "This is where the Fort Dearborn massacre happened. What a great fact to learn for date small talk.",
    icon: '🚤',
    color: '#2C3E50'
  },
  {
    id: '3', // Matches "Conservatory" ID
    name: 'Garfield Conservatory',
    fact: "Opened in 1908, it was designed by Jens Jensen as 'landscape art under glass.' The Fern Room shows what Illinois looked like millions of years ago.",
    icon: '🌿',
    color: '#2D5A27'
  },
  {
    id: 'butler-field',
    name: 'Butler Field',
    fact: "This is where the historic No Kings Protest speech addresses happened. NOTE: The fields were spotless, afterwards. One step closer to socialist utopia.",
    icon: '🌳',
    color: '#2D5A27'
  },
  {
    id: 'buckingham',
    name: 'Buckingham Fountain',
    fact: "Did you know this fountain exists because some spoiled rich girl saw a fountain in France and said 'daddy daddy daddy get me one for chicaaaagoooooo.'",
    icon: '⛲',
    color: '#D94133'
  }
];