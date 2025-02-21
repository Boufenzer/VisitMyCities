package visitmycities.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import visitmycities.model.City;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
}
