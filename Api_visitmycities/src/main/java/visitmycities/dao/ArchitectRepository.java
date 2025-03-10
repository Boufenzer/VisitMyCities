package visitmycities.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import visitmycities.model.Architect;

@Repository
public interface ArchitectRepository extends JpaRepository<Architect, Long> {
}
