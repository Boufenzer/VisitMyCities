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

				/** création villes
				 * @constructeur : nom,cp
				 */
				City c1 = new City("Mulhouse", "68100","http://10.0.2.2:8080/images/mulhouse.jpg");
				City c2 = new City("Strasbourg", "67000","http://10.0.2.2:8080/images/strasbourg.jpg");
				City c3 = new City("Colmar", "68000","http://10.0.2.2:8080/images/colmar.jpg");


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
						"La cathédrale Notre-Dame de Strasbourg, un chef-d'œuvre de l'architecture gothique, a été construite au XVe siècle. Sa façade spectaculaire et sa flèche majestueuse en font un monument incontournable de la ville.",
						"http://10.0.2.2:8080/images/cathe_strasbourg.jpg",c2);

				Building b4 = new Building("Statue de la Liberté", "Statue", a4, 1886, 93.0, "48.0795, 7.3582",
						"La Statue de la Liberté de Colmar, érigée en 1886, est une réplique de l'emblématique monument new-yorkais. Elle rend hommage à Bartholdi, le sculpteur originaire de Colmar, et symbolise la liberté et la fraternité.",
						"http://10.0.2.2:8080/images/statue_liberte.jpg",c3);


				b1.getDetails().add("Construction de 1969 à 1972");
				b1.getDetails().add("Hauteur 112m");

				b1.setValide(true);
				b2.setValide(true);
				b3.setValide(true);
				b4.setValide(true);

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



				// obligé de save l'user avant d'ajouter aux favoris (et le u1 est save ici juste pour garder celui là en id = 1)
				userRepository.save(u1);
				userRepository.save(u2);

				// ajout de favoris à l'utilisateur
				u2.getFavoris().add(b1);
				u2.getFavoris().add(b2);


				// sauvegarde des repository
				architectRepository.save(a1);
				architectRepository.save(a2);
				architectRepository.save(a3);
				architectRepository.save(a4);
				cityRepository.save(c1);
				cityRepository.save(c2);
				cityRepository.save(c3);
				buildingRepository.save(b1);
				buildingRepository.save(b2);
				buildingRepository.save(b3);
				buildingRepository.save(b4);

				userRepository.save(u2);

				System.out.println("\n\nFIN \n---------------");

			};
		}

	}

