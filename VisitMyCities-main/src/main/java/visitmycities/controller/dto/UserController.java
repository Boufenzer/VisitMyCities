package visitmycities.controller.dto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import visitmycities.dao.BuildingRepository;
import visitmycities.dao.UserRepository;
import visitmycities.model.Building;
import visitmycities.model.User;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/visitmycities")
public class UserController {

    private UserRepository userRepository;
    private BuildingRepository buildingRepository;

    public UserController(UserRepository userRepository, BuildingRepository buildingRepository) {
        this.userRepository = userRepository;
        this.buildingRepository = buildingRepository;
    }

    @GetMapping("/usager")
    public List<User> getAllUsager() {
        return this.userRepository.findAll();
    }

    @GetMapping("/usager/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/usager")
    public User addUsager(@RequestBody User usagerASauvegarder) {
        return userRepository.save(usagerASauvegarder);
    }

    @DeleteMapping("/usager/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

    @PatchMapping("/usager/{id}")
    public void updateUserById(@PathVariable Long id, @RequestBody User userdata) {
        User u = userRepository.getReferenceById(id);
        if (u == null) {
            return;
        }
        u.setEmail(userdata.getEmail());
        u.setPseudo(userdata.getPseudo());
        u.setPassword(userdata.getPassword());
        userRepository.save(u);
    }

    @PostMapping("/usager/{idUser}/{idBuilding}")
    public ResponseEntity addFavoris(@PathVariable(name = "idUser") Long idUser, @PathVariable(name = "idBuilding") Long idBuilding) {
        Optional<User> user = userRepository.findById(idUser);
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }


        Optional<Building> building = buildingRepository.findById(idBuilding);
        if (!building.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User u = user.get();
        Building b = building.get();

        u.getFavoris().add(b);
        userRepository.save(u);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/usager/{idUser}/{idBuilding}")
    public ResponseEntity deleteFavoris(@PathVariable(name = "idUser") Long idUser, @PathVariable(name = "idBuilding") Long idBuilding) {
        Optional<User> user = userRepository.findById(idUser);
        if (!user.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Optional<Building> building = buildingRepository.findById(idBuilding);
        if (!building.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        User u = user.get();
        Building b = building.get();

        u.getFavoris().remove(b);
        userRepository.save(u);

        return ResponseEntity.ok().build();
    }





}
