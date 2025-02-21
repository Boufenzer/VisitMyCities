package visitmycities.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import visitmycities.model.Building;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
}
