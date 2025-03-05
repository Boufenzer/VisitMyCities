package visitmycities;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import visitmycities.dao.*;
import visitmycities.model.*;
import visitmycities.model.enums.EBuildingTypes;

import java.time.LocalDate;


@SpringBootApplication
public class VisitMyCitiesApplication {

	public static void main(String[] args) {
		SpringApplication.run(VisitMyCitiesApplication.class, args);
	}

	@Bean
	CommandLineRunner initRepos(ArchitectRepository architectRepository, BuildingRepository buildingRepository, CityRepository cityRepository, UserRepository userRepository) {
		return args -> {
			System.out.println("\n\nInitialisation du projet\n---------------");

			/** création architectes
			* @constructeur : nom , prenom , naissance , mort
			 */
			Architect a1 = new Architect("Spoerry","François",
					LocalDate.of(1912, 12, 28),
					LocalDate.of(1999, 1, 11));
			Architect a2 = new Architect("Kuder","Richard",
					LocalDate.of(1852,07,18),
					LocalDate.of(1912, 04, 14));
			Architect a3 = new Architect("de Steinbach","Erwin",
					LocalDate.of(1244,1,1),
					LocalDate.of(1318,1,17));
			Architect a4 = new Architect("Bartholdi","Auguste",
					LocalDate.of(1834,8,2),
					LocalDate.of(1904,10,4));

			/** création villes
			* @constructeur : nom,cp
			 */
			City c1 = new City("Mulhouse","68100");
			City c2 = new City("Strasbourg","67000");
			City c3 = new City("Colmar","68000");
			c1.setCoordonnees("47° 44′ 58″ nord, 7° 20′ 24″ est");
			c2.setCoordonnees("48° 34′ 24″ nord, 7° 45′ 08″ est");
			c3.setCoordonnees("48° 04′ 54″ nord, 7° 21′ 20″ est");


			/** création bâtiments
			* @constructeur : nom, EnumType , Architecte, ville, coordonnées)
			*/
			Building b1 = new Building("Tour de l'Europe", EBuildingTypes.TOUR,a1,c1,"47° 45′ 00″ N, 7° 20′ 26″ E");
			Building b2 = new Building("Tribunal d'instance de Mulhouse", EBuildingTypes.MUNICIPAL,a2,c1,"47° 45′ 12″ N, 7° 20′ 40″ E");
			Building b3 = new Building("Cathédrale Notre-Dame de Strasbourg", EBuildingTypes.EGLISE,a3,c2,"48° 34′ 54″ N, 7° 45′ 02″ E");
			Building b4 = new Building("Statue de la Liberté", EBuildingTypes.MONUMENT,a4,c3,"48° 5′ 59″ N, 7° 21′ 43″ E");

			// détails bâtiments
			b1.getDetails().add("Construction de 1969 à 1972");
			b1.getDetails().add("Hauteur 112m");

			//images bâtiments
			b4.getImages().add("https://www.colmar.fr/sites/colmar.fr/files/visiter/statue-liberte-colmar.jpg");



			/** création des utilisateurs
			* @constructeur : pseudo, email, password (, expert : true/false))
			 */
			User u1 = new User("Benoit","b@b.com", "1234");
			User u2 = new User("Medz","m@m.com", "1234", true);

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
