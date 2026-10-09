let questionsRepondues = 0;
let dernierNiveau = null;
let serieActuelle = 0;
let indiceUtilise = false;
let score = 0;
let meilleureSerieDeLaPartie = 0
let expertCorrectesPartie = 0
  // Banque de questions organisée par niveau de difficulté.
// Chaque question a maintenant un champ 'niveau' : facile, moyen, difficile ou expert.
const QUESTIONS = [
  { q: "Quelle est la capitale de la France ?", choix: ["Lyon", "Paris", "Marseille", "Nice"], bonne: 1, niveau: "facile" },
  { q: "Qui a peint la Joconde ?", choix: ["Michel-Ange", "Léonard de Vinci", "Raphaël", "Donatello"], bonne: 1, niveau: "facile" },
  { q: "Quel est le plus grand océan du monde ?", choix: ["Atlantique", "Indien", "Pacifique", "Arctique"], bonne: 2, niveau: "facile" },
  { q: "En quelle année a commencé la Révolution française ?", choix: ["1789", "1799", "1804", "1815"], bonne: 0, niveau: "moyen" },
  { q: "Quel est le symbole chimique de l'or ?", choix: ["Ag", "Au", "Or", "Go"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la capitale de l'Australie ?", choix: ["Sydney", "Melbourne", "Canberra", "Perth"], bonne: 2, niveau: "moyen" },
  { q: "Qui a écrit 'Les Misérables' ?", choix: ["Émile Zola", "Victor Hugo", "Honoré de Balzac", "Gustave Flaubert"], bonne: 1, niveau: "facile" },
  { q: "Quel est le plus long fleuve du monde ?", choix: ["Le Nil", "L'Amazone", "Le Yangzi", "Le Mississippi"], bonne: 0, niveau: "facile" },
  { q: "Combien d'os compte le corps humain adulte ?", choix: ["186", "206", "226", "246"], bonne: 1, niveau: "moyen" },
  { q: "Quelle planète est surnommée la 'planète rouge' ?", choix: ["Vénus", "Jupiter", "Mars", "Saturne"], bonne: 2, niveau: "facile" },
  { q: "Quel pays a inventé le papier ?", choix: ["L'Égypte", "La Grèce", "La Chine", "L'Inde"], bonne: 2, niveau: "moyen" },
  { q: "En quelle année a eu lieu la chute du mur de Berlin ?", choix: ["1987", "1991", "1989", "1993"], bonne: 2, niveau: "moyen" },
  { q: "Qui a composé 'La Flûte enchantée' ?", choix: ["Beethoven", "Mozart", "Bach", "Chopin"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la monnaie du Japon ?", choix: ["Le won", "Le yuan", "Le yen", "Le ringgit"], bonne: 2, niveau: "facile" },
  { q: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?", choix: ["1965", "1969", "1972", "1959"], bonne: 1, niveau: "facile" },
  { q: "Quel est le plus grand désert chaud du monde ?", choix: ["Le Kalahari", "Le Gobi", "Le Sahara", "Le désert d'Arabie"], bonne: 2, niveau: "facile" },
  { q: "Quel est le plus haut sommet du monde ?", choix: ["Le K2", "L'Everest", "Le Kilimandjaro", "Le Mont Blanc"], bonne: 1, niveau: "facile" },
  { q: "Qui a formulé la théorie de la relativité ?", choix: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galilée"], bonne: 1, niveau: "facile" },
  { q: "Quel pays a la plus grande superficie au monde ?", choix: ["Canada", "Chine", "États-Unis", "Russie"], bonne: 3, niveau: "moyen" },
  { q: "Quelle est la langue la plus parlée au monde (locuteurs natifs) ?", choix: ["Anglais", "Espagnol", "Mandarin", "Hindi"], bonne: 2, niveau: "moyen" },
  { q: "Qui a peint 'Guernica' ?", choix: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Francisco Goya"], bonne: 1, niveau: "moyen" },
  { q: "Combien de joueurs compte une équipe de football sur le terrain ?", choix: ["9", "10", "11", "12"], bonne: 2, niveau: "facile" },
  { q: "Quel organe humain filtre le sang ?", choix: ["Le foie", "Le rein", "Le pancréas", "La rate"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la plus petite planète du système solaire ?", choix: ["Mars", "Vénus", "Mercure", "Pluton"], bonne: 2, niveau: "moyen" },
  { q: "Qui a écrit 'Roméo et Juliette' ?", choix: ["Molière", "William Shakespeare", "Corneille", "Racine"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale du Canada ?", choix: ["Toronto", "Vancouver", "Ottawa", "Montréal"], bonne: 2, niveau: "moyen" },
  { q: "Quel gaz les plantes absorbent-elles pour la photosynthèse ?", choix: ["Oxygène", "Azote", "Dioxyde de carbone", "Hydrogène"], bonne: 2, niveau: "facile" },
  { q: "Quel est le plus grand pays d'Afrique par superficie ?", choix: ["Algérie", "République démocratique du Congo", "Soudan", "Libye"], bonne: 0, niveau: "difficile" },
  { q: "Qui a inventé l'ampoule électrique ?", choix: ["Nikola Tesla", "Thomas Edison", "Alexander Graham Bell", "James Watt"], bonne: 1, niveau: "facile" },
  { q: "Quel est le sport national du Japon ?", choix: ["Le judo", "Le karaté", "Le sumo", "Le kendo"], bonne: 2, niveau: "moyen" },
  { q: "Quelle mer borde l'Égypte au nord ?", choix: ["Mer Rouge", "Mer Méditerranée", "Mer Noire", "Mer Caspienne"], bonne: 1, niveau: "moyen" },
  { q: "Combien de continents y a-t-il sur Terre ?", choix: ["5", "6", "7", "8"], bonne: 2, niveau: "facile" },
  { q: "Qui a écrit 'Le Petit Prince' ?", choix: ["Antoine de Saint-Exupéry", "Jules Verne", "Albert Camus", "Marcel Proust"], bonne: 0, niveau: "facile" },
  { q: "Quel métal est liquide à température ambiante ?", choix: ["Le plomb", "Le mercure", "L'étain", "Le zinc"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la capitale de l'Égypte ?", choix: ["Alexandrie", "Le Caire", "Gizeh", "Louxor"], bonne: 1, niveau: "facile" },
  { q: "Quel instrument mesure la température ?", choix: ["Le baromètre", "L'hygromètre", "Le thermomètre", "L'anémomètre"], bonne: 2, niveau: "facile" },
  { q: "Qui a peint le plafond de la chapelle Sixtine ?", choix: ["Léonard de Vinci", "Raphaël", "Michel-Ange", "Le Titien"], bonne: 2, niveau: "moyen" },
  { q: "Quel pays compte le plus d'habitants au monde en 2026 ?", choix: ["Chine", "Inde", "États-Unis", "Indonésie"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la vitesse de la lumière (arrondie) ?", choix: ["300 000 km/s", "150 000 km/s", "3 000 km/s", "1 000 000 km/s"], bonne: 0, niveau: "moyen" },
  { q: "Quel est le plus grand mammifère du monde ?", choix: ["L'éléphant d'Afrique", "La baleine bleue", "Le rhinocéros", "La girafe"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de l'Espagne ?", choix: ["Barcelone", "Madrid", "Séville", "Valence"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de l'Italie ?", choix: ["Milan", "Naples", "Rome", "Turin"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la capitale de l'Allemagne ?", choix: ["Munich", "Hambourg", "Francfort", "Berlin"], bonne: 3, niveau: "facile" },
  { q: "Quelle est la capitale du Portugal ?", choix: ["Porto", "Lisbonne", "Faro", "Coimbra"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de la Belgique ?", choix: ["Anvers", "Gand", "Bruxelles", "Liège"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la capitale de la Suisse ?", choix: ["Genève", "Zurich", "Berne", "Lausanne"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Grèce ?", choix: ["Athènes", "Thessalonique", "Sparte", "Corinthe"], bonne: 0, niveau: "facile" },
  { q: "Quelle est la capitale de la Russie ?", choix: ["Saint-Pétersbourg", "Moscou", "Kiev", "Minsk"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale du Brésil ?", choix: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Argentine ?", choix: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"], bonne: 0, niveau: "facile" },
  { q: "Quelle est la capitale du Mexique ?", choix: ["Guadalajara", "Mexico", "Cancún", "Monterrey"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale du Maroc ?", choix: ["Casablanca", "Marrakech", "Rabat", "Fès"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Algérie ?", choix: ["Oran", "Alger", "Constantine", "Annaba"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de la Tunisie ?", choix: ["Sfax", "Sousse", "Tunis", "Bizerte"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la capitale du Sénégal ?", choix: ["Thiès", "Dakar", "Saint-Louis", "Touba"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de la Côte d'Ivoire ?", choix: ["Abidjan", "Yamoussoukro", "Bouaké", "Korhogo"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Nigeria ?", choix: ["Lagos", "Abuja", "Kano", "Ibadan"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de la Chine ?", choix: ["Shanghai", "Pékin", "Hong Kong", "Canton"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de l'Inde ?", choix: ["Mumbai", "Bangalore", "New Delhi", "Calcutta"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la capitale du Royaume-Uni ?", choix: ["Manchester", "Liverpool", "Londres", "Birmingham"], bonne: 2, niveau: "facile" },
  { q: "Qui a écrit 'Notre-Dame de Paris' ?", choix: ["Victor Hugo", "Alexandre Dumas", "Émile Zola", "Guy de Maupassant"], bonne: 0, niveau: "facile" },
  { q: "Qui a écrit 'Germinal' ?", choix: ["Victor Hugo", "Émile Zola", "Gustave Flaubert", "Stendhal"], bonne: 1, niveau: "moyen" },
  { q: "Qui a écrit 'Madame Bovary' ?", choix: ["Gustave Flaubert", "Émile Zola", "Honoré de Balzac", "Victor Hugo"], bonne: 0, niveau: "moyen" },
  { q: "Qui a écrit 'Le Comte de Monte-Cristo' ?", choix: ["Victor Hugo", "Alexandre Dumas", "Jules Verne", "Stendhal"], bonne: 1, niveau: "moyen" },
  { q: "Qui a écrit 'Vingt mille lieues sous les mers' ?", choix: ["Jules Verne", "H.G. Wells", "Alexandre Dumas", "Jack London"], bonne: 0, niveau: "facile" },
  { q: "Qui a écrit '1984' ?", choix: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Isaac Asimov"], bonne: 1, niveau: "moyen" },
  { q: "Qui a écrit 'Don Quichotte' ?", choix: ["Miguel de Cervantès", "Federico García Lorca", "Pablo Neruda", "Gabriel García Márquez"], bonne: 0, niveau: "moyen" },
  { q: "Qui a écrit 'Crime et Châtiment' ?", choix: ["Léon Tolstoï", "Fiodor Dostoïevski", "Anton Tchekhov", "Nikolaï Gogol"], bonne: 1, niveau: "difficile" },
  { q: "Qui a écrit 'Guerre et Paix' ?", choix: ["Fiodor Dostoïevski", "Léon Tolstoï", "Ivan Tourgueniev", "Boris Pasternak"], bonne: 1, niveau: "difficile" },
  { q: "Qui a écrit 'L'Odyssée' ?", choix: ["Homère", "Sophocle", "Euripide", "Hésiode"], bonne: 0, niveau: "moyen" },
  { q: "Qui a peint 'Les Tournesols' ?", choix: ["Paul Gauguin", "Vincent van Gogh", "Claude Monet", "Paul Cézanne"], bonne: 1, niveau: "facile" },
  { q: "Qui a peint 'La Persistance de la mémoire' ?", choix: ["Salvador Dalí", "René Magritte", "Joan Miró", "Max Ernst"], bonne: 0, niveau: "moyen" },
  { q: "Qui a peint 'Le Cri' ?", choix: ["Edvard Munch", "Gustav Klimt", "Egon Schiele", "Wassily Kandinsky"], bonne: 0, niveau: "moyen" },
  { q: "Qui a peint 'Les Nymphéas' ?", choix: ["Claude Monet", "Édouard Manet", "Edgar Degas", "Camille Pissarro"], bonne: 0, niveau: "moyen" },
  { q: "Qui a sculpté 'Le Penseur' ?", choix: ["Auguste Rodin", "Camille Claudel", "Antoine Bourdelle", "Aristide Maillol"], bonne: 0, niveau: "moyen" },
  { q: "Quel compositeur est devenu sourd à la fin de sa vie ?", choix: ["Mozart", "Beethoven", "Chopin", "Brahms"], bonne: 1, niveau: "facile" },
  { q: "Quel compositeur a écrit 'Les Quatre Saisons' ?", choix: ["Bach", "Vivaldi", "Haendel", "Haydn"], bonne: 1, niveau: "moyen" },
  { q: "Quel est le pays d'origine du tango ?", choix: ["Espagne", "Brésil", "Argentine", "Cuba"], bonne: 2, niveau: "facile" },
  { q: "Quel est le pays d'origine du reggae ?", choix: ["Jamaïque", "Cuba", "Trinité-et-Tobago", "Haïti"], bonne: 0, niveau: "facile" },
  { q: "Quel est le pays d'origine du flamenco ?", choix: ["Portugal", "Espagne", "Italie", "Maroc"], bonne: 1, niveau: "facile" },
  { q: "En quelle année a débuté la Première Guerre mondiale ?", choix: ["1912", "1914", "1916", "1918"], bonne: 1, niveau: "facile" },
  { q: "En quelle année s'est terminée la Seconde Guerre mondiale ?", choix: ["1943", "1944", "1945", "1946"], bonne: 2, niveau: "facile" },
  { q: "Qui était l'empereur des Français sacré en 1804 ?", choix: ["Louis XVI", "Napoléon Bonaparte", "Charles X", "Louis-Philippe"], bonne: 1, niveau: "moyen" },
  { q: "En quelle année a eu lieu la prise de la Bastille ?", choix: ["1789", "1792", "1799", "1804"], bonne: 0, niveau: "moyen" },
  { q: "Quel traité a mis fin à la Première Guerre mondiale ?", choix: ["Traité de Versailles", "Traité de Rome", "Traité de Vienne", "Traité de Paris"], bonne: 0, niveau: "difficile" },
  { q: "Qui a été le premier président des États-Unis ?", choix: ["Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln"], bonne: 1, niveau: "facile" },
  { q: "Qui a aboli l'esclavage aux États-Unis ?", choix: ["George Washington", "Abraham Lincoln", "Theodore Roosevelt", "Andrew Jackson"], bonne: 1, niveau: "facile" },
  { q: "Quelle civilisation a construit Machu Picchu ?", choix: ["Les Aztèques", "Les Mayas", "Les Incas", "Les Olmèques"], bonne: 2, niveau: "facile" },
  { q: "Quelle civilisation a construit les pyramides de Gizeh ?", choix: ["Les Sumériens", "Les Égyptiens", "Les Babyloniens", "Les Phéniciens"], bonne: 1, niveau: "facile" },
  { q: "Quel mur a séparé Berlin de 1961 à 1989 ?", choix: ["Le mur de Berlin", "Le rideau de fer", "La ligne Maginot", "Le mur d'Hadrien"], bonne: 0, niveau: "facile" },
  { q: "Quel océan sépare l'Europe de l'Amérique ?", choix: ["Pacifique", "Atlantique", "Indien", "Arctique"], bonne: 1, niveau: "facile" },
  { q: "Quel est le plus petit pays du monde ?", choix: ["Monaco", "Saint-Marin", "Le Vatican", "Le Liechtenstein"], bonne: 2, niveau: "moyen" },
  { q: "Quel désert est le plus grand du monde (froid inclus) ?", choix: ["Le Sahara", "L'Antarctique", "Le Gobi", "Le désert d'Arabie"], bonne: 1, niveau: "moyen" },
  { q: "Quelle chaîne de montagnes sépare l'Europe de l'Asie ?", choix: ["Les Alpes", "L'Oural", "Les Carpates", "Le Caucase"], bonne: 1, niveau: "expert" },
  { q: "Quel est le plus grand lac d'eau douce du monde par volume ?", choix: ["Lac Supérieur", "Lac Victoria", "Lac Baïkal", "Lac Tanganyika"], bonne: 2, niveau: "expert" },
  { q: "Quel pays compte le plus de fuseaux horaires ?", choix: ["États-Unis", "Russie", "France", "Chine"], bonne: 2, niveau: "expert" },
  { q: "Quelle est la plus longue rivière de France ?", choix: ["La Seine", "La Loire", "Le Rhône", "La Garonne"], bonne: 1, niveau: "moyen" },
  { q: "Quel pays possède le plus d'îles au monde ?", choix: ["Indonésie", "Philippines", "Suède", "Norvège"], bonne: 2, niveau: "expert" },
  { q: "Quelle mer est la plus salée du monde ?", choix: ["Mer Morte", "Mer Rouge", "Mer Méditerranée", "Mer Noire"], bonne: 0, niveau: "facile" },
  { q: "Quel est le fleuve le plus long d'Amérique du Sud ?", choix: ["Le Paraná", "L'Amazone", "L'Orénoque", "Le São Francisco"], bonne: 1, niveau: "facile" },
  { q: "Combien de dents a un adulte en moyenne (sans dents de sagesse comprises différemment) ?", choix: ["28", "30", "32", "34"], bonne: 2, niveau: "moyen" },
  { q: "Quel est l'organe le plus grand du corps humain ?", choix: ["Le foie", "Le cerveau", "La peau", "Le poumon"], bonne: 2, niveau: "moyen" },
  { q: "Combien de chambres possède le cœur humain ?", choix: ["2", "3", "4", "5"], bonne: 2, niveau: "facile" },
  { q: "Quel gaz les êtres humains expirent-ils principalement ?", choix: ["Oxygène", "Azote", "Dioxyde de carbone", "Hydrogène"], bonne: 2, niveau: "facile" },
  { q: "Quelle vitamine est produite par la peau grâce au soleil ?", choix: ["Vitamine A", "Vitamine C", "Vitamine D", "Vitamine K"], bonne: 2, niveau: "facile" },
  { q: "Quel est le symbole chimique du sodium ?", choix: ["S", "So", "Na", "Sd"], bonne: 2, niveau: "moyen" },
  { q: "Quel est le symbole chimique du potassium ?", choix: ["Po", "K", "Pt", "Pu"], bonne: 1, niveau: "moyen" },
  { q: "Quel est l'élément chimique le plus abondant dans l'univers ?", choix: ["Oxygène", "Hydrogène", "Hélium", "Carbone"], bonne: 1, niveau: "moyen" },
  { q: "Combien de planètes compte le système solaire ?", choix: ["7", "8", "9", "10"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la planète la plus proche du Soleil ?", choix: ["Vénus", "Mercure", "Mars", "Terre"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la plus grande planète du système solaire ?", choix: ["Saturne", "Jupiter", "Uranus", "Neptune"], bonne: 1, niveau: "facile" },
  { q: "Combien de temps dure une année sur Mars (en jours terrestres, arrondi) ?", choix: ["365", "687", "225", "1 000"], bonne: 1, niveau: "expert" },
  { q: "Qui a été le premier homme à marcher sur la Lune ?", choix: ["Buzz Aldrin", "Youri Gagarine", "Neil Armstrong", "John Glenn"], bonne: 2, niveau: "facile" },
  { q: "Quel a été le premier animal envoyé en orbite autour de la Terre ?", choix: ["Un chien", "Un singe", "Un chat", "Une souris"], bonne: 0, niveau: "expert" },
  { q: "Quelle agence spatiale a envoyé le rover Perseverance sur Mars ?", choix: ["ESA", "NASA", "Roscosmos", "CNSA"], bonne: 1, niveau: "facile" },
  { q: "Quel est le sport le plus populaire au monde en nombre de pratiquants ?", choix: ["Basketball", "Football", "Cricket", "Tennis"], bonne: 1, niveau: "facile" },
  { q: "Tous les combien d'années ont lieu les Jeux olympiques d'été ?", choix: ["2 ans", "3 ans", "4 ans", "5 ans"], bonne: 2, niveau: "facile" },
  { q: "Dans quel pays est né le sport du rugby ?", choix: ["France", "Angleterre", "Écosse", "Pays de Galles"], bonne: 1, niveau: "moyen" },
  { q: "Combien de joueurs compte une équipe de basketball sur le terrain ?", choix: ["4", "5", "6", "7"], bonne: 1, niveau: "facile" },
  { q: "Combien de trous compte un parcours de golf standard ?", choix: ["9", "18", "27", "36"], bonne: 1, niveau: "facile" },
  { q: "Quel pays a remporté la première Coupe du monde de football en 1930 ?", choix: ["Brésil", "Argentine", "Uruguay", "Italie"], bonne: 2, niveau: "difficile" },
  { q: "Dans quel sport utilise-t-on un 'volant' ?", choix: ["Tennis de table", "Badminton", "Squash", "Padel"], bonne: 1, niveau: "facile" },
  { q: "Combien de temps dure un match de football (temps réglementaire) ?", choix: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"], bonne: 1, niveau: "facile" },
  { q: "Quel pays organise le tournoi de tennis de Roland-Garros ?", choix: ["Angleterre", "France", "Australie", "États-Unis"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la monnaie utilisée en Suisse ?", choix: ["Euro", "Franc suisse", "Livre", "Couronne"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la monnaie utilisée au Royaume-Uni ?", choix: ["Euro", "Dollar", "Livre sterling", "Franc"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la monnaie utilisée en Inde ?", choix: ["Roupie", "Rupiah", "Dirham", "Riyal"], bonne: 0, niveau: "moyen" },
  { q: "Quelle est la monnaie utilisée en Chine ?", choix: ["Won", "Yen", "Yuan", "Dong"], bonne: 2, niveau: "moyen" },
  { q: "Quelle est la capitale du Myanmar ?", choix: ["Rangoon", "Mandalay", "Bagan", "Naypyidaw"], bonne: 3, niveau: "difficile" },
  { q: "Quelle est la capitale du Cameroun ?", choix: ["Douala", "Garoua", "Bafoussam", "Yaoundé"], bonne: 3, niveau: "difficile" },
  { q: "Qui a écrit 'Cent ans de solitude' ?", choix: ["Mario Vargas Llosa", "Jorge Luis Borges", "Pablo Neruda", "Gabriel García Márquez"], bonne: 3, niveau: "difficile" },
  { q: "Quel pays a remporté la première Coupe du monde de rugby en 1987 ?", choix: ["Australie", "France", "Afrique du Sud", "Nouvelle-Zélande"], bonne: 3, niveau: "difficile" },
  { q: "Quelle est la capitale administrative de la Bolivie ?", choix: ["Sucre", "Cochabamba", "Santa Cruz", "La Paz"], bonne: 3, niveau: "difficile" },
  { q: "Quel traité a mis fin à la guerre de Trente Ans en 1648 ?", choix: ["Traité de Vienne", "Traité de Versailles", "Traité d'Utrecht", "Traité de Westphalie"], bonne: 3, niveau: "difficile" },
  { q: "Lors de quelle bataille Vercingétorix a-t-il été vaincu par César ?", choix: ["Gergovie", "Bibracte", "Zama", "Alésia"], bonne: 3, niveau: "difficile" },
  { q: "Qui a écrit 'Les Fleurs du mal' ?", choix: ["Arthur Rimbaud", "Paul Verlaine", "Stéphane Mallarmé", "Charles Baudelaire"], bonne: 3, niveau: "difficile" },
  { q: "Quelle a été la dernière dynastie impériale de Chine ?", choix: ["Ming", "Tang", "Song", "Qing"], bonne: 3, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Azerbaïdjan ?", choix: ["Erevan", "Tbilissi", "Achgabat", "Bakou"], bonne: 3, niveau: "difficile" },
  { q: "Qui a écrit 'Discours de la méthode' ?", choix: ["Blaise Pascal", "Voltaire", "Spinoza", "René Descartes"], bonne: 3, niveau: "difficile" },
  { q: "Quelle est la capitale de la Mongolie ?", choix: ["Almaty", "Bichkek", "Douchanbé", "Oulan-Bator"], bonne: 3, niveau: "difficile" },
  { q: "Quel roi de France a régné le plus longtemps ?", choix: ["François Ier", "Henri IV", "Louis XV", "Louis XIV"], bonne: 3, niveau: "difficile" },
  { q: "Quelle guerre a opposé la France à la Prusse en 1870-1871 ?", choix: ["Guerre de Sept Ans", "Guerre de Crimée", "Guerre austro-prussienne", "Guerre franco-prussienne"], bonne: 3, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Éthiopie ?", choix: ["Nairobi", "Khartoum", "Mogadiscio", "Addis-Abeba"], bonne: 3, niveau: "difficile" },
  { q: "Quelle civilisation a construit Angkor Wat ?", choix: ["Les Khmers", "Les Siamois", "Les Birmans", "Les Vietnamiens"], bonne: 0, niveau: "difficile" },
  { q: "Qui a écrit 'Le Docteur Jivago' ?", choix: ["Alexandre Soljenitsyne", "Boris Pasternak", "Anton Tchekhov", "Maxime Gorki"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Ouzbékistan ?", choix: ["Achgabat", "Douchanbé", "Tachkent", "Bichkek"], bonne: 2, niveau: "difficile" },
  { q: "Combien de temps a réellement duré la guerre de Cent Ans ?", choix: ["116 ans", "100 ans", "80 ans", "150 ans"], bonne: 0, niveau: "difficile" },
  { q: "Quelle est la capitale du Zimbabwe ?", choix: ["Bulawayo", "Harare", "Gweru", "Mutare"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Kazakhstan ?", choix: ["Almaty", "Bichkek", "Tachkent", "Astana"], bonne: 3, niveau: "expert" },
  { q: "Combien de cœurs possède un ver de terre (en paires) ?", choix: ["1 paire", "3 paires", "10 paires", "5 paires"], bonne: 3, niveau: "expert" },
  { q: "Quel est l'élément chimique naturel le plus dense ?", choix: ["Le plomb", "L'or", "Le platine", "L'osmium"], bonne: 3, niveau: "expert" },
  { q: "Quel gaz rend réellement bleue une enseigne lumineuse 'au néon' bleue ?", choix: ["Néon", "Hélium", "Xénon", "Argon"], bonne: 3, niveau: "expert" },
  { q: "Quel pays a été le premier à accorder le droit de vote aux femmes (1893) ?", choix: ["France", "Royaume-Uni", "États-Unis", "Nouvelle-Zélande"], bonne: 3, niveau: "expert" },
  { q: "Quelle est la monnaie officielle du Bhoutan ?", choix: ["Le taka", "La roupie", "Le kyat", "Le ngultrum"], bonne: 3, niveau: "expert" },
  { q: "Quel est le plus petit os du corps humain ?", choix: ["Le marteau", "L'enclume", "Le tibia", "L'étrier"], bonne: 3, niveau: "expert" },
  { q: "Sur Vénus, une journée dure-t-elle plus longtemps qu'une année vénusienne ?", choix: ["Non", "C'est identique", "Cela dépend des saisons", "Oui"], bonne: 3, niveau: "expert" },
  { q: "Quel est le plus grand volcan actif du monde ?", choix: ["Le Vésuve", "L'Etna", "Le Kilimandjaro", "Le Mauna Loa"], bonne: 3, niveau: "expert" },
  { q: "Quelle civilisation a inventé les premières formes du jeu d'échecs ?", choix: ["La Chine", "La Perse", "L'Égypte", "L'Inde"], bonne: 3, niveau: "expert" },
  { q: "Environ combien de litres de sang le cœur humain pompe-t-il par jour ?", choix: ["Environ 500 L", "Environ 2 000 L", "Environ 15 000 L", "Environ 7 500 L"], bonne: 3, niveau: "expert" },
  { q: "Quelle est la seule mer au monde sans aucune côte terrestre ?", choix: ["La mer Morte", "La mer Noire", "La mer Rouge", "La mer des Sargasses"], bonne: 3, niveau: "expert" },
  { q: "Quel pays possède le plus long réseau ferroviaire du monde ?", choix: ["Chine", "Russie", "Inde", "États-Unis"], bonne: 3, niveau: "expert" },
  { q: "Quel physicien a prédit l'existence des ondes gravitationnelles dès 1916 ?", choix: ["Niels Bohr", "Max Planck", "Werner Heisenberg", "Albert Einstein"], bonne: 3, niveau: "expert" },
  { q: "Comment s'appelle le vent froid et sec qui souffle dans la vallée du Rhône ?", choix: ["Le mistral", "Le sirocco", "Le foehn", "La tramontane"], bonne: 0, niveau: "expert" },
  { q: "Combien de temps dure un jour sidéral terrestre (rotation par rapport aux étoiles) ?", choix: ["23h56min", "24h00min", "24h04min", "23h30min"], bonne: 0, niveau: "expert" },
  { q: "Quelle est la plus ancienne université encore en activité au monde ?", choix: ["Oxford", "La Sorbonne", "L'université de Bologne", "Al-Quaraouiyine"], bonne: 3, niveau: "expert" },
  { q: "Quelle bataille navale a mis fin aux ambitions navales de Napoléon en 1805 ?", choix: ["Trafalgar", "Aboukir", "Lépante", "Jutland"], bonne: 0, niveau: "expert" },
  { q: "Quel est le nom de la peur irrationnelle du nombre 13 ?", choix: ["Triskaidékaphobie", "Paraskevidékatriaphobie", "Numérophobie", "Treizophobie"], bonne: 0, niveau: "expert" },
  { q: "Quelle est la température de fusion de l'or (environ) ?", choix: ["1064°C", "660°C", "1538°C", "2000°C"], bonne: 0, niveau: "expert" },
  { q: "Quelle entreprise a créé l'iPhone ?", choix: ["Samsung", "Apple", "Google", "Microsoft"], bonne: 1, niveau: "facile" },
  { q: "Qui a cofondé Microsoft avec Paul Allen ?", choix: ["Steve Jobs", "Bill Gates", "Larry Page", "Jeff Bezos"], bonne: 1, niveau: "facile" },
  { q: "Quel réseau social a été fondé par Mark Zuckerberg ?", choix: ["Twitter", "Facebook", "Instagram", "LinkedIn"], bonne: 1, niveau: "facile" },
  { q: "Quelle entreprise possède le moteur de recherche Google ?", choix: ["Meta", "Amazon", "Alphabet", "Microsoft"], bonne: 2, niveau: "moyen" },
  { q: "Quel langage de programmation a été créé pour le web par Brendan Eich ?", choix: ["Python", "JavaScript", "Ruby", "PHP"], bonne: 1, niveau: "expert" },
  { q: "Quel est le nom du chien de Mickey Mouse ?", choix: ["Pluto", "Dingo", "Rex", "Milou"], bonne: 0, niveau: "facile" },
  { q: "Qui a réalisé le film 'Titanic' (1997) ?", choix: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Ridley Scott"], bonne: 1, niveau: "facile" },
  { q: "Quel acteur a joué Iron Man dans les films Marvel ?", choix: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], bonne: 1, niveau: "facile" },
  { q: "Quel est le studio d'animation qui a créé 'Toy Story' ?", choix: ["DreamWorks", "Pixar", "Disney", "Illumination"], bonne: 1, niveau: "facile" },
  { q: "Quel film a remporté l'Oscar du meilleur film en 1998 ?", choix: ["Le Patient anglais", "Titanic", "Forrest Gump", "Braveheart"], bonne: 1, niveau: "moyen" },
  { q: "Quel est le nom de famille d'Harry Potter ?", choix: ["Potter", "Weasley", "Granger", "Malfoy"], bonne: 0, niveau: "facile" },
  { q: "Qui a écrit la saga 'Harry Potter' ?", choix: ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "Suzanne Collins"], bonne: 1, niveau: "facile" },
  { q: "Quel est le prénom du personnage principal du 'Seigneur des Anneaux' ?", choix: ["Aragorn", "Frodon", "Gandalf", "Legolas"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la couleur du sang veineux avant oxygénation ?", choix: ["Rouge vif", "Bleu", "Rouge sombre", "Violet"], bonne: 2, niveau: "expert" },
  { q: "Combien de continents compte-t-on généralement ?", choix: ["5", "6", "7", "8"], bonne: 2, niveau: "facile" },
  { q: "Quel est l'animal terrestre le plus rapide ?", choix: ["Le lion", "Le guépard", "L'antilope", "Le léopard"], bonne: 1, niveau: "facile" },
  { q: "Quel est le plus grand animal terrestre ?", choix: ["Le rhinocéros", "La girafe", "L'éléphant d'Afrique", "L'hippopotame"], bonne: 2, niveau: "facile" },
  { q: "Quel oiseau est incapable de voler mais excellent nageur ?", choix: ["L'autruche", "Le pingouin", "Le manchot", "L'émeu"], bonne: 2, niveau: "expert" },
  { q: "Combien de pattes possède une araignée ?", choix: ["6", "8", "10", "12"], bonne: 1, niveau: "facile" },
  { q: "Quel est le plus grand poisson du monde ?", choix: ["Le grand requin blanc", "Le requin-baleine", "L'espadon", "La raie manta"], bonne: 1, niveau: "moyen" },
  { q: "Quel animal est le symbole de la Chine ?", choix: ["Le tigre", "Le panda géant", "Le dragon", "La grue"], bonne: 1, niveau: "facile" },
  { q: "Combien de cœurs possède une pieuvre ?", choix: ["1", "2", "3", "4"], bonne: 2, niveau: "expert" },
  { q: "Quel est le mammifère marin le plus grand du monde ?", choix: ["L'orque", "Le cachalot", "La baleine bleue", "Le rorqual commun"], bonne: 2, niveau: "facile" },
  { q: "Quelle partie de la plante réalise la photosynthèse principalement ?", choix: ["La racine", "La tige", "La feuille", "La fleur"], bonne: 2, niveau: "facile" },
  { q: "Quel fruit est riche en vitamine C et symbole du scorbut évité par les marins ?", choix: ["La pomme", "Le citron", "La banane", "La poire"], bonne: 1, niveau: "moyen" },
  { q: "Quelle épice provient du pistil d'une fleur de crocus ?", choix: ["Le curcuma", "Le safran", "Le paprika", "La cannelle"], bonne: 1, niveau: "moyen" },
  { q: "Quel pays produit le plus de café au monde ?", choix: ["Colombie", "Brésil", "Vietnam", "Éthiopie"], bonne: 1, niveau: "moyen" },
  { q: "Quel pays est le plus grand producteur de vin au monde ?", choix: ["France", "Italie", "Espagne", "États-Unis"], bonne: 1, niveau: "difficile" },
  { q: "De quel pays est originaire la pizza margherita ?", choix: ["France", "Espagne", "Italie", "Grèce"], bonne: 2, niveau: "facile" },
  { q: "Quel plat est traditionnellement composé de riz vinaigré et de poisson cru ?", choix: ["Le sushi", "Le ramen", "Le tempura", "Le yakitori"], bonne: 0, niveau: "facile" },
  { q: "De quel pays est originaire le couscous ?", choix: ["Maghreb", "Moyen-Orient", "Turquie", "Inde"], bonne: 0, niveau: "facile" },
  { q: "Quel est l'ingrédient principal du houmous ?", choix: ["Lentilles", "Pois chiches", "Haricots blancs", "Fèves"], bonne: 1, niveau: "moyen" },
  { q: "Quelle boisson est obtenue par fermentation du raisin ?", choix: ["La bière", "Le vin", "Le cidre", "L'hydromel"], bonne: 1, niveau: "facile" },
  { q: "Quel pays a inventé le chocolat au lait moderne ?", choix: ["Belgique", "France", "Suisse", "Allemagne"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Corée du Sud ?", choix: ["Busan", "Séoul", "Incheon", "Daegu"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de la Thaïlande ?", choix: ["Chiang Mai", "Bangkok", "Phuket", "Pattaya"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale du Vietnam ?", choix: ["Hô Chi Minh-Ville", "Hanoï", "Da Nang", "Huế"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la capitale de l'Indonésie ?", choix: ["Jakarta", "Bali", "Surabaya", "Bandung"], bonne: 0, niveau: "facile" },
  { q: "Quelle est la capitale de la Turquie ?", choix: ["Istanbul", "Ankara", "Izmir", "Antalya"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de la Suède ?", choix: ["Göteborg", "Malmö", "Stockholm", "Uppsala"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la capitale de la Norvège ?", choix: ["Bergen", "Oslo", "Trondheim", "Stavanger"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale du Danemark ?", choix: ["Aarhus", "Odense", "Copenhague", "Aalborg"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la capitale de la Finlande ?", choix: ["Tampere", "Helsinki", "Turku", "Oulu"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de la Pologne ?", choix: ["Cracovie", "Varsovie", "Gdańsk", "Wrocław"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale de l'Autriche ?", choix: ["Salzbourg", "Vienne", "Graz", "Innsbruck"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la capitale des Pays-Bas ?", choix: ["Rotterdam", "La Haye", "Amsterdam", "Utrecht"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la capitale de l'Irlande ?", choix: ["Cork", "Dublin", "Galway", "Limerick"], bonne: 1, niveau: "facile" },
  { q: "Quel est le plus grand État des États-Unis par superficie ?", choix: ["Texas", "Californie", "Alaska", "Montana"], bonne: 2, niveau: "moyen" },
  { q: "Quelle ville américaine est surnommée 'la Grosse Pomme' ?", choix: ["Los Angeles", "New York", "Chicago", "Boston"], bonne: 1, niveau: "facile" },
  { q: "Quel fleuve traverse Paris ?", choix: ["La Loire", "La Seine", "Le Rhône", "La Marne"], bonne: 1, niveau: "facile" },
  { q: "Quel monument parisien a été construit pour l'Exposition universelle de 1889 ?", choix: ["L'Arc de Triomphe", "La Tour Eiffel", "Le Sacré-Cœur", "Notre-Dame"], bonne: 1, niveau: "facile" },
  { q: "Dans quelle ville se trouve le Colisée ?", choix: ["Rome", "Naples", "Milan", "Venise"], bonne: 0, niveau: "facile" },
  { q: "Dans quelle ville se trouve la tour de Pise ?", choix: ["Florence", "Pise", "Rome", "Sienne"], bonne: 1, niveau: "facile" },
  { q: "Quelle ville est célèbre pour ses canaux et ses gondoles ?", choix: ["Amsterdam", "Venise", "Bruges", "Stockholm"], bonne: 1, niveau: "facile" },
  { q: "Dans quel pays se trouve le Machu Picchu ?", choix: ["Bolivie", "Pérou", "Équateur", "Chili"], bonne: 1, niveau: "facile" },
  { q: "Dans quel pays se trouve la Grande Barrière de corail ?", choix: ["Indonésie", "Australie", "Philippines", "Thaïlande"], bonne: 1, niveau: "facile" },
  { q: "Dans quel pays se trouve le Taj Mahal ?", choix: ["Pakistan", "Inde", "Bangladesh", "Népal"], bonne: 1, niveau: "facile" },
  { q: "Dans quel pays se trouve la Grande Muraille ?", choix: ["Japon", "Corée du Sud", "Chine", "Mongolie"], bonne: 2, niveau: "facile" },
  { q: "Dans quel pays se trouve Petra, la cité taillée dans la roche ?", choix: ["Égypte", "Jordanie", "Syrie", "Liban"], bonne: 1, niveau: "moyen" },
  { q: "Quel désert traverse le fleuve Nil ?", choix: ["Le Sahara", "Le désert du Kalahari", "Le désert de Gobi", "Le désert du Namib"], bonne: 0, niveau: "facile" },
  { q: "Quel pays possède le plus de fjords ?", choix: ["Islande", "Norvège", "Groenland", "Chili"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la langue officielle du Brésil ?", choix: ["Espagnol", "Portugais", "Français", "Anglais"], bonne: 1, niveau: "facile" },
  { q: "Combien de pays composent le Royaume-Uni ?", choix: ["2", "3", "4", "5"], bonne: 2, niveau: "moyen" },
  { q: "Quel pays a pour drapeau une feuille d'érable rouge ?", choix: ["États-Unis", "Canada", "Nouvelle-Zélande", "Australie"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la fleur nationale du Japon ?", choix: ["La rose", "Le lotus", "Le cerisier (sakura)", "L'orchidée"], bonne: 2, niveau: "moyen" },
  { q: "Quel pays est traversé par l'équateur et porte ce nom ?", choix: ["Le Kenya", "L'Équateur", "Le Brésil", "L'Indonésie"], bonne: 1, niveau: "facile" },
  { q: "Quel est le nom de l'alphabet utilisé en Russie ?", choix: ["Latin", "Cyrillique", "Grec", "Arabe"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la plus grande île du monde ?", choix: ["Madagascar", "Bornéo", "Groenland", "Nouvelle-Guinée"], bonne: 2, niveau: "moyen" },
  { q: "Quelle est la vitesse approximative de rotation de la Terre à l'équateur ?", choix: ["670 km/h", "1670 km/h", "2670 km/h", "3670 km/h"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la profondeur approximative de la fosse des Mariannes ?", choix: ["8000 m", "9500 m", "11000 m", "13000 m"], bonne: 2, niveau: "expert" },
  { q: "Quel métal est le meilleur conducteur électrique ?", choix: ["Le cuivre", "L'or", "L'argent", "L'aluminium"], bonne: 2, niveau: "expert" },
  { q: "Quelle est la température approximative de la surface du Soleil ?", choix: ["3500°C", "5500°C", "7500°C", "9500°C"], bonne: 1, niveau: "expert" },
  { q: "Combien d'os composent le squelette d'un requin (cartilagineux) ?", choix: ["0", "50", "150", "206"], bonne: 0, niveau: "expert" },
  { q: "Quel est le plus petit pays d'Afrique par superficie ?", choix: ["Gambie", "Seychelles", "Cap-Vert", "Comores"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la monnaie officielle du Venezuela ?", choix: ["Le peso", "Le sol", "Le bolívar", "Le real"], bonne: 2, niveau: "expert" },
  { q: "Quel philosophe allemand a écrit 'Ainsi parlait Zarathoustra' ?", choix: ["Kant", "Hegel", "Nietzsche", "Schopenhauer"], bonne: 2, niveau: "expert" },
  { q: "Quelle bataille navale est considérée comme le tournant de la guerre du Pacifique en 1942 ?", choix: ["Pearl Harbor", "Midway", "Guadalcanal", "Iwo Jima"], bonne: 1, niveau: "expert" },
  { q: "Quel pays a été le premier à utiliser le papier-monnaie ?", choix: ["La Chine", "L'Italie", "Les Pays-Bas", "L'Angleterre"], bonne: 0, niveau: "expert" },
  { q: "Combien de temps dure environ une révolution de Neptune autour du Soleil ?", choix: ["84 ans", "120 ans", "165 ans", "200 ans"], bonne: 2, niveau: "expert" },
  { q: "Quel animal terrestre a la plus longue espérance de vie connue ?", choix: ["L'éléphant", "La tortue des Galápagos", "Le perroquet gris", "La baleine boréale"], bonne: 1, niveau: "expert" },
  { q: "Quel savant italien fut contraint par l'Inquisition de renier sa théorie héliocentrique ?", choix: ["Copernic", "Kepler", "Galilée", "Bruno"], bonne: 2, niveau: "expert" },
  { q: "Quelle ville est la capitale économique du Nigeria (sans être sa capitale officielle) ?", choix: ["Kano", "Lagos", "Ibadan", "Port Harcourt"], bonne: 1, niveau: "expert" },
  { q: "Quel écrivain russe a écrit 'Anna Karénine' ?", choix: ["Dostoïevski", "Tolstoï", "Tchekhov", "Pouchkine"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien allemand a donné son nom à l'unité de fréquence ?", choix: ["Max Planck", "Heinrich Hertz", "Werner Heisenberg", "Wilhelm Röntgen"], bonne: 1, niveau: "expert" },
  { q: "Quel traité de 1494 a divisé les terres du Nouveau Monde entre l'Espagne et le Portugal ?", choix: ["Traité de Tordesillas", "Traité de Saragosse", "Traité de Lisbonne", "Traité de Madrid"], bonne: 0, niveau: "expert" },
  { q: "Quelle est la plus ancienne monnaie encore en circulation au monde ?", choix: ["Le franc suisse", "La livre sterling", "Le dollar américain", "Le yen"], bonne: 1, niveau: "expert" },
  { q: "Quel est le nom chimique de l'eau lourde ?", choix: ["Peroxyde d'hydrogène", "Oxyde de deutérium", "Ozone liquide", "Acide sulfurique dilué"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la vitesse approximative du son dans l'air à température ambiante ?", choix: ["143 m/s", "243 m/s", "343 m/s", "443 m/s"], bonne: 2, niveau: "expert" },
  { q: "Quelle reine britannique a régné le plus longtemps avant Elizabeth II ?", choix: ["Anne", "Victoria", "Mary I", "Elizabeth I"], bonne: 1, niveau: "expert" },
  { q: "Où se trouve le siège du Comité International Olympique ?", choix: ["Genève", "Zurich", "Lausanne", "Berne"], bonne: 2, niveau: "expert" },
  { q: "Quelle civilisation précolombienne a développé un système d'écriture en Amérique ?", choix: ["Inca", "Aztèque", "Maya", "Olmèque"], bonne: 2, niveau: "expert" },
  { q: "Quel physicien a énoncé le principe d'incertitude en mécanique quantique ?", choix: ["Bohr", "Heisenberg", "Schrödinger", "Dirac"], bonne: 1, niveau: "expert" },
  { q: "Quel pays a inventé le ping-pong (tennis de table) ?", choix: ["Chine", "Japon", "Angleterre", "États-Unis"], bonne: 2, niveau: "expert" },
  { q: "Quelle est la plus haute chute d'eau du monde (chute libre ininterrompue) ?", choix: ["Chutes Victoria", "Chutes du Niagara", "Chutes Angel", "Chutes d'Iguazu"], bonne: 2, niveau: "expert" },
  { q: "Quel pays a envoyé le tout premier satellite artificiel dans l'espace (Spoutnik) ?", choix: ["États-Unis", "URSS", "France", "Royaume-Uni"], bonne: 1, niveau: "expert" },
  { q: "Environ combien de temps a duré le voyage Terre-Lune de la mission Apollo 11 ?", choix: ["1 jour", "3 jours", "7 jours", "10 jours"], bonne: 1, niveau: "expert" },
  { q: "Après la France, quel pays compte le plus de fuseaux horaires ?", choix: ["Russie", "États-Unis", "Chine", "Canada"], bonne: 0, niveau: "expert" },
  { q: "Quelle est la langue officielle du Vatican ?", choix: ["L'italien", "Le latin", "Le français", "Le grec"], bonne: 1, niveau: "expert" },
  { q: "Quel pays a inventé le badminton moderne sous sa forme codifiée ?", choix: ["Inde", "Chine", "Angleterre", "Malaisie"], bonne: 2, niveau: "expert" },
  { q: "Quel pays a été le premier à instaurer le suffrage universel masculin ?", choix: ["France", "Royaume-Uni", "États-Unis", "Suisse"], bonne: 0, niveau: "expert" },
  { q: "Quelle est la plus grande météorite jamais trouvée sur Terre, encore à son lieu de chute ?", choix: ["Météorite de Willamette", "Météorite de Hoba", "Météorite de Chelyabinsk", "Météorite de Cape York"], bonne: 1, niveau: "expert" },
  { q: "Quel explorateur portugais a dirigé la première expédition à faire le tour du monde ?", choix: ["Vasco de Gama", "Christophe Colomb", "Magellan", "Cabral"], bonne: 2, niveau: "expert" },
  { q: "Quelle est la capitale du Bhoutan ?", choix: ["Paro", "Thimphou", "Punakha", "Wangdue"], bonne: 1, niveau: "expert" },
  { q: "Quel est le symbole chimique du tungstène ?", choix: ["Tu", "Tn", "W", "Wg"], bonne: 2, niveau: "expert" },
  { q: "Quel pays d'Afrique du Nord a pour capitale Rabat ?", choix: ["Algérie", "Maroc", "Tunisie", "Libye"], bonne: 1, niveau: "expert" },
  { q: "Quelle université italienne est considérée comme la plus ancienne d'Europe encore en activité ?", choix: ["Université de Padoue", "Université de Bologne", "Université de Rome", "Université de Naples"], bonne: 1, niveau: "expert" },
  { q: "Quel est le nom du détroit séparant l'Asie et l'Amérique du Nord ?", choix: ["Détroit de Magellan", "Détroit de Gibraltar", "Détroit de Béring", "Détroit d'Ormuz"], bonne: 2, niveau: "expert" },
  { q: "Quelle est la capitale administrative de l'Afrique du Sud ?", choix: ["Le Cap", "Johannesburg", "Durban", "Pretoria"], bonne: 3, niveau: "expert" },
  { q: "Quel philosophe grec a fondé l'Académie d'Athènes ?", choix: ["Socrate", "Platon", "Aristote", "Épicure"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la plus longue rivière d'Europe ?", choix: ["Le Danube", "Le Rhin", "La Volga", "Le Dniepr"], bonne: 2, niveau: "expert" },
  { q: "Quel pays a inventé le sudoku moderne sous sa forme actuelle ?", choix: ["Japon", "Chine", "États-Unis", "Inde"], bonne: 2, niveau: "expert" },
  { q: "Quelle est l'unité de mesure de la pression atmosphérique couramment utilisée en météorologie ?", choix: ["Le pascal", "L'hectopascal", "Le bar", "L'atmosphère"], bonne: 1, niveau: "expert" },
  { q: "Quel roi de Prusse est surnommé 'le Grand' et fit de son pays une puissance militaire majeure ?", choix: ["Guillaume Ier", "Frédéric II", "Frédéric-Guillaume", "Guillaume II"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la capitale de la Nouvelle-Zélande (différente de sa plus grande ville) ?", choix: ["Auckland", "Wellington", "Christchurch", "Hamilton"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien britannique a formulé la théorie de la gravitation universelle ?", choix: ["Galilée", "Newton", "Hooke", "Halley"], bonne: 1, niveau: "expert" },
  { q: "Quelle mer est entièrement entourée par la Russie, le Kazakhstan, l'Iran, l'Azerbaïdjan et le Turkménistan ?", choix: ["Mer Noire", "Mer Caspienne", "Mer d'Aral", "Mer de Marmara"], bonne: 1, niveau: "expert" },
  { q: "Quel pays scandinave n'a jamais fait partie de l'Union européenne ?", choix: ["Suède", "Danemark", "Norvège", "Finlande"], bonne: 2, niveau: "expert" },
  { q: "Quel savant français a formulé les lois fondamentales de la conservation de la masse en chimie ?", choix: ["Pasteur", "Lavoisier", "Berthollet", "Gay-Lussac"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la capitale du Kenya ?", choix: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Pérou ?", choix: ["Cusco", "Arequipa", "Lima", "Trujillo"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Colombie ?", choix: ["Medellín", "Cali", "Cartagena", "Bogotá"], bonne: 3, niveau: "difficile" },
  { q: "Quelle est la capitale du Venezuela ?", choix: ["Maracaibo", "Caracas", "Valencia", "Barquisimeto"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Chili ?", choix: ["Valparaíso", "Concepción", "Santiago", "Antofagasta"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Équateur ?", choix: ["Guayaquil", "Quito", "Cuenca", "Manta"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de la Bulgarie ?", choix: ["Plovdiv", "Varna", "Sofia", "Burgas"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Roumanie ?", choix: ["Cluj-Napoca", "Timișoara", "Iași", "Bucarest"], bonne: 3, niveau: "difficile" },
  { q: "Quelle est la capitale de la Serbie ?", choix: ["Novi Sad", "Belgrade", "Niš", "Kragujevac"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de la Croatie ?", choix: ["Split", "Zagreb", "Rijeka", "Osijek"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de la Slovaquie ?", choix: ["Košice", "Bratislava", "Žilina", "Nitra"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de la Lituanie ?", choix: ["Kaunas", "Klaipėda", "Vilnius", "Šiauliai"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Lettonie ?", choix: ["Riga", "Daugavpils", "Liepāja", "Jelgava"], bonne: 0, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Estonie ?", choix: ["Tartu", "Narva", "Tallinn", "Pärnu"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Géorgie (le pays) ?", choix: ["Batoumi", "Tbilissi", "Koutaïssi", "Roustavi"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Pakistan ?", choix: ["Karachi", "Lahore", "Islamabad", "Peshawar"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale du Laos ?", choix: ["Luang Prabang", "Vientiane", "Pakse", "Savannakhet"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Cambodge ?", choix: ["Siem Reap", "Battambang", "Phnom Penh", "Sihanoukville"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Mauritanie ?", choix: ["Nouadhibou", "Nouakchott", "Kaédi", "Rosso"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Mali ?", choix: ["Sikasso", "Mopti", "Bamako", "Gao"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale du Niger ?", choix: ["Zinder", "Niamey", "Maradi", "Agadez"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Tchad ?", choix: ["Moundou", "N'Djaména", "Sarh", "Abéché"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Burkina Faso ?", choix: ["Bobo-Dioulasso", "Ouagadougou", "Koudougou", "Banfora"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale du Rwanda ?", choix: ["Butare", "Gisenyi", "Kigali", "Ruhengeri"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Ouganda ?", choix: ["Entebbe", "Kampala", "Jinja", "Gulu"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale officielle de la Tanzanie (depuis 1996) ?", choix: ["Dar es Salaam", "Zanzibar", "Dodoma", "Arusha"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale du Mozambique ?", choix: ["Beira", "Maputo", "Nampula", "Tete"], bonne: 1, niveau: "difficile" },
  { q: "Quelle est la capitale de l'Angola ?", choix: ["Benguela", "Huambo", "Luanda", "Lobito"], bonne: 2, niveau: "difficile" },
  { q: "Quelle est la capitale de la Zambie ?", choix: ["Lusaka", "Ndola", "Kitwe", "Livingstone"], bonne: 0, niveau: "difficile" },
  { q: "Qui a composé l'opéra 'La Traviata' ?", choix: ["Puccini", "Rossini", "Verdi", "Bellini"], bonne: 2, niveau: "difficile" },
  { q: "Qui a écrit 'Le Rouge et le Noir' ?", choix: ["Balzac", "Stendhal", "Flaubert", "Zola"], bonne: 1, niveau: "difficile" },
  { q: "Qui a écrit 'La Peste' ?", choix: ["Sartre", "Camus", "Gide", "Malraux"], bonne: 1, niveau: "difficile" },
  { q: "Qui a écrit 'À la recherche du temps perdu' ?", choix: ["Proust", "Céline", "Gide", "Colette"], bonne: 0, niveau: "difficile" },
  { q: "Qui a écrit 'Les Frères Karamazov' ?", choix: ["Tolstoï", "Tourgueniev", "Dostoïevski", "Gogol"], bonne: 2, niveau: "difficile" },
  { q: "Quel traité a mis fin à la guerre de Succession d'Espagne en 1713 ?", choix: ["Traité de Nimègue", "Traité d'Utrecht", "Traité de Ryswick", "Traité de Rastatt"], bonne: 1, niveau: "difficile" },
  { q: "Qui fut le dernier tsar de Russie ?", choix: ["Alexandre III", "Nicolas II", "Pierre le Grand", "Ivan le Terrible"], bonne: 1, niveau: "difficile" },
  { q: "En quelle année a eu lieu la bataille de Hastings ?", choix: ["1066", "1215", "1314", "1415"], bonne: 0, niveau: "difficile" },
  { q: "Quel explorateur portugais a atteint l'Inde par la mer en 1498 ?", choix: ["Magellan", "Vasco de Gama", "Cabral", "Henri le Navigateur"], bonne: 1, niveau: "difficile" },
  { q: "Qui a découvert la pénicilline ?", choix: ["Pasteur", "Fleming", "Koch", "Lister"], bonne: 1, niveau: "difficile" },
  { q: "Quel chimiste a établi la première classification périodique des éléments ?", choix: ["Lavoisier", "Mendeleïev", "Dalton", "Curie"], bonne: 1, niveau: "difficile" },
  { q: "Quelle bataille antique a opposé 300 Spartiates à l'armée perse ?", choix: ["Marathon", "Salamine", "Thermopyles", "Platées"], bonne: 2, niveau: "difficile" },
  { q: "Quel général carthaginois a traversé les Alpes avec des éléphants ?", choix: ["Hamilcar", "Hannibal", "Hasdrubal", "Magon"], bonne: 1, niveau: "difficile" },
  { q: "Quel pays a inventé le jeu de go ?", choix: ["Japon", "Corée", "Chine", "Vietnam"], bonne: 2, niveau: "difficile" },
  { q: "Quel pays a construit le tout premier chemin de fer public du monde ?", choix: ["France", "Royaume-Uni", "États-Unis", "Allemagne"], bonne: 1, niveau: "difficile" },
  { q: "Quel est le nom du premier ordinateur électronique entièrement programmable ?", choix: ["ENIAC", "Colossus", "Mark I", "UNIVAC"], bonne: 0, niveau: "difficile" },
  { q: "Quel courant marin chaud réchauffe les côtes de l'Europe de l'Ouest ?", choix: ["Le courant du Labrador", "Le Gulf Stream", "Le courant de Humboldt", "Le courant des Canaries"], bonne: 1, niveau: "difficile" },
  { q: "Qui a été la première femme à recevoir un prix Nobel ?", choix: ["Marie Curie", "Irène Joliot-Curie", "Rosalind Franklin", "Dorothy Hodgkin"], bonne: 0, niveau: "difficile" },
  { q: "Quel désert aride se trouve en grande partie au Chili ?", choix: ["Désert de Sonora", "Désert d'Atacama", "Désert du Kalahari", "Désert du Namib"], bonne: 1, niveau: "difficile" },
  { q: "Quel peintre espagnol a réalisé le tableau 'Les Ménines' ?", choix: ["Goya", "Vélasquez", "Le Greco", "Murillo"], bonne: 1, niveau: "difficile" },
  { q: "Quel savant américain a inventé le paratonnerre ?", choix: ["Thomas Edison", "Benjamin Franklin", "Nikola Tesla", "Samuel Morse"], bonne: 1, niveau: "difficile" },
  { q: "Quel processus permet aux plantes de produire de l'oxygène ?", choix: ["La respiration", "La photosynthèse", "La digestion", "La fermentation"], bonne: 1, niveau: "moyen" },
  { q: "Quel gaz est principalement responsable de l'effet de serre d'origine humaine ?", choix: ["L'azote", "L'oxygène", "Le dioxyde de carbone", "L'hélium"], bonne: 2, niveau: "moyen" },
  { q: "Comment appelle-t-on le passage d'un liquide à l'état gazeux ?", choix: ["La condensation", "L'évaporation", "La solidification", "La fusion"], bonne: 1, niveau: "moyen" },
  { q: "Combien Mars possède-t-elle de satellites naturels ?", choix: ["0", "1", "2", "4"], bonne: 2, niveau: "moyen" },
  { q: "Dans quel pays le judo a-t-il été inventé ?", choix: ["Chine", "Corée", "Japon", "Thaïlande"], bonne: 2, niveau: "moyen" },
  { q: "Comment appelle-t-on la transformation d'une chenille en papillon ?", choix: ["La mutation", "La métamorphose", "L'évolution", "La mue"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la monnaie officielle des États-Unis ?", choix: ["L'euro", "La livre", "Le dollar", "Le peso"], bonne: 2, niveau: "moyen" },
  { q: "Quel est le plus long os du corps humain ?", choix: ["Le tibia", "Le fémur", "L'humérus", "Le radius"], bonne: 1, niveau: "moyen" },
  { q: "Quel sport olympique se pratique avec un arc et des flèches ?", choix: ["Le biathlon", "Le tir sportif", "Le tir à l'arc", "Le javelot"], bonne: 2, niveau: "moyen" },
  { q: "Quelle est la plus grande chaîne de montagnes d'Asie ?", choix: ["Les Oural", "L'Himalaya", "Les Carpates", "Le Caucase"], bonne: 1, niveau: "moyen" },
  { q: "Qui est crédité de l'invention du téléphone ?", choix: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"], bonne: 2, niveau: "moyen" },
  { q: "Quelle est la durée moyenne d'une grossesse humaine ?", choix: ["7 mois", "8 mois", "9 mois", "10 mois"], bonne: 2, niveau: "moyen" },
  { q: "Quel métal précieux récompense la première place aux Jeux olympiques ?", choix: ["L'argent", "Le bronze", "L'or", "Le platine"], bonne: 2, niveau: "moyen" },
  { q: "Quel pays d'Asie du Sud-Est compte plus de 17 000 îles ?", choix: ["Philippines", "Malaisie", "Indonésie", "Thaïlande"], bonne: 2, niveau: "moyen" },
  { q: "Quel sport se joue à cheval avec un maillet et une balle ?", choix: ["Le polo", "L'équitation", "Le pentathlon", "Le horse-ball"], bonne: 0, niveau: "moyen" },
  { q: "À quelle température l'eau bout-elle au niveau de la mer ?", choix: ["80°C", "90°C", "100°C", "120°C"], bonne: 2, niveau: "moyen" },
  { q: "Quel inventeur a mis au point le phonographe ?", choix: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"], bonne: 1, niveau: "moyen" },
  { q: "Quel continent compte le plus grand nombre de pays ?", choix: ["L'Asie", "L'Europe", "L'Afrique", "L'Amérique"], bonne: 2, niveau: "moyen" },
  { q: "Quel sport d'hiver est le sport national officiel du Canada ?", choix: ["Le ski", "Le hockey sur glace", "Le patinage", "Le curling"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la plus haute montagne d'Afrique ?", choix: ["Mont Kenya", "Kilimandjaro", "Mont Atlas", "Mont Cameroun"], bonne: 1, niveau: "moyen" },
  { q: "Qui est crédité de l'invention du premier avion à moteur ?", choix: ["Les frères Wright", "Clément Ader", "Louis Blériot", "Charles Lindbergh"], bonne: 0, niveau: "moyen" },
  { q: "Quelle force nous maintient au sol ?", choix: ["Le magnétisme", "La gravité", "L'inertie", "La friction"], bonne: 1, niveau: "moyen" },
  { q: "Combien de jours dure environ un cycle lunaire complet ?", choix: ["14 jours", "21 jours", "29,5 jours", "35 jours"], bonne: 2, niveau: "moyen" },
  { q: "Quelle est la plus grande baie du monde ?", choix: ["La baie d'Hudson", "La baie du Bengale", "La baie de Gascogne", "La baie de Guinée"], bonne: 1, niveau: "moyen" },
  { q: "Quel vaccin Louis Pasteur a-t-il développé ?", choix: ["La variole", "La rage", "La tuberculose", "Le tétanos"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la vitesse maximale approximative d'un guépard ?", choix: ["70 km/h", "90 km/h", "115 km/h", "150 km/h"], bonne: 2, niveau: "moyen" },
  { q: "Quel sport combine course à pied, natation et vélo ?", choix: ["Le pentathlon", "Le triathlon", "Le décathlon", "L'heptathlon"], bonne: 1, niveau: "moyen" },
  { q: "Qui a développé la théorie de l'évolution des espèces ?", choix: ["Gregor Mendel", "Charles Darwin", "Louis Pasteur", "Carl Linné"], bonne: 1, niveau: "moyen" },
  { q: "Quel est le nom du plus grand canyon des États-Unis ?", choix: ["Le canyon de l'Antilope", "Le Grand Canyon", "Le canyon Bryce", "Le canyon de Zion"], bonne: 1, niveau: "moyen" },
  { q: "Dans quel pays le ski moderne a-t-il été développé ?", choix: ["Suisse", "Norvège", "Autriche", "Canada"], bonne: 1, niveau: "moyen" },
  { q: "Quelle planète possède les anneaux les plus visibles du système solaire ?", choix: ["Jupiter", "Uranus", "Saturne", "Neptune"], bonne: 2, niveau: "moyen" },
  { q: "Quel fut le premier antibiotique découvert ?", choix: ["L'aspirine", "La pénicilline", "La morphine", "L'insuline"], bonne: 1, niveau: "moyen" },
  { q: "Quelles chutes d'eau d'Amérique du Nord sont célèbres pour leur débit ?", choix: ["Les chutes du Niagara", "Les chutes Yosemite", "Les chutes Multnomah", "Les chutes Shoshone"], bonne: 0, niveau: "moyen" },
  { q: "Dans quel pays le volley-ball a-t-il été inventé ?", choix: ["Canada", "États-Unis", "Royaume-Uni", "France"], bonne: 1, niveau: "moyen" },
  { q: "Quelle est la distance officielle d'un marathon ?", choix: ["38,195 km", "40,195 km", "42,195 km", "44,195 km"], bonne: 2, niveau: "moyen" },
  { q: "Comment appelle-t-on le processus de division d'une cellule ?", choix: ["La méiose", "La mitose", "L'osmose", "La mutation"], bonne: 1, niveau: "moyen" },
  { q: "Quel détroit sépare l'Espagne du Maroc ?", choix: ["Détroit de Béring", "Détroit d'Ormuz", "Détroit de Gibraltar", "Détroit de Malacca"], bonne: 2, niveau: "moyen" },
  { q: "Dans quel pays le baseball moderne a-t-il été développé ?", choix: ["Cuba", "États-Unis", "Japon", "République dominicaine"], bonne: 1, niveau: "moyen" },
  { q: "Quel est le plus grand des cinq Grands Lacs d'Amérique du Nord ?", choix: ["Lac Michigan", "Lac Érié", "Lac Supérieur", "Lac Ontario"], bonne: 2, niveau: "moyen" },
  { q: "Comment appelle-t-on les roches formées sous l'effet de la pression et de la chaleur ?", choix: ["Roches sédimentaires", "Roches magmatiques", "Roches métamorphiques", "Roches volcaniques"], bonne: 2, niveau: "moyen" },
  { q: "Quelle est la vitesse de croisière approximative d'un avion de ligne ?", choix: ["500 km/h", "700 km/h", "900 km/h", "1200 km/h"], bonne: 2, niveau: "moyen" },
  { q: "Dans quel pays le curling a-t-il été inventé ?", choix: ["Canada", "Écosse", "Suède", "Norvège"], bonne: 1, niveau: "moyen" },
  { q: "Quel pays possède la plus grande superficie forestière au monde ?", choix: ["Brésil", "Canada", "Russie", "États-Unis"], bonne: 2, niveau: "moyen" },
  { q: "Quelle maladie est causée par une carence en vitamine C ?", choix: ["Le rachitisme", "Le scorbut", "L'anémie", "Le béribéri"], bonne: 1, niveau: "moyen" },
  { q: "Quel est le plus petit os du corps humain, situé dans l'oreille ?", choix: ["Le marteau", "L'enclume", "L'étrier", "Le tympan"], bonne: 2, niveau: "moyen" },
  { q: "Quel organe humain produit l'insuline ?", choix: ["Le foie", "Le pancréas", "La rate", "La thyroïde"], bonne: 1, niveau: "moyen" },
  { q: "Quel est le plus grand désert froid du monde ?", choix: ["Le Gobi", "L'Antarctique", "Le désert de Patagonie", "Le Taklamakan"], bonne: 1, niveau: "moyen" },
  { q: "Quel scientifique a mis au point la pile électrique ?", choix: ["Ampère", "Volta", "Faraday", "Ohm"], bonne: 1, niveau: "moyen" },
  { q: "Quel est le gaz le plus abondant dans l'atmosphère terrestre ?", choix: ["L'oxygène", "L'azote", "Le CO2", "L'argon"], bonne: 1, niveau: "moyen" },
  { q: "Combien de minutes compte une heure ?", choix: ["30", "60", "90", "100"], bonne: 1, niveau: "facile" },
  { q: "Combien de jours compte une année bissextile ?", choix: ["364", "365", "366", "367"], bonne: 2, niveau: "facile" },
  { q: "Quelle couleur obtient-on en mélangeant du bleu et du jaune ?", choix: ["Violet", "Orange", "Vert", "Rose"], bonne: 2, niveau: "facile" },
  { q: "Combien de côtés a un triangle ?", choix: ["2", "3", "4", "5"], bonne: 1, niveau: "facile" },
  { q: "Quel organe pompe le sang dans le corps ?", choix: ["Le foie", "Le cœur", "Le poumon", "Le rein"], bonne: 1, niveau: "facile" },
  { q: "Combien de pattes possède un insecte ?", choix: ["4", "6", "8", "10"], bonne: 1, niveau: "facile" },
  { q: "Quel animal est surnommé le roi des animaux ?", choix: ["Le tigre", "Le lion", "L'ours", "L'aigle"], bonne: 1, niveau: "facile" },
  { q: "Quelle saison suit l'hiver ?", choix: ["L'été", "L'automne", "Le printemps", "Aucune"], bonne: 2, niveau: "facile" },
  { q: "Quel est le plus grand mammifère terrestre ?", choix: ["Le rhinocéros", "L'éléphant", "La girafe", "L'hippopotame"], bonne: 1, niveau: "facile" },
  { q: "Quel sport se joue avec une raquette et un filet ?", choix: ["Le golf", "Le tennis", "Le badminton", "Le squash"], bonne: 1, niveau: "facile" },
  { q: "Combien de joueurs compte une équipe de volley-ball sur le terrain ?", choix: ["5", "6", "7", "8"], bonne: 1, niveau: "facile" },
  { q: "Quel objet sert à mesurer le temps qui passe ?", choix: ["Le thermomètre", "L'horloge", "La balance", "Le baromètre"], bonne: 1, niveau: "facile" },
  { q: "Quelle est l'étoile la plus proche de la Terre ?", choix: ["Proxima du Centaure", "Le Soleil", "Sirius", "Alpha du Centaure"], bonne: 1, niveau: "facile" },
  { q: "Combien de doigts possède une main humaine ?", choix: ["4", "5", "6", "10"], bonne: 1, niveau: "facile" },
  { q: "Quel fruit jaune a la forme d'un croissant ?", choix: ["Le citron", "L'ananas", "La banane", "La mangue"], bonne: 2, niveau: "facile" },
  { q: "Quel animal produit du miel ?", choix: ["La guêpe", "L'abeille", "Le frelon", "La fourmi"], bonne: 1, niveau: "facile" },
  { q: "Combien de roues possède une bicyclette ?", choix: ["1", "2", "3", "4"], bonne: 1, niveau: "facile" },
  { q: "Quel est le sport national du Brésil ?", choix: ["Le volley-ball", "Le football", "Le basketball", "Le tennis"], bonne: 1, niveau: "facile" },
  { q: "Quel est le satellite naturel de la Terre ?", choix: ["Mars", "Le Soleil", "La Lune", "Vénus"], bonne: 2, niveau: "facile" },
  { q: "De quelle couleur est le ciel par temps clair ?", choix: ["Vert", "Rouge", "Bleu", "Jaune"], bonne: 2, niveau: "facile" },
  { q: "Combien de minutes dure un match de basketball en NBA (temps de jeu) ?", choix: ["40", "44", "48", "52"], bonne: 2, niveau: "facile" },
  { q: "Quel animal est surnommé le meilleur ami de l'homme ?", choix: ["Le chat", "Le chien", "Le cheval", "Le lapin"], bonne: 1, niveau: "facile" },
  { q: "Quelle forme a un ballon de football classique ?", choix: ["Cube", "Sphère", "Cylindre", "Cône"], bonne: 1, niveau: "facile" },
  { q: "Combien de secondes compte une minute ?", choix: ["30", "60", "90", "100"], bonne: 1, niveau: "facile" },
  { q: "Quel repas prend-on généralement le matin ?", choix: ["Le déjeuner", "Le dîner", "Le petit-déjeuner", "Le goûter"], bonne: 2, niveau: "facile" },
  { q: "Quel est l'état de l'eau à 0°C ?", choix: ["Liquide", "Gazeux", "Glace", "Plasma"], bonne: 2, niveau: "facile" },
  { q: "Quel sport se pratique sur une patinoire avec un palet ?", choix: ["Le patinage artistique", "Le hockey sur glace", "Le curling", "Le bobsleigh"], bonne: 1, niveau: "facile" },
  { q: "Combien d'heures compte une journée ?", choix: ["12", "20", "24", "30"], bonne: 2, niveau: "facile" },
  { q: "Quel organe nous permet de voir ?", choix: ["L'oreille", "Le nez", "L'œil", "La langue"], bonne: 2, niveau: "facile" },
  { q: "Quel légume orange est apprécié des lapins ?", choix: ["La pomme de terre", "La carotte", "Le navet", "La betterave"], bonne: 1, niveau: "facile" },
  { q: "Quelle est la première lettre de l'alphabet ?", choix: ["A", "B", "Z", "E"], bonne: 0, niveau: "facile" },
  { q: "Combien de temps met la Terre à faire le tour du Soleil ?", choix: ["1 mois", "6 mois", "1 an", "10 ans"], bonne: 2, niveau: "facile" },
  { q: "Combien font 2 + 2 ?", choix: ["3", "4", "5", "6"], bonne: 1, niveau: "facile" },
  { q: "Quel sport utilise un ballon de forme ovale ?", choix: ["Le football", "Le handball", "Le rugby", "Le basketball"], bonne: 2, niveau: "facile" },
  { q: "Quelle est la saison la plus chaude de l'année ?", choix: ["Le printemps", "L'été", "L'automne", "L'hiver"], bonne: 1, niveau: "facile" },
  { q: "Quel oiseau vit en Antarctique et ne peut pas voler ?", choix: ["L'autruche", "Le manchot", "Le pélican", "Le flamant"], bonne: 1, niveau: "facile" },
  { q: "Combien de notes compte la gamme musicale de base ?", choix: ["5", "6", "7", "8"], bonne: 2, niveau: "facile" },
  { q: "Quel appareil sert à prendre des photos ?", choix: ["Le caméscope", "L'appareil photo", "Le scanner", "Le projecteur"], bonne: 1, niveau: "facile" },
  { q: "Quel sport est associé au tournoi de Roland-Garros ?", choix: ["Le golf", "Le tennis", "L'escrime", "Le badminton"], bonne: 1, niveau: "facile" },
  { q: "Quelle planète est surnommée la planète bleue ?", choix: ["Mars", "Vénus", "La Terre", "Neptune"], bonne: 2, niveau: "facile" },
  { q: "Quel gaz les êtres humains respirent-ils pour vivre ?", choix: ["L'azote", "L'oxygène", "L'hydrogène", "Le CO2"], bonne: 1, niveau: "facile" },
  { q: "Combien de mois compte une année ?", choix: ["10", "11", "12", "13"], bonne: 2, niveau: "facile" },
  { q: "Quel symbole représente l'addition en mathématiques ?", choix: ["-", "+", "x", "÷"], bonne: 1, niveau: "facile" },
  { q: "Quel animal est connu pour changer de couleur ?", choix: ["Le lézard", "Le caméléon", "Le serpent", "La grenouille"], bonne: 1, niveau: "facile" },
  { q: "Quelle partie du corps sert à entendre ?", choix: ["L'œil", "Le nez", "L'oreille", "La bouche"], bonne: 2, niveau: "facile" },
  { q: "Quel sport se joue avec des quilles et une boule ?", choix: ["Le billard", "Le bowling", "Le curling", "La pétanque"], bonne: 1, niveau: "facile" },
  { q: "Quelle boisson est obtenue à partir de grains torréfiés ?", choix: ["Le thé", "Le café", "Le chocolat chaud", "Le jus"], bonne: 1, niveau: "facile" },
  { q: "Combien de jours compte une semaine ?", choix: ["5", "6", "7", "8"], bonne: 2, niveau: "facile" },
  { q: "Quel oiseau est le symbole de la paix ?", choix: ["L'aigle", "Le hibou", "La colombe", "Le corbeau"], bonne: 2, niveau: "facile" },
  { q: "Quelle guerre a opposé la France à l'Angleterre de 1337 à 1453 ?", choix: ["La guerre de Sept Ans", "La guerre de Cent Ans", "La guerre de Succession", "La guerre des Deux-Roses"], bonne: 1, niveau: "difficile" },
  { q: "Qui a découvert la radioactivité en 1896 ?", choix: ["Marie Curie", "Henri Becquerel", "Pierre Curie", "Ernest Rutherford"], bonne: 1, niveau: "difficile" },
  { q: "Quel empire précolombien a construit un vaste réseau de routes à travers les Andes ?", choix: ["L'empire Aztèque", "L'empire Maya", "L'empire Inca", "L'empire Olmèque"], bonne: 2, niveau: "difficile" },
  { q: "Qui a élaboré la théorie des germes et la pasteurisation ?", choix: ["Robert Koch", "Louis Pasteur", "Joseph Lister", "Edward Jenner"], bonne: 1, niveau: "difficile" },
  { q: "Quelle bataille navale de 1571 a vu la victoire de la Sainte Ligue sur l'Empire ottoman ?", choix: ["Trafalgar", "Lépante", "Navarin", "Actium"], bonne: 1, niveau: "difficile" },
  { q: "Quel pays européen a accordé en premier le droit de vote aux femmes ?", choix: ["Norvège", "Finlande", "Suède", "Danemark"], bonne: 1, niveau: "difficile" },
  { q: "Quelle dynastie chinoise a construit la majeure partie de la Grande Muraille actuelle ?", choix: ["La dynastie Tang", "La dynastie Han", "La dynastie Ming", "La dynastie Song"], bonne: 2, niveau: "difficile" },
  { q: "Quel physicien danois a proposé le premier modèle quantique de l'atome ?", choix: ["Max Planck", "Niels Bohr", "Werner Heisenberg", "Erwin Schrödinger"], bonne: 1, niveau: "difficile" },
  { q: "Quel empereur romain a légalisé le christianisme par l'édit de Milan ?", choix: ["Auguste", "Néron", "Constantin", "Trajan"], bonne: 2, niveau: "difficile" },
  { q: "Quel peuple est à l'origine de la plus ancienne civilisation urbaine connue, en Mésopotamie ?", choix: ["Les Babyloniens", "Les Sumériens", "Les Assyriens", "Les Akkadiens"], bonne: 1, niveau: "difficile" },
  { q: "Qui a mis au point le premier vaccin de l'histoire, contre la variole ?", choix: ["Louis Pasteur", "Robert Koch", "Edward Jenner", "Alexander Fleming"], bonne: 2, niveau: "difficile" },
  { q: "Quelle bataille a vu la victoire des Grecs sur les Perses en 490 av. J.-C. ?", choix: ["Salamine", "Marathon", "Platées", "Thermopyles"], bonne: 1, niveau: "difficile" },
  { q: "Quel pays a aboli l'esclavage en premier parmi les grandes puissances européennes ?", choix: ["France", "Royaume-Uni", "Espagne", "Portugal"], bonne: 1, niveau: "difficile" },
  { q: "Comment appelle-t-on les guerres qui ont opposé la Grèce antique à l'Empire perse ?", choix: ["Les guerres puniques", "Les guerres médiques", "Les guerres macédoniennes", "Les guerres péloponnésiennes"], bonne: 1, niveau: "difficile" },
  { q: "Qui a découvert l'électron en 1897 ?", choix: ["Ernest Rutherford", "J.J. Thomson", "Niels Bohr", "James Chadwick"], bonne: 1, niveau: "difficile" },
  { q: "Quel pays a connu le premier la révolution industrielle ?", choix: ["France", "Allemagne", "Royaume-Uni", "Belgique"], bonne: 2, niveau: "difficile" },
  { q: "Quel empire inca a été conquis par le conquistador Francisco Pizarro ?", choix: ["L'empire Aztèque", "L'empire Maya", "L'empire Inca", "L'empire Toltèque"], bonne: 2, niveau: "difficile" },
  { q: "Quelles chutes d'eau africaines sont célèbres pour leur largeur impressionnante ?", choix: ["Chutes Murchison", "Chutes Victoria", "Chutes Tugela", "Chutes Kalambo"], bonne: 1, niveau: "difficile" },
  { q: "Quel mathématicien grec est à l'origine du théorème sur les triangles rectangles ?", choix: ["Euclide", "Archimède", "Pythagore", "Thalès"], bonne: 2, niveau: "difficile" },
  { q: "Quel président américain a prononcé le discours de Gettysburg ?", choix: ["George Washington", "Abraham Lincoln", "Theodore Roosevelt", "Ulysses Grant"], bonne: 1, niveau: "difficile" },
  { q: "Quel peuple antique a inventé les hiéroglyphes ?", choix: ["Les Sumériens", "Les Phéniciens", "Les Égyptiens", "Les Babyloniens"], bonne: 2, niveau: "difficile" },
  { q: "Qui a codécouvert la structure en double hélice de l'ADN avec Francis Crick ?", choix: ["Rosalind Franklin", "James Watson", "Linus Pauling", "Maurice Wilkins"], bonne: 1, niveau: "difficile" },
  { q: "Quel événement a déclenché la Première Guerre mondiale en 1914 ?", choix: ["L'invasion de la Pologne", "L'assassinat de l'archiduc François-Ferdinand", "Le traité de Versailles", "La crise de Cuba"], bonne: 1, niveau: "difficile" },
  { q: "Quel pays a été le premier à développer l'arme nucléaire ?", choix: ["L'URSS", "L'Allemagne", "Les États-Unis", "Le Royaume-Uni"], bonne: 2, niveau: "difficile" },
  { q: "Quelle bataille de 1942-1943 a marqué un tournant majeur sur le front de l'Est ?", choix: ["Koursk", "Stalingrad", "Berlin", "Moscou"], bonne: 1, niveau: "difficile" },
  { q: "Quel roi anglais a rompu avec l'Église catholique pour fonder l'Église anglicane ?", choix: ["Édouard VI", "Henri VII", "Henri VIII", "Jacques Ier"], bonne: 2, niveau: "difficile" },
  { q: "Quelle épidémie a tué environ un tiers de la population européenne au XIVe siècle ?", choix: ["Le choléra", "La peste noire", "La variole", "La grippe espagnole"], bonne: 1, niveau: "difficile" },
  { q: "Quel physicien a développé la théorie des quanta, avec Einstein et Bohr ?", choix: ["Max Planck", "Paul Dirac", "Erwin Schrödinger", "Wolfgang Pauli"], bonne: 0, niveau: "difficile" },
  { q: "Quel conquistador espagnol a conquis l'empire aztèque en 1521 ?", choix: ["Francisco Pizarro", "Hernán Cortés", "Diego de Almagro", "Juan Ponce de León"], bonne: 1, niveau: "difficile" },
  { q: "Quel pays a inventé l'imprimerie à caractères mobiles avant Gutenberg ?", choix: ["La Corée", "Le Japon", "La Chine", "L'Inde"], bonne: 2, niveau: "difficile" },
  { q: "Quelle guerre a opposé l'Iran et l'Irak de 1980 à 1988 ?", choix: ["La guerre du Golfe", "La guerre Iran-Irak", "La guerre des Six Jours", "La guerre civile libanaise"], bonne: 1, niveau: "difficile" },
  { q: "Quel mathématicien et philosophe français a développé la géométrie analytique ?", choix: ["Blaise Pascal", "René Descartes", "Pierre de Fermat", "Gaspard Monge"], bonne: 1, niveau: "difficile" },
  { q: "Quel peuple nomade a bâti un vaste empire en Asie sous Gengis Khan ?", choix: ["Les Huns", "Les Mongols", "Les Turcs", "Les Tatars"], bonne: 1, niveau: "difficile" },
  { q: "Qui a développé le calcul différentiel en même temps que Leibniz ?", choix: ["Isaac Newton", "Galilée", "Johannes Kepler", "Robert Hooke"], bonne: 0, niveau: "difficile" },
  { q: "Quelle guerre a opposé l'Angleterre à ses colonies américaines de 1775 à 1783 ?", choix: ["La guerre de Sécession", "La guerre d'indépendance américaine", "La guerre anglo-américaine de 1812", "La guerre franco-indienne"], bonne: 1, niveau: "difficile" },
  { q: "Quelle figure historique a mené la résistance française contre les Anglais pendant la guerre de Cent Ans ?", choix: ["Jeanne d'Arc", "Catherine de Médicis", "Aliénor d'Aquitaine", "Blanche de Castille"], bonne: 0, niveau: "difficile" },
  { q: "Quelle est la plus grande île du Pacifique après l'Australie ?", choix: ["Bornéo", "Sumatra", "La Nouvelle-Guinée", "Madagascar"], bonne: 2, niveau: "difficile" },
  { q: "Quel pays a inventé la poudre à canon ?", choix: ["La Chine", "L'Inde", "La Perse", "La Mongolie"], bonne: 0, niveau: "difficile" },
  { q: "Comment appelle-t-on le débarquement allié en Normandie le 6 juin 1944 ?", choix: ["Opération Market Garden", "Opération Overlord", "Opération Torch", "Opération Barbarossa"], bonne: 1, niveau: "difficile" },
  { q: "Quel physicien a unifié électricité et magnétisme dans une théorie commune ?", choix: ["Michael Faraday", "James Clerk Maxwell", "André-Marie Ampère", "Heinrich Hertz"], bonne: 1, niveau: "difficile" },
  { q: "Quel roi de Macédoine a créé un empire s'étendant jusqu'en Inde ?", choix: ["Philippe II", "Alexandre le Grand", "Ptolémée Ier", "Séleucos Ier"], bonne: 1, niveau: "difficile" },
  { q: "Quelle guerre a opposé Athènes et Sparte dans la Grèce antique ?", choix: ["Les guerres médiques", "La guerre du Péloponnèse", "La guerre de Corinthe", "La guerre sacrée"], bonne: 1, niveau: "difficile" },
  { q: "Qui a reçu deux prix Nobel dans deux disciplines scientifiques différentes ?", choix: ["Linus Pauling", "Marie Curie", "John Bardeen", "Frederick Sanger"], bonne: 1, niveau: "difficile" },
  { q: "En quelle année la France a-t-elle aboli la monarchie et proclamé la République ?", choix: ["1789", "1792", "1799", "1804"], bonne: 1, niveau: "difficile" },
  { q: "Quel explorateur britannique a atteint le pôle Sud en 1912, après les Norvégiens ?", choix: ["Ernest Shackleton", "Robert Falcon Scott", "James Cook", "John Franklin"], bonne: 1, niveau: "difficile" },
  { q: "Quel explorateur norvégien fut le premier à atteindre le pôle Sud en 1911 ?", choix: ["Fridtjof Nansen", "Roald Amundsen", "Otto Sverdrup", "Thor Heyerdahl"], bonne: 1, niveau: "difficile" },
  { q: "Quelle dynastie régnait sur l'Empire ottoman à son apogée ?", choix: ["La dynastie Osman", "La dynastie Séfévide", "La dynastie Abbasside", "La dynastie Omeyyade"], bonne: 0, niveau: "difficile" },
  { q: "Quel pays a inventé le système métrique décimal ?", choix: ["Royaume-Uni", "France", "Allemagne", "Italie"], bonne: 1, niveau: "difficile" },
  { q: "Quelle civilisation a construit les temples mégalithiques de Malte, parmi les plus anciens du monde ?", choix: ["Les Phéniciens", "Les civilisations préhistoriques maltaises", "Les Grecs", "Les Romains"], bonne: 1, niveau: "difficile" },
  { q: "Quel traité a mis fin à la guerre russo-japonaise de 1904-1905 ?", choix: ["Traité de Portsmouth", "Traité de Shimonoseki", "Traité de Nankin", "Traité de Pékin"], bonne: 0, niveau: "difficile" },
  { q: "Quelle est la demi-vie approximative du carbone-14 utilisée en datation archéologique ?", choix: ["1730 ans", "3730 ans", "5730 ans", "7730 ans"], bonne: 2, niveau: "expert" },
  { q: "Quel est le nom de la particule découverte en 2012, confirmant une théorie de Peter Higgs ?", choix: ["Le quark top", "Le boson de Higgs", "Le neutrino", "Le gluon"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la distance moyenne approximative entre la Terre et le Soleil ?", choix: ["50 millions de km", "100 millions de km", "150 millions de km", "200 millions de km"], bonne: 2, niveau: "expert" },
  { q: "Quel processus physique permet au Soleil de produire son énergie ?", choix: ["La fission nucléaire", "La fusion nucléaire", "La combustion chimique", "La radioactivité"], bonne: 1, niveau: "expert" },
  { q: "Quelle loi britannique de 1807 a aboli la traite négrière dans l'Empire britannique ?", choix: ["Le Slavery Abolition Act", "Le Slave Trade Act", "L'Emancipation Act", "Le Human Rights Act"], bonne: 1, niveau: "expert" },
  { q: "Quelle bataille de 1709 a vu la défaite du roi Charles XII de Suède face à la Russie ?", choix: ["La bataille de Narva", "La bataille de Poltava", "La bataille de Riga", "La bataille de Vyborg"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien a théoriquement prédit l'existence du positron avant sa découverte ?", choix: ["Werner Heisenberg", "Paul Dirac", "Wolfgang Pauli", "Erwin Schrödinger"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la deuxième fosse océanique la plus profonde du monde, après celle des Mariannes ?", choix: ["La fosse de Porto Rico", "La fosse de Tonga", "La fosse des Kouriles", "La fosse du Japon"], bonne: 1, niveau: "expert" },
  { q: "Quelles particules provoquent le phénomène des aurores boréales ?", choix: ["Les rayons cosmiques", "Les particules du vent solaire", "Les photons infrarouges", "Les ondes radio"], bonne: 1, niveau: "expert" },
  { q: "Comment s'appelle le supercontinent qui regroupait toutes les terres émergées il y a environ 300 millions d'années ?", choix: ["La Laurasie", "Le Gondwana", "La Pangée", "La Rodinia"], bonne: 2, niveau: "expert" },
  { q: "Quel mathématicien perse du IXe siècle est à l'origine du mot 'algèbre' ?", choix: ["Al-Khwarizmi", "Avicenne", "Al-Kindi", "Omar Khayyam"], bonne: 0, niveau: "expert" },
  { q: "Quelle est la plus grande des lunes de Jupiter ?", choix: ["Europe", "Io", "Ganymède", "Callisto"], bonne: 2, niveau: "expert" },
  { q: "Quelle unité mesure la quantité de matière en chimie ?", choix: ["Le gramme", "La mole", "Le litre", "L'ampère"], bonne: 1, niveau: "expert" },
  { q: "Quelle théorie scientifique décrit l'expansion de l'univers depuis une explosion initiale ?", choix: ["La théorie des cordes", "Le Big Bang", "La relativité générale", "La théorie du multivers"], bonne: 1, niveau: "expert" },
  { q: "Quel chimiste français est considéré comme le père de la chimie moderne ?", choix: ["Louis Pasteur", "Antoine Lavoisier", "Claude Berthollet", "Joseph Gay-Lussac"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la plus intense des quatre forces fondamentales de la physique ?", choix: ["La gravité", "La force électromagnétique", "La force nucléaire forte", "La force nucléaire faible"], bonne: 2, niveau: "expert" },
  { q: "Quel pays a mis en service la toute première centrale nucléaire produisant de l'électricité, en 1954 ?", choix: ["Les États-Unis", "Le Royaume-Uni", "L'URSS", "La France"], bonne: 2, niveau: "expert" },
  { q: "Quel explorateur français a inventé le scaphandre autonome moderne avec Émile Gagnan ?", choix: ["Auguste Piccard", "Jacques-Yves Cousteau", "Paul-Émile Victor", "Alain Bombard"], bonne: 1, niveau: "expert" },
  { q: "Quel pourcentage approximatif d'azote compose l'atmosphère terrestre ?", choix: ["58%", "68%", "78%", "88%"], bonne: 2, niveau: "expert" },
  { q: "Quel physicien britannique a découvert le noyau atomique grâce à l'expérience de la feuille d'or ?", choix: ["J.J. Thomson", "Ernest Rutherford", "James Chadwick", "Niels Bohr"], bonne: 1, niveau: "expert" },
  { q: "Quelle guerre a opposé le Royaume-Uni aux colons boers en Afrique du Sud (1899-1902) ?", choix: ["La première guerre des Boers", "La seconde guerre des Boers", "La guerre zouloue", "La guerre du Mahdi"], bonne: 1, niveau: "expert" },
  { q: "Quel courant océanique froid longe les côtes du Pérou et du Chili ?", choix: ["Le courant du Labrador", "Le courant de Humboldt", "Le courant des Canaries", "Le courant du Benguela"], bonne: 1, niveau: "expert" },
  { q: "Quel congrès de 1814-1815 a redessiné la carte de l'Europe après la chute de Napoléon ?", choix: ["Le Congrès de Berlin", "Le Congrès de Vienne", "Le Congrès de Paris", "Le Congrès d'Aix-la-Chapelle"], bonne: 1, niveau: "expert" },
  { q: "Quelle unité mesure l'intensité sonore ?", choix: ["Le hertz", "Le décibel", "Le watt", "Le pascal"], bonne: 1, niveau: "expert" },
  { q: "Quel biologiste autrichien est le cofondateur de la génétique moderne grâce à ses travaux sur les petits pois ?", choix: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Robert Hooke"], bonne: 1, niveau: "expert" },
  { q: "Qui a isolé le radium et le polonium avec Pierre Curie ?", choix: ["Marie Curie", "Lise Meitner", "Irène Joliot-Curie", "Rosalind Franklin"], bonne: 0, niveau: "expert" },
  { q: "Quel pays a mis au point la première bombe à hydrogène ?", choix: ["L'URSS", "Les États-Unis", "Le Royaume-Uni", "La Chine"], bonne: 1, niveau: "expert" },
  { q: "Quel scientifique allemand a proposé la théorie de la dérive des continents en 1912 ?", choix: ["Alfred Wegener", "Charles Lyell", "James Hutton", "Harry Hess"], bonne: 0, niveau: "expert" },
  { q: "Quelle partie du cerveau est responsable de l'équilibre et de la coordination motrice ?", choix: ["Le cortex", "Le cervelet", "L'hippocampe", "Le thalamus"], bonne: 1, niveau: "expert" },
  { q: "Quelle guerre a opposé la Chine et le Japon de 1937 à 1945 ?", choix: ["La première guerre sino-japonaise", "La seconde guerre sino-japonaise", "La guerre des Boxers", "La guerre de Corée"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien italien a construit le premier réacteur nucléaire artificiel ?", choix: ["Enrico Fermi", "Emilio Segrè", "Bruno Pontecorvo", "Edoardo Amaldi"], bonne: 0, niveau: "expert" },
  { q: "Quel mathématicien anglais est considéré comme le père de l'informatique théorique ?", choix: ["Charles Babbage", "Alan Turing", "Ada Lovelace", "John von Neumann"], bonne: 1, niveau: "expert" },
  { q: "Quelle unité mesure la résistance électrique ?", choix: ["Le volt", "L'ampère", "L'ohm", "Le watt"], bonne: 2, niveau: "expert" },
  { q: "Quel est le point le plus bas d'Afrique, sous le niveau de la mer ?", choix: ["Le lac Tchad", "Le lac Assal", "La dépression de Qattara", "Le lac Turkana"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien américain a construit le premier laser fonctionnel en 1960 ?", choix: ["Charles Townes", "Theodore Maiman", "Arthur Schawlow", "Gordon Gould"], bonne: 1, niveau: "expert" },
  { q: "Quelle guerre a opposé le Royaume-Uni et l'Argentine en 1982 ?", choix: ["La guerre des Malouines", "La guerre de Patagonie", "La guerre du Beagle", "La guerre de l'Atlantique Sud"], bonne: 0, niveau: "expert" },
  { q: "Quel est le nom du vaisseau spatial soviétique ayant emmené Youri Gagarine dans l'espace ?", choix: ["Soyouz 1", "Spoutnik 1", "Vostok 1", "Mir 1"], bonne: 2, niveau: "expert" },
  { q: "Quelle unité mesure la puissance électrique ?", choix: ["Le volt", "L'ampère", "Le watt", "L'ohm"], bonne: 2, niveau: "expert" },
  { q: "Quel ingénieur écossais a perfectionné la machine à vapeur, moteur de la révolution industrielle ?", choix: ["James Watt", "George Stephenson", "Richard Trevithick", "Thomas Newcomen"], bonne: 0, niveau: "expert" },
  { q: "Quelle agence internationale régule l'énergie atomique depuis 1957 ?", choix: ["L'ONU", "L'AIEA", "L'OTAN", "L'UNESCO"], bonne: 1, niveau: "expert" },
  { q: "Quelle est la plus grande plaque tectonique du monde ?", choix: ["La plaque eurasiatique", "La plaque Pacifique", "La plaque africaine", "La plaque nord-américaine"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien britannique a théorisé les trous noirs avec Roger Penrose ?", choix: ["Stephen Hawking", "Paul Dirac", "Peter Higgs", "Brian Cox"], bonne: 0, niveau: "expert" },
  { q: "Quelle guerre a opposé la Russie et le Japon en 1904-1905 ?", choix: ["La guerre russo-turque", "La guerre russo-japonaise", "La guerre de Crimée", "La guerre froide"], bonne: 1, niveau: "expert" },
  { q: "Quelle unité mesure la force en physique ?", choix: ["Le joule", "Le newton", "Le pascal", "Le watt"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien italien a construit le premier baromètre ?", choix: ["Galilée", "Evangelista Torricelli", "Blaise Pascal", "Robert Boyle"], bonne: 1, niveau: "expert" },
  { q: "Quelle civilisation antique a développé un système de numération en base 60, encore utilisé pour le temps ?", choix: ["Les Égyptiens", "Les Babyloniens", "Les Grecs", "Les Romains"], bonne: 1, niveau: "expert" },
  { q: "Quel astronome a découvert les quatre plus grandes lunes de Jupiter en 1610 ?", choix: ["Johannes Kepler", "Galilée", "Tycho Brahe", "Nicolas Copernic"], bonne: 1, niveau: "expert" },
  { q: "Quel physicien a construit le premier modèle de l'atome avec un noyau et des électrons en orbite ?", choix: ["J.J. Thomson", "Ernest Rutherford", "John Dalton", "James Chadwick"], bonne: 1, niveau: "expert" },
  { q: "Quelle est l'unité de mesure de la charge électrique ?", choix: ["Le volt", "L'ampère", "Le coulomb", "Le farad"], bonne: 2, niveau: "expert" },
  { q: "Quel physicien écossais a formulé les équations unifiant électricité, magnétisme et lumière ?", choix: ["Michael Faraday", "James Clerk Maxwell", "Lord Kelvin", "James Joule"], bonne: 1, niveau: "expert" },
];

function melanger(tableau) {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}
async function chargerQuestions() {
  const niveaux = ["facile", "moyen", "difficile", "expert"];
  let ordre = [];
  niveaux.forEach(niveau => {
    const questionsDuNiveau = QUESTIONS.filter(q => q.niveau === niveau);
    const dixQuestions = melanger(questionsDuNiveau).slice(0, 5);
    ordre = ordre.concat(dixQuestions);
  })
  filesAttente.push(...ordre);
}

let filesAttente = [];
let questionActuelle = null;
let tempsRestant = 10;
let minuteur = null;
let meilleurScore = 0;

function chargerMeilleurScore() {
  const stocke = localStorage.getItem('qcm-meilleur-score');
  meilleurScore = stocke ? parseInt(stocke, 10) : 0;
  document.getElementById('best-score-value').textContent = meilleurScore;
}

function mettreAJourMeilleurScore() {
  if (score > meilleurScore) {
    meilleurScore = score;
    localStorage.setItem('qcm-meilleur-score', meilleurScore);
    document.getElementById('best-score-value').textContent = meilleurScore;
  }
}

async function partagerScore() {
  const canvas = document.getElementById('canvas-partage');
  const ctx = canvas.getContext('2d');

  const degrade = ctx.createLinearGradient(0, 0, 0, canvas.height);
  degrade.addColorStop(0, '#3b1d78');
  degrade.addColorStop(1, '#5c2a6e');
  ctx.fillStyle = degrade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Filigrane "ENOCK HED" centré, en diagonale
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-30 * Math.PI / 180);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.font = 'bold 110px Arial';
  ctx.fillText('ENOCK HED', 0, 0);
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = '#f2c14e';
  ctx.font = 'bold 34px Arial';
  ctx.fillText('QCM Culture Générale', canvas.width / 2, 80);

  ctx.fillStyle = 'aqua';
  ctx.font = 'bold 64px Arial';
  ctx.fillText('Score : ' + score + ' / 20', canvas.width / 2, 190);

  ctx.fillStyle = '#cfcfd4';
  ctx.font = '22px Arial';
  ctx.fillText('Meilleur score : ' + meilleurScore + ' / 20', canvas.width / 2, 240);

  ctx.fillStyle = '#4caf50';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('Essaie de me battre !', canvas.width / 2, 320);

  canvas.toBlob(async (blob) => {
    const fichier = new File([blob], 'mon-score-qcm.png', { type: 'image/png' });
    const message = `J'ai obtenu ${score} / 20 bonnes réponses au QCM Culture Générale ! Mon meilleur score : ${meilleurScore} / 20. Essaie de me battre : https://hed229-1234.github.io/qcm-culture-generale-v1/`;
    if (navigator.canShare && navigator.canShare({ files: [fichier] })) {
      try {
        await navigator.share({
          files: [fichier],
          title: 'Mon score au QCM Culture Générale',
          text: message
        });
      } catch (erreur) {
        // Partage annulé par l'utilisateur
      }
    } else {
      const lien = document.createElement('a');
      lien.href = URL.createObjectURL(blob);
      lien.download = 'mon-score-qcm.png';
      lien.click();
      try {
        await navigator.clipboard.writeText(message);
        alert("L'image a été téléchargée et le message ! Tu peux les partager ensemble.");
      } catch (erreur) {
        alert(message);
      }
    }
  }, 'image/png');
}

document.getElementById('share-btn').addEventListener('click', partagerScore);

function afficherAnnonceNiveau(niveau) {
  clearInterval(minuteur);
  const noms = {
    facile: "Niveau Facile",
    moyen: "Niveau Moyen",
    difficile: "Niveau Difficile",
    expert: "Niveau Expert"
  };
  document.getElementById('question').style.display = 'none';
  document.getElementById('choices').style.display = 'none';
  document.getElementById('timer-circle-wrap').style.display = 'none';
  document.getElementById('progression').style.display = 'none';
  document.getElementById('niveau-texte').textContent = noms[niveau];
  document.getElementById('annonce-niveau').style.display = 'block';
  document.getElementById('indice-btn').style.display = 'none';
  setTimeout(() => {
    document.getElementById('annonce-niveau').style.display ='none';
    document.getElementById('question').style.display = '';
    document.getElementById('choices').style.display = '';
    document.getElementById('timer-circle-wrap').style.display = '';
    document.getElementById('progression').style.display = '';
    afficherQuestion();
  }, 2000);
}

function afficherQuestion() {
  if (filesAttente.length === 0) {
    afficherEcranFin();
    return;
  }

  const prochainNiveau = filesAttente[0].niveau;
  if (prochainNiveau !== dernierNiveau) {
    dernierNiveau = prochainNiveau;
    afficherAnnonceNiveau(prochainNiveau);
    return;
  }

  questionActuelle = filesAttente.shift();
  document.getElementById('question').textContent = questionActuelle.q;

  const zoneChoix = document.getElementById('choices');
  zoneChoix.innerHTML = "";
  questionActuelle.choix.forEach((texteChoix, i) => {
    const bouton = document.createElement('button');
    bouton.className = 'choice-btn';
    bouton.textContent = texteChoix;
    bouton.addEventListener('click', () => validerReponse(i));
    zoneChoix.appendChild(bouton);
  });
  demarrerMinuteur();
  if (!indiceUtilise) {
    document.getElementById('indice-btn').style.display = 'block';
  }
  questionsRepondues++;
  document.getElementById('progression-actuelle').textContent = questionsRepondues;
}

function demarrerMinuteur() {
  tempsRestant = 15;
  const cercle = document.querySelector('.timer-progress');
  const nombre = document.getElementById('timer-number');
  const circonference = 213.6

  cercle.style.transition = 'none';
  cercle.style.strokeDashoffset = 0;
  cercle.classList.remove('urgent')
  nombre.textContent = tempsRestant;
  clearInterval(minuteur);

  requestAnimationFrame(() => {
    cercle.style.transition = 'stroke-dashoffset 1s linear, stroke 0.3s'
  })

  minuteur = setInterval(() => {
    tempsRestant--;
    nombre.textContent = tempsRestant;
    const decalage = circonference * (1 - tempsRestant / 15);
    cercle.style.strokeDashoffset = decalage;
    if (tempsRestant <= 3) {
      cercle.classList.add('urgent');
    }
    if (tempsRestant <= 0) {
      clearInterval(minuteur);
      validerReponse(-1);
    }
  }, 1000);
}

function enregistrerReponseStats(niveau, estCorrecte){
  const stats = JSON.parse(localStorage.getItem('qcm-stats-niveaux') || '{}');
  if (!stats[niveau]) stats[niveau] = { correct: 0, total: 0}
  stats[niveau].total++;
  if (estCorrecte) stats[niveau].correct++;
  localStorage.setItem('qcm-stats-niveaux', JSON.stringify(stats));
}

function jouerSon(type) {
  const contexte = new (window.AudioContext || window.webkitAudioContext)();
  const oscillateur = contexte.createOscillator();
  const volume = contexte.createGain();
  oscillateur.connect(volume);
  volume.connect(contexte.destination);
  if (type === 'correct') {
    oscillateur.frequency.value = 880;
    volume.gain.setValueAtTime(0.15, contexte.currentTime);
    oscillateur.start();
    oscillateur.frequency.exponentialRampToValueAtTime(1320, contexte.currentTime + 0.15);
    volume.gain.exponentialRampToValueAtTime(0.001, contexte.currentTime + 0.2);
    oscillateur.stop(contexte.currentTime + 0.2);
  } else {
    oscillateur.frequency.value = 180;
    oscillateur.type = 'sawtooth';
    volume.gain.setValueAtTime(0.15, contexte.currentTime);
    oscillateur.start();
    volume.gain.exponentialRampToValueAtTime(0.001, contexte.currentTime + 0.3);
    oscillateur.stop(contexte.currentTime + 0.3);
  }
}
function utiliserIndice() {
  if (indiceUtilise) return;
  indiceUtilise = true;
  document.getElementById('indice-btn').style.display = 'none';
  const boutons = document.querySelectorAll('.choice-btn');
  const mauvaisIndex = [];
  boutons.forEach((bouton, i) => {
    if (i !== questionActuelle.bonne) mauvaisIndex.push(i);
  });
  for (let i = mauvaisIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mauvaisIndex[i], mauvaisIndex[j]] = [mauvaisIndex[j], mauvaisIndex[i]];
  }
  const aCacher = mauvaisIndex.slice(0, 2);
  aCacher.forEach(i => {
    boutons[i].style.visibility = 'hidden';
  });
}
document.getElementById('indice-btn').addEventListener('click', utiliserIndice);

function validerReponse(indexChoisi) {
  clearInterval(minuteur);
  enregistrerReponseStats(questionActuelle.niveau, indexChoisi === questionActuelle.bonne);
  const zoneSerie = document.getElementById('serie');
  if (indexChoisi === questionActuelle.bonne) {
    serieActuelle++;
    if (serieActuelle >= 3) {
      zoneSerie.textContent = "🔥 Série de " + serieActuelle + ' ! 🎈 🎉';
      zoneSerie.style.display = 'block';
    }
    meilleureSerieDeLaPartie = Math.max(meilleureSerieDeLaPartie, serieActuelle);
    if (questionActuelle.niveau === 'expert') expertCorrectesPartie++;
  } else {
    serieActuelle = 0;
    zoneSerie.style.display = 'none';
  }
  jouerSon(indexChoisi === questionActuelle.bonne ? 'correct' : 'erreur');
  const boutons = document.querySelectorAll('.choice-btn');
  boutons.forEach((bouton, i) => {
    bouton.disabled = true;
    if (i === questionActuelle.bonne) {
      bouton.classList.add('correct');
    } else if (i === indexChoisi) {
      bouton.classList.add('wrong');
    }
  });

  if (indexChoisi === questionActuelle.bonne) {
    score++;
    document.getElementById('score-value').textContent = score;
    mettreAJourMeilleurScore();
  }
  sauvegarderEtatPartie();
  setTimeout(() => {
    afficherQuestion();
  }, 1500);
}

function enregistrerPartieStats() {
  const historique = JSON.parse(localStorage.getItem('qcm-historique') || '[]');
  const dateTexte = new Date().toLocaleDateString('fr-FR');
  historique.unshift({ date: dateTexte, score: score });
  localStorage.setItem('qcm-historique', JSON.stringify(historique.slice(0, 10)));
  const partiesJouees = parseInt(localStorage.getItem('qcm-parties-jouees') || '0') + 1;
  localStorage.setItem('qcm-parties-jouees', partiesJouees);
}
function evaluerBadges() {
  const badges = JSON.parse(localStorage.getItem('qcm-badges') || '[]');
  const partiesJouees = parseInt(localStorage.getItem('qcm-parties-jouees') || '0');
  const nouveauxBadges = [];
  function debloquer(id) {
    if (!badges.includes(id)) {
       badges.push(id);
       nouveauxBadges.push(id);
    }
  }
  if (score === 20) debloquer('sans-faute');
  if (meilleureSerieDeLaPartie >= 10) debloquer('serie-de-feu');
  if (partiesJouees >= 10) debloquer('joueur-regulier');
  if (expertCorrectesPartie === 5) debloquer('expert-confirme');
  if (partiesJouees >= 50) debloquer('veteran');
  localStorage.setItem('qcm-badges', JSON.stringify(badges));
  return nouveauxBadges;
}
function afficherNotificationBadges(idsNouveaux) {
  if (idsNouveaux.length === 0) return;
  const noms = {
    'sans-faute': 'Sans faute',
    'serie-de-feu': 'Série de feu',
    'joueur-regulier': 'Joueur régulier',
    'expert-confirme': 'Expert confirmé',
    'veteran': 'Vétéran'
  };
  const zone = document.createElement('div');
  zone.id = 'notif-badge';
  zone.textContent = idsNouveaux.length === 1 ? '🏆 Nouveau badge débloqué : ' + noms[idsNouveaux[0]] + ' !' : '🏆 ' + idsNouveaux.length + ' nouveaux badges débloqués !';
  document.querySelector('#ecran-fin .ecran-final').insertAdjacentElement('afterend', zone);
}
function afficherStats() {
  afficherBadges();
  const noms = {
    facile: "Facile",
    moyen: "Moyen",
    difficile: "Difficile",
    expert: "Expert"
  };
  afficherTropheesStats();
  const stats = JSON.parse(localStorage.getItem('qcm-stats-niveaux') || '{}');
  const zoneNiveaux = document.getElementById('stats-niveaux');
  zoneNiveaux.innerHTML = "";
  ["facile", "moyen", "difficile", "expert"].forEach(niveau => {
    const ligne = document.createElement('div');
    ligne.className = 'stat-ligne';
    if (stats[niveau] && stats[niveau].total > 0) {
      const pourcentage = Math.round((stats[niveau].correct / stats[niveau].total) * 100);
      ligne.innerHTML = `<span>${noms[niveau]}</span><span>${pourcentage}% (${stats[niveau].correct}/${stats[niveau].total})</span>`;
    } else {
      ligne.innerHTML = `<span>${noms[niveau]}</span><span>Pas encore joué</span>`;
    }
    zoneNiveaux.appendChild(ligne);
  });

  const historique = JSON.parse(localStorage.getItem('qcm-historique') || '[]');
  const zoneHistorique = document.getElementById('stats-historique');
  zoneHistorique.innerHTML = "";
  if (historique.length === 0) {
    zoneHistorique.innerHTML = "<p style='text-align:center;'>Aucune partie jouée pour l'instant.</p>";
  } else {
    historique.forEach(partie => {
      const ligne = document.createElement('div');
      ligne.className = 'stat-ligne';
      ligne.innerHTML = `<span>${partie.date}</span><span>${partie.score} / 20</span>`;
      zoneHistorique.appendChild(ligne);
    });
  }

  document.getElementById('ecran-accueil').style.display = 'none';
  document.getElementById('ecran-fin').style.display = 'none';
  document.getElementById('ecran-stats').style.display = 'block';
  document.getElementById('indice-btn').style.display = 'none';
}
function afficherBadges() {
  const badgesDebloques = JSON.parse(localStorage.getItem('qcm-badges') || '[]');
  const tousLesBadges = [
    { id: 'sans-faute', nom: 'Sans faute', image: 'badges/sans-faute.png' },
    { id: 'serie-de-feu', nom: 'Série de feu', image: 'badges/serie-de-feu.png' },
    { id: 'joueur-regulier', nom: 'Joueur régulier', image: 'badges/joueur-regulier.png' },
    { id: 'expert-confirme', nom: 'Expert confirmé', image: 'badges/expert-confirme.png' },
    { id: 'veteran', nom: 'Vétéran', image: 'badges/veteran.png' }
  ];
  const zoneBadges = document.getElementById('stats-badges');
  zoneBadges.innerHTML = "";
  tousLesBadges.forEach(badge => {
    const estDebloque = badgesDebloques.includes(badge.id);
    const carte = document.createElement('div');
    carte.className = estDebloque ? 'badge' : 'badge badge-verrouille';
    carte.innerHTML = `<img src="${badge.image}" class="badge-emoji" style="width:48px;height:48px;display:block;margin:0 auto;">${badge.nom}`;
    zoneBadges.appendChild(carte);
  });
}
function fermerStats() {
  document.getElementById('ecran-stats').style.display = 'none';
  document.getElementById('ecran-accueil').style.display = '';
  document.getElementById('score').style.display = 'none';
  document.getElementById('best-score').style.display = 'none';
  document.getElementById('indice-btn').style.display = 'none';
  document.getElementById('share-btn').style.display = 'none';
  document.getElementById('serie').style.display = 'none';
}

document.getElementById('stats-btn').addEventListener('click', afficherStats);
document.getElementById('stats-retour-btn').addEventListener('click', fermerStats);
document.getElementById('stats-fin-btn').addEventListener('click', afficherStats);

function afficherEcranFin() {
  effacerEtatPartie();
  enregistrerPartieStats();
  const nouveauxBadges = evaluerBadges();
  afficherNotificationBadges(nouveauxBadges);
  document.getElementById('question').style.display = 'none';
  document.getElementById('choices').style.display = 'none';
  document.getElementById('timer-circle-wrap').style.display = 'none';
  document.getElementById('progression').style.display = 'none';
  document.getElementById('ecran-fin').style.display = 'block';
  document.getElementById('score-final-value').textContent = score;
  document.getElementById('ecran-fin-best').innerHTML = 'Meilleur score : <span id="ecran-fin-best-value">' + meilleurScore + '</span> / 20';
  document.getElementById('score').style.display = 'none';
  document.getElementById('best-score').style.display = 'none';
  document.getElementById('indice-btn').style.display = 'none';
  document.getElementById('serie').style.display = 'none';
}

function rejouer() {
  dernierNiveau = null;
  questionsRepondues = 0;
  document.getElementById('progression').style.display = '';
  document.getElementById('progression-actuelle').textContent = '1';
  score = 0;
  document.getElementById('score-value').textContent = score;
  document.getElementById('question').style.display = '';
  document.getElementById('choices').style.display = '';
  document.getElementById('timer-circle-wrap').style.display = '';
  document.getElementById('ecran-fin').style.display = 'none';
  document.getElementById('score').style.display = '';
  document.getElementById('best-score').style.display = '';
  chargerQuestions().then(() => afficherQuestion());
  serieActuelle = 0;
  document.getElementById('serie').style.display = 'none';
  indiceUtilise = false;
  meilleureSerieDeLaPartie = 0;
  expertCorrectesPartie = 0;
  const ancienneNotif = document.getElementById('notif-badge');
  if (ancienneNotif) ancienneNotif.remove();
}

document.getElementById('rejouer-btn').addEventListener('click', rejouer);

function sauvegarderEtatPartie() {
  const etat = {
    score, filesAttente, dernierNiveau, questionsRepondues,
    serieActuelle, meilleureSerieDeLaPartie, expertCorrectesPartie,
    indiceUtilise, questionActuelle
  };
  localStorage.setItem('qcm-partie-en-cours', JSON.stringify(etat));
}
function effacerEtatPartie() {
  localStorage.removeItem('qcm-partie-en-cours');
}
function reprendrePartie() {
  const etat = JSON.parse(localStorage.getItem('qcm-partie-en-cours'));
  score = etat.score;
  filesAttente = etat.filesAttente;
  dernierNiveau = etat.dernierNiveau;
  questionsRepondues = etat.questionsRepondues;
  serieActuelle = etat.serieActuelle;
  meilleureSerieDeLaPartie = etat.meilleureSerieDeLaPartie;
  expertCorrectesPartie = etat.expertCorrectesPartie;
  indiceUtilise = etat.indiceUtilise;
  questionActuelle = etat.questionActuelle;
  filesAttente.unshift(questionActuelle);
  document.getElementById('ecran-accueil').style.display = 'none';
  document.getElementById('timer-circle-wrap').style.display = '';
  document.getElementById('question').style.display = '';
  document.getElementById('choices').style.display = '';
  document.getElementById('score').style.display = '';
  document.getElementById('best-score').style.display = '';
  document.getElementById('share-btn').style.display = '';
  document.getElementById('progression').style.display = '';
  document.getElementById('score-value').textContent = score;
  document.getElementById('progression-actuelle').textContent = questionsRepondues;
  afficherQuestion();
}
function commencerPartie() {
  document.getElementById('ecran-accueil').style.display = 'none';
  document.getElementById('timer-circle-wrap').style.display = '';
  document.getElementById('question').style.display = '';
  document.getElementById('choices').style.display = '';
  document.getElementById('score').style.display = '';
  document.getElementById('best-score').style.display = '';
  document.getElementById('share-btn').style.display = '';
  document.getElementById('serie').style.display = 'none';
  dernierNiveau = null;
  questionsRepondues = 0;
  document.getElementById('progression').style.display = '';
  document.getElementById('progression-actuelle').textContent = '1';
  chargerQuestions().then(() => afficherQuestion());
  serieActuelle = 0;
  document.getElementById('serie').style.display = 'none';
  indiceUtilise = false;
  meilleureSerieDeLaPartie = 0;
  expertCorrectesPartie = 0;
}

document.getElementById('commencer-btn').addEventListener('click', commencerPartie);
if (localStorage.getItem('qcm-partie-en-cours')) {
  document.getElementById('reprise-bandeau').style.display = 'block';
  document.getElementById('commencer-btn').style.display = 'none';
}

let defiFilesAttente = [], defiScore = 0, defiIndex = 0;

function dateAujourdhui() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function defiDejaFaitAujourdhui() {
  const liste = JSON.parse(localStorage.getItem('qcm-defis-reussis') || '[]');
  return liste.includes(dateAujourdhui());
}

function demarrerDefi() {
  if (defiDejaFaitAujourdhui()) return;
  defiScore = 0;
  defiIndex = 0;
  defiFilesAttente = melanger(QUESTIONS).slice(0, 20);
  document.getElementById('ecran-accueil').style.display = 'none';
  document.getElementById('ecran-defi').style.display = 'block';
  afficherQuestionDefi();
}

function afficherQuestionDefi() {
  if (defiFilesAttente.length === 0) { terminerDefi(); return; }
  const question = defiFilesAttente.shift();
  defiIndex++;
  document.getElementById('defi-actuelle').textContent = defiIndex;
  document.getElementById('defi-question').textContent = question.q;
  const zone = document.getElementById('defi-choices');
  zone.innerHTML = '';
  question.choix.forEach((texte, i) => {
    const bouton = document.createElement('button');
    bouton.className = 'choice-btn';
    bouton.textContent = texte;
    bouton.addEventListener('click', () => validerReponseDefi(i, question.bonne));
    zone.appendChild(bouton);
  });
}

function validerReponseDefi(indexChoisi, bonneReponse) {
  if (indexChoisi === bonneReponse) {
    defiScore++;
    document.getElementById('defi-score-value').textContent = defiScore;
  }
  setTimeout(afficherQuestionDefi, 600);
}

function terminerDefi() {
  const liste = JSON.parse(localStorage.getItem('qcm-defis-reussis') || '[]');
  const aujourdhui = dateAujourdhui();
  if (!liste.includes(aujourdhui)) liste.push(aujourdhui);
  localStorage.setItem('qcm-defis-reussis', JSON.stringify(liste));

  document.getElementById('ecran-defi').style.display = 'none';
  document.getElementById('ecran-defi-fin').style.display = 'block';
  document.getElementById('defi-score-final').textContent = defiScore;

  const trophee = verifierTropheeMensuel();
  const notif = document.getElementById('trophee-notif');
  if (trophee) {
    notif.textContent = '🏆 Trophée débloqué : ' + trophee + ' !';
    notif.style.display = 'block';
  } else {
    notif.style.display = 'none';
  }
}

function verifierTropheeMensuel() {
  const liste = JSON.parse(localStorage.getItem('qcm-defis-reussis') || '[]');
  const aujourdhui = new Date();
  const annee = aujourdhui.getFullYear();
  const mois = aujourdhui.getMonth();
  const dernierJour = new Date(annee, mois + 1, 0).getDate();
  if (aujourdhui.getDate() !== dernierJour) return null;

  const cleMois = annee + '-' + String(mois+1).padStart(2,'0');
  for (let j = 1; j <= dernierJour; j++) {
    if (!liste.includes(cleMois + '-' + String(j).padStart(2,'0'))) return null;
  }

  const noms = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const nomTrophee = 'Trophée de ' + noms[mois] + ' ' + annee;
  const trophees = JSON.parse(localStorage.getItem('qcm-trophees') || '[]');
  if (!trophees.some(t => t.cle === cleMois)) {
    trophees.push({ cle: cleMois, nom: nomTrophee });
    localStorage.setItem('qcm-trophees', JSON.stringify(trophees));
    return nomTrophee;
  }
  return null;
}

function afficherStatutDefi() {
  const statutZone = document.getElementById('defi-statut');
  const btn = document.getElementById('defi-btn');
  if (defiDejaFaitAujourdhui()) {
    statutZone.textContent = '✓ Défi du jour déjà fait';
    statutZone.style.display = 'block';
    btn.disabled = true;
    btn.style.opacity = '0.5';
  } else {
    statutZone.style.display = 'none';
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

function afficherTropheesStats() {
  const trophees = JSON.parse(localStorage.getItem('qcm-trophees') || '[]');
  const zone = document.getElementById('stats-trophees');
  zone.innerHTML = trophees.length === 0
    ? "<p style='text-align:center;color:#9a9a9e;'>Aucun trophée pour l'instant.</p>"
    : trophees.map(t => `<div class="stat-ligne"><span>🏆 ${t.nom}</span></div>`).join('');
}

document.getElementById('defi-btn').addEventListener('click', demarrerDefi);
document.getElementById('defi-fin-retour-btn').addEventListener('click', () => {
  document.getElementById('ecran-defi-fin').style.display = 'none';
  document.getElementById('ecran-accueil').style.display = '';
  afficherStatutDefi();
});
afficherStatutDefi();

if (!defiDejaFaitAujourdhui()) document.getElementById('rappel-defi').style.display = 'block';

chargerMeilleurScore();

function appliquerThemeSauegarde() {
  const themeSauegarde = localStorage.getItem('qcm-theme');
  if (themeSauegarde === 'clair') {
    document.body.classList.add('theme-clair');
    document.getElementById('theme-toggle-input').checked = true;
  }
}

function changerTheme() {
  document.body.classList.toggle('theme-clair');
  const estClair = document.body.classList.contains('theme-clair');
  localStorage.setItem('qcm-theme', estClair ? 'clair' : 'sombre');
}
document.getElementById('theme-toggle-input').addEventListener('change', changerTheme);
document.getElementById('reprendre-btn').addEventListener('click', reprendrePartie);
document.getElementById('abandonner-btn').addEventListener('click', () => {
  effacerEtatPartie();
  document.getElementById('reprise-bandeau').style.display = 'none';
  document.getElementById('commencer-btn').style.display = '';
})
if (localStorage.getItem('qcm-partie-en-cours')) {
  document.getElementById('reprise-bandeau').style.display = 'block';
  document.getElementById('commencer-btn').style.display = 'none';
}
appliquerThemeSauegarde();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

function demanderPermissionNotifs() {
  if (!('Notification' in window)) {
    alert("Les notifications ne sont pas supportées sur ce navigateur.");
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      localStorage.setItem('qcm-notifs-actives', 'oui');
      document.getElementById('notif-btn').textContent = '🔔 Activées';
      document.getElementById('notif-btn').disabled = true;
      afficherNotifBienvenue();
    }
  });
}

function afficherNotification(titre, texte) {
  if (Notification.permission !== 'granted') return;
  if (navigator.serviceWorker && navigator.serviceWorker.ready) {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(titre, { body: texte, icon: 'icone-192.png' });
    });
  } else {
    new Notification(titre, { body: texte, icon: 'icone-192.png' });
  }
}

function afficherNotifBienvenue() {
  afficherNotification('QCM Culture Générale', 'Notifications activées ! Tu seras encouragé à faire ton défi du jour.');
}

function verifierNotifDefiDuJour() {
  if (localStorage.getItem('qcm-notifs-actives') !== 'oui') return;
  if (!defiDejaFaitAujourdhui()) {
    afficherNotification('Défi du jour disponible 🎯', "Tu n'as pas encore fait ton défi aujourd'hui, viens tenter ta chance !");
  } else {
    const liste = JSON.parse(localStorage.getItem('qcm-defis-reussis') || '[]');
    if (liste.length > 0 && liste.length % 5 === 0) {
      afficherNotification('Bravo ! 🔥', 'Tu as déjà réussi ' + liste.length + ' défis journaliers, continue comme ça !');
    }
  }
}

document.getElementById('notif-btn').addEventListener('click', demanderPermissionNotifs);

if (localStorage.getItem('qcm-notifs-actives') === 'oui') {
  document.getElementById('notif-btn').textContent = '🔔 Activées';
  document.getElementById('notif-btn').disabled = true;
  setTimeout(verifierNotifDefiDuJour, 1500);
}
