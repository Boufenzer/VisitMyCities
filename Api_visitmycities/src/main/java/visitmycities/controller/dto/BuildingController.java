package visitmycities.controller.dto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import visitmycities.dao.ArchitectRepository;
import visitmycities.dao.BuildingRepository;
import visitmycities.dao.CityRepository;
import visitmycities.dao.UserRepository;
import visitmycities.model.Architect;
import visitmycities.model.Building;
import visitmycities.model.City;
import visitmycities.model.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/visitmycities")
public class BuildingController {

    private BuildingRepository buildingRepository;
    private CityRepository cityRepository;
    private ArchitectRepository architectRepository;
    private UserRepository userRepository;

    public BuildingController(BuildingRepository buildingRepository, CityRepository cityRepository, ArchitectRepository architectRepository , UserRepository userRepository) {
        this.buildingRepository = buildingRepository;
        this.cityRepository = cityRepository;
        this.architectRepository = architectRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/batiment")
    public List<Building> getAllBuilding() {return this.buildingRepository.findAll();}

    @GetMapping("/batiment/ville")
    public List<Building> getAllBuildingCity(@RequestParam Long villeId) {
       City ville = cityRepository.findById(villeId).orElseThrow(() -> new RuntimeException("Ville not found"));
            return buildingRepository.findByVille(ville);
        }





    @GetMapping("/batiment/{id}")
    public ResponseEntity<Building> getBuildingById(@PathVariable Long id) {
        Optional<Building> building = this.buildingRepository.findById(id);
        if (building.isPresent()) {
            return ResponseEntity.ok(building.get());
        }
        return ResponseEntity.notFound().build();
    }

//    @PostMapping("/batiment")
//    public Building addBuilding(@RequestBody Building   building) {return buildingRepository.save(building);}


    @PostMapping("/batiment")
    public Building createBatiment(@RequestBody Building building) {
        City villeComplete = cityRepository.findById(building.getVille().getId())
                .orElseThrow(() -> new RuntimeException("Ville non trouvée"));
        building.setVille(villeComplete);
        return buildingRepository.save(building);
    }

    @DeleteMapping("/batiment/{id}")
    public void deleteBuildingById(@PathVariable Long id) {buildingRepository.deleteById(id);}



    @PatchMapping("/batiment/{id}")
    public void updateBuildingById(@PathVariable Long id, @RequestBody Building building) {
        Building b = buildingRepository.getReferenceById(id);
        if (b == null) {
            return;

        }
        b.setNom(building.getNom());
        b.setType(building.getType());
        b.setAnnee(building.getAnnee());
        b.setTaille(building.getTaille());
        b.setGps(building.getGps());
        b.setImage(building.getImage());
        b.setDescription(building.getDescription());


        buildingRepository.save(b);




    }

    @PatchMapping("/batiment/{id}/architecte/{architecteId}")
    public ResponseEntity<Building> assignArchitectToBuilding(@PathVariable Long id, @PathVariable Long architecteId) {
        Optional<Building> optionalBuilding = buildingRepository.findById(id);
        Optional<Architect> optionalArchitect = architectRepository.findById(architecteId);

        if (optionalBuilding.isEmpty() || optionalArchitect.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Building building = optionalBuilding.get();
        Architect architect = optionalArchitect.get();

        building.setArchitect(architect);
        buildingRepository.save(building);

        return ResponseEntity.ok(building);
    }

    @GetMapping("/batiment/favoris")
    public ResponseEntity<Set<Building>> getFavoriteBuildings(@RequestParam Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return ResponseEntity.ok(user.getFavoris());
    }



}

