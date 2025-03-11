package visitmycities;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import visitmycities.dao.ArchitectRepository;
import visitmycities.dao.BuildingRepository;
import visitmycities.dao.CityRepository;
import visitmycities.dao.UserRepository;
import visitmycities.model.Architect;
import visitmycities.model.Building;
import visitmycities.model.City;
import visitmycities.model.User;
import visitmycities.model.enums.EBuildingTypes;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@SpringBootApplication
public class VisitMyCitiesApplication {

	public static void main(String[] args) {
		SpringApplication.run(VisitMyCitiesApplication.class, args);
	}

		@Bean
		CommandLineRunner initRepos (ArchitectRepository architectRepository, BuildingRepository
		buildingRepository, CityRepository cityRepository, UserRepository userRepository){
			return args -> {
				System.out.println("\n\nInitialisation du projet\n---------------");

				/** création architectes
				 * @constructeur : nom , prenom , naissance , mort
				 */
				Architect a1 = new Architect("Spoerry", "François",
						LocalDate.of(1912, 12, 28),
						LocalDate.of(1999, 1, 11));
				Architect a2 = new Architect("Kuder", "Richard",
						LocalDate.of(1852, 07, 18),
						LocalDate.of(1912, 04, 14));
				Architect a3 = new Architect("de Steinbach", "Erwin",
						LocalDate.of(1244, 1, 1),
						LocalDate.of(1318, 1, 17));
				Architect a4 = new Architect("Bartholdi", "Auguste",
						LocalDate.of(1834, 8, 2),
						LocalDate.of(1904, 10, 4));
				Architect a5 = new Architect("Schmidt", "Jean", LocalDate.of(1500, 5, 10), LocalDate.of(1570, 9, 15));
				Architect a6 = new Architect("Hertzog", "Ulrich", LocalDate.of(1210, 4, 3), LocalDate.of(1275, 6, 20));
				Architect a7 = new Architect("Collectif", "Inconnu", LocalDate.of(1800, 1, 1), LocalDate.of(1900, 1, 1));
				Architect a9 = new Architect("Collectif", "Dominicains", LocalDate.of(1200, 1, 1), LocalDate.of(1300, 1, 1));
				Architect a10 = new Architect("Dollinger", "Jean", LocalDate.of(1730, 3, 15), LocalDate.of(1800, 7, 22)); // Palais Rohan
				Architect a11 = new Architect("Vauban", "Sébastien Le Prestre", LocalDate.of(1633, 5, 15), LocalDate.of(1707, 3, 30)); // Barrage Vauban
				Architect a13 = new Architect("Eiffel", "Gustave", LocalDate.of(1832, 12, 15), LocalDate.of(1923, 12, 27)); // Tour Eiffel
				Architect a14 = new Architect("Lescot", "Pierre", LocalDate.of(1515, 1, 1), LocalDate.of(1578, 1, 1)); // Musée du Louvre
				Architect a15 = new Architect("Soufflot", "Jacques-Germain", LocalDate.of(1713, 7, 22), LocalDate.of(1780, 8, 29)); // Panthéon
				Architect a16 = new Architect("Perrault", "Claude", LocalDate.of(1613, 9, 25), LocalDate.of(1688, 10, 9)); // Colonnade du Louvre
				/** création villes
				 * @constructeur : nom,cp
				 */
				City c1 = new City("Mulhouse", "68100","http://10.0.2.2:8080/images/mulhouse.jpg");
				City c2 = new City("Strasbourg", "67000","http://10.0.2.2:8080/images/strasbourg.jpg");
				City c3 = new City("Colmar", "68000","http://10.0.2.2:8080/images/colmar.jpg");
				City c4 = new City("Paris", "75000","http://10.0.2.2:8080/images/paris.jpg");


				/** création bâtiments
				 * @constructeur : nom, EnumType , Architecte)
				 */
				Building b1 = new Building("Tour de l'Europe","Tour", a1, 1972, 100.0, "47.7498, 7.3371",
						"La Tour de l'Europe, un gratte-ciel emblématique de Mulhouse, se distingue par son architecture moderne et sa hauteur imposante. Elle reste l'un des bâtiments les plus reconnaissables de la ville.",
						"http://10.0.2.2:8080/images/tour_de_leurope.webp",c1);

				Building b2 = new Building("Tribunal d'instance de Mulhouse", "Municipal", a2, 1926, 30.0, "47.7431, 7.3412",
						"Le Tribunal d'instance de Mulhouse, un bâtiment judiciaire datant de 1926, incarne l'autorité et l'histoire de la ville. Son architecture est un bel exemple de l'urbanisme du début du XXe siècle.",
						"http://10.0.2.2:8080/images/tribunal_mulhouse.jpg",c1);

				Building b3 = new Building("Notre-Dame de Strasbourg", "Eglise", a3, 1439, 142.0, "48.5810, 7.7509",
						"La cathédrale Notre-Dame de Strasbourg, un chef-d'œuvre de l'architecture gothique, a été construite au XVe siècle. Sa façade spectaculaire et sa flèche majestueuse en font un monument incontournable.",
						"http://10.0.2.2:8080/images/cathe_strasbourg.jpg",c2);

				Building b4 = new Building("Statue de la Liberté", "Statue", a4, 1886, 93.0, "48.0795, 7.3582",
						"La Statue de la Liberté de Colmar, érigée en 1886, est une réplique de l'emblématique monument new-yorkais. Elle rend hommage à Bartholdi, le sculpteur originaire de Colmar.",
						"http://10.0.2.2:8080/images/statue_liberte.jpg",c3);

				Building b5 = new Building(
						"Maison Pfister", "Maison historique", a5, 1537, 18.0, "48.0772, 7.3575",
						"La Maison Pfister, construite en 1537, est un chef-d'œuvre de la Renaissance à Colmar. Ses fresques et son oriel en bois sculpté en font un symbole de l'architecture alsacienne.",
						"http://10.0.2.2:8080/images/maison_pfister.jpg", c3
				);

				Building b6 = new Building(
						"Collégiale Saint-Martin", "Église", a6, 1234, 78.0, "48.0785, 7.3556",
						"La Collégiale Saint-Martin, surnommée la cathédrale de Colmar, est un joyau gothique du XIIIe siècle. Son imposante façade et son toit coloré en font un édifice emblématique de la ville.",
						"http://10.0.2.2:8080/images/collegiale_saint_martin.jpg", c3
				);

				Building b7 = new Building(
						"Musée Unterlinden", "Musée", a7, 1853, 15.0, "48.0794, 7.3588",
						"Le Musée Unterlinden, abritant le célèbre Retable d'Issenheim, est l'un des plus prestigieux d'Alsace. Installé dans un ancien couvent, il mêle art médiéval et moderne.",
						"http://10.0.2.2:8080/images/musee_unterlinden.jpg", c3
				);



				Building b8 = new Building(
						"Église des Dominicains", "Église", a9, 1283, 35.0, "48.0782, 7.3581",
						"L'Église des Dominicains de Colmar, édifiée en 1283, est un bijou de l'art gothique. Son intérieur abrite des vitraux magnifiques et le célèbre tableau de Martin Schongauer, la Vierge au buisson de roses.",
						"http://10.0.2.2:8080/images/eglise_dominicains.jpg", c3
				);

				Building b9 = new Building(
						"Palais Rohan", "Palais", a10, 1742, 20.0, "48.5811, 7.7517",
						"Le Palais Rohan, construit au XVIIIe siècle, est un joyau de l'architecture classique. Il abrite trois musées majeurs de Strasbourg : les Beaux-Arts, les Arts décoratifs et l'Archéologie.",
						"http://10.0.2.2:8080/images/palais_rohan.jpg", c2
				);

				Building b10 = new Building(
						"Barrage Vauban", "Ouvrage militaire", a11, 1690, 15.0, "48.5792, 7.7388",
						"Le Barrage Vauban, construit au XVIIe siècle, servait de défense contre les invasions. Aujourd’hui, il offre une vue panoramique sur la Petite France et la Cathédrale depuis sa terrasse.",
						"http://10.0.2.2:8080/images/barrage_vauban.jpg", c2
				);

				Building b11 = new Building(
						"Tour Eiffel", "Tour", a13, 1889, 330.0, "48.8584, 2.2945",
						"La Tour Eiffel, symbole de Paris, a été inaugurée en 1889 pour l'Exposition universelle. Avec ses 330m de haut, elle attire des millions de visiteurs chaque année.",
						"http://10.0.2.2:8080/images/tour_eiffel.jpg", c4
				);

				Building b12 = new Building(
						"Musée du Louvre", "Musée", a14, 1793, 21.0, "48.8606, 2.3376",
						"Le Louvre, ancien palais royal devenu musée en 1793, abrite la Joconde et plus de 35 000 œuvres. Sa pyramide de verre est un emblème architectural moderne.",
						"http://10.0.2.2:8080/images/musee_louvre.jpg", c4
				);

				Building b13 = new Building(
						"Panthéon", "Monument historique", a15, 1790, 83.0, "48.8462, 2.3460",
						"Le Panthéon de Paris, conçu par Soufflot, est un chef-d'œuvre néoclassique. Il abrite les sépultures de grandes figures françaises comme Voltaire et Marie Curie.",
						"http://10.0.2.2:8080/images/pantheon.jpg", c4
				);

				Building b14 = new Building(
						"Colonnade du Louvre", "Façade monumentale", a16, 1670, 23.0, "48.8611, 2.3358",
						"La Colonnade du Louvre, chef-d'œuvre de l'architecture classique, fut réalisée par Claude Perrault au XVIIe siècle. Elle marque l’entrée majestueuse du palais.",
						"http://10.0.2.2:8080/images/colonnade_louvre.jpg", c4
				);

				b1.getDetails().add("Construction de 1969 à 1972");
				b1.getDetails().add("Hauteur 112m");

				b1.setValide(true);
				b2.setValide(true);
				b3.setValide(true);
				b4.setValide(true);
				b5.setValide(true);
				b6.setValide(true);
				b7.setValide(true);
				b8.setValide(true);
				b9.setValide(true);
				b10.setValide(true);
				b11.setValide(true);
				b12.setValide(true);
				b13.setValide(true);
				b14.setValide(true);


				/** création des utilisateurs
				 * @constructeur : pseudo, email, password (, expert : true/false))
				 */
				User u1 = new User("Benoit", "b@b.com", "1234");
				User u2 = new User("Medz", "m@m.com", "1234", true);

				/**
				 * Relation bi-directionnelle entre les bâtiments et les villes
				 */
				// ajout bâtiment à ville
				c1.addToBuildingList(b1);
				c1.addToBuildingList(b2);
				c2.addToBuildingList(b3);
				c3.addToBuildingList(b4);
				c3.addToBuildingList(b5);
				c3.addToBuildingList(b6);
				c3.addToBuildingList(b7);
				c3.addToBuildingList(b8);

				c2.addToBuildingList(b9);
				c2.addToBuildingList(b10);

				c4.addToBuildingList(b11);
				c4.addToBuildingList(b12);
				c4.addToBuildingList(b13);
				c4.addToBuildingList(b14);



				// obligé de save l'user avant d'ajouter aux favoris (et le u1 est save ici juste pour garder celui là en id = 1)
				userRepository.save(u1);
				userRepository.save(u2);

				// ajout de favoris à l'utilisateur
				u2.getFavoris().add(b1);
				u2.getFavoris().add(b2);


				// sauvegarde des repository
				// Sauvegarde des architectes
				architectRepository.save(a1);
				architectRepository.save(a2);
				architectRepository.save(a3);
				architectRepository.save(a4);
				architectRepository.save(a5);
				architectRepository.save(a6);
				architectRepository.save(a7);
				architectRepository.save(a9);
				architectRepository.save(a10);
				architectRepository.save(a11);
				architectRepository.save(a13);
				architectRepository.save(a14);
				architectRepository.save(a15);
				architectRepository.save(a16);

// Sauvegarde des villes
				cityRepository.save(c1);
				cityRepository.save(c2);
				cityRepository.save(c3);
				cityRepository.save(c4);

// Sauvegarde des bâtiments
				buildingRepository.save(b1);
				buildingRepository.save(b2);
				buildingRepository.save(b3);
				buildingRepository.save(b4);
				buildingRepository.save(b5);
				buildingRepository.save(b6);
				buildingRepository.save(b7);
				buildingRepository.save(b8);
				buildingRepository.save(b9);
				buildingRepository.save(b10);
				buildingRepository.save(b11);
				buildingRepository.save(b12);
				buildingRepository.save(b13);
				buildingRepository.save(b14);


				userRepository.save(u2);

				System.out.println("\n\nFIN \n---------------");

			};
		}

	}

