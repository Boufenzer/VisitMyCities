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
	CommandLineRunner initRepos(ArchitectRepository architectRepository, BuildingRepository buildingRepository, CityRepository cityRepository, UserRepository userRepository) {
		return args -> {
			System.out.println("\n\nInitialisation du projet\n---------------");

			/* création architectes
			* @constructeur : nom , prenom , naissance , mort
			 */
			Architect a1 = new Architect("Spoerry","François",
					LocalDate.of(1912, 12, 28),
					LocalDate.of(1999, 1, 11));
			Architect a2 = new Architect("Kuder","Richard",
					LocalDate.of(1852,07,18),
					LocalDate.of(1912, 04, 14));

			/* création villes
			* @constructeur : nom,cp
			 */
			City c1 = new City();
			c1.setNom("Mulhouse");
			c1.setCp("68100");

			/* création bâtiments
			* @constructeur : nom, EnumType , Architecte)
			*/
			Building b1 = new Building("Tour de l'Europe", EBuildingTypes.TOUR,a1);
			Building b2 = new Building("Tribunal d'instance de Mulhouse", EBuildingTypes.MUNICIPAL,a2);

			/* création des utilisateurs
			* @constructeur : pseudo, email, password (, expert : true/false))
			 */
			User u1 = new User("Benoit","b@b.com", "1234");
			User u2 = new User("Medz","m@m.com", "1234", true);

			// ajout bâtiment à ville
			c1.addToBuildingList(b1);
			c1.addToBuildingList(b2);

			// obligé de save l'user avant d'ajouter aux favoris (et le u1 est save ici juste pour garder celui là en id = 1)
			userRepository.save(u1);
			userRepository.save(u2);

			// ajout de favoris à l'utilisateur
			u2.getFavoris().add(b1);
			u2.getFavoris().add(b2);


			// sauvegarde des repository
			architectRepository.save(a1);
			architectRepository.save(a2);
			cityRepository.save(c1);
			buildingRepository.save(b1);
			buildingRepository.save(b2);

			userRepository.save(u2);

			System.out.println("\n\nFIN \n---------------");

		};
	}

}
