package visitmycities.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import visitmycities.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
