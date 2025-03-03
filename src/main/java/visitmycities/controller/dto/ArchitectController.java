package visitmycities.controller.dto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import visitmycities.dao.ArchitectRepository;
import visitmycities.dao.BuildingRepository;
import visitmycities.dao.CityRepository;
import visitmycities.model.Architect;
import visitmycities.model.Building;
import visitmycities.model.User;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/visitmycities")
public class ArchitectController {

    private ArchitectRepository architectRepository;
    private BuildingRepository buildingRepository;
    private CityRepository cityRepository;

    public ArchitectController(ArchitectRepository architectRepository, BuildingRepository buildingRepository, CityRepository cityRepository) {
        this.architectRepository = architectRepository;
        this.buildingRepository = buildingRepository;
        this.cityRepository = cityRepository;

    }

    @GetMapping("/architecte")
    public List<Architect> getAllArchitect() {
        return this.architectRepository.findAll();
    }

    @GetMapping("/architecte/{id}")
    public ResponseEntity<Architect> getArchitectById(@PathVariable Long id) {
        Optional<Architect> architect = architectRepository.findById(id);
        if (architect.isPresent()) {
            return ResponseEntity.ok(architect.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/architecte")
    public Architect addArchitect(@RequestBody Architect architecteASauvegarder) {
        return architectRepository.save(architecteASauvegarder);
    }

    @DeleteMapping("/architecte/{id}")
    public void deleteArchitectById(@PathVariable Long id) {
        architectRepository.deleteById(id);
    }

    @PatchMapping("/architecte/{id}")
    public void updateArchitectById(@PathVariable Long id, @RequestBody Architect architecteAUpdate) {
        Architect a = architectRepository.getReferenceById(id);
        if (a == null) {
            return ;
        }
        a.setNom(architecteAUpdate.getNom());
        a.setPrenom(architecteAUpdate.getPrenom());
        a.setDateNaissance(architecteAUpdate.getDateNaissance());
        a.setDateMort(architecteAUpdate.getDateMort());
        architectRepository.save(a);
    }
}
