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
    const message = `J'ai obtenu ${score} / 20 bonnes réponses au QCM Culture Générale ! Mon meilleur score : ${meilleurScore} / 20. Essaie de me battre : https://hed229-1234.github.io/qcm-culture-generale/`;
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
appliquerThemeSauegarde();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}